const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const viem = require('ethers');

  
const app = express();
const PORT = 5000;
  
app.get('/users/:alias', async (req, res)=>{
    res.status(200);
    axios.defaults.headers.get['Content-Type'] = 'application/json';
    var query= {
        "filter": {
            "filterColumn": "alias",
            "filterValue": req.params.alias
        }
    };
    console.log(encodeURI(JSON.stringify(query)));
    const response = await axios.get(`https://app.dynamicauth.com/api/v0/environments/74bd1bf3-bdd5-43ba-8ea3-e744ebfaaaf2/users?filter=${encodeURIComponent(JSON.stringify(query.filter))}`, {
        headers: {
            Authorization: `Bearer ${process.env.DYNAMIC_API_KEY}`
        }
    });
    if (response.data.users.length === 0) {
        res.status(404).send('User not found');
        return;
    }
    //create some dummy data to insert into the metadata field
    response.data.users[0].metadata = {
          "userId": "c25123ec-62aa-4534-8153-8a68382c3df2",
          "alias": "inde",
          "bio": "This is a sample bio.",
          "profileImage": "https://api.dicebear.com/8.x/notionists/svg?seed="+req.params.alias,
          "project": [{
            "name": "Sample Project",
            "description": "This is a sample project description.",
            "pages": "100",
            "type": "PDF",
            "tags": ["sample", "dummy", "data"],
            "creationDate": "2023-05-15T10:30:00Z",
            "author": [
              {"AuthorName": "John Doe"},
              {"AuthorName": "Jane Smith"}
            ],
            "release": [
              {
                "chain": "Ethereum",
                "chainid": "1",
                "format": "ERC721",
                "contractaddress": "0x1234567890123456789012345678901234567890",
                "tokenid": 123
              },
              {
                "chain": "Ethereum",
                "chainid": "1",
                "format": "ERC1155",
                "contractaddress": "0x0987654321098765432109876543210987654321",
                "tokenid": 456
              }
            ]
          }]
        };
      
    res.send(JSON.stringify(response.data.users[0].metadata));
});

app.post('/items', async (req, res)=>{
  //todo: I need to use viem to load an ethereum wallet from private key and create a transaction to send the shared key to the axelar gateway contract
  try {
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
    const wallet = new ethers.Wallet(process.env.EVM_PRIVATE_KEY, provider);

    // Generate shared key here
    const sharedKey = 'YOUR_SHARED_KEY';

    const transaction = {
        to: 'AXELAR_GATEWAY_CONTRACT_ADDRESS',
        data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(sharedKey))
    };

    const signedTransaction = await wallet.signTransaction(transaction);
    const tx = await provider.sendTransaction(signedTransaction);

    res.status(200).send(JSON.stringify(tx));
} catch (error) {
    res.status(500).send({ message: 'Error processing transaction' });
}
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running and App is listening on port "+ PORT);
    else 
        console.log("Error occurred, server can't start", error);
    }
);