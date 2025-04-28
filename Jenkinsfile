pipeline {
    agent any

    environment {
            SONAR_SCANNER_HOME = tool 'SonarScanner' 
        }

    stages {
        stage('Checkout SCM') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ShadyYasser2003/DevOps-Portfolio-Template-with-Apache-HTTP-Server.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {

                            withSonarQubeEnv('SonarQube') {
                                sh '''
                                    ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                                    -Dsonar.projectKey=profile \
                                    -Dsonar.sources=. \
                                '''
                            }
                        }
                    }
        }
        stage('Build Image') {
            steps {
                sh 'docker build -t shady203/portfolio-template:$GIT_COMMIT ./Portfolio-Template '
            }
        }

        stage('Trivy Vulnerability Scanner') {
            steps {
                sh '''
                    trivy image shady203/portfolio-template:$GIT_COMMIT \
                        --severity LOW,MEDIUM,HIGH \
                        --exit-code 0 \
                        --quiet \
                        --format json -o trivy-image-MEDIUM-results.json

                    trivy image shady203/portfolio-template:$GIT_COMMIT \
                        --severity CRITICAL \
                        --exit-code 1 \
                        --quiet \
                        --format json -o trivy-image-CRITICAL-results.json
                '''
            }
            post {
                always {
                    sh '''
                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-MEDIUM-results.html trivy-image-MEDIUM-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output trivy-image-CRITICAL-results.html trivy-image-CRITICAL-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output trivy-image-MEDIUM-results.xml trivy-image-MEDIUM-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output trivy-image-CRITICAL-results.xml trivy-image-CRITICAL-results.json
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                withDockerRegistry(credentialsId: 'DockerHub-credentials', url: '') {
                    sh 'docker push shady203/portfolio-template:$GIT_COMMIT'
                }
            }
        }

        stage('Deploy to k8s Minikube') {
            steps {
                script {
                    sh '''
                        export KUBECONFIG=$HOME/.kube/config
                        minikube update-context
                        sed -i "s|IMAGE_TAG|$GIT_COMMIT|g" deployment.yaml
                        kubectl apply -f deployment.yaml --validate=false
                        kubectl apply -f services.yaml --validate=false
                    '''
                }
            }
        }

        stage('Test NodePort Access') {
            steps {
                script {
                    sh '''
                        echo "Getting Minikube IP..."
                        MINIKUBE_IP=$(minikube ip)

                        echo "Testing access to the application..."
                        curl --fail http://$MINIKUBE_IP:30010 || (echo "❌ Failed to reach the application!" && exit 1)

                        echo "✅ Application is reachable!"
                    '''
                }
            }
        }
    }
}