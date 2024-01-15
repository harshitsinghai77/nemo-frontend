# Use the official lightweight Node.js 16 image.
FROM node:16-slim

# Install netstat before copying application files to optimize caching
RUN apt-get update && apt-get install -y net-tools

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "start"]
