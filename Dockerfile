# Use the official Node.js LTS image as the base
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

ARG CACHEBUST=12
ENV NODE_ENV=development

COPY . .

# Install dependencies
RUN npm install  && npm install typescript -g

# Copy the rest of the application code

# Expose the port the application will run on
EXPOSE 5222

# Define the command to run the application
CMD ["npm", "start"]
