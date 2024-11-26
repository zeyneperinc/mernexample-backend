FROM node:alpine

WORKDIR /home/app

COPY package.json .

RUN npm install --force

COPY . /home/app

EXPOSE 5001

CMD ["npm", "run", "start"]