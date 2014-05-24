function getStyle(obj, attr){
	//取样式，非行间样式
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj, false) [attr];
	}
}

function startMove(obj, config, callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var canStop = true;    //所有的属性都已运动到target
		for(var attr in config){
			//每30ms 将config里所有属性都运动一遍
			//bug 可能某个属性运动完成，其他属性运动将被卡住
			//避免offset其他样式造成的影响

			//step 1: 取当前值
			var current = 0;
			var target = config[attr];
			if(attr == "opacity"){
				//干掉小数部分，以防出现3 = 3.0000000000001类似的情况
				current = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				current = parseInt(getStyle(obj, attr));
			}
			//step 2: 取速度
			var speed = (target - current) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//step 3: 监测停止状态
			if(current != config[attr]){
				//仍然有一个属性没有运动到终点
				//将继续运行 直到所有都运动到终点
				canStop = false;
			}
			if(attr == "opacity"){
					obj.style.filter = 'alpha:(opacity:' + (current+speed) + ' )';
					obj.style.opacity = (current+speed) / 100;
			} else {
					obj.style[attr] = current + speed + 'px';	//到达之前
			}
		}

		if (canStop) {
			//终点和当前位置已经不足以完成一次运动，停止定时器
			clearInterval(obj.timer);     //已经到达终点
			//并将位置设为终点所在位置
			//obj.style.attr = target + "px";
			//支持链式运动，增加运动结束后回调
			if(callback){
				callback();
			}
		}
		
	},30);
}
