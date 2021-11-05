import { assign } from './lib.js'
import { DEFAULTS } from './default.js'
import methods from './methods.js'
import pagination from './pagination.js'
import search from './search.js'
import option from './option.js'

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
    // 儲存當下資料
    this.saveData = [];
    // 初始化Table
    this.initTable();
  }
  
  /**
   * 初始化
   */
  initTable( ) {
    const { options } = this;
    this.saveData = options.data;
    this.refetchTable( this.saveData );
    this.bindEvent();
    this.formPerPage(options.perPage);
  }

  // 綁定監聽事件
  bindEvent(){
    const vm = this;

    // 點「新增按鈕」
    $("#add-btn").click(function(e){
      // 取得當下日期
      vm.getDate();

      $("#addBtn").click(function(e){
        e.stopPropagation();
        let type = "addData";
        let form = $("form#addform");
        vm.handleValidate(e, type, form);
      }); 
    });

    // 點資料列的編輯按鈕
    $('#data').on('click','#edit-btn',function(e){
      // 取得當下日期資料顯示在編輯Modal中
      vm.getDate();
      
      // 取得元素上的id
      let id = +(e.target.dataset.id);
      let rowData = {};
      
      $.each( vm.saveData, function(index, data){
        if( parseInt(id) === parseInt(data.id) ){
          rowData = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            date: data.date
          }
        }
      });
      
      // 將資料傳到options的onEdit
      vm.options.onEdit(vm, rowData);

      // 點擊隱藏的編輯按鈕開啟Modal
      hiddenEditBtn.click();
    });

    // 點資料列的刪除按鈕
    $('#data').on('click','#delete-btn',function(e){
      // 取得元素上的id
      let id = +(e.target.dataset.id);
      // 將資料傳到options的onEdit
      vm.options.onDelete(vm, id);
    });  
    
    // Search-搜尋功能
    $("#searchTxt").on("keyup", function () {
      const _value = $(this).val();

      // 事件延遲0.5秒執行, 減少reflow
      setTimeout(() => {
        vm.searchKeywords( _value );
      }, 500);
    });

    // 顯示筆數
    $("#maxRows").on('change',function (e) {
      vm.options.perPage = +($(this).val());
      vm.getPagination();
    });

    // 點擊套件按鈕
    $('#optBtn').click(function(e){
      e.preventDefault();
      e.stopPropagation();
      vm.getOpt();
    });

  }
  
  /**
   * 重新整理完整表單
   */
  refetchTable( data = [] ) {
    const { element, saveData } = this;
    $( element ).empty();

    if (data) {
      // 顯示所有資料
      $.each(data, function (key, item) {
        let row = $("<tr></tr>");
        
        row.append($('<td></td>').html(item.name));
        row.append($('<td></td>').html(item.email));
        row.append($('<td></td>').html(item.phone));
        row.append($('<td></td>').html(item.date));
        row.append( $(`<td data-id="${item.id}" class="btnActionGroup">
        <button class="btn btn-secondary btnAction" id="edit-btn" data-id="${item.id}" >Edit</button>
        <button class="btn btn-danger btnAction" id="delete-btn" data-id="${item.id}">Delete</button>
        </td>`) );
        
        $( element ).append(row);
      });
      
      // 顯示總筆數
      document.getElementById("total").innerHTML = "共 " + data.length + " 筆資料";
      
    } else {
      // 沒資料時的顯示
      $( element )
      .empty()
      .html($("<tr></tr>").append('<td colspan="5">No Data.</td>'));
    }

    // 分頁渲染
    this.getPagination(data);
  } 
}

assign( TableCRUD.prototype, methods );
assign( TableCRUD.prototype, pagination );
assign( TableCRUD.prototype, search );
assign( TableCRUD.prototype, option );

export default TableCRUD;