$(function () {
  //更换背景实例化
  var bgEvent = new ChangeBg('#bg-button li', '.bg')

  //滚屏
  $('#fullpage').fullpage({
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['关于我','作品','工作经历'],
    onLeave: function (index,nextIndex,direction) {
      var _index = index - 1;
      setTimeout( function () {
        $('.bg').eq(_index).css('background-image','url(' + bgEvent.bg[Math.ceil(Math.random()*(bgEvent.bg.length - 1))] + ')');
      },500)
    }
  });

  //作品轮播
  var mySwiper = new Swiper('.swiper-container', {
    autoplay: false,
    pagination : '.swiper-pagination',
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    touchRatio: 0.5,
  })

})

function ChangeBg (btn, target) {
  var _self = this
  this.bg = []
  this.target = $(target)
  this.bg_tag = {
    '风光': '%E4%B8%96%E7%95%8C%E9%A3%8E%E5%85%89',
    '宠物': '%E8%90%8C%E5%AE%A0',
    '影视': '%E5%BD%B1%E8%A7%86',
    '动漫': '%E5%8A%A8%E6%BC%AB',
    '游戏': '%E6%B8%B8%E6%88%8F',
    '美女': '%E7%BE%8E%E5%A5%B3',
    '汽车': '%E6%B1%BD%E8%BD%A6',
    '军事': '%E5%86%9B%E4%BA%8B'
  }
  $(btn).on('click',function () {
    $('.bg-active').removeClass('bg-active');
    $(this).addClass('bg-active')
    var _tag = _self.bg_tag[$(this).html()]
    _self.getImg(_tag);
  })
  this.getImg('%E5%85%A8%E9%83%A8');
}

ChangeBg.prototype.getImg = function (tag) {
  var _self = this
  var _url = 'http://pic.sogou.com/pics/channel/getAllRecomPicByTag.jsp?category=%E5%A3%81%E7%BA%B8&tag=' + tag + '&start=0&len=30&width=1280&height=720';
  $.ajax({
    url: _url,
    dataType: 'jsonp',
    crossDomain: true,
    success: function (data) {
      if(data){
        _self.bg = [];
        $.each(data.all_items,function(i, item) {
          if(item.ori_pic_url) {
            _self.bg.push(item.ori_pic_url);
          }
        });
        _self.target.map(function (i,item) {
          console.oo
          $(this).css('background-image','url(' + _self.bg[Math.ceil(Math.random()*(_self.bg.length - 1))] + ')');
        })
      }
    }
  })
}