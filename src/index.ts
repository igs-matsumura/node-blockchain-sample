import Blockchain from "./Blockchain";

console.log("ブロックチェーンを生成します.");
const blockchain = new Blockchain();

console.log("1番目のブロックをマイニング...");
blockchain.addBlock({
    name: "First Block"
});

console.log("2番目のブロックをマイニング...");
blockchain.addBlock({
    name: "Second Block"
});

console.log(JSON.stringify(blockchain, null, 2));