// JavaScript Document

//数组数据，动画按钮,  展示形式
$(function(){
	
	function Factory(options){
		var switchPic = new SwitchPic();
		switchPic.init(options);
	}
	
	$.switchPic = $.fn.switchPic = Factory;
	
})


function SwitchPic(){
	
	this.$switchPic = null;
	this.iNow = 0;
	this.timer = null;
	this.timing = null;
	
	this.settings = {
		id : '',
		width: 0,
		height:0,
		className : 'focus_ui',
		btns : true,
		txts : false,
		counts : 3,
		autoPlay : true,
		playTime:5,
		btnTiming : true,
		data : {
			src : [],
			href :[],
			title :[],
			txt:[]
		}
	}
}

SwitchPic.prototype = {
	
	constructor : SwitchPic,
	
	init : function(options){
		
		$.extend(true,this.settings, options);
		
		this.$switchPic = $('#'+this.settings.id);
		this.template();
		this.styleSize();
		this.play();
		this.autoPlay();
		this.time();
		
	},
	
	template : function(){
		var html = '<div class="'+this.settings.className+'"><ul class="focus_pic">'
			for(var i=0; i<this.settings.counts;i++){
				html += '<li'+(i==0 ? ' class="active"':'')+'><a href="'+this.settings.data.href[i]+'" title="'+this.settings.data.title[i]+'"><img src="'+this.settings.data.src[i]+'"></a>'+ (this.settings.txts ?'<p>'+this.settings.data.txt[i]+'</p>' :'')+'</li>'
			}
			html +='</ul><ul class="focus_btn">';
			for(var i=0; i<this.settings.counts;i++){
				html+='<li'+(i==0 ? ' class="active"':'')+'><span></span></li>'
			}
        	html +='</ul><div class="prev"></div><div class="next"></div></div>';
		
		this.$switchPic.html(html);
	},
	
	styleSize:function(){
		this.$switchPic.find('.focus_pic').css({
			width: this.settings.width,
			height:this.settings.height
		});
		var w = this.$switchPic.find('.focus_btn li').outerWidth(true);
		this.$switchPic.find('.focus_btn').css({
			marginLeft : -w*this.settings.counts/2
		})
		
	},
	
	play : function(){
		var This = this;
		var $Btn = this.$switchPic.find('.focus_btn li');
		var $Pic = this.$switchPic.find('.focus_pic li');
		var $ulPic = this.$switchPic.find('.focus_pic');
		var $Prev = this.$switchPic.find('.prev');
		var $Next = this.$switchPic.find('.next');
		var $Span = this.$switchPic.find('.focus_btn li span');
		var w = this.$switchPic.find('.focus_btn li').width();
		
		$Btn.click(function(){
			This.iNow = $(this).index();
			$Span.eq(This.iNow).width(w);
			$Btn.removeClass('active');
			$(this).addClass('active');
			$Pic.removeClass('active');
			$Pic.eq(This.iNow).addClass('active');
		});
		
		this.$switchPic.mouseover(function(){
			clearInterval(This.timer);
			clearInterval(This.timing);
			$Span.eq(This.iNow).width(w);
			This.$switchPic.find('.prev').show();
			This.$switchPic.find('.next').show();
		});
		this.$switchPic.mouseout(function(){
			This.$switchPic.find('.prev').hide();
			This.$switchPic.find('.next').hide();
			if(This.settings.autoPlay){
				This.timer = setInterval(function(){
					This.iNow++;
					if(This.iNow>This.settings.counts-1){
						This.iNow = 0;	
					}
					$Btn.removeClass('active');
					$Btn.eq(This.iNow).addClass('active');
					$Pic.removeClass('active');
					$Pic.eq(This.iNow).addClass('active');
				},This.settings.playTime)
			}
			if(This.settings.btnTiming){
				$Span.width(0);
				This.timing = setInterval(function(){
					$Span.eq(This.iNow).css({
						width : '+=1'
					})
					if($Span.eq(This.iNow).width() == w){
						$Span.eq(This.iNow).width(0)
					}
				},This.settings.playTime/w)
			}
		});
		
		$Prev.mouseover(function(){
			$(this).show();
		});
		$Next.mouseover(function(){
			$(this).show();
		});
		$Prev.mouseout(function(){
			$(this).hide();
		});
		$Next.mouseout(function(){
			$(this).hide();
		});
		
		$Next.click(function(){
			This.iNow++;
			if(This.iNow>This.settings.counts-1){
				This.iNow = 0;	
			}
			$Span.eq(This.iNow).width(w);
			$Btn.removeClass('active');
			$Btn.eq(This.iNow).addClass('active');
			$Pic.removeClass('active');
			$Pic.eq(This.iNow).addClass('active');
		});
		
		$Prev.click(function(){
			This.iNow--;
			if(This.iNow<0){
				This.iNow = This.settings.counts-1;
			}
			$Span.eq(This.iNow).width(w);
			$Btn.removeClass('active');
			$Btn.eq(This.iNow).addClass('active');
			$Pic.removeClass('active');
			$Pic.eq(This.iNow).addClass('active');
		})
	},
	
	autoPlay : function(){
		var This = this;
		var $Btn = this.$switchPic.find('.focus_btn li');
		var $Pic = this.$switchPic.find('.focus_pic li');
		
		if(this.settings.autoPlay){
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				This.iNow++;
				if(This.iNow>This.settings.counts-1){
					This.iNow = 0;	
				}
				$Btn.removeClass('active');
				$Btn.eq(This.iNow).addClass('active');
				$Pic.removeClass('active');
				$Pic.eq(This.iNow).addClass('active');
			},this.settings.playTime)
		}
		
	},
	
	time : function(){
		
		if(this.settings.autoPlay && this.settings.btnTiming){
			var This = this;
			var $Span = this.$switchPic.find('.focus_btn li span');
			var w = this.$switchPic.find('.focus_btn li').width();
			$Span.width(0);	
			clearInterval(this.timing);
			this.timing = setInterval(function(){
				$Span.eq(This.iNow).css({
					width : '+=1'
				})
				if($Span.eq(This.iNow).width() == w){
					$Span.eq(This.iNow).width(0)
				}
			},This.settings.playTime/w)
			
		}
		
	}
	
}














