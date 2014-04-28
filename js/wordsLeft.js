/**
 * @author Xushuai
 * 输入框剩余字数提示
 */
window.onload = function(){
	//为textarea注册事件
	var text = document.getElementById('inputT');
	text.oninput = onchange;
	//ie 下
	//text.onpropertychange = onchange;
};

function wordsLength(str){
	//处理双字节语言
	return String(str).replace(/[^\x00-\xff]/g,'aa').length;
}

function onchange(){
	var text = document.getElementById('inputT').value;
	var num = Math.ceil(wordsLength(text)/2);//已经输入的个数
	var p = document.getElementById('left');
	if(140 > num){
		//剩余字数
		p.value = 140 - num;
	}else{
		//超出字数
		p.value = num - 140;
		p.style.color = red;
	}
}
