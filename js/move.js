/**
 * @author Xushuai
 */
function MoveAction(div, attr, target) {
	//构造函数
	this.div = div;
	this.attr = attr;
	this.moveTo = target || 350;
	//特殊处理淡入淡出效果
	this.initStyle = attr == "opacity" ? parseInt(parseFloat(this.getStyle())*100) : parseInt(this.getStyle());
	//为该对象增加运动事件
	this.startMove();
}

MoveAction.prototype.startMove = function() {
	var _this = this;
	_this.div.onmouseover = function() {
		_this.move(_this.moveTo);
	};

	_this.div.onmouseout = function() {
		_this.move(_this.initStyle);
	};
};

MoveAction.prototype.move = function(target) {
	var _this = this;
	clearInterval(_this.div.timer);

	_this.div.timer = setInterval(function() {
		var iCur = 0;
		if(_this.attr == 'opacity'){
			iCur = parseInt(parseFloat(_this.getStyle())*100);
		} else {
			iCur = parseInt(_this.getStyle());
		}
		var speed = (target - iCur) / 8;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if (iCur == target) {
			clearInterval(_this.div.timer);
		} else {
			if(_this.attr=='opacity'){
				_this.div.style.filter='alpha(opacity:'+(iCur+speed)+')';
				_this.div.style.opacity=(iCur+speed)/100;
			} else {
				_this.div.style[_this.attr] = iCur + speed + "px";
			}
		}
	}, 30);
};

MoveAction.prototype.getStyle = function() {
	if (this.div.currentStyle) {
		return this.div.currentStyle[this.attr];
	} else {
		return getComputedStyle(this.div, false)[this.attr];
	}
}; 