import { assign } from './lib.js';

export default {
  /**
 * 新增資料
 * @param {Object} [data] 欲新增的單筆資料
 */
  addData ( data = [] ) {
    let { saveData } = this;
    saveData.push(data);
    
    $("#searchTxt").val(""); // 當在有搜尋的狀態下開啟新增Modal，清空搜尋框
    $("#addform")[0].reset(); //清空addForm表單

    // 點擊隱藏的關閉Modal按鈕
    $("#closeAddFormModal").click(); 
    
    this.refetchTable(saveData);
  },
  /**
   * 修改資料
   * @param {Object} [data] 欲更新的單筆資料
   */
  updateData (data = {}) {
    let { saveData } = this;
    saveData.find((item, i) => {
      if (item.id === data.id){
        saveData[i] = {
          id: item.id,
          name: $("#editenname").val(),
          email: $("#editemail").val(),
          phone: [$("#editphone").val()],
          date: $("#editDate").text(),
        }
        return saveData;
      } 
    });
    
    $("#closeEditFormModal").click();
    $("#editform")[0].reset();
    
    this.refetchTable(saveData);
  },
  /**
   * 刪除資料 (依據id)
   * @param {Number} [id] 資料序號
   */
  removeData(id){
    let { saveData } = this;

    saveData.forEach((obj, index) => {
      if(obj.id === id){
        saveData.splice(index, 1);
      };
    });

    this.refetchTable(saveData);
  },

   /**
   * 取得指定顯示的日期（當日+1），顯示在addForm/editForm中
   */
  getDate() {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let dd = (date.getDate() + 1) < 10 ? '0' + (date.getDate() + 1) : (date.getDate() + 1);

    const formatDate = () => {
      return yyyy + "-" + mm + "-" + dd;
    }
    document.getElementById("date").innerHTML = formatDate(date);
    document.getElementById("editDate").innerHTML = formatDate(date);
  },

  // 表單驗證
  handleValidate(e, type, form){
    const vm = this;
    let phoneValiate = /09\d{2}-\d{6}/;
    let emailValiate = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    form.validate({
      rules:{
        enname: {
          required: true,
        },
        email: {
          required: true,
          email: true,
          pattern: emailValiate,
        },
        phone: {
          required: true,
          minlength: 10,
          pattern: phoneValiate,
        },
      },
      messages: {
        enname: {
          required: "此欄位為必填",
        },
        email: {
          required: "此欄位為必填",
          email: "Email格式錯誤",
          pattern: "Email格式錯誤",
        },
        phone: {
          required: "手機號碼格式錯誤",
          minlength: "手機格式錯誤",
          pattern: "手機格式錯誤",
        },
      },
      submitHandler: function() {
        e.preventDefault();
        if (type === "addData"){
          let newData = {
            id: vm.saveData.length + 1,
            name: form[0][0].value,
            email: form[0][1].value,
            phone: [form[0][2].value],
            date: $("#date").innerHTML,
          }
          vm.addData(newData);
        } else if (type === "editData") {
          let newData = {
            id: vm.options.targetId,
            name: form[0][0].value,
            email: form[0][1].value,
            phone: [form[0][2].value],
            date: $("#date").innerHTML,
          }
          vm.updateData(newData);
        }
      },
    });
  }


}