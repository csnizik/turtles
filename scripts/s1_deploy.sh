#!/bin/bash

# place in the /app/scripts folder with execute permission for all
# executed from users home folder as the user, where they copied the tarball to
echo "moving tar file to /app/tmp"
mv -f cpdifrontend.tar.gz /app/tmp
echo "changing to /app/www/html/cpdifrontend-Dev.Dev folder"
cd /app/www/html/cpdifrontend-Dev.Dev
echo "stopping the service"
systemctl stop cpdifrontend-dev.dev.service
systemctl status cpdifrontend-dev.dev.service