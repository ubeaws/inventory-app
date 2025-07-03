pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    environment {
        ARTIFACTORY_REPO = 'inventory-app-release'
        ARTIFACTORY_DOMAIN = 'https://trial9pgutd.jfrog.io/artifactory'
        CREDS = credentials('jfrog-creds')  // Set this ID in Jenkins credentials
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ubeaws/inventory-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Package App') {
            steps {
                sh 'zip -r inventory-app-${BUILD_NUMBER}.zip *'
            }
        }

        stage('Upload to JFrog') {
            steps {
                sh """
                curl -u ${CREDS_USR}:${CREDS_PSW} -T inventory-app-${BUILD_NUMBER}.zip \\
                ${ARTIFACTORY_DOMAIN}/${ARTIFACTORY_REPO}/inventory-app-${BUILD_NUMBER}.zip
                """
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no -i /opt/keys/jenkins_server_new.pem ubuntu@44.205.0.98 << 'EOF'
                    sudo apt update
                    sudo apt install unzip curl -y
                    cd /home/ubuntu
                    curl -u ${CREDS_USR}:${CREDS_PSW} -O ${ARTIFACTORY_DOMAIN}/${ARTIFACTORY_REPO}/inventory-app-${BUILD_NUMBER}.zip
                    unzip -o inventory-app-${BUILD_NUMBER}.zip -d inventory-app
                    cd inventory-app
                    npm install
                    nohup node app.js > app.log 2>&1 &
                    echo "✅ App deployed and running on EC2"
                EOF
                """
            }
        }
    }
}

