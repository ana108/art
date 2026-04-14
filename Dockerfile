FROM node:alpine
WORKDIR '/app'
COPY . .

FROM nginx
EXPOSE 9000
COPY --from=0 /app /usr/share/nginx/html