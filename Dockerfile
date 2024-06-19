FROM node:20.13.1-alpine3.18 as builder

WORKDIR /app
COPY . .

RUN npm install -g pnpm && \
    pnpm install && \
    pnpm run build

FROM node:20.13.1-alpine3.18
WORKDIR /app

COPY --from=builder /app/dist/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/dist/static ./dist/static
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD ["node", "server.js"]