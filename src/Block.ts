import * as crypto from "crypto";
import "./BlockData";

class Block {
    readonly nonce: number;
    readonly hash: string;

    /**
     * コンストラクタ
     * @param index {number}
     * @param previousHash {string}
     * @param timestamp {number}
     * @param data {object}
     */
    constructor(
        readonly index: number,
        readonly previousHash: string,
        readonly timestamp: number,
        readonly data: BlockData.Data,
    ) {
        const {nonce, hash} = this.mine();
        this.nonce = nonce;
        this.hash = hash;
    }

    /**
     * ハッシュ値を計算
     * @param nonce 
     * @returns 
     */
    private calculateHash(nonce: number): string {
        const dataConcated = this.index + this.previousHash + this.timestamp + this.data + nonce;
        return crypto.createHash('sha256').update(dataConcated).digest('hex');
    }

    /**
     * 正常なnonce値が見つかるまで再起的にハッシュ値を計算
     * @returns 
     */
    private mine(): {nonce: number, hash: string} {
        let hash: string;
        let nonce: number = 0;

        do {
            hash = this.calculateHash(++nonce)
        } while (hash.startsWith("00000") === false)

        return {nonce, hash};
    }

}

export default Block;