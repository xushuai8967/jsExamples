/**
 * @author Xushuai
 */
window.onload = function() {
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		//初始化所有div
		divs[i].timer = null;
	    new MoveDiv(divs[i],"width");
	}
};

function MoveDiv(div, attr, target) {
	//构造函数
	this.div = div;
	this.attr = attr;
	this.moveTo = target || 350;
	//this.initOffsetWidth = this.div.offsetWidth;
	this.initStyle = parseInt(this.getStyle());
	//为该对象增加运动事件
	this.startMove();
}



MoveDiv.prototype.startMove = function() {
	var _this = this;
	_this.div.onmouseover = function() {
		_this.move(_this.moveTo);
	};

	_this.div.onmouseout = function() {
		_this.move(_this.initStyle);
	};
};

MoveDiv.prototype.move = function(target) {
	var _this = this;
	clearInterval(_this.div.timer);

	_this.div.timer = setInterval(function() {
		var iCur = parseInt(_this.getStyle());
		var speed = (target - iCur) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (iCur == target) {
			clearInterval(_this.div.timer);
		} else {
			_this.div.style[_this.attr] = iCur + speed + "px";
		}
	}, 30);
};

MoveDiv.prototype.getStyle = function () {
		if(this.div.currentStyle){
			return this.div.currentStyle[this.attr];
		} else {
			return getComputedStyle(this.div, false)[this.attr];
		}
};