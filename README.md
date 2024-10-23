# proxy-router
Server for routing https requests to http servers.

Each http server is described as object:
```js
[server name]: { host, port }
```

## Идея

Сервер имеет статичный ip 111.222.333.444.
Есть домен *.example.com и сертификаты для него.

Соответсвенно, все поддомены name1.example.com, name2.example.com и т.д. будут пересылать на этот ip.

Каждый http сервер имеет информацию, какой поддомен он обслуживает и на каком порте работает:
```js
{
  [first-server]: { 
    host: 'name1.example.com',
    port: 3001
  },
  [second-server]: { 
    host: 'name2.example.com',
    port: 3002
  },
  ...
}
```

Https сервер обрабатывает htpps запросы и перенаправляет их, исходя из поддомена, на нужный http сервер.
