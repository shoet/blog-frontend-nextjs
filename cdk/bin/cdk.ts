#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BlogFrontendAppStack } from "../lib/blog-frontend-app-stack";

declare module "aws-cdk-lib" {
  interface StackProps {
    stage: string;
  }
}

const stage = process.env.STAGE;
if (!stage) {
  throw new Error("STAGE is required");
}
if (!["dev", "prod"].includes(stage)) {
  throw new Error("STAGE must be either dev or prod");
}

console.log(`Deploying to stage: ${stage}`);

const app = new cdk.App();
new BlogFrontendAppStack(app, `BlogFrontendAppStack-${stage}`, {
  stage: stage,
});
