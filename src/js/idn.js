/*!
 * IDN Recognizer v3.0.1-beta.2
 * https://n2o.io/go?page=idn-recognizer
 *
 * Copyright 2021 Francis Zhao <francis@n2o.io>
 * Released under the MIT license
 * https://github.com/francis-zhao/idn-recognizer/blob/master/LICENSE
 */

const idnjs = {
  // 号码识别
  identify(str) {
    // 创建输出对象模板
    const output = {
      // 行政区划码
      region: {
        // 大区
        area: {
          value: undefined,
          name: undefined,
          valid: false,
        },

        // 省级行政区
        province: {
          value: undefined,
          name: undefined,
          valid: false,
        },

        // 地级行政区
        prefecture: {
          value: undefined,
          name: undefined,
          valid: false,
        },

        // 县级行政区
        county: {
          value: undefined,
          name: undefined,
          valid: false,
        },
      },

      // 出生日期码
      dateOfBirth: {
        value: undefined,
        year: undefined,
        month: undefined,
        day: undefined,
        valid: false,
      },

      // 顺序码
      sequenceCode: {
        value: undefined,
        sex: undefined,
        valid: false,
      },

      // 校验码
      checkChar: {
        value: undefined,
        char: undefined,
        valid: false,
      },

      // 有效性
      valid: false,
      message: undefined,
    };

    if (str) {
      // 字符串格式化
      const inputIDN = str.replace(/[^0-9Xx]/g, '').toUpperCase();

      // 1. 行政区划码
      // 1.1. 截取字符串前 6 位
      const inputRegionArea = parseInt(inputIDN.substr(0, 1), 10);
      const inputRegionProvince = parseInt(inputIDN.substr(0, 2), 10);
      const inputRegionPrefecture = parseInt(inputIDN.substr(0, 4), 10);
      const inputRegionCounty = parseInt(inputIDN.substr(0, 6), 10);

      // 1.2. 写入行政区划属性
      // 1.2.1. 大区
      if (inputRegionArea && inputRegionArea.toString().length === 1) {
        output.region.area.value = inputRegionArea;

        // 匹配大区
        switch (inputRegionArea) {
          case 1:
            output.region.area.name = '华北地区';
            break;
          case 2:
            output.region.area.name = '东北地区';
            break;
          case 3:
          case 7:
            output.region.area.name = '华东地区';
            break;
          case 4:
          case 8:
            if (
              inputRegionProvince === 41
              || inputRegionProvince === 42
              || inputRegionProvince === 43
            ) {
              output.region.area.name = '华中地区';
            } else if (
              inputRegionProvince === 44
              || inputRegionProvince === 45
              || inputRegionProvince === 46
              || inputRegionArea === 8
            ) {
              output.region.area.name = '华南地区';
            } else {
              output.region.area.name = '中南地区';
            }
            break;
          case 5:
            output.region.area.name = '西南地区';
            break;
          case 6:
            output.region.area.name = '西北地区';
            break;
          default:
            break;
        }

        if (output.region.area.name) {
          output.region.area.valid = true;
        }
      }

      // 1.2.2. 省级行政区
      if (inputRegionProvince && inputRegionProvince.toString().length === 2) {
        output.region.province.value = inputRegionProvince;

        // 创建 AJAX 请求
        const request = new XMLHttpRequest();
        const url = 'https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/json/regions-cn-compact.json';
        request.open('GET', url);
        request.send(null);

        // 请求成功操作
        request.addEventListener('load', () => {
          if (request.status === 200) {
            // 将 JSON 内容写入对象
            const data = JSON.parse(request.responseText);

            // 匹配省级行政区代码
            const outputRegionProvince = data[`${inputRegionProvince}0000`];

            if (outputRegionProvince) {
              output.region.province.name = outputRegionProvince;
              output.region.province.valid = true;
            }

            // 1.2.3. 地级行政区
            if (
              inputRegionPrefecture
              && inputRegionPrefecture.toString().length === 4
            ) {
              output.region.prefecture.value = inputRegionPrefecture;

              // 匹配地级行政区代码
              const outputRegionPrefecture = data[`${inputRegionPrefecture}00`];

              if (outputRegionPrefecture) {
                // 地级行政区去重
                if (outputRegionPrefecture === outputRegionProvince) {
                  output.region.prefecture.name = '';

                  // eslint-disable-next-line no-console
                  console.log('字段重复');
                } else {
                  output.region.prefecture.name = outputRegionPrefecture;
                }

                output.region.prefecture.valid = true;
              }

              // 1.2.4. 县级行政区
              if (
                inputRegionCounty
                && inputRegionCounty.toString().length === 6
              ) {
                output.region.county.value = inputRegionCounty;

                // 匹配县级行政区代码
                const outputRegionCounty = data[inputRegionCounty];

                if (outputRegionCounty) {
                  // 县级行政区去重
                  if (
                    outputRegionCounty === outputRegionProvince
                    || outputRegionCounty === outputRegionPrefecture
                  ) {
                    output.region.county.name = '';

                    // eslint-disable-next-line no-console
                    console.log('字段重复');
                  } else {
                    output.region.county.name = outputRegionCounty;
                  }

                  output.region.county.valid = true;
                }
              }
            }
          }
        });

        // 请求完成、中止、错误操作
        request.addEventListener('loadend', () => {
          // 2. 出生日期码
          // 2.1. 截取字符串第 7-14 位
          const inputDateOfBirth = inputIDN.substr(6, 8);
          // 2.2. 出生年
          if (inputDateOfBirth && inputDateOfBirth.length > 3) {
            const inputYearOfBirth = inputDateOfBirth.substr(0, 4);
            const outputYearOfBirth = parseInt(inputYearOfBirth, 10);
            output.dateOfBirth.year = outputYearOfBirth;

            // 2.3. 出生月
            if (inputDateOfBirth.length > 5) {
              const inputMonthOfBirth = inputDateOfBirth.substr(4, 2);
              const outputMonthOfBirth = parseInt(inputMonthOfBirth, 10);
              output.dateOfBirth.month = outputMonthOfBirth;

              // 2.4. 出生日
              if (inputDateOfBirth.length === 8) {
                const inputDayOfBirth = inputDateOfBirth.substr(6, 2);
                const outputDayOfBirth = parseInt(inputDayOfBirth, 10);
                output.dateOfBirth.day = outputDayOfBirth;
                output.dateOfBirth.value = `${inputYearOfBirth}-${inputMonthOfBirth}-${inputDayOfBirth}`;

                // 过滤非法日期
                // 闰年计算
                const isLeapYear = !!(
                  (outputYearOfBirth % 4 === 0
                    && outputYearOfBirth % 100 !== 0)
                  || outputYearOfBirth % 400 === 0
                );

                // 获取当前年
                const currentYear = new Date().getFullYear();

                // 规则：1900 年至今，1-12 月，1-31 天
                if (
                  outputYearOfBirth > 1900
                  && outputYearOfBirth <= currentYear
                  && outputMonthOfBirth >= 1
                  && outputMonthOfBirth <= 12
                  && outputDayOfBirth >= 1
                  /* && (((outputMonthOfBirth === 1
                || outputMonthOfBirth === 3
                || outputMonthOfBirth === 5
                || outputMonthOfBirth === 7
                || outputMonthOfBirth === 8
                || outputMonthOfBirth === 10
                || outputMonthOfBirth === 12)
                && outputDayOfBirth === 31)
                || ((outputMonthOfBirth === 4
                  || outputMonthOfBirth === 6
                  || outputMonthOfBirth === 9
                  || outputMonthOfBirth === 11)
                  && outputDayOfBirth === 30)
                || (isLeapYear
                  && outputMonthOfBirth === 2
                  && outputDayOfBirth === 29)
                || (!isLeapYear
                  && outputMonthOfBirth === 2
                  && outputDayOfBirth === 28)) */
                ) {
                  output.dateOfBirth.valid = true;
                }
              }
            }
          }

          // 3. 顺序码
          // 3.1. 截取字符串第 15-17 位
          const inputSequenceCode = parseInt(inputIDN.substr(14, 3), 10);

          if (inputSequenceCode && inputSequenceCode.toString().length === 3) {
            output.sequenceCode.value = inputSequenceCode;
            output.sequenceCode.valid = true;

            // 3.2. 出生性别
            const inputSex = parseInt(inputIDN.substr(16, 1), 10);
            // 第 17 位奇数为男性, 偶数为女性
            const outputSex = inputSex % 2 === 0 ? 'female' : 'male';
            output.sequenceCode.sex = outputSex;
          }

          // 4. 校验码
          if (inputIDN.length >= 17) {
            // 4.1. 截取字符串前 17 位并转换为数组
            const idnArray = inputIDN.substr(0, 17).split('');

            // 4.2. 将号码按 ISO/IEC 7064:2003, MOD 11-2 计算校验码
            // prettier-ignore
            const multiplierArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            // prettier-ignore
            const checkCharArray = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

            let sum = 0;
            for (let i = 0; i < idnArray.length; i += 1) {
              sum += idnArray[i] * multiplierArray[i];
            }
            const remainder = sum % 11;
            const outputCheckChar = checkCharArray[remainder];
            output.checkChar.char = outputCheckChar;

            // 4.3. 截取字符串第 18 位字符与计算值比对
            if (inputIDN.length === 18) {
              const inputCheckChar = inputIDN.substr(17, 1);
              output.checkChar.value = inputCheckChar;

              if (inputCheckChar === outputCheckChar) {
                output.checkChar.valid = true;
              }
            }
          }

          // 5. 核验有效性
          if (
            output.region.area.valid
            && output.region.province.valid
            && output.region.prefecture.valid
            && output.region.county.valid
            && output.dateOfBirth.valid
            && output.sequenceCode.valid
            && output.checkChar.valid
          ) {
            output.valid = true;
            output.message = 'success';
          } else {
            output.message = 'error';
          }

          return JSON.stringify(output);
        });
      }
    }

    return JSON.stringify({
      valid: false,
      message: 'error: empty input string.',
    });
  },

  // 号码生成
  generate(obj) {
    return obj;
  },

  // 合并数据
  dataMerge() {
    // 创建数据年度数组
    const annualArray = [];
    const annualCurrent = 2020;

    // 将正式数据年度写入数组
    for (let i = 1980; i < annualCurrent; i += 1) {
      annualArray.push(i);

      // 将临时数据年度追加至数组
      if (i + 1 === annualCurrent) {
        annualArray.push('latest');
      }
    }

    // 创建数据对象和数据集合对象
    const data = {};
    const dataCompact = {};

    // 合并各年度数据
    function makeCompact(i, length) {
      // 创建 AJAX 请求
      const request = new XMLHttpRequest();
      const url = `https://cdn.jsdelivr.net/gh/francis-zhao/idn-recognizer/dist/json/regions-cn-${annualArray[i]}.json`;
      request.open('GET', url);
      request.send(null);

      // 请求成功操作
      request.addEventListener('load', () => {
        if (request.status === 200) {
          // 将 JSON 内容写入 `data` 属性
          data[annualArray[i]] = JSON.parse(request.responseText);

          // 合并 `data` 属性到 `dataCompact`
          Object.assign(dataCompact, data[annualArray[i]]);

          // 递归调用，避免 AJAX 请求异步执行时顺序错乱
          if (i + 1 < length) {
            makeCompact(i + 1, length);
          }
        }
      });
    }

    makeCompact(0, annualArray.length);

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(dataCompact));
  },
};

export { idnjs as default };
