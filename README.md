<h1 align="center">
Jainbox

<br>
<br>

[![Github Issues](https://img.shields.io/github/issues/fangweb/jainbox)](https://img.shields.io/github/issues/fangweb/jainbox) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) 
</h1>

## Motivation
Jainbox is a websocket based inbox messaging demo. It was created as a way to learn Go, Typescript, PostgreSQL, and React by building a multi-service application. 

The architecture is comprised of various docker containers which communicate through gRPC. 
The database schema was designed from the ground up without the use of ORMs. 

Users have the ability to create accounts, send and view messages, move messages to different panels, and delete messages. 
A Go service was created to allow real-time communication and updates. 
React packages such as toast and modal were written from the ground up. 
All HTML and CSS were written without the use of frameworks. 

---

## Install

### Prerequisites
- Docker and docker-compose is required

### Quick Start using Makefile (Linux)

- Set up environmental variables
```shell
$ cp env.template .env
```

- Install with Docker
```shell
$ cd jainbox
$ docker-compose build
$ docker-compose up
```

Navigate to the default listening address http://localhost:3000

### Long way

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

### Usage

- Starting the application 
```shell
$ docker-compose up
```

- Stopping the application
```shell
$ docker-compose down
```

- Clearing docker volumes
```shell
$ docker system prune 
```

---
## Stack

- Golang
- Typescript
- Node
- PostgreSQL
- React / Redux
- Docker
- gRPC / Protobuf

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
