pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
              git branch: 'main', credentialsId: 'shivaprabha', url: 'https://github.com/shivaprabha2997/bigbus-booking-ui.git'
            }
        }

        stage('Validate') {
            steps {
                echo 'Validating Maven project'
                sh 'mvn validate'
            }
        }

        stage('Compile') {
            steps {
                echo 'Compiling project'
                sh 'mvn compile'
            }
        }

        stage('Test') {
            steps {
                echo 'Running unit tests'
                sh 'mvn test'
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application'
                sh 'mvn package'
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo 'Archiving WAR file'
                archiveArtifacts artifacts: 'target/*.war', fingerprint: true
            }
        }

    }

    post {

        success {
            echo 'Build Successful'
        }

        failure {
            echo 'Build Failed'
        }

        always {
            echo 'Pipeline Completed'
        }

    }

}
