CPDI Frontend Dev Deploy Guide

Build the tarball
1. Open the project in VS Code
2. Open git bash terminal in VS Code
3. Switch to develop branch, i.e.
   $ git checkout develop
4. $ ./scripts/build_usda_tarball
5. the build will take a while. When it is finished an up-to-date cpdifrontend.tar.gz file will exist in the project root folder.

Prep and install 1st server
6. $ scp cpdifrontend.tar.gz <paccount>@10.203.24.12:cpdifrontend.tar.gz
7. $ ssh <paccount>@10.203.24.12
8. $ sudo su
9. $ /app/scripts/s1_deploy.sh
10. $ /app/scripts/s2_deploy.sh
11. $ exit (exits sudo)
12. $ exit (exits remote)

Prep and install 2nd server
13. $ scp cpdifrontend.tar.gz <paccount>@10.203.24.17:cpdifrontend.tar.gz
14. $ ssh <paccount>@10.203.24.17
15. $ sudo su
16. $ /app/scripts/s1_deploy.sh
17. $ /app/scripts/s2_deploy.sh
18. $ exit (exits sudo)
19. $ exit (exits remote)
