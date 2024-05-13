# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app/ui

# Copy package.json and yarn.lock to install dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Command to start the application in development mode
CMD ["npm", "start"]
