# Use the official Node.js image as the base image
FROM node:20-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port where your React app will run (replace 3000 with your app's port if needed)
EXPOSE 3000

# Run the React app using the production server
CMD ["npm", "start"]
