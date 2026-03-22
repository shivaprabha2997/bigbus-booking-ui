pipeline {

    agent any

    environment {
        IMAGE_NAME = "shivadocker2997/bigbus-app"
        CONTAINER_NAME = "bigbus-container"
        DOCKER_CREDENTIALS_ID = "Docker_CRED"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'shivaprabha', url: 'https://github.com/shivaprabha2997/bigbus-booking-ui.git'
            }
        }

        stage('Validate') {
            steps {
                sh 'mvn validate'
            }
        }

        stage('Compile') {
            steps {
                sh 'mvn compile'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Package') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "${DOCKER_CREDENTIALS_ID}",
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push $IMAGE_NAME'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d -p 8081:8080 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'target/*.war', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Build + Docker Push Successful 🚀'
        }
        failure {
            echo 'Build Failed ❌'
        }
        always {
            echo 'Pipeline Completed'
        }
    }
}
