FROM node:20

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "server.js"]