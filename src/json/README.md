[<kbd>**`* 简体中文 *`**</kbd>](https://github.com/francis-zhao/idn-recognizer/tree/master/src/json#readme "读我")

# ID Number Recognizer - 行政区划数据库

## regions-cn-latest.json

最新版中国大陆地区县以上行政区划文件，仅包含正式行政区划信息，不含已取消、合并、更名等变更前的行政区划，**建议用于地址联级选项**，不定期更新。

⚠ 注意：生产环境建议使用 [Minified 处理后的文件](https://github.com/francis-zhao/idn-recognizer/blob/master/dist/json/regions-cn-latest.json) 或 [jsDelivr CDN](https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/json/regions-cn-latest.json)。

数据来源：[中华人民共和国民政部行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/)

<br>

## regions-cn-compact.json

最新版中国大陆地区县以上行政区划合集文件，包含 1980 年至今所有的行政区划信息，其中部分已取消、合并、更名等变更，**建议用于身份证号码识别**，避免因行政区划变更导致无法匹配历史行政区划信息，随 `regions-cn-latest.json` 更新。

⚠ 注意：生产环境建议使用 [Minified 处理后的文件](https://github.com/francis-zhao/idn-recognizer/blob/master/dist/json/regions-cn-compact.json) 或 [jsDelivr CDN](https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/json/regions-cn-compact.json)。

<br>

## regions-cn-\*.json

中国大陆地区县以上历史行政区划文件，包含 1980 年至今所有的行政区划信息，其中部分已取消、合并、更名等变更，仅供参考。

数据来源：[中华人民共和国民政部行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/1980/)

<br>

## 备注

民政部行政区划代码仅包含县以上行政区划，如果你需要精确到乡级的行政区划代码，请移步[国家统计局统计用区划和城乡划分代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/)，可以考虑用 `Python` 提取。

<br>

## jsDelivr CDN 使用方法

将网址末尾的 `*` 替换成下方文件清单中的文件名即可。

`https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/json/*`

### 文件清单

- regions-cn-compact.json
- regions-cn-latest.json
- regions-cn-2019.json
- regions-cn-2018.json
- regions-cn-2017.json
- regions-cn-2016.json
- regions-cn-2015.json
- regions-cn-2014.json
- regions-cn-2013.json
- regions-cn-2012.json
- regions-cn-2011.json
- regions-cn-2010.json
- regions-cn-2009.json
- regions-cn-2008.json
- regions-cn-2007.json
- regions-cn-2006.json
- regions-cn-2005.json
- regions-cn-2004.json
- regions-cn-2003.json
- regions-cn-2002.json
- regions-cn-2001.json
- regions-cn-2000.json
- regions-cn-1999.json
- regions-cn-1998.json
- regions-cn-1997.json
- regions-cn-1996.json
- regions-cn-1995.json
- regions-cn-1994.json
- regions-cn-1993.json
- regions-cn-1992.json
- regions-cn-1991.json
- regions-cn-1990.json
- regions-cn-1989.json
- regions-cn-1988.json
- regions-cn-1987.json
- regions-cn-1986.json
- regions-cn-1985.json
- regions-cn-1984.json
- regions-cn-1983.json
- regions-cn-1982.json
- regions-cn-1981.json
- regions-cn-1980.json

<br>
<br>

[<kbd>返回顶部</kbd>](# "返回顶部")
