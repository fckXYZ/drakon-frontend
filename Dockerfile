FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY src ./
RUN npm i
RUN npm uninstall node-sass
RUN npm install node-sass@4.14.1

RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
