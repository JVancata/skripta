FROM node:24.1-slim AS build

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .
RUN npx quartz build

FROM nginx:alpine AS serve
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build ./public /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80