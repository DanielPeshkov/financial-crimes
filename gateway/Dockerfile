FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install @nestjs/cli -g
RUN npm install

COPY . . 

EXPOSE 3000

CMD ["nest", "start"]