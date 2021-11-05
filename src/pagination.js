import { assign } from './lib.js';

export default {
  resetPagination(){
    $('#pagination')
      .find('li')
      .slice(2,-2)
      .remove();
  },
  getPagination( result ){
    console.log("hi getPagination");
    let { saveData, options } = this;
    let data = result? result: saveData;

    this.resetPagination();
    let rowsShown = options.perPage;
    let numPages = Math.ceil(data.length/options.perPage);
  
    // 顯示分頁按鈕
    for(let i = 0; i < numPages; i++){
      let pageNum = i + 1;
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
      switch(this.id){
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
      startItem = currPage * +rowsShown;
      endItem = startItem + +rowsShown;
      
      $('#data tr').hide().removeClass('rowShow').slice(startItem, endItem).show().addClass('rowShow').animate({opacity:1}, 300);
    });
  
  }
}