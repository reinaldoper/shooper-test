
FROM node:18


WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install


COPY . .


RUN chmod +x ./wait-for-it.sh


RUN npm run build


EXPOSE 8080


CMD ["sh", "-c", "./wait-for-it.sh db:5432 -- npx ts-node ./node_modules/.bin/sequelize-cli db:migrate && npm start"]