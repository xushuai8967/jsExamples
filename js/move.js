/**
 * @author Xushuai
 */
function MoveAction(div) {
	//构造函数
	this.div = div;
}

MoveAction.prototype.move = function(attr, target, callback) {
	this.attr = attr;
	this.moveTo = target || 350;
	this.moveTo = attr == "opacity" ? parseInt(parseFloat(this.getStyle())*100) : parseInt(this.getStyle());

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
			if(callback != null){
				callback();
			}
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

