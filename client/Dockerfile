# Step 1: Build the React application
FROM node:18 AS build

# Set the working directory
WORKDIR /app/react

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Step 2: Serve the React application using Nginx
FROM nginx:alpine

# Copy the built React app from the previous step to the Nginx web root
COPY --from=build /app/react/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx when the container has started
CMD ["nginx", "-g", "daemon off;"]