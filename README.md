# Config

### 環境変数

Next.jsではサーバーサイドの環境変数には.envが使われるため、以下のルールで設定する。  
`.env`: ローカル開発用途  
`.env.deploy.<Stage名>`: Dockerfileに対してBuildArgs`NEXT_ENV_FILE_NAME`で指定し、内部で.env.productionにリネームを行い環境へ反映する。

`.env(.deploy.XXX)`で指定する値は以下。  
`API_HOST`: APIのURL  
`CDN_HOST`: CDNのドメイン  
`SERVER_ACTIONS_ALLOWED_ORIGINS`: Next.jsのServerActionで実行を許可するHost

# Deploy

AWS CDKでデプロイを行う。

```
$ cd cdk
$ npm run deploy
$ npm run deploy:prod
```
