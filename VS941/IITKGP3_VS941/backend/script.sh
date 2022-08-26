cd ~/mike-ross
git pull origin master

yarn compile
pm2 stop all

pm2 start dist/index.js

sudo service nginx restart