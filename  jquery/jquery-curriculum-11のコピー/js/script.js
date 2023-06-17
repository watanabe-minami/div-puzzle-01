$(function(){
    $('.gnav>li>a').hover(
        function(){
            $(this).addClass("is-hover");
        },
        function(){
            $(this).removeClass("is-hover");
        }, 
    )
});

$('.js-main-visual').slick({ dots: true, });

$('.sidebar__links > li').hover(function() {
    var slideIndex = $('.sidebar__links > li ').index(this);
    $('.sidebar__links__bar').stop().animate({'top': slideIndex * 80}, 300);
  },function() {
    $('.sidebar__links__bar').stop().animate({'top': 0});
  });
  
$('.js-more-content-trg').click(function(){
    $('.js-more-content-trg').fadeOut();
    $('.js-more-content').slideDown(300);
    return false;
    
})
/*⑤から 複数指示する用法がわからない
$('.js-tab-box-selector').click(function(){
    $('.js-tab-box-selector>a').addClass("is-current");
    $('.js-tab-box-selector>a').fadeOut();
    var i = $('js-tab-box-content').index(this);
});*/

$(function() {
    $('.js-tab-box-selector').on('click', function() {
      $('.js-tab-box-selector>a').addClass('.is-current');
      $('this').removeClass('.is-current');
    
      var index = $('.js-tab-box-selector').index(this);
      $('.js-tab-box-content').eq(index).addClass('.is-current');
    });
  });
  //--------------------------------------------------------------//


$(function(){
$('.js-modal-trg').on('click',function(){
    $('.js-modal').fadeIn();
});
});

$(function(){
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
    });
    });

$(function(){
    $('.js-go-top').on('click',function(){
        $('html').animate({scrollTop:0},500);
        })
    })