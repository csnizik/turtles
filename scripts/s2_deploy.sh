#!/bin/bash

# place in the /app/scripts folder with execute permission for appadmin
# run directly after the s1_deploy script in the folder that script sets

cd /app/www/html/cpdifrontend-Dev.Dev

if ! [[ -d "../cpdifrontend-Dev.Dev" ]]
then
    echo "Run this from inside the /app/www/html/cpdifrontend-Dev.Dev."
    exit 1
fi

echo "removing all files in this folder"
rm -rf *
echo "explode tarball"
tar -xvf /app/tmp/cpdifrontend.tar.gz
echo "change owner of files to appadmin"
chown -R appadmin:appadmin *
echo "start the service"
systemctl start cpdifrontend-dev.dev.service

echo done