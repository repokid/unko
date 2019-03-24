
/*
Script Name: Unko Mamire Script
Description: 押すとうんこまみれになれる全国のチビッコ達が発狂して喜ぶ夢のスクリプト。
Author: 谷 元博(Motohiro Tani)
Version: 1.0
Author URI: http://www.1-firststep.com/
Create: 2015/1/23
Last Update: 2015/1/23 制作・公開
*/




/* -------- 初期設定はここから -------- */


//unkoフォルダの設置URL(unkoフォルダを別のディレクトリに設置する場合はそのURLを記入し、行頭の//を削除してください。)
var unko_dir = location.href;
//var unko_dir = 'http://www.yahoo.co.jp';


//何色のうんこを降らせるか(全6色)
var unko_color = 6;


//どのぐらいの間隔でうんこを発生させるか
var interval_count = 400;


/* -------- 初期設定はここまで -------- */




$(function(){

//global
var window_width = $(window).width();
var window_height = $(window).height();
var timer;




//resize event
$(window).on('resize' , resize);
  
function resize(){
  window_width = $(window).width();
  window_height = $(window).height();
}



//unko start
$('form#unko').submit(function(event){
  
  event.preventDefault();
  
  $('form#unko input.start').css({
    'display' : 'none'
  });
  $('form#unko input.stop').css({
    'display' : 'inline-block'
  });
  
  timer = setInterval(unko_loop, interval_count);
  
});


//unko stop
$('form#unko input.stop').click(function(){
  
  $('form#unko input.start').css({
    'display' : 'inline-block'
  });
  $('form#unko input.stop').css({
    'display' : 'none'
  });
  
  $('body').css('overflow-x' ,'visible');
  
  clearInterval(timer);
  $('img.unko').remove();
  
});




//unko loop
function unko_loop(){
  
  var random_unko = Math.floor( Math.random() * unko_color );
  
  $('body').css('overflow-x' ,'hidden');
  
  $('<img>')
    .appendTo('body')
    .attr('src' , unko_dir +'/image/unko-'+ random_unko +'.png')
    .addClass('unko')
    .css({
      'display' : 'none',
      'position' : 'fixed',
      'z-index' : '50'
    })
    .load(function(){
      
      var img_width = $(this).width();
      var img_height = $(this).height();
      var random_width = Math.floor( Math.random() * window_width );
      
      $(this).css({
        'display' : 'inline-block',
        'top' : -img_height +'px',
        'left' : random_width +'px'
      })
      .animate({
        'top' : window_height +'px'
      }, window_height*3, 'easeInQuad', function(){
        $(this).remove();
      });
      
    });
    
}

});
