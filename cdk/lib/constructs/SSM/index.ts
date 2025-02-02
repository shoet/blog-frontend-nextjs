import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";

export function getAppParameter(
  scope: Construct,
  stage: string,
  key: string,
  option?: { atBuild?: boolean },
) {
  if (option?.atBuild) {
    return cdk.aws_ssm.StringParameter.valueFromLookup(
      scope,
      `/blog-frontend-nextjs/${stage}/${key}`,
    );
  }
  // デプロイ時に取得
  return cdk.aws_ssm.StringParameter.valueForStringParameter(
    scope,
    `/blog-frontend-nextjs/${stage}/${key}`,
  );
}

export function getInfraParameter(
  scope: Construct,
  stage: string,
  key: string,
) {
  // デプロイ時に取得
  return cdk.aws_ssm.StringParameter.valueForStringParameter(
    scope,
    `/blog-frontend-nextjs-infra/${stage}/${key}`,
  );
}
