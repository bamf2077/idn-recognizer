[<kbd>**`* 简体中文 *`**</kbd>](https://github.com/francis-zhao/idn-recognizer/tree/master/src/js#readme "读我")

# ID Number Recognizer 使用说明

<h2 id="index">索引</h2>

1. [引入](#import)

2. [功能](#function)

   1. [号码识别](#identify)
   2. [号码生成](#generate)
   3. [数据合并](#datamerge)

3. [其他说明](#others)

<br>

<h2 id="import">引入</h2>

index.html

```html
<!-- 注意：不要少写了 type="module" -->
<script src="./js/main.js" type="module"></script>
```

main.js

```javascript
// 本地
import idnjs from "./idn";

// CDN (推荐)
import idnjs from "https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/js/idn.min";
```

<br>

<h2 id="function">功能</h2>

<h3 id="identify">号码识别</h3>

```javascript
// 传入身份证号码并以 JSON 数据格式返回识别结果
let output = idnjs.identify(idnumber);
```

示例：传入 `320106202101010018` 的返回结果

```jsonc
{
  // 行政区划
  "region": {
    // 大区
    "area": {
      "value": 3,
      "name": "华东地区",
      "valid": true
    },
    // 省级行政区
    "province": {
      "value": 32,
      "name": "江苏省",
      "valid": true
    },
    // 地级行政区
    "prefecture": {
      "value": 3201,
      "name": "南京市",
      "valid": true
    },

    "county": {
      "value": 320106,
      "name": "鼓楼区",
      "valid": true
    }
  },

  // 出生日期
  // value 为按 RFC 3339 (不是 ISO 8601-1:2019) 格式输出的日期
  // year/month/day 为 yyyy/M/d 格式省略前导 0
  // 日期可能正确，但却不合法，如 2020-02-30，请按 valid 值判断
  "dateOfBirth": {
    "value": "2021-01-01",
    "year": 2021,
    "month": 1,
    "day": 1,
    "valid": true
  },

  // 顺序码
  // 出生性别 male 为男，female 为女
  "sequenceCode": {
    "value": "001",
    "sex": "male",
    "valid": true
  },

  // 校验码
  // value 为识别值，char 为计算值
  "checkChar": {
    "value": "8",
    "char": "8",
    "valid": true
  },

  // 有效性
  // 仅当上方 valid 全部为 true 时值为 true，否则一律 false
  "valid": true,
  "message": "success"
}
```

<br>

<h3 id="generate">号码生成</h3>

```javascript
// 传入配置
// 配置为空时使用默认参数随机生成
let config = {
  // 行政区划
  region: {
    // 1-6 位正整数，不存在或错误时随机生成
    value: int,
  },

  // 出生日期
  dateOfBirth: {
    // 指定年龄 (1-99 岁) 或日期 (yyyy-mm-dd 格式，1901 年至今)
    // 不存在、超出范围或错误时按 10-50 岁随机生成
    // 注：随机生成非真随机，年龄仅计算到年，可能会偏差 1 岁
    // 生日为 2 月时最大为 28 日，不考虑闰年的情况
    type:  age (default) | date,
    value: int           | "string",
  },

  // 顺序码
  // 顺序码随机生成，仅可指定性别，性别不存在或错误时随机生成
  sequenceCode: {
    sex: "male" | "female",
  },
};

// 生成号码并以字符串格式返回结果
idnjs.generate(config);
```

示例 1:

```javascript
// 配置：18 岁
let config = { dateOfBirth: { value: 18 } };

// 生成号码并以字符串格式返回结果
idnjs.generate(config);

// 370102200306180015
```

示例 2:

```javascript
// 配置：广州市荔湾区人，出生日期 1990 年 2 月 1 日
let config = {
  region: { value: 440103 },
  dateOfBirth: { type: date, value: "1990-02-01" },
};

// 生成号码并以字符串格式返回结果
idnjs.generate(config);

// 440103199002011158
```

<br>

<h3 id="datamerge">数据合并</h3>

```javascript
let config = {
  // 配置需要合并的数据年度，默认为 1980 年至今
  // 年份使用 yyyy 格式，仅设置起始年份时结束年份默认为当年
  timeRange: 1980 (default) | year | "yearStart-yearEnd",

  // 配置数据库 JSON 文件存放的目录
  // 默认为 jsDelivr，可自行配置或使用相对路径
  filePath:
    "https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/json/" (default) |
    string,
};

// 合并数据并以 JSON 数据格式在控制台输出
idnjs.dataMerge(config);
```

<br>

<h2 id="others">其他说明</h2>

### 中华人民共和国现行行政区划：

1. 省级行政区：包括省、自治区、直辖市、特别行政区；
2. 地级行政区：包括地级市、地区、自治州、盟。
3. 县级行政区：包括市辖区、县级市、县、自治县、旗、自治旗、特区、林区。
4. 乡级行政区：包括街道、镇、乡、民族乡、苏木、民族苏木、县辖区。

对于北京、天津、上海、重庆四个直辖市来说，属于省级行政区，但是其下属的市辖区、县（仅限重庆）和自治县（仅限重庆）的行政区划级别实际为县级行政区，仅政府机构编制属正厅级或副部级（仅限滨海新区、浦东新区、两江新区），相当于仅有省级、县级、乡级，没有地级，因此返回的结果中地级行政区名称为空，而校验结果依然为通过。

同理还有所有的地级市，无论是省会（如南京、广州、成都）、计划单列市（如深圳、青岛）还是伊犁哈萨克自治州，它都是地级行政区，所谓的副省级只不过是政府机构的建制，说白了就是领导级别高，副省长来当市长的意思，因此返回的结果中归类为地级。

还有一大堆这个新区、那个新区的，有一些甚至包含了多个行政区域，实在懒得说了……

<br>
<br>

[<kbd>返回顶部</kbd>](# "返回顶部")

```

```
