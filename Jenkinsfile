stage('Git Clone') {
      steps {
        script {
            git branch: master,
              credentialsId: <your credentials id>,
              url: https://gitlab.com/flexor-auto/flexor-instant-quote.git
        }
      }
    }

stage('Docker Build') {
      steps {
        script {
            docker-compose up        }
      }
    }

stage('docker push SG') {
      steps {
        script {
          withAWS(region: 'us-wast-1', credentials: 'AKIASXVFUKPK6W6ZKEU3') {
            sh "${ecrLogin()}"
            sh " docker tag ecs:latest 188252181461.dkr.ecr.us-west-1.amazonaws.com/ecs:latest"
	    sh "docker build -t ecs ."
            sh "docker push 188252181461.dkr.ecr.us-west-1.amazonaws.com/ecs:latest"
          }
        }
      }
    }
try {
  withAWS(region: 'us-wast-1', credentials: 'AKIASXVFUKPK6W6ZKEU3') {
    def updateService = "aws ecs update-service --service ECS --cluster ECSJenkins --force-new-deployment"
    def runUpdateService = sh(returnStdout: true, script: updateService)
    def serviceStable = "aws ecs wait services-stable --service $internationalService --cluster $internationalCluster"
    sh(returnStdout: true, script: serviceStable)
    // put all your slack messaging here
  }
} catch(Exception e) {
  echo e.message.toString()
}
