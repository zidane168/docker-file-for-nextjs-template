FROM node:20-alpine AS base
FROM base AS deps
WORKDIR /app
COPY ./app/package.json ./app/yarn.lock ./
RUN yarn install --frozen-lockfile \
    && yarn cache clean
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY ./app .
RUN yarn build
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
CMD [ "sh", "-c", "node server.js"]