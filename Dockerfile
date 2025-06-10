FROM node:24-alpine3.22

WORKDIR /app
COPY package.json yarn.lock ./

EXPOSE 3000

CMD ["yarn", "dev"]
