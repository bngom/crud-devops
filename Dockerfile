FROM node:alpine

LABEL github=https://github.com/bngom

# Create app directory
WORKDIR /app

COPY package*.json /app/

RUN npm install

# Create src directory
WORKDIR /app/src

# Entry point
COPY server.js /app/
COPY app.js /app/

# app source
COPY src /app/src/

# Tests
COPY test /app/test/

EXPOSE 8080
CMD ["npm", "start"]