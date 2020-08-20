<h1 align="center">
Jainbox

<br>
<br>

[![Github Issues](https://img.shields.io/github/issues/fangweb/jainbox)](https://img.shields.io/github/issues/fangweb/jainbox) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) 
</h1>

## Motivation
To learn and attempt to create an application smiliar to gmail :fearful:. 

---

## Stack

- Go
- Node + Typescript
- PostgreSQL
- React + Redux
- Docker
- gRPC / Protobuf
- WebSocket

---

## Features
- user sign up and login
- send, view and delete messages
- move and delete messages to different panels
- live updates

---

## Install

### Prerequisites
- Docker and docker-compose is required

### Using Makefile

- Set up environmental variables
```shell
$ cp env.template .env
```

- Run make
```shell
$ cd jainbox
$ make build
$ make run
```

Navigate to the default listening address http://localhost:3000

### Manual Installation

- Set up environmental variables from root folder
```shell
$ cp env.template .env
```

- Build production react app
```shell
$ cd jainbox/client
$ npm run build
```

- Once a build/ folder is generated, move into nginx/build
```shell
$ mv build/ ../nginx/
```

- Run docker-compose in the root folder
```shell
docker-compose build
docker-compose up
```

Navigate to the default listening address http://localhost:3000

---

### Usage

- Starting
```shell
$ docker-compose up
```

- Stopping
```shell
$ docker-compose down
```

- Pruning docker volumes
```shell
$ docker system prune 
```

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
