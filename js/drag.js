function Drag(id, width, height, left, top) {
	//构造函数
	this.oDiv = document.getElementById(id);
	this.disX = 0;
	this.disY = 0;
	this.width = width || 100;
	this.height = height || 100;
	//浏览器可视区域size
	this.browserWidth = this.getBrowserSize().width;
	this.browserHeight = this.getBrowserSize().height;
	//默认位置在中间
	this.left = left || (this.browserWidth - this.width) / 2;
	this.top = top || (this.browserHeight - this.height) / 2;

	//渲染div
	this.oDiv.style.height = this.height + "px";
	this.oDiv.style.width = this.width + "px";
	this.oDiv.style.left = this.left + "px";
	this.oDiv.style.top = this.top + "px";
	//注册移动事件
	this.move();
}

Drag.prototype.move = function() {
	//用到事件时，注意保存this，否则在事件里this不代表oDiv对象
	var _this = this;
	_this.oDiv.onmousedown = function(e) {
		var ev = e || event;
		//获取鼠标点击div时，div的位置
		_this.disX = ev.clientX - _this.oDiv.offsetLeft;
		_this.disY = ev.clientY - _this.oDiv.offsetTop;
		//鼠标移动事件加在document上，否则一旦鼠标移除div，事件失效
		document.onmousemove = function(e) {
			var ev = e || event;
			var left = ev.clientX - _this.disX;
			var top = ev.clientY - _this.disY;

			//防止拖出可视区域
			if (left < 0) {
				left = 0;
			}

			if (left >= _this.browserWidth - _this.width) {
				left = _this.browserWidth - _this.width;
			}

			if (top < 0) {
				top = 0;
			}

			if (top >= _this.browserHeight - _this.height) {
				top = _this.browserHeight - _this.height;
			}

			_this.oDiv.style.left = left + "px";
			_this.oDiv.style.top = top + "px";
		};

		_this.oDiv.onmouseup = function(e) {
			document.onmousemove = null;
			_this.oDiv.onmouseup = null;
		};
	};
};
//获取浏览器可视区域大小
Drag.prototype.getBrowserSize = function() {
	var size = {};
	size.width = window.innerWidth || document.documentElement.clientWidth;
	size.height = window.innerHeight || document.documentElement.clientHeight;
	return size;
}; 