const elasticlunr = require('elasticlunr');

// インデックス構築
const index = elasticlunr(function () {
    this.addField('title');
    this.addField('body');
    this.setRef('id');
});

// ドキュメント追加
index.addDoc({
    "id": 1,
    "title": "America English",
    "body": "baseball family"
});
index.addDoc({
    "id": 2,
    "title": "Canada guitar",
    "body": "desk hair"
});

// 検索実行
const r = index.search("America English", {
    fields: {
        title: {boost: 1, bool: 'AND'},
        body: {boost: 1},
    },
    bool: 'OR' // "America" "Canada"の2単語でOR検索します。（boolオプションを省略した場合もOR検索になります
});

console.log(r);
// 出力： [ { ref: '1', score: 0.35355339059327373 },
//          { ref: '2', score: 0.35355339059327373 } ]

// 検索実行
const r2 = index.search("America Canada", {
    fields: {
        title: {boost: 1},
        body: {boost: 1},
    },
    bool: 'AND' // 'America" "Canada"の2単語でAND検索します。
});

console.log(r2);
// 出力： []