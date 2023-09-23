# Stage 1
FROM node:alpine as builder

WORKDIR /app

# Copy package.json 
COPY package.json .

# Install dependencies
RUN npm Install

# Copy the entire application code to the working directory
COPY . .

# Build the React app
RUN npm run build


# Expose the port
EXPOSE 3000

# Define the command to run
CMD ["npm", "run", "preview"]


# Stage 2
FROM nginx:1.19.0
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
