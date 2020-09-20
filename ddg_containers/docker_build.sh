#!/bin/bash

export USER_ID=`id -u`
export GROUP_ID=`id -g`
export USER_NAME=`whoami`

docker-compose down
docker-compose build --no-cache
docker-compose up -d
