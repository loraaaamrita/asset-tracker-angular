# Use an official Node.js runtime as the base image
FROM node:20
 
# Set the working directory in the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the container
COPY package*.json ./
 
# Install project dependencies
RUN npm install
 
# Copy the rest of the application code to the container
COPY . .
 
# Build the Angular application
RUN npm run build -- --prod
 
# Use NGINX to serve the Angular app
FROM nginx:alpine
 
# Copy the built Angular app from the previous stage into the NGINX server
COPY --from=0 /app/dist/* /usr/share/nginx/html/
 
# Expose the port on which the NGINX server will run on
EXPOSE 80
 
# Start NGINX to serve the Angular app when the container runs
CMD ["nginx", "-g", "daemon off;"]

