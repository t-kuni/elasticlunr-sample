const elasticlunr = require('elasticlunr');
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.jp.js')(elasticlunr);

// インデックス構築
const index = elasticlunr(function () {
    this.use(elasticlunr.jp);
    this.addField('body');
    this.setRef('id');
});

// ドキュメント追加
index.addDoc({
    "id": 1,
    "body": "カメラ　犬"
});
index.addDoc({
    "id": 2,
    "body": "本棚　猫"
});
index.addDoc({
    "id": 3,
    "body": "水　刺身"
});

// 部分一致を含めて検索
const r = index.search("本", {
    fields: {
        body: {boost: 1},
    },
    expand: true,
});

console.log(r);
// 出力： [ { ref: '3', score: 1.4054651081081644 },
//          { ref: '1', score: 0.1317623538851404 },
//          { ref: '2', score: 0.11712209234234702 } ]