build:
    docker build . -t project-name-web-img:1.0.0
    docker compose --compatibility up -d --force-recreate