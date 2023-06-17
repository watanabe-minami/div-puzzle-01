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

  $(function() {
    $('.js-tab-box-selector a').on('click', function() {
      $('.js-tab-box-selector a').removeClass('is-current');
      $(this).addClass('is-current');
      var index = $('.js-tab-box-selector a').index(this);
      $('.js-tab-box-content > div').hide();
      $('.js-tab-box-content > div').eq(index).fadeIn();
      return false;
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
        return false;
    });
    });

$(function(){
    $('.js-go-top').on('click',function(){
        $('html').animate({scrollTop:0},500);
        })
    })