[<kbd>**`* 简体中文 *`**</kbd>](https://github.com/francis-zhao/idn-recognizer/tree/master/src/js#readme "读我")

# ID Number Recognizer 使用说明

## 引入

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

## 功能

### 1. 号码识别

```javascript
// 传入身份证号码
let str = idnumber;

// 识别号码并返回 JSON
let output = idnjs.identify(str);
```

号码样例：`320106202101010018`

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
  "dateOfBirth": {
    "value": "2021-01-01",
    "year": 2021,
    "month": 1,
    "day": 1,
    "valid": true
  },
  // 顺序码
  "sequenceCode": {
    "value": "001",
    "sex": "female",
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
  // 仅当上方 valid 全部为 true 时值为 true
  "valid": true,
  "message": "success"
}
```

<br>

### 号码生成

```javascript
// 传入配置
// 配置为空时使用默认参数随机生成
let obj = {};

// 生成号码并返回 JSON
idnjs.generate(obj);
```

<br>

### 数据合并

```javascript
// 合并各年度行政区划数据并在控制台输出 JSON
idnjs.mergeData();
```

<br>

## 其他说明

### 中华人民共和国现行行政区划：

1. 省级行政区：包括省、自治区、直辖市、特别行政区；
2. 地级行政区：包括地级市、地区、自治州、盟。
3. 县级行政区：包括市辖区、县级市、县、自治县、旗、自治旗、特区、林区。
4. 乡级行政区：包括街道、镇、乡、民族乡、苏木、民族苏木、县辖区。

对于北京、天津、上海、重庆四个直辖市来说，属于省级行政区，但是其下属的市辖区、县（仅限重庆）和自治县（仅限重庆）的行政区划级别实际为县级行政区，仅政府机构编制属正厅级或副部级（仅限滨海新区、浦东新区、两江新区），相当于仅有省级、县级、乡级，没有地级，因此返回的结果中地级行政区名称为空，而校验结果依然为通过。

同理还有，所有的地级市不管它是省会城市（如南京、广州、成都）、计划单列市（如深圳、青岛）还是伊犁哈萨克自治州，它都是地级行政区，所谓的副省级只不过是政府机构的建制，说白了就是领导级别高，副省长来当市长的意思，因此返回的结果中归类为地级。

还有一大堆这个新区、那个新区的，有一些甚至包含了多个行政区域，实在懒得说了……

<br>
<br>

[<kbd>返回顶部</kbd>](# "返回顶部")
