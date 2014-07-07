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
	
	this.settings = {
		width: 520,
		height:394
	}
}