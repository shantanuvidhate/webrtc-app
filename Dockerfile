# use ubuntu:latest image
FROM ubuntu:latest

#  Install node js 18 LTS
RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

#Work directiory for building project 
WORKDIR /app

# COPY the package.json package.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# copy rest of the files except node_modules (.dockerignore)
COPY . .

# Build the database schema
RUN npx prisma generate

# Run the build
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the project
CMD [ "npm" ,"start" ]


