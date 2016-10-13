//js入口文件
//引入zepto     
var $ = require('./components/zepto-modules/_custom')

//引入IScroll
var IScroll = require('./components/iscroll-master/build/iscroll.js')
//console.log($)
$('.hd').hide()
$('.swiper-container').show()

$("#enter").on('tap',function(){
	$('.hd').show()
	$('.swiper-container').hide()
	myScroll = new IScroll('#wrapper', { scrollX: true, freeScroll: true });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	$.post('/api/skill',{},function(response){
		//console.log(response)

		var html = "";
		for(var i=0;i<response.length;i++){
			html +="<li>" + response[i].category + "</li>"
			//console.log(response)
			//console.log(html)
		}
		//console.log($("#scroll ul"))
		$("#scroller ul").html(html);
		//调用IScroll
		myScroll = new IScroll('#wrapper',{mouseWheel:true});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	})
})


//引入swiper
var Swiper = require('./components/swiper/swiper.min.js');
//引入swiper animate

var swiperAnimate = require('./components/swiper/swiper.animate1.0.2.min.js');



var mySwiper = new Swiper ('.swiper-container', {
	effect:'cube',
	 pagination: '.swiper-pagination',
        paginationType: 'progress',
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAnimate.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAnimate.swiperAnimate(swiper); //初始化完成开始动画
  },
  onSlideChangeEnd: function(swiper){ 
    swiperAnimate.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
  })      

$('#footer div').on("tap",function(){
	var data=$(this).attr('id');
	$(this).addClass('active').siblings().removeClass('active');
	$.post(
		"/api/"+ data,function(text,status){
		$('#scroller ul').html("");
		$.each(text,function(index,val){
			var li=$('<li>');
			li.html(val.category);
			$('#scroller ul').append(li);
		});
	});
})
