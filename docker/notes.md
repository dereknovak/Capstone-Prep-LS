# Docker

# About Docker

## What is Docker?

- Docker is a virutalization Software that makes developing and deploying applications much easier
- Packages applications with all the necessary dependencies, configuration, system tools, and runtime
- Portable artifact, can easily be shared and distributed

## What problems does Docker solve?

- Originally:
    - Each SWE had to independently download all services for the project on their local machine
    - Each SWE had a different OS (Mac, Windows)
        - Installation process different for each OS environment
    - The steps for downloading were confusing and mistakes could happen
    - Back and forth communications or miscommunications

- Using Containers
    - Own isolated environment
    - Postgres packaged with all dependencies and configs
    - Start service as a Docker container using 1 Docker command
    - Command same for all OS
    - Command same for all services
    - No configurations needed on the server
    - Less room for errors

- Docker standardizes the process of running any service on any local development environment

- Easy to run different versions of the same application without any conflicts

## Virtual Machine vs Docker

- Applications Layer
    - OS Kernel
        - Hardware

- Docker virtualizes the *Applications Layer*
- Virtual Machines virtualizes **both** the *Applications Layer* and the *OS Kernel*

- Docker
    - Size is in MG
    - Seconds to start
    - Compatible only with Linux distributions

- Virtual Machines
    - Size is in GB
    - Minutes to start
    - VM is compatible with all OS

- To run Linux-based images on a Windows/Mac Machine, must use **Docker Desktop**

# Images vs Containers

- Docker Image (package)
    - Immutable (read-only) template that defines how a container will be realized
    - An executable application artifact
    - A collection of independent file system layers
    - Includes:
        - Source Code (Application Layer)
        - Complete Environment Configuration (Environment/Libraries)
        - Base Layer (Base OS)
        - **Each layer has less data then the previous
    - Add environment variables, create directories, files, etc
    - Can run multiple containers from 1 image

- Docker Container
    - A running instance of an image
    - Adds a read/write component
    - Allows data to be stored within that container and allows that Container to be run on a Docker Host
    - Each has a unique writable layer that keeps them isolated while using the same image
    - Actually starts the application

# Docker Registry

- A storage and distribution system for Docker images
- Official images available from applications like Redis, Mongo, Postgres, etc.
- Official images are maintained by the software authors or in collaboration with the Docker community
- Docker host one of the largest Docker Registry, called "Docker Hub"

## Docker Official Images

- A dedicated team responsible for reviewing and publishing all content in the Docker Official Images repos
- Works in collaboration with software maintainers, security experts
- However, anyone can participate as collaboration takes place openly on GitHub

## Image Versioning

- Docker images are versioned
- Different versions are identified by **tags**
    - The "latest" tag represents the most recent version

# Pull an Image

```
docker pull {name}:{tag}
```
>Pull an image from a registry

# Docker run

- Runs an image as a container
- The image can be listed in Docker Hub
    - Does *not* have to be on your local machine!
    - Do not have to pull it first

- By default, shows the logs and blocks the terminal
    - To prevent, use `-d` flag (detatch)

- To bind to a specific port
    - Use `-p` flag along with the ports
    - `docker run -p 9000:80 nginx:latest`
        - `0.0.0.0:9000->80/tcp`
    - Only 1 service can run on a specific port on the host
        - Only 1 service can run on port 9000

- To stop logs, use `CTRL-C`
    - This will stop the container, too

- To provide a name:
    - Use `--name` along with desired name

# Port Binding

- Port Binding
    - Bind the container's port to the host's port to make the service available to the outside world

- When first running a container, it is located in the *closed* Docker Network

- This allows us to run the same app running on the same port multiple times

- To access the container, we need to **expose** the container port **to the host** (the machine the container runs on)
    - You have to tell Docker to bind the container to the respective host
        - For a local computer, this would be the `localhost`

- While you can bind to any port, it's best practice to use the *same port* as the container is using
    - MySQL => Port 3306
    - `docker run -p 3306:3306 mysql`

# Start and Stop Containers

- Using `run` creates a new container every time
- When using `ps`, only the actively running containers are listed
    - Adding the `-a` flag will shop all, including stopped
    - `docker ps -a`

- To restart a Container without creating a new one
    - Use `start`
    - `docker start {container_id}`

# Private Docker Registries

- Docker Hub is *public* Docker Registry

- Almost all cloud providers have their own Private Docker Registry
    - Amazon: ECR
    - Google: Container Registry
    - Docker: Private Docker Hub

## Registry vs Repository

- Registry
    - A service providing storage for images
    - Can be hosted by a third party (AWS) or by yourself
    - Collection of repositories

- Repository
    - Collection of related images with same name but different versions

# Create Your Own Images

- Companies create custom images for their applications
- We want to deploy our application as a Docker Container

- We need to create a 'definition' of how to build an image from our application
    - Written in a file called a `dockerfile`
        - A text document that contains commands to assemble an image
        - Docker can then build an image by reading those instructions

- In Root File of project
    - Create `Dockerfile` file
    - Start the application
        - For node, `node index.js`
    - Map instructions for application inside of the container
    - Traverse to proper working directory
    - Run the application

## Directives

- FROM
    - Build this image from the specified image
    - Use the application used to build the image
        - If its an Express App, use `node`
- COPY
    - Copies files or directories from <src> and adds them to the filesystem of the container at the path <dest>
    - While `RUN` is executed in the container, `COPY` is executed on the host
- RUN
    - Will execute any command in a shell *inside* the container environment
- WORKDIR
    - Sets the *working directory* for all following commands
    - Similar to changing into a directory using `cd`
- CMD
    - Last command in the Dockerfile
    - The instruction that is to be executed when a Docker Container starts
    - There can only be one `CMD` instruction in a Dockerfile
    - `[{command}, {parameter}]`

```Dockerfile
FROM {image}:{version}

COPY {files} {destination}

WORKDIR {location}
RUN {installation script}

CMD {instructions}
```

Example
```Dockerfile
FROM node:19-alpine

COPY package.json /app/
COPY src /app/

WORKDIR /app

RUN npm install

CMD ['node', 'server.js']
```

## Dockerfile Structure

- A Dockerfile is a list of directives or statements on how to create a Docker Image.

- Dockerfiles start from a parent or 'base image'
- It's a Docker image that your image is based on
- You choose the base image, depending on which tools you need to have available

# Build Image

- Use builder command
    - `docker build {path}`
        - `-t` => Sets a name and optionally a tag `name:tag`
    - `docker build -t {app_name}:{version} {location_of_Dockerfile}`
    - `docker build -t node-app:1.0 .`

# Docker in Big Picture

- Developing a JS app
    - Uses MongoDB
- Commit the JS app to git
- CI server builds a Docker Image using this JS artifact
- Image gets pushed to a Private Repository
- Development server pulls the image from the Private Repo
- Development server pulls the MongoDB image that the JS Image depends on

# Docker commands

- Can use `NAMES` in exchange of `container_id`

```
docker pull {name}:{tag}       // Pulls a Docker Image to comupter
docker images                  // Images
docker ps                      // Displays running Containers
docker ps -a                   // Displays all Containers
docker run {image}             // Runs a container with image
docker run -d {image}          // Runs a container without blocking terminal
docker logs {container_id}     // Shows logs for specified Container
docker stop {container_id}     // Stops a container
docker restart {container_id}  // Restarts a container
docker start {container_id}    // Restarts a Container
docker inspect {container_id}  // Metadata about container
docker port {container_id}     // Port Mapping of Container
docker rm {container_id}       // Removes a Container
docker rmi {image_id}          // Removes an Image
docker build -t {name}:{tag} {location_of_Dockerfile}
```