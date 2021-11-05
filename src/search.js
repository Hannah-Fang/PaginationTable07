export default {
  searchKeywords( value ){
    let { saveData } = this;
    const matchsArray = [];
    // 字串不限制大小寫與去除空白
    const regexpResult = new RegExp($.trim(value), "ig");

    // 遍歷陣列中的object
    for (let i = 0, len = saveData.length; i < len; i++) {
      for (let key in saveData[i]) {
        // 組合一個新字串
        const scanValue = Object.keys(saveData[i]).reduce((res, key) => {
          // 排除id欄位篩選
          return key !== "id" ? res + saveData[i][key] : res;
        }, "");

        // 比對正則條件字串
        if (scanValue.match(regexpResult)) matchsArray.push(saveData[i]);
      }
    }

    /* === 集合方法篩選唯一值 === */
    const _set = new Set();
    const result = matchsArray.filter((item) =>
      !_set.has(JSON.stringify(item)) ? _set.add(JSON.stringify(item)) : false
    );

    this.refetchTable(result);
    // table.maxRowsChange(result);
    
    return !result ? [] : result;
  },
}