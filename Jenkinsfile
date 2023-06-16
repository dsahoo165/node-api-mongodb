pipeline {
    agent any

    stages {
         stage('Prepare') {
            steps {
                // Define the label for the Windows agent
                script {
                    agentLabel = ' LinuxNode-ProdServer'
                }
                sh 'pwd'
                sh "ls"
                stash name: 'build-artifacts', includes: '**/*', excludes: 'workspace**'                
            }
        }
        stage('Create Image') {
            agent {                
                label agentLabel
            }
            options {
                skipDefaultCheckout true
            }
            steps {
                unstash 'build-artifacts'
                sh "ls"
                sh 'pwd'
                
                 dir("workspace"){
                     sh """
		        ls
                        docker images
			docker build -t dsahoo165/node_api:${env.BUILD_NUMBER} .
			docker images
                        """
		 }
            }
        }
		
		stage('Run Image') {
            agent {                
                label agentLabel
            }
            options {
                skipDefaultCheckout true
            }
            steps {               
                
                 dir("workspace"){
                     sh """
			docker ps                 
			docker-compose down

			export IMAGE=dsahoo165/node_api
			export TAG=${env.BUILD_NUMBER}
			export PORT_TO_RUN=8081
			docker-compose up -d

			docker ps
                	"""
                 }
            }
        }
    }
}
