#/!bin/sh

npm install
npm run build

cp ./nginx.conf /etc/nginx/conf.d/default.conf

cp /app/dist/humblib/ /usr/share/nginx/html

nginx -s reload
