#/!bin/sh


apt update -y && apt upgrade -y
&&
apt install nginx -y
&&
nginx 
#cp ./nginx.conf /etc/nginx/conf.d/default.conf

#cp ./dist/humblib/ /usr/share/nginx/html

