FROM nginx:1.25.1-alpine
RUN apk update && \
    apk upgrade && \
    apk add --no-cache curl libcurl@8.4.0-r0 curl@8.4.0-r0
COPY ./build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
