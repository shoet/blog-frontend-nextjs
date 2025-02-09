import { Construct } from "constructs";
import { getAppParameter, getInfraParameter } from "./constructs/SSM";

type BuildConfig = {
  apiHost: string;
  cdnHost: string;
};

type DeployConfig = {
  domainName: string;
  acmCertificateArn: string;
  route53HostedZoneId: string;
  route53RecordName: string;
};
export class Config {
  public readonly buildConfig: BuildConfig;
  public readonly deployConfig: DeployConfig;

  constructor(scope: Construct, stage: string) {
    this.buildConfig = {
      apiHost: getAppParameter(scope, stage, "API_HOST", { atBuild: true }),
      cdnHost: getAppParameter(scope, stage, "CDN_HOST", { atBuild: true }),
    };
    this.deployConfig = {
      domainName: getInfraParameter(scope, stage, "DOMAIN_NAME"),
      acmCertificateArn: getInfraParameter(
        scope,
        stage,
        "DOMAIN_CERTIFICATE_ARN",
      ),
      route53HostedZoneId: getInfraParameter(scope, stage, "HOSTED_ZONE_ID"),
      route53RecordName: getInfraParameter(scope, stage, "HOSTED_ZONE_NAME"),
    };
  }
}
