# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "ts-node", "src/interfaces/app.ts"] 