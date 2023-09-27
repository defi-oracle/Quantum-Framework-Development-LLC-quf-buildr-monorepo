```javascript
// Importing necessary libraries and modules
const Web3 = require('web3');
const Besu = require('besu-js');

// Defining the chain IDs
const QUANTUM_UNITY_FRAMEWORK_CHAIN_ID = '0x0';
const GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID = '0x9';
const CONTUDO_CHAIN_ID = '0x8A';

// Defining the provider
const provider = new Web3.providers.HttpProvider('http://localhost:8545');

// Creating an instance of Web3
const web3 = new Web3(provider);

// Creating an instance of Besu
const besu = new Besu(provider);

// Function to create a new blockchain
async function createBlockchain(chainId) {
    try {
        // Creating a new blockchain
        const result = await besu.blockchain.create({
            chainId: chainId,
            networkId: chainId,
            genesis: {
                timestamp: Math.round((new Date()).getTime() / 1000),
                gasLimit: 5000,
                difficulty: 1,
                alloc: {},
                config: {
                    chainId: chainId,
                    homesteadBlock: 0,
                    eip150Block: 0,
                    eip155Block: 0,
                    eip158Block: 0,
                    byzantiumBlock: 0,
                    constantinopleBlock: 0,
                    petersburgBlock: 0,
                    istanbulBlock: 0,
                    muirGlacierBlock: 0,
                    berlinBlock: 0,
                    londonBlock: 0
                }
            }
        });

        console.log(`Blockchain with Chain ID ${chainId} created successfully.`);
        return result;
    } catch (error) {
        console.error(`Error creating blockchain with Chain ID ${chainId}: `, error);
    }
}

// Function to replace the existing blockchain
async function replaceExistingBlockchain() {
    try {
        // Creating the Quantum Unity Framework blockchain
        await createBlockchain(QUANTUM_UNITY_FRAMEWORK_CHAIN_ID);

        // Creating the Global Digital Currency Network blockchain
        await createBlockchain(GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID);

        // Creating the Contudo blockchain
        await createBlockchain(CONTUDO_CHAIN_ID);

        console.log('All blockchains created successfully.');
    } catch (error) {
        console.error('Error replacing the existing blockchain: ', error);
    }
}

// Replacing the existing blockchain
replaceExistingBlockchain();
```
