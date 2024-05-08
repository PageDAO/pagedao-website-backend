import express from 'express'; 
import SecretDocumentClient from './secretdocumentclient';
import { getConfig, Config } from './config/config';
import { NetworkEnum } from './config/types';
import fs from 'fs';
import path from 'path';

// Function to read a file from the local filesystem
function readFileFromLocalFileSystem(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.resolve(__dirname, filePath), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Usage
readFileFromLocalFileSystem('package.json')
  .then(data => console.log(data.toString()))
  .catch(err => console.error(err));

// use wagmi with a polygon funded account loaded from private key


//todo: generate a typescript express.js server that has get and post routes for 1) store an encrypted ipfs file and 2) retrieve an encrypted ipfs file
const app = express();
const port = 3000;
const config = getConfig(NetworkEnum.POLYGON);
const client = new SecretDocumentClient(config as any);

app.use(express.json());

// POST route for storing an encrypted IPFS file
app.post('/store', async (req, res) => {
  // Add your code to handle storing the encrypted IPFS file here
  const file = req.body.file;
  //todo: get the file from the local filesystem "package.json"

  storeFile(file);
});

// GET route for retrieving an encrypted IPFS file
app.get('/retrieve', (req, res) => {
  // Add your code to handle retrieving the encrypted IPFS file here
  res.send('File retrieved successfully');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function storeFile(file: File) {
  // Add your code to store an encrypted IPFS file here
  try { 
    const tx = await client.storeDocument().fromFile(file);
    // tx = await walletClient?.writeContract({
    //   address: config.contracts.talentLayerId,
    //   abi: PolygonToSecret.abi,
    //   functionName: "send",
    //   args: [
    //     process.env.NEXT_PUBLIC_DESTINATION_CHAIN,
    //     config.contracts.polygonToSecret,
    //     values.file?.name,
    //   ],
    //   account: address,
    // });

    console.log(tx);
  } catch (error) {
    console.log(error);
  } finally {
    return('File stored successfully');
  }
}

async function retrieveFile() {
  try {

  } catch (error) {
    console.log(error);
  } finally {
    return('File retrieved successfully');
  }
}

//todo: add tests for the routes
//todo: add tests that output the config to the console and check contract connectivity using the contract from the config
