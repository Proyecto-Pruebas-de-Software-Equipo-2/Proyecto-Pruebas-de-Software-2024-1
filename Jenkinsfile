pipeline {
    agent any
    
    environment {
        // Define Node.js version and npm configuration
        NODEJS_VERSION = '10.7.0'  // Adjust to your Node.js version installed in Jenkins
        NODEJS_HOME = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Localhost') {
            steps {
                sh 'npm run dev &'
                sleep(time: 30, unit: 'SECONDS')  // Wait for the application to start
            }
        }
      
        stage('Run Tests') {
            steps {
                sh 'npm run cy:run'
            }
        }
    }

        stage('Send Build Info to Jira') {
            steps {
                script {
                    // Example of sending build information to Jira using jiraSendBuildInfo
                    jiraSendBuildInfo branch: '**', site: 'usm-team-2.atlassian.net'
                }
            }
        }
        
        stage('Send Notification to Slack') {
            steps {
                script {
                    // Example of sending a notification to Slack using slackSend
                    slackSend botUser: true, channel: 'jenkins', tokenCredentialId: 'slack-bot-token'
                }
            }
        }
    
    post {
        success {
            echo 'Pipeline succeeded! Insert any success actions here.'
        }
        failure {
            echo 'Pipeline failed! Insert any failure actions here.'
        }
    }
}
