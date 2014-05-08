/**
 * @author Xushuai
 */
window.onload = function() {
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		//初始化所有div
		divs[i].timer = null;
	    new MoveDiv(divs[i]);
	}
};

function MoveDiv(div,target) {
	//构造函数
	this.div = div;
	this.moveTo = target || 350;
	this.initOffsetWidth = this.div.offsetWidth;
	//为该对象增加运动事件
	this.startMove();
}

MoveDiv.prototype.startMove = function() {
	var _this = this;
	_this.div.onmouseover = function() {
		_this.move(_this.moveTo);
	};

	_this.div.onmouseout = function() {
		_this.move(_this.initOffsetWidth);
	};
};

MoveDiv.prototype.move = function(target) {
	var _this = this;
	clearInterval(_this.div.timer);

	_this.div.timer = setInterval(function() {
		var speed = (target - _this.div.offsetWidth) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (_this.div.offsetWidth == target) {
			clearInterval(_this.div.timer);
		} else {
			_this.div.style.width = _this.div.offsetWidth + speed + "px";
		}
	}, 30);
};
