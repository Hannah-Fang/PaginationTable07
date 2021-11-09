


export default {
  /*
  * 動態設置 ActivityTimeline 選項參數
  * @param {Object} [options] - 更新預設參數
  */
  setOptions( options = {} ){

  },

  /*
  * 新增資料
  * @param {Object} [data] - 回傳的新增資料
  */
  addData( data = {} ){
    let vm = this;    
    axios.post('http://localhost:3000/activity/record', data).then(function(response) {
      axios.get(`http://localhost:3000/activity/record`).then((response)=> {
        let data = response.data;
        vm.refreshTimeline(data);
        vm.bindEvent();
        $("#closeAddModal").click();
      });
    });
  },

  /*
  * 更新單筆資料
  * @param {Object} [data] - 回傳的更新資料
  */
  updateData( data = {} ){
    let vm = this;
    axios.put(`http://localhost:3000/activity/record/:${data.id}`, data).then((response)=> {
      axios.get(`http://localhost:3000/activity/record`).then((response)=> {
        let data = response.data;
        vm.refreshTimeline(data);
        vm.bindEvent();
        $("#closeEditModal").click();
      });
    });
  },

  /*
  * 刪除單筆資料
  * @param {Number} [id] - 資料序號
  */
  removeDataById(id) {
    let vm = this;
    axios.delete(`http://localhost:3000/activity/record/:${id}`).then(function(response){
      let data = response.data;
      vm.refreshTimeline(data.data);
      vm.bindEvent();
    });
  },

  /*
  * 排序資料
  * @param {String} [type] - (asc|desc)
  * asc: 小至大
  * desc: 大至小
  */
  sort(type){
    axios.get(`http://localhost:3000/activity/record/`).then((response)=>{
      let data = response.data;
      if (type === "asc") {
        let sortData = data.sort(function(a, b){
          return a.id - b.id;
        });
        this.refreshTimeline(sortData);
        this.bindEvent();
      } else if (type === "desc") {
        let sortData = data.sort(function(a, b){
          return b.id - a.id;
        });
        this.refreshTimeline(sortData);
        this.bindEvent();
      };
    })
  },
  /**
     * get date
     * @return {String} String - 時間格式
     */
   getDate () {
    let date = new Date();
    let yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let dd = (date.getDate() + 1) < 10 ? '0' + date.getDate() : date.getDate();

    const formatDate = () => {
      return yyyy + "/" + mm + "/" + dd;
    }
    $("#date").html(formatDate(date));
  },

  // 表單驗證
  handleValidate( e, type, form){
    const vm = this;
    let emailValiate = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    form.validate({
      rules:{
        title: {
          required: true,
        },
        name: {
          required: true,
        },
        email: {
          required: true,
          email: true,
          pattern: emailValiate,
        },
      },
      messages: {
        title: {
          required: "此欄位為必填",
        },
        name: {
          required: "此欄位為必填",
        },
        email: {
          required: "此欄位為必填",
          email: "Email格式錯誤",
          pattern: "Email格式錯誤",
        },
      },
      submitHandler: function() {
        e.preventDefault();
        if(type === "addData"){
          let newData = {
            title: $("#addtitle").val(),
            name: $("#addname").val(),
            email: $("#addemail").val(),
            bref: $("#addbref").val(),
          };
          vm.addData(newData);
        } else if (type === "editData"){
          let targetData = {
            id: vm.options.targetId,
            title: $("#edittitle").val(),
            name: $("#editname").val(),
            email: $("#editemail").val(),
            bref: $("#editbref").val(),
          };
          vm.updateData(targetData);
        }
      },
    });
  }
}