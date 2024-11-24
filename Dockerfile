# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run prebuild
RUN npm run build

# Stage de production
FROM node:18-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le stage de build
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/database ./database

# create content directory in /.output/public
RUN mkdir -p ./.output/public/content

EXPOSE 4000

CMD ["sh", "-c", "PORT=4000 node ./.output/server/index.mjs"]