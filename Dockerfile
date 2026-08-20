FROM node:22.12-alpine as immo_web_build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25-alpine as immo_web
COPY --from=immo_web_build /app/dist /usr/share/nginx/html