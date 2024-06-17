pipeline {
    agent any
    
    environment {
        NODEJS_VERSION = '10.7.0'
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
                script {
                    dir('fashiontrend') {
                        sh 'npm cache clean --force'
                        sh 'npm install -f'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    dir('fashiontrend') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy to Localhost') {
            steps {
                script {
                    dir('fashiontrend') {
                        sh 'npm run dev &'
                        sleep(time: 30, unit: 'SECONDS')
                    }
                }
            }
        }
      
        stage('Run Tests') {
            steps {
                script {
                    dir('fashiontrend') {
                        sh 'npm run cy:run'
                    }
                }
            }
        }
        
        stage('Send Build Info to Jira') {
            steps {
                script {
                    dir('fashiontrend') {
                        jiraSendBuildInfo branch: '**', site: 'usm-team-2.atlassian.net'
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                def failedStage = null
                currentBuild.stages.each { stage ->
                    if (stage.status == 'FAILED') {
                        failedStage = stage.name
                    }
                }
                
                // Send notification to Slack
                def message = "Build Status: ${currentBuild.currentResult} in ${env.JOB_NAME} ${env.BUILD_NUMBER}. See details at ${BUILD_URL}"
                if (failedStage) {
                    message += ". Failed at stage: ${failedStage}"
                }
                slackSend channel: 'jenkins', message: message
            }
        }
        
        success {
            echo 'Pipeline succeeded!'
        }
        
        failure {
            script {
                def failedStage = null
                currentBuild.stages.each { stage ->
                    if (stage.status == 'FAILED') {
                        failedStage = stage.name
                    }
                }
                echo "Pipeline failed at stage: ${failedStage}"
            }
        }
    }
}

