FROM node:20.8.0-alpine3.17

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5222

# Define the command to run the application
CMD ["npm", "start"]
