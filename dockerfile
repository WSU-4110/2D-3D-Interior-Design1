FROM nginx:alpine

COPY . /public

COPY nginx.conf nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]