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
                        sh 'npm install'
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
                        sleep(time: 10, unit: 'SECONDS')
                    }
                }
            }
        }
      
        stage('Run Cypress Tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        ansiColor('xterm') {
                            dir('fashiontrend') {
                                sh 'npm run cy:run'
                            }
                        }
                    }
                }
            }
        }

        stage('Run Selenium Tests') {
            steps {
                script {
                    dir('fashiontrend') {
                        // Ejemplo de ejecución de tests Selenium con Node.js y WebDriver
                        sh 'npm run selenium -- --headless --no-sandbox --disable-dev-shm-usage'
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
                // Send notification to Slack
                slackSend channel: 'jenkins',
                          message: "Build Status: ${currentBuild.currentResult} in ${env.JOB_NAME} ${env.BUILD_NUMBER}. See details at ${BUILD_URL}"
            }
        }
        
        success {
            echo 'Pipeline succeeded!'
        }
        
        failure {
                echo "Pipeline failed at stage(s): ${failedStages.join(', ')}"
        }
        
    }
}
