# Uses node version 18-alpine as our base image
FROM node:18-alpine

# Goes to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app into the container
COPY . .

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npm", "start"]