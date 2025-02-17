#!/bin/bash

if [ -z "$1" ]; then
  echo "Please provide the stage name"
  exit 1
fi

stage=$1
file_name=".env.deploy.${stage}"

if [ -f $file_name ]; then
  echo "File already exists"
  exit 1
fi

touch $file_name

API_HOST=$(aws ssm get-parameter --name "/blog-frontend-nextjs-${stage}/API_HOST" | jq '.Parameter | .Value')
echo "API_HOST=${API_HOST}" >> $file_name

CDN_HOST=$(aws ssm get-parameter --name "/blog-frontend-nextjs-${stage}/CDN_HOST" | jq '.Parameter | .Value')
echo "CDN_HOST=${CDN_HOST}" >> $file_name

SERVER_ACTIONS_ALLOWED_ORIGINS=$(aws ssm get-parameter --name "/blog-frontend-nextjs-${stage}/SERVER_ACTIONS_ALLOWED_ORIGINS" | jq '.Parameter | .Value')
echo "SERVER_ACTIONS_ALLOWED_ORIGINS=${SERVER_ACTIONS_ALLOWED_ORIGINS}" >> $file_name
