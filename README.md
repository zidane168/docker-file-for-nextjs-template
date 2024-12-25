# VTL-FE-Web

```
This repo as the template for FE developer to setup docker site.
```

## Getting started

### Change the files

[docker-compose.dev.vn.yml](docker-compose.dev.vn.yml)
```
services:
  project-name-web: #rename the name
    container_name: project-name-web #rename the name
    image: project-name-web-img:1.0.0 #rename the name
    ...
  project-name-web-nginx: #rename the name
      - "project_external_port:80" #asking oli what port available
    container_name: project-name-web-nginx
    labels:
      ...
      - "traefik.basic.frontend.rule=Host:project-domain.com,www.project-domain.com,abc.project-domain.com" #asking oli what subdomains
      ...
    links:
      - project-name-web #rename the name
    ...
```

[default.conf](default.conf)
```
upstream my_http_servers {
    server project-domain-web:3000; #it should be same as your project name in your docker-compose file
}
```

[Makefile](Makefile)
```
docker build . -t project-name-web-img:1.0.0 #it should be same as your project name in your docker-compose file
```
