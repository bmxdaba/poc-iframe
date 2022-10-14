# poc-iframe


## Installation
```shell
npm install
```

### Set Reverse Proxy

#### Requirements: `nginx`

```shell
sudo apt update && sudo apt install nginx
sudo systemctl start nginx
```

Change hosts to simulate different domains (change `/etc/hosts`)

```shell
sudo vim /etc/hosts
```

and paste this

```
127.0.0.1 poc-iframe-service.test
127.0.0.1 1-poc-iframe-consumer.test
127.0.0.1 2-poc-iframe-consumer.test
```

Then setup NGINX config

```shell
sudo vim /etc/nginx/conf.d/poc-iframe-service.conf
sudo vim /etc/nginx/conf.d/1-poc-iframe-consumer.conf
sudo vim /etc/nginx/conf.d/2-poc-iframe-consumer.conf
```

and paste correct configuration per file - see server_name


`poc-iframe-service.conf`
```
server {
    listen 80;

    server_name poc-iframe-service.test;

    location / {
        proxy_pass http://127.0.0.1:3000/;
    }
}
```

`1-poc-iframe-consumer.conf`
```
server {
    listen 80;

    server_name 1-poc-iframe-consumer.test;

    location / {
        proxy_pass http://127.0.0.1:4000/;
    }
}
```

`2-poc-iframe-consumer.conf`
```
server {
    listen 80;

    server_name 2-poc-iframe-consumer.test;

    location / {
        proxy_pass http://127.0.0.1:5000/;
    }
}
```

When all configs are added: reload the nginx to apply new configurations

```shell
sudo systemctl restart nginx.service
```


## RUN THIS POC
```shell
// To run main app on 3000 port
npm start:debug:dev
```

1. Open 2 additional terminal windows
2. Run one more instance on different ports to simulate different domains at each window

```shell
// Pass the PORT environment variable
PORT=4000 npm start:debug:dev

// inside another window
PORT=5000 npm start:debug:dev
```
