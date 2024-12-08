# Use the official Node.js LTS image as the base
FROM node:21-alpine

# Set the working directory
WORKDIR /usr/src/app

ARG CACHEBUST=10
ENV NODE_ENV=development

COPY . .

# Install dependencies
RUN npm install  --no-cache

# Copy the rest of the application code

# Expose the port the application will run on
EXPOSE 5222

# Define the command to run the application
CMD ["npm", "start"]
