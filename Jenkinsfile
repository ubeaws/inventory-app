pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://ubeaws@github.com/ubeaws/inventory-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Basic Test') {
            steps {
                sh 'node app.js & sleep 5'
                sh 'curl -I http://localhost:3000'
            }
        }

        stage('Success') {
            steps {
                echo '✅ Build and test successful!'
            }
        }
    }
}
