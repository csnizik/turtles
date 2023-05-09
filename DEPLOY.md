CPDI Frontend Dev Deploy Guide

Build the tarball
1. Open the project in VS Code
2. Open git bash terminal in VS Code
3. Switch to develop branch, i.e.
   $ git checkout develop
4. $ ./scripts/build_usda_tarball
5. the build will take a while. When it is finished an up-to-date cpdifrontend.tar.gz file will exist in the project root folder.

Prep and install 1st server
6. $ scp cpdifrontend.tar.gz <paccount>@10.203.24.12
7. $ ssh <paccount>@10.203.24.12
8. $ /app/scripts/s1_deploy
9. $ systemctl stop cpdifrontend-dev.dev.service
10. $ systemctl status cpdifrontend-dev.dev.service
    Verify service stopped
11. $ exit (exits sudo)
12. $ sudo su appadmin
13. $ 
11. /app/scripts/s2_deploy
10. exit (exits sudo)
11. exit (exits remote)

Prep and install 2nd server
12. scp cpdifrontend.tar.gz <paccount>@10.203.24.17
13. ssh <paccount>@10.203.24.17
14. /app/scripts/s1_deploy
15. /app/scripts/s2_deploy
15. exit (exits sudo)
16. exit (exits remote)
