```javascript
// Importing necessary libraries and tools
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const Docker = require('dockerode');
const KubernetesClient = require('kubernetes-client').Client;
const Request = require('kubernetes-client/backends/request');

// Importing blockchain configuration
const blockchainConfig = require('./blockchain_config');

// Defining the Docker client
const docker = new Docker();

// Defining the Kubernetes client
const backend = new Request(Request.config.fromKubeconfig());
const k8sClient = new KubernetesClient({ backend });

// Development environment configuration for the project
class DevEnvironmentConfig {
    constructor() {
        this.dockerImages = {
            QuantumUnityFramework: this.buildDockerImage(blockchainConfig.QUANTUM_UNITY_FRAMEWORK_CHAIN_ID),
            GlobalDigitalCurrencyNetwork: this.buildDockerImage(blockchainConfig.GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID),
            Contudo: this.buildDockerImage(blockchainConfig.CONTUDO_CHAIN_ID)
        };

        this.kubernetesDeployments = {
            QuantumUnityFramework: this.deployKubernetes(blockchainConfig.QUANTUM_UNITY_FRAMEWORK_CHAIN_ID),
            GlobalDigitalCurrencyNetwork: this.deployKubernetes(blockchainConfig.GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID),
            Contudo: this.deployKubernetes(blockchainConfig.CONTUDO_CHAIN_ID)
        };
    }

    // Function to build a Docker image
    buildDockerImage(chainId) {
        // Building the Docker image
        docker.buildImage({
            context: path.resolve(__dirname),
            src: ['Dockerfile']
        }, {
            t: `blockchain_${chainId}`
        }, function(error, stream) {
            if (error) {
                console.error(error);
            } else {
                docker.modem.followProgress(stream, function(error, output) {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(`Docker image for Chain ID ${chainId} built successfully.`);
                    }
                });
            }
        });
    }

    // Function to deploy a Kubernetes deployment
    deployKubernetes(chainId) {
        // Reading the Kubernetes configuration file
        const kubernetesConfig = fs.readFileSync(path.resolve(__dirname, './kubernetes_config.yaml'), 'utf8');

        // Replacing the chain ID in the Kubernetes configuration file
        const replacedKubernetesConfig = kubernetesConfig.replace(/CHAIN_ID/g, chainId);

        // Parsing the Kubernetes configuration file
        const parsedKubernetesConfig = JSON.parse(replacedKubernetesConfig);

        // Deploying the Kubernetes deployment
        k8sClient.apis.apps.v1.namespaces('default').deployments.post({
            body: parsedKubernetesConfig
        }, function(error, response) {
            if (error) {
                console.error(error);
            } else {
                console.log(`Kubernetes deployment for Chain ID ${chainId} deployed successfully.`);
            }
        });
    }
}

// Exporting the development environment configuration
module.exports = new DevEnvironmentConfig();
```
