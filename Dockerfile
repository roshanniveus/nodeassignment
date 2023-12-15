FROM node:latest
WORKDIR /home/niveus/Desktop/node-training/assignment
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3000
CMD ["node","index.js"]