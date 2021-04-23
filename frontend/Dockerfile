FROM node:15.5.0-alpine

WORKDIR /app

# COPY package.json   /app
COPY package.json .

RUN npm install 

# COPY SRC /app
COPY . .

EXPOSE 3220

# RUN npm run start
CMD ["npm", "start"]