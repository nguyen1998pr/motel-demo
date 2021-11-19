# Build Stage
FROM node:16-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm config set https-proxy http://10.61.11.42:3128

RUN npm config set http-proxy http://10.61.11.42:3128

RUN npm config set proxy http://10.61.11.42:3128

#RUN npm install

#RUN npm run build

# CMD ["npm", "run", "serve"]

# Production Stage
FROM nginx:1.21-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
