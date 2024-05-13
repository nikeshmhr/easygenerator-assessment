# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app/backend

# Copy package.json and yarn.lock to install dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 8080

# Command to run the application in development mode
CMD ["yarn", "start:dev"]
