// User 欄位資料
var _data = [
  {
    id: 1,
    name: 'George Maria Anderson',
    email: 'f.lhp@izxld.to',
    phone: ['0996-001371'],
    date: '2021-03-01',
  },
  {
    id: 2,
    name: 'Scott Dorothy Lewis',
    email: 'x.uqtt@eoeuyhtxs.com.cn',
    phone: ['0956-127745'],
    date: '2021-03-02',
  },
  {
    id: 3,
    name: 'Donna Timothy Brown',
    email: 'y.dnfhyk@odu.th',
    phone: ['0959-871815'],
    date: '2021-03-05',
  },
  {
    id: 4,
    name: 'Brenda Mary Miller',
    email: 'v.bxtk@tjmpxkwbr.fo',
    phone: ['0948-327435'],
    date: '2021-03-10',
  },
  {
    id: 5,
    name: 'Steven Jose Martin',
    email: 'o.gxs@tlcv.de',
    phone: ['0953-745908'],
    date: '2021-03-15',
  },
  {
    id: 6,
    name: 'Michelle Lisa Harris',
    email: 'g.bxci@irqoiy.re',
    phone: ['0931-155138'],
    date: '2021-03-02',
  },
  {
    id: 7,
    name: 'Richard Scott Young',
    email: 'c.synbon@qyouvyx.az',
    phone: ['0934-303587'],
    date: '2021-03-03',
  },
  {
    id: 8,
    name: 'Robert Jeffrey Allen',
    email: 'i.bsyehyz@hiznxb.gi',
    phone: ['0946-244714'],
    date: '2021-03-06',
  },
  {
    id: 9,
    name: 'Melissa Karen Johnson',
    email: 'p.riefbalc@boqmwc.lu',
    phone: ['0905-131221'],
    date: '2021-03-21',
  },
  {
    id: 10,
    name: 'Dorothy Karen Harris',
    email: 'k.fdu@ymrjgxs.lk',
    phone: ['0970-944111'],
    date: '2021-03-30',
  },
  {
    id: 11,
    name: 'John Linda Anderson',
    email: 's.rwdrw@jnbsdplf.pm',
    phone: ['0922-782576'],
    date: '2021-03-31',
  },
  {
    id: 12,
    name: 'Larry Christopher Hernandez',
    email: 'k.cctncwn@kpwpkoor.museum',
    phone: ['0927-842481'],
    date: '2021-03-01',
  },
  {
    id: 13,
    name: 'Karen Nancy Thomas',
    email: 'n.xlnl@hkpg.mp',
    phone: ['0953-883864'],
    date: '2021-03-22',
  },
  {
    id: 14,
    name: 'Anthony Sarah Harris',
    email: 'w.lipm@qmexko.ye',
    phone: ['0974-331398'],
    date: '2021-03-24',
  },
  {
    id: 15,
    name: 'Angela William Garcia',
    email: 'm.ovcmohtpb@akzovhh.de',
    phone: ['0966-210234'],
    date: '2021-03-11',
  },
  {
    id: 16,
    name: 'Sandra David Taylor',
    email: 'y.hwzpr@qoame.ke',
    phone: ['0993-787941'],
    date: '2021-03-17',
  },
  {
    id: 17,
    name: 'David Laura Anderson',
    email: 'z.zicwf@grtwucgkt.ly',
    phone: ['0973-644816'],
    date: '2021-03-05',
  },
  {
    id: 18,
    name: 'Jason Dorothy Rodriguez',
    email: 'u.ykeweu@jsoqrxte.pf',
    phone: ['0957-447222'],
    date: '2021-03-04',
  },
  {
    id: 19,
    name: 'Kevin Steven Robinson',
    email: 'o.zcvql@ixojb.gn',
    phone: ['0909-131886'],
    date: '2021-03-09',
  },
  {
    id: 20,
    name: 'Betty Sharon Jackson',
    email: 's.mtrlx@wnivluqes.ki',
    phone: ['0930-335482'],
    date: '2021-03-10',
  },
  {
    id: 21,
    name: 'Robert Donald Harris',
    email: 'l.njhlplihy@ulioq.ci',
    phone: ['0918-582288'],
    date: '2021-03-29',
  },
  {
    id: 22,
    name: 'Joseph Sharon Lopez',
    email: 'e.nciqeidv@qzoinaudbx.pw',
    phone: ['0938-217401'],
    date: '2021-03-18',
  },
  {
    id: 23,
    name: 'Steven Mark Jones',
    email: 'j.zmanq@axmsx.tn',
    phone: ['0931-283902'],
    date: '2021-03-19',
  },
  {
    id: 24,
    name: 'Sandra Eric Thomas',
    email: 'k.svhwbemp@mjnmh.ma',
    phone: ['0999-821075'],
    date: '2021-03-20',
  },
  {
    id: 25,
    name: 'Deborah Daniel Walker',
    email: 'p.giszzjsg@ixqfmlnxo.cy',
    phone: ['0930-744958'],
    date: '2021-03-03',
  },
];

class BindEvents {
  constructor(_data){
    this.feedbackData = _data;
  }
  bindEvent() {
    // console.log("hi");
    // Search-搜尋功能
    $("#searchTxt").on("keyup", function () {
      const _value = $(this).val();

      // 事件延遲0.5秒執行, 減少reflow
      setTimeout(() => {
        table.showSearchResult(_value, _data);
        pagination.resetPagination();
        pagination.getPagination(_data);
      }, 500);
    });

    // Table-Madal-addfrom 點擊新增按鈕時就抓取日期資料
    $("#add-btn").click(function(){
      data.getDate();
    });
    
    // Table-Madal-addfrom 新增表單
    $("#addBtn").click(function(e){
      let type = "addData";
      let form = $("form#addform");
      data.handleValidate(e, type, form);
    });
        
    // 點 Edit 跳出 editform 的 Modal
    $('#data').on('click','#edit-btn',function(e){
      targetId = +(e.target.dataset.id);
      console.log('#data.click', targetId);
      data.getDate();
      data.getSelectedData(targetId);
      hiddenEditBtn.click();
    });

    // 點 Delete 刪除該列資料
    $('#data').on('click','#delete-btn',function(e){
      data.removeData(e);
    });    

    // 點 editBtn 跳出 確認修改內容
    $("#editBtn").click(function(e){
      console.log('#editBtn.click', targetId);
      let type = "editData";
      let form = $("form#editform");
      data.handleValidate(e, type, form);
    });

    // Pagination-顯示筆數變動時，取得變動的數字，並變動分頁標籤&顯示資料
    $("#maxRows").on('change',function (e) {
      this.currentRowsShown = +($(this).val());
      pagination.resetPagination();
      pagination.getPagination(this.feedbackData, this.currentRowsShown);
    });

  }
}

class Data {
  constructor(_data){
    this.feedbackData = _data;
  }
  getDate() {
    let date = new Date();
    const formatDate = () => {
      return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()+1);
    }
    document.getElementById("date").innerHTML = formatDate(date);
    document.getElementById("editDate").innerHTML = formatDate(date);
  }
  handleValidate(e, type, form){
    console.log('handleValidate', targetId);
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
      submitHandler: function () {
        e.preventDefault();
        if (type === "addData"){
          data.addData();
        } else if(type === "editData") {
          console.log('submitHandler', targetId);
          data.updateData();
        }
      },
    });
  }
  addData(){
    let formElement = document.getElementById("addform");
    let newData = {
      id: this.feedbackData.length + 1,
      name: formElement[0].value,
      email: formElement[1].value,
      phone: [formElement[2].value],
      date: document.getElementById("date").innerHTML,
    }
    this.feedbackData.push(newData);
    $("#addform")[0].reset();

    $("#closeAddFormModal").click();
    
    table.refetchTable(this.feedbackData);
    pagination.resetPagination();
    pagination.getPagination(this.feedbackData);
  }
  getSelectedData(targetId){
    console.log('getSelectedData', targetId);
    // 顯示targetId的資料內容於Modal中
    let targetData = this.feedbackData.filter(item => item.id === +targetId)[0];
    $("#editenname").val(targetData.name);
    $("#editemail").val(targetData.email);
    $("#editphone").val(targetData.phone);
  }
  updateData(){
    console.log('updateData', targetId);
    this.feedbackData.find((item, i) => {
      if (item.id === +targetId){
        this.feedbackData[i] = {
          id: item.id,
          name: $("#editenname").val(),
          email: $("#editemail").val(),
          phone: [$("#editphone").val()],
          date: $("#editDate").text(),
        }
        return this.feedbackData;
      } 
    });
    
    $("#closeEditFormModal").click();
    $("#editform")[0].reset();

    table.refetchTable(this.feedbackData);
    pagination.resetPagination();
    pagination.getPagination(this.feedbackData);

  }
  removeData(e){
    let targetId = e.target.dataset.id;
    this.feedbackData = this.feedbackData.filter(item => item.id != targetId);

    table.refetchTable(this.feedbackData);
    pagination.resetPagination();
    pagination.getPagination(this.feedbackData);
  }
}

/**
 * 重新渲染 Table
 * @param {Array} feedbackData 欄位資料
 */
class Table {
  constructor(_data, currentRowsShown){
    this.feedbackData = _data;
    this.currentRowsShown = currentRowsShown || 5;
  }
  
  
  refetchTable(result) {
    this.feedbackData = (result)? result : [];
    
    let $element = $("#userTable>tbody");
    $element.empty();
    
    if (this.feedbackData && this.feedbackData.length) {
      // 顯示所有資料
      $.each(this.feedbackData, function (key, item) {
        let row = $("<tr></tr>");
        
        row.append($('<td></td>').html(item.name));
        row.append($('<td></td>').html(item.email));
        row.append($('<td></td>').html(item.phone));
        row.append($('<td></td>').html(item.date));
        row.append( $(`<td data-id="${item.id}" class="btnActionGroup">
        <button class="btn btn-secondary btnAction" id="edit-btn" data-id="${item.id}" >Edit</button>
        <button class="btn btn-danger btnAction" id="delete-btn" data-id="${item.id}">Delete</button>
        </td>`) );
        
        $element.append(row);
      });
      
      // 顯示總筆數
      document.getElementById("total").innerHTML = "共 " + this.feedbackData.length + " 筆資料";
      
      console.log('_data', _data);
      console.log('this.feedbackData' ,this.feedbackData);
    } else {
      $element
      .empty()
      .html($("<tr></tr>").append('<td colspan="5">No Data.</td>'));
    }
  }
  
  searchKeywords(value, _data){
    const matchsArray = [];
    // 字串不限制大小寫與去除空白
    const regexpResult = new RegExp($.trim(value), "ig");

    // 遍歷陣列中的object
    for (let i = 0, len = _data.length; i < len; i++) {
      for (let key in _data[i]) {
        // 組合一個新字串
        const scanValue = Object.keys(_data[i]).reduce((res, key) => {
          // 排除id欄位篩選
          return key !== "id" ? res + _data[i][key] : res;
        }, "");

        // 比對正則條件字串
        if (scanValue.match(regexpResult)) matchsArray.push(_data[i]);
      }
    }

    /* === 集合方法篩選唯一值 === */
    const _set = new Set();
    const result = matchsArray.filter((item) =>
      !_set.has(JSON.stringify(item)) ? _set.add(JSON.stringify(item)) : false
    );

    table.refetchTable(result);
    return !result ? [] : result;
  }
  filterKeywords(value, _data){
    // 字串不限制大小寫與去除空白
    const regexpResult = new RegExp($.trim(value), "ig");
    // 篩選物件陣列
    const result = _data.filter((obj) => {
      // 組合一個新字串
      const scanValue = Object.keys(obj).reduce((res, key) => {
        // 排除id欄位
        return key !== "id" ? res + obj[key] : res;
      }, "");

      // 比對正則條件字串
      return scanValue.match(regexpResult);
    });

    table.refetchTable(result);
    return result;
  }
  lodashFilterKeywords(value, _data){
    // 篩選物件陣列
    const result = _.filter(_data, function (obj) {
      // 組合一個新字串
      const scanValue = Object.keys(obj).reduce((res, key) => {
        // 排除id欄位
        return key !== "id" ? res + obj[key] : res;
      }, "");

      // 比對符合的字串, 不限制大小寫與去除空白
      return _.includes(
        _.lowerCase(_.trim(scanValue)),
        _.lowerCase(_.trim(value))
      );
    });

    table.refetchTable(result);
    
    return result;
  }
  showSearchResult(value, _data){
    table.searchKeywords(value, _data);
  }
}

class Pagination {
  constructor(_data, currentRowsShown){
    this.feedbackData = _data;
    this.currentRowsShown = currentRowsShown || 5;
  }
  resetPagination(){
    $('#pagination')
      .find('li')
      .slice(2,-2)
      .remove();
  }
  getPagination(_data, currentRowsShown){
    let rowsShown = currentRowsShown? currentRowsShown : 5;
  
    let numPages = Math.ceil(this.feedbackData.length/rowsShown);
  
    // 顯示分頁按鈕
    for(let i = 0; i  <numPages; i++){
      let pageNum = i+1;
      $("li#next").before('<li class="page-item" id="pageItem" rel='+ i +'><a class="page-link" href="#">'+ pageNum +'</a></li>')
    }

    // 設定特殊分頁按鈕的顯示狀態
    $("li#prev").addClass('disabled');
    $("li#start").addClass('disabled');

    if(numPages === 1) {
      $("li#next").addClass('disabled');
      $("li#end").addClass('disabled');
    }
    $('#pagination #pageItem:first').addClass('active');

    $('#data tr').hide(); //隱藏所有資料
    $('#data tr').slice(0, rowsShown).show(); //顯示指定內容數量的資料
  
    // 依照目前的分頁和顯示筆數，算出哪些資料要顯示，多餘的透過CSS隱藏
    let currPage = 0;
    let startItem = currPage * rowsShown;
    let endItem = startItem + rowsShown;
  
    $('#data tr').hide().removeClass('rowShow').slice(startItem, endItem).show().addClass('rowShow').animate({opacity:1}, 300);
    
    // 點擊分頁標籤
    $('#pagination li').on('click', function(){
      $('#pagination li').removeClass('active');
      
      // 分頁標籤狀態改變
      switch($(this).attr("id")){
        case "pageItem":
          $(this).addClass('active');
          currPage = +($(this).attr('rel'));
          break;
        case "prev":
          $('#pagination li#pageItem').eq(currPage - 1).addClass('active');
          currPage -= 1;
          break;
        case "next":
          $('#pagination li#pageItem').eq(currPage + 1).addClass('active');
          currPage += 1;
          break;
        case "start":
          $('#pagination li#pageItem').first().addClass('active');
          currPage = 0;
          break;
        case "end":
          $('#pagination li#pageItem').last().addClass('active');
          currPage = numPages - 1;
          break;
      }
  
      // 特殊分頁標籤狀態改變
      let currPageNum = +currPage;
      let maxPageNum = currPage + 1;
      
      if (currPageNum === 0){
        $("li#prev").addClass('disabled');
        $("li#start").addClass('disabled');
        $("li#next").removeClass('disabled');
        $("li#end").removeClass('disabled');
      } else if (currPageNum > 0 && maxPageNum < numPages) {
        $("li#prev").removeClass('disabled');
        $("li#start").removeClass('disabled');
        $("li#next").removeClass('disabled');
        $("li#end").removeClass('disabled');
      } else if (maxPageNum >= numPages) {
        $("li#next").addClass('disabled');
        $("li#end").addClass('disabled');
      }

      // 變動顯示的資料內容
      startItem = currPage * rowsShown;
      endItem = startItem + rowsShown;
      
      $('#data tr').hide().removeClass('rowShow').slice(startItem, endItem).show().addClass('rowShow').animate({opacity:1}, 300);
  
    });
  }
}



// 物件實體化
let table = new Table(_data, 5);
let bindEvents = new BindEvents();
let data = new Data(_data);
let pagination = new Pagination(_data);



// 頁面首次渲染的呼叫
table.refetchTable(_data);
pagination.getPagination(_data);
bindEvents.bindEvent();


let targetId = 0;
// console.log('targetId', targetId);
