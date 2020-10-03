[x] redis
[x] nodejs
[x] yarn
[x] nginx
[x] ufw
[x] pm2

wget http://download.redis.io/redis-stable.tar.gz

tar xvzf redis-stable.tar.gz

cd redis-stable

sudo apt-get install make

sudo apt-get install gcc

sudo apt-get install tcl

sudo apt-get install build-essential

sudo apt-get update

## if there is another error like "fatal error: jemalloc/jemalloc.h: No such file or directory"

## just run "make distclean"

make

make test
