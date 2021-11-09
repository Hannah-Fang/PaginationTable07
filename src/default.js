export const DEFAULTS = {
  // 活動紀錄來源資料
  data: [],
  // 預設卡片顯示數
  perItem: 4,
  // 預設編輯對象
  targetId: 0,
  /**
   * 更新按鈕的callback,並提供相關參數值使用
   * @param {Object} [vm] 物件this
   * @param {Object} [targetData] 要編輯的欄位資料
   */ 
  onEdit: function(vm, data){
    $("#edittitle").val(data.title);
    $("#editname").val(data.name);
    $("#editemail").val(data.email);
    $("#editbref").val(data.bref);

    $("#editBtn").on('click', function(e) {
      e.stopPropagation();
      let type = "editData";
      let form = $("#editform");
      vm.options.targetId = data.id;
      vm.handleValidate(e, type, form);
    })
  },
  /**
   * 刪除按鈕的callback,並提供相關參數值使用
   * @param {Object} [vm] 物件this
   * @param {String} [id] 要編輯的欄位id
   */
  onDelete: function(vm, id){
    vm.removeDataById(id);
  },
}
