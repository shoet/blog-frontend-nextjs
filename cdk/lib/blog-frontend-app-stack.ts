import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Lambda } from "./constructs";

export class BlogFrontendAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new Lambda(this, "Lambda", {
      stage: props.stage,
    });

    new cdk.CfnOutput(this, "FunctionUrl", {
      value: lambda.functionUrl.url,
    });

    new cdk.CfnOutput(this, "CloudWatchLogGroupArn", {
      value: lambda.function.logGroup.logGroupArn,
    });
  }
}
