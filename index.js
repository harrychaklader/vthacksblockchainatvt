const { Client, PrivateKey, AccountCreateTransaction, Hbar, ContractCreateFlow } = require("@hashgraph/sdk");

require("dotenv").config();

async function main() {

    //Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null ||
        myPrivateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    let contract = require("./RentingContract.json")
    const bytecode = contract.bytecode.object;
    const fileCreateTx = new ContractCreateFlow().setBytecode(bytecode).setGas(100000);
    const submitTx = await fileCreateTx.execute(client);
    const fileReceipt = await submitTx.getReceipt(client);
    // const bytecodeFileId = fileReceipt.fileId;
    console.log(fileReceipt);

    console.log('success')
    client.close();
}
main();