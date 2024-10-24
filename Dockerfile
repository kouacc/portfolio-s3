ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim as base

WORKDIR /src

# Build
FROM base as build

COPY --link package.json package-lock.json .
RUN npm install

COPY --link . .

RUN npm run build

# Run
FROM base

ENV DB_FILE_NAME=file:database.db
ENV NODE_ENV=production

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]