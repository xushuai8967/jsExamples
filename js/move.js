/**
 * @author Xushuai
 */
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, config, callback) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var isStop = true;
		for (var attr in config) {
			var target = config[attr];
			var current = attr == 'opacity' ? parseInt(parseFloat(getStyle(obj, attr)) * 100) : parseInt(getStyle(obj, attr));
			var speed = (target - current) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if (target != current) {
				isStop = false;
			}

			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (current + speed) + ')';
				obj.style.opacity = (current + speed) / 100;
			} else {
				obj.style[attr] = current + speed + 'px';
			}

		}
		
		if (isStop) {
			clearInterval(obj.timer);

			if (callback) {
				callback();
			}
		}
	}, 30);
}

