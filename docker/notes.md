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
    - Immutable template that defines how a container will be realized
    - An executable application artifact
    - Includes:
        - Source Code
        - Complete Environment Configuration
    - Add environment variables, create directories, files, etc
    - Can run multiple containers from 1 image

- Docker Container
    - A running instance of an image
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
    - To prevent, use `-d` flag

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



# Docker commands

- Can use `NAMES` in exchange of `container_id`

```
docker pull {name}:{tag}    // Pulls a Docker Image to comupter
docker images               // Images
docker ps                   // Displays running Containers
docker ps -a                // Displays all Containers
docker run {image}          // Runs a container with image
docker run -d {image}       // Runs a container without blocking terminal
docker logs {container_id}  // Shows logs for specified Container
docker stop {container_id}  // Stops a container
docker start {container_id} // Restarts a Container
```