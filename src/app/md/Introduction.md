### これは？
名前の通り、ダミーデータをInsertするSQL文を作成するツールです。
乱数やランダム文字列だけでなく、架空の人名や住所、電話番号などの **それっぽいデータ** を作ることが出来ます。
  
設定値や生成結果（テーブル定義等のDBに関連する情報）は一切サーバーに送信しておらず、  
全てクライアント側で処理を行っていますので、安心してお使いいただけると思います。
  
ご意見・ご要望は[Githubリポジトリ](https://github.com/sam-osamu/dummy-data-generator)のissueにて承ります。

### 使い方
下記のような書式に則って記述したJSONをテキストボックスに記述し、Generateボタンを押すと作成できます。  

<details>
<summary>... 設定値の説明とサンプルを展開 ...</summary>
<div>

* defaultCount  
必須。数値のみ許容。  
後述のtables内でcountが省かれた際に生成件数として使用される値。
* locale  
省略可。文字列のみ許容。  
ダミーデータのロケールを設定する。設定できるロケールは[Faker.jsのLocalization](https://github.com/marak/Faker.js/#localization)に準拠する。
* tables  
必須。配列のみ許容。
  * name  
  必須。文字列のみ許容。  
  テーブル名を設定する。
  * count  
  省略可。数値のみ許容。  
  テーブル単位での生成件数を調節できる。
  * columns  
  必須。配列のみ許容。  
    * name
    必須。文字列のみ許容。  
    カラム名を設定する。
    * autoIncrement  
    省略可。true/falseのみ設定可。
    オートインクリメントによるID自動採番を行うカラムかどうかを設定する。
    * fakeOrder  
    省略可。文字列または文字列の配列のみ許容。  
    [Faker.jsのAPI Methods](https://github.com/marak/Faker.js/#api-methods)に記載されているメソッドを[Faker.jsのFaker.fake()](https://github.com/marak/Faker.js/#fakerfake)の書式で表した文字列を設定する。  
    文字列配列にすることで複数設定可能。
    * foreignKey  
    省略可。  
    値が設定された場合、対象のテーブル・カラムに存在する値をランダムで生成値とする。  
    （外部キー制約に抵触しないようにする）
      * table
      必須。文字列のみ許容。  
      制約先のテーブル名を設定する。  
      ここに設定するテーブル名は、このtablesオブジェクトよりも前に定義されている  
      tablesオブジェクトである必要がある。  
      （ここの定義より後で出てきたtablesオブジェクトが持つテーブル名は使えない）
      * columns
      必須。文字列のみ許容。  
      制約先のカラム名を設定する。 制限事項は上記のtableと同様。

<br />

以下、サンプル。
```json
{
    "defaultCount": 30,
    "tables": [
        {
            "name": "employee_table",
            "count": 5,
            "columns": [
                {
                    "name": "id",
                    "autoIncrement": true
                },
                {
                    "name": "name",
                    "fakerOrder": "name.findName"
                },
                {
                    "name": "zip_code",
                    "fakerOrder": "address.zipCode"
                },
                {
                    "name": "address",
                    "fakerOrder": [
                        "address.state",
                        "address.city",
                        "address.streetAddress",
                        "address.secondaryAddress"
                    ]
                }
            ]
        },
        {
            "name": "employee_comments_table",
            "count": 100,
            "columns": [
                {
                    "name": "id",
                    "autoIncrement": true
                },
                {
                    "name": "main_id",
                    "foreignKey": {
                        "table": "employee_table",
                        "column": "id"
                    }
                }
            ]
        }
    ]
}
```

</div>
</details>

<br />

### 謝辞
[Faker.js](https://github.com/marak/Faker.js/)を始めとした、さまざまなOSSプロジェクトのおかげで形にすることが出来ました。  
この場を借りて、コントリビューター諸氏に心より感謝申し上げます。