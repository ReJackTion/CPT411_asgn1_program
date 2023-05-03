## Local Setup & Run Frontend (requires backend to be running)

1. Install nodejs (>=v14) & npm
2. `cd frontend`
3. `yarn`
4. `yarn dev`

## Local Server Setup

### Non-Docker (see next sections for running with Docker)

1. `pip install poetry` (or safer, follow the instructions: https://python-poetry.org/docs/#installation)
2. Install dependencies `cd` into the directory where the `pyproject.toml` is located then `poetry install`
3. [UNIX]: Run the FastAPI server via poetry with the bash script: `poetry run ./run.sh`
4. [WINDOWS]: Run the FastAPI server via poetry with the Python command: `poetry run python app/main.py`
5. Open http://localhost:8001/docs/
6. To stop the server, press CTRL+C

### Run with Docker (see previous sections for running without Docker)

Make sure you have Docker and [Docker Compose](https://docs.docker.com/compose/install/) installed.

1. Run `docker-compose -f docker-compose.local.yml up -d` (this will download the frontend and backend image and build the image for the web app - takes about 5 mins)
2. Run `docker ps`to run the container
3. Visit `http://localhost:8001/docs`
4. Run `docker-compose -f docker-compose.local.yml down` to shut down the container

Windows Users: Having problems getting the volume to work properly? Review the following resources:

- [Docker on Windows - Mounting Host Directories](https://rominirani.com/docker-on-windows-mounting-host-directories-d96f3f056a2c?gi=324e01b3473a)
- [Configuring Docker for Windows Shared Drives](https://docs.microsoft.com/en-gb/archive/blogs/stevelasker/configuring-docker-for-windows-volumes)
- You also may need to add `COMPOSE_CONVERT_WINDOWS_PATHS=1` to the environment portion of your Docker Compose file.
