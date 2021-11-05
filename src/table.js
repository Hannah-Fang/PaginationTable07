import { assign } from './lib.js'
import { DEFAULTS } from './default.js'
import methods from './methods.js'

export class TableCRUD {
  /**
   * TableCRUD 建構子
   * @param {Element} element - 指定渲染的DOM
   * @param {Object} [options={}] - 傳入調整的參數值
   */
  constructor( element, options = {} ) {
    this.element = element;
    // 覆寫定義好的預設值
    this.options = assign({}, DEFAULTS, $.isPlainObject(options) && options );
    console.log(this.options);
    // 儲存當下資料
    this.saveData = [];
    // 初始化Table
    this.initTable(this.options);
  }
  
  /**
   * 初始化 Table 實例
   */
  initTable( options={} ) {
    

    this.options.data = options;
    this.saveData = this.options.data;
    // console.log(this.options.data);
    // this.refetchTable(this.options.data);
    // this.bindEvent(this.tempData);
  }

  // 頁面首次渲染的呼叫
  bindEvent(){
    
  }
  
  /**
   * 重新整理完整表單
   * @param {Object}} [result] 搜尋結果
   */
  refetchTable( data = [] ) {
    
  } 
}

assign( TableCRUD.prototype, methods );

export default TableCRUD;