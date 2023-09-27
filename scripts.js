```javascript
// Importing necessary libraries and tools
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Importing blockchain configuration
const blockchainConfig = require('./blockchain_config');

// Importing API tooling
const APITooling = require('./api_tooling');

// Importing control panel
const controlPanel = require('./control_panel');

// Importing interactive builders
const interactiveBuilders = require('./interactive_builders');

// Function to execute a shell command
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

// Function to compile and deploy smart contracts
async function compileAndDeployContracts() {
    // Compiling contracts
    console.log('Compiling contracts...');
    await executeCommand('solc --bin --abi -o ./build ./smart_contract_templates.sol');

    // Deploying contracts
    console.log('Deploying contracts...');
    await executeCommand('truffle migrate --reset');
}

// Function to start the control panel
async function startControlPanel() {
    console.log('Starting control panel...');
    controlPanel.start();
}

// Function to start the interactive builders
async function startInteractiveBuilders() {
    console.log('Starting interactive builders...');
    interactiveBuilders.start();
}

// Function to initialize the blockchain
async function initializeBlockchain() {
    console.log('Initializing blockchain...');
    await blockchainConfig.createBlockchain(blockchainConfig.QUANTUM_UNITY_FRAMEWORK_CHAIN_ID);
    await blockchainConfig.createBlockchain(blockchainConfig.GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID);
    await blockchainConfig.createBlockchain(blockchainConfig.CONTUDO_CHAIN_ID);
}

// Function to initialize the API tooling
async function initializeAPITooling() {
    console.log('Initializing API tooling...');
    const apiTooling = new APITooling();
    await apiTooling.initialize();
}

// Main function to run all scripts
async function main() {
    await initializeBlockchain();
    await compileAndDeployContracts();
    await initializeAPITooling();
    await startControlPanel();
    await startInteractiveBuilders();
}

// Running the main function
main().catch(console.error);
```
