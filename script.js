const sha256 = require("crypto-js/sha256");

// Define a basic Block structure
class Block {
  constructor(index, previousHash, timestamp, data, hash) {
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
  }

  calculateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

// Create a simple blockchain
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "0", new Date().toString(), "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

// Create a blockchain instance
const votingBlockchain = new Blockchain();

// Simulate a voting process
function vote(candidate) {
  const latestBlock = votingBlockchain.getLatestBlock();
  const newIndex = latestBlock.index + 1;
  const newTimestamp = new Date().toString();
  const newBlockData = { candidate, timestamp: newTimestamp };
  const newHash = sha256(
    newIndex + latestBlock.hash + newTimestamp + JSON.stringify(newBlockData)
  ).toString();

  const newBlock = new Block(
    newIndex,
    latestBlock.hash,
    newTimestamp,
    newBlockData,
    newHash
  );
  votingBlockchain.addBlock(newBlock);

  console.log(`Vote for ${candidate} recorded in Block #${newIndex}`);
}

// Simulate voting
vote("Candidate A");
vote("Candidate B");
vote("Candidate A");

// Display the blockchain
console.log(JSON.stringify(votingBlockchain, null, 2));
