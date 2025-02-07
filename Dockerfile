FROM node:18-alpine AS base


FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM base AS runner
# Install Lambda Web Adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.0 /lambda-adapter /opt/extensions/lambda-adapter
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Next.jsのcacheディレクトリをLambdaで使えるようにする
COPY --from=builder /app/run_on_lambda.sh ./run_on_lambda.sh
RUN ln -s /tmp/cache /app/.next/cache
RUN chmod +x ./run_on_lambda.sh

ENV NODE_ENV production
ENV PORT 3000

ENTRYPOINT ["sh"]
CMD ["run_on_lambda.sh"]
