# Multi-stage build
FROM node:19-alpine AS dependencies
WORKDIR /dependencies
COPY *.json /dependencies/
RUN npm install

FROM node:19-alpine AS builder
WORKDIR /buildapp
COPY --from=dependencies /dependencies/node_modules /buildapp/node_modules
COPY . /buildapp
RUN npm run build

FROM node:19-alpine AS app
WORKDIR /app
USER node
COPY --chown=node:node ./public /app/public
COPY --chown=node:node ./src /app/src
COPY --chown=node:node --from=builder /buildapp/node_modules /app/node_modules
COPY --chown=node:node --from=builder /buildapp/.next /app/.next
COPY --chown=node:node --from=builder /buildapp/public /app/public
COPY --chown=node:node --from=builder /buildapp/package.json /app/package.json
COPY --chown=node:node --from=builder /buildapp/src /app/src
COPY --chown=node:node --from=builder /buildapp/next.config.js /app/next.config.js
CMD ["npm", "run", "start"]