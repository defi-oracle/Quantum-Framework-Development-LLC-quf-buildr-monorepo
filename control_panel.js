```javascript
// Importing necessary libraries and tools
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const APITooling = require('./api_tooling');

// Importing blockchain configuration
const blockchainConfig = require('./blockchain_config');

// Creating an instance of Express
const app = express();

// Using necessary middleware
app.use(bodyParser.json());
app.use(cors());

// Creating an instance of APITooling
const apiTooling = new APITooling();

// Control Panel for interacting with the blockchains
class ControlPanel {
    constructor() {
        this.blockchains = {
            QuantumUnityFramework: blockchainConfig.QUANTUM_UNITY_FRAMEWORK_CHAIN_ID,
            GlobalDigitalCurrencyNetwork: blockchainConfig.GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID,
            Contudo: blockchainConfig.CONTUDO_CHAIN_ID
        };
    }

    // Function to deploy a smart contract
    async deploySmartContract(req, res) {
        const { blockchain, contract, account, privateKey } = req.body;

        try {
            const chainId = this.blockchains[blockchain];
            const contractInstance = apiTooling.contracts[contract];

            const receipt = await apiTooling.deployContract(contractInstance, account, privateKey, chainId);
            res.json({ receipt });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }

    // Function to interact with a smart contract
    async interactWithSmartContract(req, res) {
        const { blockchain, contractAddress, contract, functionName, params, account, privateKey } = req.body;

        try {
            const chainId = this.blockchains[blockchain];
            const contractInstance = apiTooling.contracts[contract];

            const result = await apiTooling.interactWithContract(contractAddress, contractInstance.abi, functionName, params, account, privateKey, chainId);
            res.json({ result });
        } catch (error) {
            res.status(500).json({ error: error.toString() });
        }
    }
}

// Creating an instance of ControlPanel
const controlPanel = new ControlPanel();

// Setting up routes
app.post('/deploy', controlPanel.deploySmartContract.bind(controlPanel));
app.post('/interact', controlPanel.interactWithSmartContract.bind(controlPanel));

// Starting the server
app.listen(3000, () => console.log('Control Panel is running on port 3000'));
```
