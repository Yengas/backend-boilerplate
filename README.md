<div align="center>
    <img src="https://github.com/hapijs/hapi/raw/65944e55ea35189c68b2a5bd9f8cc039e5147961/images/17.png" alt="HapiJS Backend Boilerplate">
    <h1>HapiJS Backend Boilerplate</h1>
</div>

This is a backend boilerplate project that uses latest ES6 features and HapiJS v17. Its very opinionated and suits to my own tastes. It aims to create ease of development with features such as auto documentation of REST endpoints, generating random data for mock apis, Dockerfiles.

--------------------

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/yengas/backend-boilerplate)
[![Documentation](	https://img.shields.io/swagger/valid/2.0/https/yengas-boilerplate.herokuapp.com/swagger.json.svg)](https://yengas-boilerplate.herokuapp.com/documentation)

# Features

Whole projects features compatibility with Docker, Heroku for deployment, Swagger for Documentation, Unit and Integration tests with Jest, Logging with Pino, Linting according to custom taste extended over standardjs. As the backend framework of choice, HapiJS v17 is used. It features async rest endpoint handlers, auto documentation generation for routes, Schema validation with Joi.

Table of contents (WIP)
=================

<!--ts-->
   * [Table of contents](#table-of-contents)
   * [Structure](#structure)
   * [Tech](#tech)
   * [Configuration](#configuration)
   * [Running the project](#running-the-project)
      * [Using Docker](#using-docker)
        * [Docker-Compose file](#docker-compose-file)
   * [Deployment](#deployment)
   * [Tests](#tests)
   * [Mocks](#mocks)
   * [FAQ](#faq)
<!--te-->

# Structure
```
.
├── __mocks__  # mock api overrides 
│   └── routes # these routes will override auto generated mock endpoints
├── __tests__       # all of the tests for the project
│   ├── unit        
│   ├── integration 
│   └── helper.js   # helper functions that will be re-used in tests
├── bin                     # scripts that gets run directly
│   ├── mock-api.js         # uses joi to create mock endpoints from routes
│   ├── swagger-generate.js # generates the swagger.json and saves it to given path
│   └── index.js            # entrypoint for our application
├── src                     # main source folder
│   ├── utils.js            # re-used functions
│   ├── schemas             # joi schemas for the app
│   ├── controllers         # controllers that handle http requests
│   ├── routes              # rest api endpoint definitions
│   ├── resources           # constant values and data
│   ├── plugins             # custom hapijs plugins
│   ├── log.js              # logger instance creator
│   ├── configureServer.js  # helper functions to configure the server
│   ├── index.js            # entrypoint for source folder
│   └── config.js           # application config
├── development.Dockerfile  # development dockerfile
├── Dockerfile              # production dockerfile
├── Makefile                # make file for easing docker usage
└── docker-compose.yml      # reference docker-compose for dev
```
# Tech
We aimed to create an auto generating documentation with endpoint input/output validation. This also helped with having a somewhat type safe feeling because we knew which endpoints got which inputs. After that we seperated the business logic from the controllers by trying to use utility functions, mongoose models, and dependency injection.

# Configuration
The application is configured using environment variables to make it run everywhere. Most of the popular deployment softwares such as Heroku, Kubernetes rely on this aswell. To make it easier to work with, we also added dotenv so you can define a `.env` project at the root of your folder while working bare-metal on your computer. 

The main configuration file is on [./src/config.js](./src/config.js) and its pretty self describing. Configurations are commented and the environment variables are explained below.

# Running the project
## Using Docker
Project relies on Docker for offline development. 
### Docker-Compose file
For development you can just run the `docker-compose` up command and the container will start running. However there isn't any database in the configuration, so you either need to add it, or run the container on net=host. This file is just a reference.
# Deployment
The local installation, if you want to run it locally requires node 8.9.4. However there are Dockerfiles both for development and production.

There is also a very handy [Makefile](Makefile) which includes utility commands like running tests, lint, mocks in Docker Development images. It also has commands for building images and running them. However i suggest you to use the [docker-compose.yml](./docker-compose.yml) for the local development.
# Environment Variables
Environment variables are used to enable the configuration of this project. Below are list of these environment variables and what they configure.

- **APP_HOST** the host of the hapijs configuration, default: `localhost`
- **PORT** the port to listen on, default: `8080`
- **ENABLE_CORS** whether to enable hapi cors or not, default: `true`
- **SWAGGER_HOST** the hapi-swagger host which will be used to prefix `localhost`
- **SWAGGER_PORT** the swagger port to use in the documentation ui, default: `8080`
- **JWT_KEY** the jwt key to sign secrets. default: `helloworld`
- **JWT_ALGORITHM** the jwt algorithm to use, default: `HS256`

# Tests
Tests are done with Jest. There are both unit and integration tests. The default `npm test` command runs the unit tests only. If you would like to run integration tests , you can use `npm run test:integration`. Integration tests requires a Mongo database connection. 

# Mocks
You can run `npm run serve:mock` script to get a randomly generated data out of your joi schemas. We also have a make command for this.
# FAQ
