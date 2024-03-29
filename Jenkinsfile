pipeline {
agent any

    stages {
        stage('Create Image') {            
            steps {
	                sh """
	                pwd
	                ls
	                docker images
	                docker build -t dsahoo165/node_api_mongo:${env.BUILD_NUMBER} .
	                docker images
	                """
			    stash name: 'build-artifacts', includes: '**/*', excludes: 'workspace**' 
			withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {                
	                     sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'                    
	                     // #Commented to avoid un-necessary push
	                    // sh "docker push dsahoo165/node_api_mongo:${env.BUILD_NUMBER}"
	
	                }
		
            }            
        }
        stage('Run Image') {
            steps {  
	dir("workspace"){		
                sh """
                docker ps   
		
                docker compose down
                
                export IMAGE=dsahoo165/node_api_mongo
                export TAG=${env.BUILD_NUMBER}
                export PORT_TO_RUN=8081
                docker compose up -d

                docker ps
                """
            }
	    }
        }
	    stage('setting up agent') {
            steps {
                // Define the label for the Windows agent
                script {
                    agentLabel = 'loadbalancer'
                }
                sh 'pwd'
                sh "ls"
                sh 'docker images ls'              
            }
        }
	 stage('Run at LB_Server') {
            agent {                
                label agentLabel
            }
            options {
                skipDefaultCheckout true
            }
            steps {                
                 dir("workspace"){
			 unstash 'build-artifacts'
			 sh 'ls'
			 sh 'pwd'
                           sh """
			sudo docker ps
                     
		      	sudo IMAGE=dsahoo165/node_api_mongo TAG=${env.BUILD_NUMBER} PORT_TO_RUN=8081 docker compose down
	 		sudo IMAGE=dsahoo165/node_api_mongo TAG=${env.BUILD_NUMBER} PORT_TO_RUN=8081 docker compose up -d
	               
			sudo docker ps
                	"""
		 }
            }
        }

    }

}
