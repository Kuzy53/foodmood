FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM alpine:3.18

WORKDIR /var/www/foodmood

VOLUME /var/www/foodmood/dist

COPY --from=build /app/dist /var/www/foodmood/dist
