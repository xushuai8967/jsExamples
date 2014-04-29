function parseToDouble(num){
	return num > 10 ? num+"":"0"+num;
}

function showTime(){
	var now = new Date();
	var nowStr = parseToDouble(now.getHours())+parseToDouble(now.getMinutes())+parseToDouble(now.getSeconds());
	var imgs = document.getElementsByTagName("img");
	for(var i=0; i<nowStr.length; i++){
		imgs[i].src = "../images/digitals/"+nowStr.charAt(i)+".png";
	}
}

window.onload = function(){
	showTime();
	setInterval(showTime,1000);
}

