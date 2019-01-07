//display a clock	在页面顶端显示一个实时时钟的函数，用于美化界面
function startTime(){
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
	t = setTimeout(function(){startTime()},500);
}

function checkTime(i){
	if (i < 10){
		i = "0" + i;
	}
	return i;
}