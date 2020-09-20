#!/bin/bash

export USER_ID=`id -u`
export GROUP_ID=`id -g`
export USER_NAME=`whoami`

docker-compose exec -u $USER_NAME web $*
