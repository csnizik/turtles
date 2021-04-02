def agentLabel
if (BRANCH_NAME == "release") {
    agentLabel = "CIG-Demo"
} else {
    agentLabel = "CIG-Micro-Service"
}


pipeline {

   agent {label agentLabel}
   environment {
        SLAVE_NODE = "${env.BRANCH_NAME == "release" ? "CIG-Demo" : "CIG-Micro-Service"}"
        ENV_NAME = "${env.BRANCH_NAME}"
        ppcUrl =  "${env.BRANCH_NAME == "release" ? "https://greyworm-epi.spatialfrontlab.com" : "https://greyworm-epi-dev.spatialfrontlab.com"}"
        httpStatus = ""
    }
   stages {
      // stage('environ variable check')
      // {
      //   steps {
      //     sh "echo 'salve node is ${SLAVE_NODE}'"
      //     sh "echo 'agentLabel is ${agentLabel}'"
      //     sh "echo 'branch name is ${ENV_NAME}'	"
      //   }
      // }
      stage('Unit Test with Docker')
      {
        steps {
          sh "docker rm greyworm-epi-jest"
          sh "docker build -f Dockerfile.Test -t greyworm-epi-test:${ENV_NAME} ."
          sh "docker create --name greyworm-epi-jest greyworm-epi-test:${ENV_NAME}"
//           sh "docker cp greyworm-epi-jest:/src/testresult ./"
          sh "docker rm greyworm-epi-jest"
          sh "docker rmi greyworm-epi-test:${ENV_NAME}"
        }
      }
      stage("Build Docker Deploy Image") {
        when {
            anyOf {
                branch 'develop';
                branch 'release'
            }
        }
        //build deploy image for develop and release branch only
        steps {
          sh "docker build -t greyworm-epi:${ENV_NAME} ."
          sh "docker tag greyworm-epi:${ENV_NAME} 766295386465.dkr.ecr.us-east-1.amazonaws.com/greyworm-epi:${ENV_NAME}"
        }
      }
      stage("Push Docker Image to AWS ECR") {
          when {
            anyOf {
                branch 'develop';
                branch 'release'
            }
        }
        //push image for develop and release branch only
        steps {
          sh "aws ecr get-login-password --region us-east-1 --profile=cig | docker login --username AWS --password-stdin 766295386465.dkr.ecr.us-east-1.amazonaws.com"
          sh "docker push 766295386465.dkr.ecr.us-east-1.amazonaws.com/greyworm-epi:${ENV_NAME}"
        }
      }
      stage("Rebuild Docker Container on Server") {
          when {
            anyOf {
                branch 'develop';
                branch 'release'
            }
        }
        //rebuild docker image for develop and release branch only
        steps {
           sh "sudo systemctl stop greyworm_epi.service"
           sh "sudo systemctl start greyworm_epi.service"
        }
      }
      stage ('Check Service Health') {

        steps {
          script {
              sleep(10)
              httpStatus = sh(script: "curl --insecure -w '%{http_code}' $ppcUrl -o /dev/null --header 'Accept: application/json' ", returnStdout: true)

              if (httpStatus != "200" && httpStatus != "201" ) {
                  echo "Service error with status code = ${httpStatus} when calling ${ppcUrl}"
                  error("notify error")
              } else {
                  echo "Service OK with status: ${httpStatus}"
              }
          }
        }

      }

   }
   post {
     always {
//        xunit([MSTest(deleteOutputFiles: true, failIfNotNew: true, pattern: 'testresult/*.trx', skipNoTestFiles: false, stopProcessingIfError: true)])
     }
     cleanup{
        deleteDir()
     }
   }
}
