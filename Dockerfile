FROM node:alpine

LABEL github=https://github.com/bngom

WORKDIR /app
WORKDIR /app/src

COPY server.js /app/
COPY app.js /app/
COPY src /app/src/
COPY test /app/test/
COPY package*.json /app/

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]