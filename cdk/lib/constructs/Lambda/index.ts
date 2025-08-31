import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as imagedeploy from "cdk-docker-image-deployment";

type Props = {
  stage: string;
  ecrRepository: cdk.aws_ecr.IRepository;
  commitHash?: string;
};

export class Lambda extends Construct {
  public readonly stage: string;
  public readonly function: cdk.aws_lambda.Function;
  public readonly functionUrl: cdk.aws_lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    this.stage = props.stage;
    const stack = cdk.Stack.of(this);
    const { platform, architecture } = getPlatform();

    const cdkRoot = process.cwd();

    const functionRole = new cdk.aws_iam.Role(this, "FunctionRole", {
      assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
      inlinePolicies: {
        cloudwatch_logs: new cdk.aws_iam.PolicyDocument({
          statements: [
            new cdk.aws_iam.PolicyStatement({
              actions: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
              ],
              resources: ["*"],
            }),
          ],
        }),
      },
    });

    const lambdaEnvironment = this.getLambdaEnvironment();

    const imageTag = props.commitHash || "latest";

    /* 公式のCDKではcdk.aws_lambda.DockerImageCode.fromImageAsset()で作成したイメージは
     * CDK用のECRにまとめられてしまうため、cdk-docker-image-deploymentを利用して
     * 作成したイメージをECRにデプロイする
     */
    const deployedImage = new imagedeploy.DockerImageDeployment(
      this,
      "CDKDockerImageDeployment",
      {
        source: imagedeploy.Source.directory(`${cdkRoot}/../`, {
          platform: platform,
          buildArgs: {
            NEXT_ENV_FILE_NAME: `.env.deploy.${props.stage}`,
          },
        }),
        destination: imagedeploy.Destination.ecr(props.ecrRepository, {
          tag: imageTag,
        }),
      },
    );

    const logGroup = new cdk.aws_logs.LogGroup(this, "LambdaLogGroup", {
      logGroupName: `/aws/lambda/blog-frontend-${this.stage}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: cdk.aws_logs.RetentionDays.TWO_WEEKS,
    });

    this.function = new cdk.aws_lambda.DockerImageFunction(
      this,
      "DockerImageFunction",
      {
        functionName: `blog-frontend-${this.stage}`,
        code: cdk.aws_lambda.DockerImageCode.fromEcr(props.ecrRepository, {
          tag: imageTag,
        }),
        architecture: architecture,
        role: functionRole,
        environment: lambdaEnvironment,
        timeout: cdk.Duration.seconds(60),
        memorySize: 2048,
        logGroup: logGroup,
      },
    );

    this.function.node.addDependency(deployedImage);

    this.functionUrl = new cdk.aws_lambda.FunctionUrl(this, "FunctionUrl", {
      function: this.function,
      authType: cdk.aws_lambda.FunctionUrlAuthType.AWS_IAM,
      invokeMode: cdk.aws_lambda.InvokeMode.RESPONSE_STREAM,
    });
  }

  getLambdaEnvironment(): { [key: string]: string } {
    let env: { [key: string]: string } = {};
    // アプリケーション上のポートはLambdaWebAdapterと合わせるためにビルド時に固定
    env["BLOG_APP_PORT"] = "3000";
    env["AWS_LWA_INVOKE_MODE"] = "response_stream";
    env["TZ"] = "Asia/Tokyo";
    return env;
  }
}

const getPlatform = () => {
  const architecture = process.arch;
  switch (architecture) {
    case "arm64":
      return {
        architecture: cdk.aws_lambda.Architecture.ARM_64,
        platform: cdk.aws_ecr_assets.Platform.LINUX_ARM64,
      };
    case "x64":
      return {
        architecture: cdk.aws_lambda.Architecture.X86_64,
        platform: cdk.aws_ecr_assets.Platform.LINUX_AMD64,
      };
    default:
      return {
        architecture: cdk.aws_lambda.Architecture.X86_64,
        platform: cdk.aws_ecr_assets.Platform.LINUX_AMD64,
      };
  }
};
