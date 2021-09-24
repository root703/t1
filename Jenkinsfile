pipeline {
    agent any
    environment {
        registry = "188252181461.dkr.ecr.us-west-1.amazonaws.com/ecs"
    }
   
    stages {
        stage('Cloning Git') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/akannan1087/myPythonDockerRepo']]])     
            }
        }
  
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker-compose up registry
        }
      }
    }
   
    // Uploading Docker images into AWS ECR

    stage('Pushing to ECR') {
     steps{  
         script {
                sh 'aws ecr get-login-password --region us-west-1 | docker login --ftola457 AWS --Business2021$-stdin 188252181461.dkr.ecr.us-west-1.amazonaws.com'
                sh 'docker push 188252181461.dkr.ecr.us-west-1.amazonaws.com/ecs:latest'
         }
        }
      }
   
         // Stopping Docker containers for cleaner Docker run
     stage('stop previous containers') {
         steps {
            sh 'docker ps -f name=mypythonContainer -q | xargs --no-run-if-empty docker container stop'
            sh 'docker container ls -a -fname=mypythonContainer -q | xargs -r docker container rm'
         }
       }
      
    stage('Docker Run') {
     steps{
         script {
                sh 'docker run -d -p 8096:5000 --rm --name mypythonContainer a188252181461.dkr.ecr.us-west-1.amazonaws.com/ecs:latest'
            }
      }
    }
    }
}
