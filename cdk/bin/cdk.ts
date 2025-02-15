#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { BlogFrontendAppStack } from "../lib/blog-frontend-app-stack";
import * as dotenv from "dotenv";

declare module "aws-cdk-lib" {
  interface StackProps {
    stage: string;
    commitHash?: string;
  }
}

const stage = process.env.STAGE;
if (!stage) {
  throw new Error("STAGE is required");
}
if (!["dev", "prod"].includes(stage)) {
  throw new Error("STAGE must be either dev or prod");
}

const commitHash = process.env.COMMIT_HASH;

dotenv.config({ path: `./.env.${stage}` });

console.log(`Deploying to stage: ${stage}`);

const app = new cdk.App();
new BlogFrontendAppStack(app, `BlogFrontendAppStack-${stage}`, {
  stage: stage,
  commitHash: commitHash,
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION,
  },
});
