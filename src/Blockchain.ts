import Block from "./Block";
import "./BlockData";

class Blockchain {
    private readonly chain: Block[] = [];

    private get latestBlock(): Block {
        return this.chain[this.chain.length - 1 ]
    }

    constructor() {
        const data: BlockData.Data = {
            name: "Genesis Block"
        };
        this.chain.push(new Block(0, '0', Date.now(), data));
    }

    addBlock(data: BlockData.Data): void {
        const block = new Block(
            this.latestBlock.index + 1,
            this.latestBlock.hash,
            Date.now(),
            data
        );
        this.chain.push(block);
    }
}

export default Blockchain;