export const DEFAULTS =  {
  // 表格內容資料
  data: [],
  // 是否顯示自訂筆數
  showPerPage: true,
  // 是否顯示搜尋輸入框
  showSearch: true,
  // 是否顯示總筆數資訊
  showInfo: true,
  // 是否顯示分頁導航
  showPage: true,
  // 初始分頁數
  perPage: 5,
  // 處理中的對象資料
  targetId: 0,
  /**
   * 更新按鈕的callback,並提供相關參數值使用
   * @param {Object} [tr] 列的element
   * @param {Object} [rowData] 當列的欄位資料
   */ 
  // 編輯按鈕 Callback (點擊之後的事情)
  onEdit: function(vm, rowData){
    // 將所選列的資料顯示在表格中
    $("#editenname").val(rowData.name);
    $("#editemail").val(rowData.email);
    $("#editphone").val(rowData.phone);
    
    $("#editBtn").click(function(e){
      // e.preventDefault();
      e.stopPropagation();
      let type = "editData";
      let form = $("form#editform");
      vm.options.targetId = rowData.id;
      vm.handleValidate(e, type, form);
    });

  },
  /**
   * 刪除按鈕的callback,並提供相關參數值使用
   * @param {Object} [tr] 列的element
   * @param {Number} [id] 資料序號
   */ 
  // 刪除按鈕 Callback (點擊之後的事情)
  onDelete: function(vm, id){
    vm.removeData(id);

  }
};
