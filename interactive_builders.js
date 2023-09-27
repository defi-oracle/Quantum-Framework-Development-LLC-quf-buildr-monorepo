```javascript
// Importing necessary libraries and tools
const readline = require('readline');
const axios = require('axios');

// Importing ControlPanel
const ControlPanel = require('./control_panel');

// Creating an instance of ControlPanel
const controlPanel = new ControlPanel();

// Interactive builders for conversational interactions
class InteractiveBuilders {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Function to deploy a smart contract
    deploySmartContract() {
        this.rl.question('Enter the blockchain: ', (blockchain) => {
            this.rl.question('Enter the contract: ', (contract) => {
                this.rl.question('Enter the account: ', (account) => {
                    this.rl.question('Enter the private key: ', (privateKey) => {
                        controlPanel.deploySmartContract(blockchain, contract, account, privateKey)
                            .then(receipt => {
                                console.log('Receipt: ', receipt);
                                this.rl.close();
                            })
                            .catch(error => {
                                console.error('Error: ', error);
                                this.rl.close();
                            });
                    });
                });
            });
        });
    }

    // Function to interact with a smart contract
    interactWithSmartContract() {
        this.rl.question('Enter the blockchain: ', (blockchain) => {
            this.rl.question('Enter the contract address: ', (contractAddress) => {
                this.rl.question('Enter the contract: ', (contract) => {
                    this.rl.question('Enter the function name: ', (functionName) => {
                        this.rl.question('Enter the params (comma separated): ', (params) => {
                            this.rl.question('Enter the account: ', (account) => {
                                this.rl.question('Enter the private key: ', (privateKey) => {
                                    const paramsArray = params.split(',').map(param => param.trim());
                                    controlPanel.interactWithSmartContract(blockchain, contractAddress, contract, functionName, paramsArray, account, privateKey)
                                        .then(result => {
                                            console.log('Result: ', result);
                                            this.rl.close();
                                        })
                                        .catch(error => {
                                            console.error('Error: ', error);
                                            this.rl.close();
                                        });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}

// Creating an instance of InteractiveBuilders
const interactiveBuilders = new InteractiveBuilders();

// Starting the interactive builders
interactiveBuilders.deploySmartContract();
interactiveBuilders.interactWithSmartContract();
```
