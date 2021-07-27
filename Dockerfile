FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./lib ./lib
COPY ./server ./server
COPY ./client/build ./client/build

EXPOSE 3001

CMD [ "node", "server/index.js" ]