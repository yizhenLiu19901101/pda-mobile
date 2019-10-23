FROM nginx
RUN rm -f /usr/share/nginx/html/index.html
COPY ./dist/ /usr/share/nginx/html/