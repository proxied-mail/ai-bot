# Use the official Node.js LTS image as the base
FROM node:21-alpine

# Set the working directory
WORKDIR /usr/src/app

ARG CACHEBUST=2


# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the application will run on
EXPOSE 5222

# Define the command to run the application
CMD ["npm", "start"]
