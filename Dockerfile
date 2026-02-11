# Production-ready build for Nuxt app (apps/web)
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare npm@10.0.0 --activate
WORKDIR /app

# Install dependencies (root + workspaces)
FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/domain/package.json ./packages/domain/
COPY packages/storage/package.json ./packages/storage/
COPY packages/shared-config/package.json ./packages/shared-config/
COPY packages/testing/package.json ./packages/testing/
RUN npm ci

# Build app (full source + deps)
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --workspace=@todo/web

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nuxt && adduser --system --uid 1001 nuxt
COPY --from=builder --chown=nuxt:nuxt /app/apps/web/.output ./
USER nuxt
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
CMD ["node", "server/index.mjs"]
