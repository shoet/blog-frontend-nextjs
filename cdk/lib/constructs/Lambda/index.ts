import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";

type Props = {
  stage: string;
};

export class Lambda extends Construct {
  public readonly stage: string;
  public readonly function: cdk.aws_lambda.Function;
  public readonly functionUrl: cdk.aws_lambda.FunctionUrl;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);
    this.stage = props.stage;
    const stack = cdk.Stack.of(this);

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

    const logGroup = new cdk.aws_logs.LogGroup(this, "LambdaLogGroup", {
      logGroupName: `/aws/lambda/${stack.stackName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: cdk.aws_logs.RetentionDays.TWO_WEEKS,
    });

    this.function = new cdk.aws_lambda.DockerImageFunction(
      this,
      "DockerImageFunction",
      {
        code: cdk.aws_lambda.DockerImageCode.fromImageAsset(`${cdkRoot}/../`, {
          platform: cdk.aws_ecr_assets.Platform.LINUX_ARM64,
        }),
        architecture: cdk.aws_lambda.Architecture.ARM_64,
        role: functionRole,
        environment: lambdaEnvironment,
        timeout: cdk.Duration.seconds(60),
        memorySize: 1024,
        logGroup: logGroup,
      },
    );

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
