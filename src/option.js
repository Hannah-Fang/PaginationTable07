import { assign } from './lib.js'

export default {
  /**
   * 取得套件狀態資料
   */
   getOpt(){
    let { options } = this;
    let optElement = document.getElementById("optform");
    let newOpt = {
      showPerPage: optElement[0].checked,
      showSearch: optElement[1].checked,
      showInfo: optElement[2].checked,
      showPage: optElement[3].checked,
      perPage: +optElement[4].value,
    }
    options = assign({}, options, $.isPlainObject(newOpt) && newOpt );

    $("#closeOptFormModal").click();  // 關閉Modal
    this.updatedOpt(options);
  },

  /**
   * 更新套件 (變更選項設定)
   * @param {Object} [options] 參數選項
   */
  updatedOpt(options){
    (!options.showPerPage) ? $("div#domShowPerPage").attr('style','display: none !important') : $("div#domShowPerPage").attr('style','display: block');

    (!options.showSearch) ? $("div#domShowSearch").attr('style','display: none !important') : $("div#domShowSearch").attr('style','display: block');

    (!options.showPage) ? $("div#domShowPage").attr('style','display: none !important') : $("div#domShowPage").attr('style','display: block');

    (!options.showInfo) ? $("span#total").attr('style','display: none !important') : $("span#total").attr('style','display: block');

    $('#maxRows option').remove();
    this.formPerPage(+options.perPage);
  },
  /**
   * 組成顯示筆數的option選項
   * @param {Number} [minPerPage] 當前每頁顯示筆數的最小值/初始值
   */
   formPerPage(minPerPage){
    let frgArr = [ 5, 10, 15, 20, 25 ];

    switch(minPerPage){
      case 10:
        frgArr = frgArr.splice(1);
        break;
      case 15:
        frgArr = frgArr.splice(2);
        break;
      case 20:
        frgArr = frgArr.splice(3);
        break;
      case 25:
        frgArr = frgArr.splice(4);
        break;
    }

    for (let i = 0; i < frgArr.length; i++){
      $("#maxRows").append('<option value="'+ frgArr[i] +'">' + frgArr[i] + '</option>')
    }
    this.getPagination();
  },
}