$(function() { 

 // ホバー時クラス付与、外れた時取り消し
  $('.gnav>li>a').hover(
    function(){
  // マウスが乗った時の処理
    $(this).addClass('is-hover');},
function(){
  // マウスが外れた時の処理
    $(this).removeClass('is-hover');
}
);

// mv スライドショー
$('.js-main-visual').slick({ dots: true, });

// ホバー時黒サイドバー移動
$('.sidebar__links > li').hover(function() {
var slideIndex = $('.sidebar__links > li ').index(this);
$('.sidebar__links__bar').stop().animate({'top': slideIndex * 80}, 300);
},function() {
$('.sidebar__links__bar').stop().animate({'top': 0});
});

// もっと詳しく見る　クリック時スライドダウン
$('.js-more-content-trg').click(
function(){
$(".js-more-content").slideDown();
$(".js-more-content-trg").fadeOut();

});

  //タブクリック時aタグに'is-current'クラス付与　その他クラス消し
$('.js-tab-box-selector>li>a').on('click',function(){
  const index=$('.js-tab-box-selector>li>a').index(this);
  $('.js-tab-box-selector>li>a').removeClass('is-current');
  $(this).addClass('is-current');

  //クリックした時のタブの順番を取得し、コンテンツをそれぞれ表示、非表示
  $('.js-tab-box-content>div').hide();
  $('.js-tab-box-content>div').eq(index).show();
  return false
});

//モーダル表示ボタンクリック時、モーダルをフェードインで表示
$('.js-modal-trg').on('click',function(){
    $('.js-modal').fadeIn();
    return false;
});
//×ボタンや、黒い半透明の背景を押すとモーダルがフェードアウト
$('.js-modal-close').on('click',function(){
    $('.js-modal').fadeOut();
    return false;
});

//TOPに戻るボタンクリック時、１番上に戻る。(0.5秒ほどかけてゆっくり,スムーススクロール）
$('.js-go-top').on('click', function() {
    $('body,html').animate({
scrollTop:0})
return false;
});
});