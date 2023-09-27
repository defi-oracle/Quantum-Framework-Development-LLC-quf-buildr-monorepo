```javascript
// Importing necessary libraries and tools
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Importing blockchain configuration
const blockchainConfig = require('./blockchain_config');

// Security configuration for the project
class SecurityConfig {
    constructor() {
        this.keys = {
            QuantumUnityFramework: this.generateKeys(blockchainConfig.QUANTUM_UNITY_FRAMEWORK_CHAIN_ID),
            GlobalDigitalCurrencyNetwork: this.generateKeys(blockchainConfig.GLOBAL_DIGITAL_CURRENCY_NETWORK_CHAIN_ID),
            Contudo: this.generateKeys(blockchainConfig.CONTUDO_CHAIN_ID)
        };
    }

    // Function to generate a new pair of keys
    generateKeys(chainId) {
        // Generating a new pair of keys
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: ''
            }
        });

        // Writing the keys to files
        fs.writeFileSync(path.resolve(__dirname, `./keys/${chainId}_private.pem`), privateKey);
        fs.writeFileSync(path.resolve(__dirname, `./keys/${chainId}_public.pem`), publicKey);

        console.log(`Keys for Chain ID ${chainId} generated successfully.`);
        return { privateKey, publicKey };
    }
}

// Exporting the security configuration
module.exports = new SecurityConfig();
```
