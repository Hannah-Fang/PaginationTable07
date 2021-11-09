import { DEFAULTS } from './default.js'
import { assign } from './lib.js'
import methods from './methods.js'

export class Activity {
  constructor( element, options = {} ){
    this.element = element,
    this.options = assign({}, DEFAULTS, $.isPlainObject(options) && options );
    this.initTable();
  }
  initTable(){
    const { options } = this;
    this.refetchTimeline( options.data );
    this.bindEvent();
  }
  refetchTimeline( data = [] ){
    const { element } = this;
    $(element).empty();
    
    if(data) {
      $.each(data, function(key, item){
        //顯示所有資料
        $(element).append(`
        <div class="activityCardWrap">
          <div class="activityCard">
            <div class="activityCard__id" id="actId">${item.id}</div>
            <div class="activityCard__header" id="actTitle">${item.title}</div>
            <div class="activityCard__name">
              <p id="actName">${item.name}</p>
              <p id="actEmail">${item.email}</p>
            </div>
            <div class="activityCard__bref" id="actBref">${item.bref}</div>
            <div class="activityCard__footer d-flex justify-content-between">
              <div class="cardBtn">
                <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}" data-toggle="modal" data-target="#editmodal">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">X</button>
              </div>
              <div class="cardDate" id="actDate">${item.datetime}</div>
            </div>
          </div>
        </div>
        `);
      });
    }
    this.refreshTimeline(data);
  }
  refreshTimeline( data = [] ) {
    let { element, options } = this;
    let displayData = data.slice(0, options.perItem);
    $(element).empty();
    $.each(displayData, function(key, item){
      //顯示當前卡片顯示數
      $(element).append(`
      <div class="activityCardWrap">
        <div class="activityCard">
          <div class="activityCard__id" id="actId">${item.id}</div>
          <div class="activityCard__header" id="actTitle">${item.title}</div>
          <div class="activityCard__name">
            <p id="actName">${item.name}</p>
            <p id="actEmail">${item.email}</p>
          </div>
          <div class="activityCard__bref" id="actBref">${item.bref}</div>
          <div class="activityCard__footer d-flex justify-content-between">
            <div class="cardBtn">
            <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}" data-toggle="modal" data-target="#editmodal">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}">X</button>
            </div>
            <div class="cardDate" id="actDate">${item.datetime}</div>
          </div>
        </div>
      </div>
      `);
    });
  }

  /**
   * bindEvent 監聽事件
   * @param {Array} [options = []] - 變更的選項參數
   */
  bindEvent(){
    let vm = this;
    // 點Load More按鈕
    $("#moreBtn").on('click', function(){
      if(vm.options.perItem < vm.options.data.length){
        vm.options.perItem += 4;
        vm.refreshTimeline();
        vm.bindEvent();
      } else {
        alert("沒有更多資料了");
        $("#moreBtn").addClass('disable');
      }
    });

    // 點升冪排序按鈕
    $("#btnAsc").unbind().on('click', function(){
      let type = "asc";
      vm.sort(type);
    });

    // 點降冪排序按鈕
    $("#btnDesc").unbind().on('click', function(){
      let type = "desc";
      vm.sort(type);
    });

    // 點新增按鈕
    $("#btnAdd").on('click', function(){
      vm.getDate();
      $("#addtitle").val('');
      $("#addname").val('');
      $("#addemail").val('');
      $("#addbref").val('');

      $("#addBtn").on('click', function(e){
        e.stopPropagation();
        let type = "addData";
        let form = $("#addform");
        vm.handleValidate(e, type, form);
      });
    });

    // 點編輯按鈕
    $(".edit-btn").on('click', function(e){
      vm.getDate();
      let id = +(e.target.dataset.id);
      let targetData = {};

      axios.get(`http://localhost:3000/activity/record`).then((response)=> {
        let data = response.data;
        $.each(data ,function(index, item){
          if ( parseInt(id) === parseInt(item.id)){
            targetData = {
              id: item.id,
              title: item.title,
              name: item.name,
              email: item.email,
              bref: item.bref,
            }
          }
          // 將資料傳到options的onEdit
          vm.options.onEdit(vm, targetData);
        });
      });


    });

    // 點刪除按鈕
    $(".delete-btn").on('click', function(e) {
      let id = +(e.target.dataset.id);

      // 將資料傳到options的onEdit
      vm.options.onDelete(vm, id);
    })
  };
};

assign( Activity.prototype, methods );
export default Activity