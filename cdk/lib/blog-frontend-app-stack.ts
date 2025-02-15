import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Lambda,
  CloudFront,
  Route53,
  Route53DomainNameWithDot,
  ECR,
} from "./constructs";
import { Config } from "./config";

export class BlogFrontendAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const stack = cdk.Stack.of(this);

    const config = new Config(this, props.stage);

    const acmCertificate =
      cdk.aws_certificatemanager.Certificate.fromCertificateArn(
        this,
        "AcmCertificate",
        config.deployConfig.acmCertificateArn,
      );

    const ecr = new ECR(this, "ECR", {
      repositoryName: `${stack.stackName}-repository`.toLowerCase(),
    });

    const lambda = new Lambda(this, "Lambda", {
      stage: props.stage,
      ecrRepository: ecr.repository,
      commitHash: props.commitHash,
    });

    lambda.function.node.addDependency(ecr.repository);

    const cloudfront = new CloudFront(this, "CloudFront", {
      lambdaFunctionUrl: lambda.functionUrl,
      certificate: acmCertificate,
      domainName: config.deployConfig.domainName,
    });

    lambda.function.addPermission("InvokeUrlFromCloudFront", {
      action: "lambda:InvokefunctionUrl",
      principal: new cdk.aws_iam.ServicePrincipal("cloudfront.amazonaws.com"),
      sourceArn: `arn:aws:cloudfront::${cdk.Aws.ACCOUNT_ID}:distribution/${cloudfront.distribution.distributionId}`,
    });

    const route53 = new Route53(this, "Route53", {
      hostedZoneId: config.deployConfig.route53HostedZoneId,
      hostedZoneName: config.deployConfig.route53HostedZoneId,
    });

    route53.createAliasRecord(
      new Route53DomainNameWithDot(config.deployConfig.domainName),
      new cdk.aws_route53_targets.CloudFrontTarget(cloudfront.distribution),
    );

    new cdk.CfnOutput(this, "ECRRepositoryName", {
      value: ecr.repository.repositoryName,
    });

    new cdk.CfnOutput(this, "FunctionUrl", {
      value: lambda.functionUrl.url,
    });

    new cdk.CfnOutput(this, "DomainName", {
      value: config.deployConfig.domainName,
    });

    new cdk.CfnOutput(this, "CloudWatchLogGroupName", {
      value: lambda.function.logGroup.logGroupName,
    });
  }
}
