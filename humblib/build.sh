#/!bin/sh

npm install
npm run build

apt install nginx

cp ./nginx.conf /etc/nginx/conf.d/default.conf

cp /app/dist/humblib/ /usr/share/nginx/html

nginx -s reload
