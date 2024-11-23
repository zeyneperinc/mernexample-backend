FROM node:alpine3.20

WORKDIR /home/app

COPY . /home/app

RUN npm install --force

EXPOSE 27017

CMD [“npm”, “run start”]