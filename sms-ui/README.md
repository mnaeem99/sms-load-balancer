# SMSWorkPlace Client

## Purpose

The SMSWorkPlace Client is a front end application written in reactjs that have UI of manages sms loadbalancer request.

## Requirements

The fully fledged server uses the following:

* Work with Node: 14
* Language: Javascript
* Framework: ReactJS
* Editor: VS Code
* Deployment: Docker & AWS

## Dependencies
There are a number of third-party dependencies used in the project. Browse the package.json file for details of libraries and versions used.

## Setup

To check out the project and build it from source, do the following:

git clone 


## Building and deploying the application

### Building the application

The project uses [Nodejs](https://nodejs.org/) as a build tool. 

This already contains `package.json` that contain required installation library.

To install the node modules execute the following command:

```bash
  npm install
```

To build the project execute the following command:

```bash
  npm run build
```
To run the project execute the following command:

```bash
  npm run start
```

### Dockerizing the application

Create the image of the application by executing the following command:

Create docker image:

```bash
  docker build .
```

Run the distribution (created in `build/` directory)
by executing the following command:

```bash
  docker run <ImageId>
```

This will start the API container exposing the application's port
(set to `3000` in this template app).

In order to test if the application is up, you can call its health endpoint:

```bash
  curl http://localhost:3000/
```
