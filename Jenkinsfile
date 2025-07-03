pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    environment {
        ARTIFACTORY_REPO = 'inventory-app-release'
        ARTIFACTORY_DOMAIN = 'https://trial9pgutd.jfrog.io/artifactory'
        CREDS = credentials('jfrog-creds')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ubeaws/inventory-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Package Artifact') {
            steps {
                sh 'zip -r inventory-app-${BUILD_NUMBER}.zip *'
            }
        }

        stage('Upload Artifact to JFrog') {
            steps {
                sh """
                curl -u ${CREDS_USR}:${CREDS_PSW} -T inventory-app-${BUILD_NUMBER}.zip \
                ${ARTIFACTORY_DOMAIN}/${ARTIFACTORY_REPO}/inventory-app-${BUILD_NUMBER}.zip
                """
            }
        }

        stage('Notify') {
            steps {
                echo "✅ Build #${BUILD_NUMBER} uploaded to JFrog Artifactory."
            }
        }
    }
}

