FROM node:latest

# Create app directory
WORKDIR /
COPY . .
RUN npm install
RUN npm run build

# Remove everything except .output
RUN find . -mindepth 1 -maxdepth 1 ! -name ".output" -exec rm -rf {} \;

# start the server
CMD ["node", ".output/server/index.mjs"]