<h1 align="center">
Jainbox

<br>
<br>

[![Github Issues](https://img.shields.io/github/issues/fangweb/jainbox)](https://img.shields.io/github/issues/fangweb/jainbox) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org) 
</h1>

## Motivation
Jainbox is a websocket based inbox messaging demo. It was created to apply Go, Typescript, and React together as a multi-service application. 

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

### Quick Start

- Set up environmental variables
```shell
$ cp env.template .env
```

- Install with Docker
```shell
$ cd jainbox
$ make build
$ make run
```
You can then navigate to to the default listening address at http://localhost:3000


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
- React / Redux
- Docker
- gRPC / Protobuf

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
