
run when anything changes in package.json
`docker-compose up --build`

run when just changing source code
`docker-compose up`

docker push
`docker login -u YOUR-USER-NAME`

ssh into container
`docker ps` to list running containers
`docker exec -it <name> /bin/bash`
e.g.
`docker exec -it hopkins-refresh_db_1 /bin/bash`
