FROM node:alpine
WORKDIR '/app'
COPY . .

FROM nginx
EXPOSE 80
COPY --from=0 /app /usr/share/nginx/html