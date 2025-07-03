pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    environment {
        ARTIFACTORY_REPO = 'inventory-app-release'
        ARTIFACTORY_DOMAIN = 'https://trial9pgutd.jfrog.io/artifactory'
        CREDS = credentials('jfrog-creds')  // Jenkins Credentials ID
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
        script {
            def remoteScript = """
                #!/bin/bash
                set -e
                cd ~

                # Install Node.js & npm (LTS 18)
                curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                sudo apt-get install -y nodejs

                # Download artifact
                curl -u ${CREDS_USR}:${CREDS_PSW} -O ${ARTIFACTORY_DOMAIN}/${ARTIFACTORY_REPO}/inventory-app-${BUILD_NUMBER}.zip

                # Unzip & setup app
                rm -rf inventory-app
                unzip -o inventory-app-${BUILD_NUMBER}.zip
                cd inventory-app-main || cd *inventory*

                npm install
                nohup node app.js > app.log 2>&1 &
                echo "✅ App deployed and running on EC2"
            """

            writeFile file: 'deploy.sh', text: remoteScript
            sh 'chmod +x deploy.sh'
            sh 'scp -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/jenkins_server_new.pem deploy.sh ubuntu@44.205.0.98:/home/ubuntu/'
            sh 'ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/.ssh/jenkins_server_new.pem ubuntu@44.205.0.98 "chmod +x ~/deploy.sh && bash ~/deploy.sh"'
        }
    }
}

