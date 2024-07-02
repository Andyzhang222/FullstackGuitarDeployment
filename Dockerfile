# Production Dockerfile
FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /app

# Copy package.json and package-lock.json files first
COPY package*.json ./

# Install dependencies
RUN yarn

COPY . .

# Build application
RUN yarn build

# Run the server in production mode
CMD yarn run server:prod

# Remove source code from production image
RUN rm -Rf src

EXPOSE 3000 