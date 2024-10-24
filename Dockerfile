FROM node:latest

# Create app directory
WORKDIR /
COPY . .
RUN npm install

# Generate database.db file in /database
RUN touch database/database.db

# Run Database migrations
RUN npx drizzle-kit pull

RUN npm run build

# Remove everything except .output
RUN find . -mindepth 1 -maxdepth 1 ! -name ".output" -exec rm -rf {} \;

# start the server
CMD ["node", ".output/server/index.mjs"]