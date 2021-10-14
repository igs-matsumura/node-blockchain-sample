# ブロックチェーンサンプル~node版

## 実行環境(※2021/10/8現在)
yarn: 1.22.10  
nvm: 0.37.0  
node: 14.18.0  


## 構成
```
root/
  ├ dist/
  ├ node_modules/
  ├ src/
  │  ├ Block.ts(ブロック本体)
  │  ├ Blockchain.ts(ブロックチェーン化を行う)
  │  ├ BlockData.ts(ブロックデータの型定義)
  │  ├ index.ts(実行部分)
  ├ .nvmrc(バージョン切り替え用)
  ├ package.json
  ├ tsconfig.json
  └ yarn.lock
```

## コード概要
### `Block.ts`
ブロックチェーンで繋ぐブロックを生成する.  
PoW(Proof of Work: "誰でもブロックを追加できる=改竄できる可能性"を防ぐための方法)としてnonceを条件として用いる.  
今回の場合, データの末尾にnonce値を追加してハッシュ化した場合に, ハッシュの先頭が`00000`で始まることを条件としている.  
```
hash.startsWith("00000")
```

### `BlockData.ts`
ブロック内データの型定義.  
※型定義ファイル`.d.ts`にするのがベターかもしれない...

### `Blockchain.ts`
Block.tsで生成されたブロックを繋ぐ(チェーンする).  
1つ前のブロックのハッシュ値(`previousHash`)と現在のブロックのハッシュ値(`Hash`)で繋がっている.

### `index.ts`
サンプル実行部分(コンパイル後の`index.js`を実行する).  
※今回は`Blockchain`が呼ばれた地点で先頭のブロックが生成される.  
`.addBlock()`にてブロックを追加する.  


## 実行
1. `yarn` にて必要なモジュールをインストール.  
2. `yarn tsc` にてjsファイルにコンパイルする.  
3. `node ./dist/index.js`にて実行.

## 実行結果
```
ブロックチェーンを生成します.
1番目のブロックをマイニング...
2番目のブロックをマイニング...
{
  "chain": [
    {
      "index": 0,
      "previousHash": "0",
      "timestamp": 1633669396425,
      "data": {
        "name": "Genesis Block"
      },
      "nonce": 22524,
      "hash": "000008446982d1488a9e2bc5abcdee9bb2e87f07774a6b09a90d8ef57a64bb94"
    },
    {
      "index": 1,
      "previousHash": "000008446982d1488a9e2bc5abcdee9bb2e87f07774a6b09a90d8ef57a64bb94",
      "timestamp": 1633669396464,
      "data": {
        "name": "First Block"
      },
      "nonce": 155488,
      "hash": "0000072dff4948f065348860acaf8b738b37f2ddc67acd91d4ee810ce43be3a3"
    },
    {
      "index": 2,
      "previousHash": "0000072dff4948f065348860acaf8b738b37f2ddc67acd91d4ee810ce43be3a3",
      "timestamp": 1633669396623,
      "data": {
        "name": "Second Block"
      },
      "nonce": 310762,
      "hash": "000003409d1772f9ea3fbbab324f9474dcce0325d5c49a2dd846ef197d68983e"
    }
  ]
}
```

## 参考
[【TypeScript】簡単なブロックチェーンのnodejsアプリを作成](https://marsquai.com/745ca65e-e38b-4a8e-8d59-55421be50f7e/1f67fdab-8e00-4ae1-a1b9-077d5a30a5d6/c2b1e311-8654-41db-a4d1-4c419cae7830/#h3-9d8bb66f-e175-47ef-a3f9-e10ac5631a6d-98644eab-1789-447d-a238-27422e67a0d6)  
※記事の投稿日: 2020年11月18日