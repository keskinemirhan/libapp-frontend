#/!bin/sh

npm install
npm run build

apt update -y && apt upgrade -y

apt install nginx -y

cp ./nginx.conf /etc/nginx/conf.d/default.conf

cp ./dist/humblib/ /usr/share/nginx/html

nginx -s reload
