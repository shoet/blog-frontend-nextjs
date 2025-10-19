import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";

type Props = {
  lambdaFunctionUrl: cdk.aws_lambda.FunctionUrl;
  domainName: string;
  certificate: cdk.aws_certificatemanager.ICertificate;
};

export class CloudFront extends Construct {
  public readonly distribution: cdk.aws_cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    const stack = cdk.Stack.of(this);

    const lambdaOAC = new cdk.aws_cloudfront.FunctionUrlOriginAccessControl(
      scope,
      "FunctionUrlOAC",
      {
        signing: cdk.aws_cloudfront.Signing.SIGV4_ALWAYS,
      },
    );

    const functionUrlOrigin = new cdk.aws_cloudfront_origins.FunctionUrlOrigin(
      props.lambdaFunctionUrl,
      {
        originAccessControlId: lambdaOAC.originAccessControlId,
      },
    );

    // Next.jsのServerActionsで同一オリジンからのリクエストでないと弾かれてしまうため設定
    const cloudfrontFunction = new cdk.aws_cloudfront.Function(
      this,
      "CloudfrontFunction",
      {
        code: cdk.aws_cloudfront.FunctionCode.fromInline(`
async function handler(event) {
  try {
    var request = event.request;
    request.headers["x-forwarded-host"] = {
      value: "${props.domainName}",
    };
    return request;
  } catch (e) {
    console.error("error: " + e);
  }
}
`),
        runtime: cdk.aws_cloudfront.FunctionRuntime.JS_2_0,
        autoPublish: true,
        functionName: `${stack.stackName}-CloudfrontFunction`,
      },
    );

    this.distribution = new cdk.aws_cloudfront.Distribution(
      this,
      "Distribution",
      {
        defaultBehavior: {
          origin: functionUrlOrigin,
          allowedMethods: cdk.aws_cloudfront.AllowedMethods.ALLOW_ALL,
          originRequestPolicy:
            cdk.aws_cloudfront.OriginRequestPolicy
              .ALL_VIEWER_EXCEPT_HOST_HEADER,
          cachedMethods: cdk.aws_cloudfront.CachedMethods.CACHE_GET_HEAD,
          viewerProtocolPolicy:
            cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
          functionAssociations: [
            {
              eventType: cdk.aws_cloudfront.FunctionEventType.VIEWER_REQUEST,
              function: cloudfrontFunction,
            },
          ],
        },
        domainNames: [props.domainName],
        certificate: props.certificate,
      },
    );
  }
}
