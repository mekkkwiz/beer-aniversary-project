
let i = 0;
let text1 = "วันนี้เป็นวันที่พิเศษมากๆ ของเราทั้งคู่เลยนะงับบ";
let text2 = "เว็บนี้เป็นเว็บที่เราตั้งใจทำให้เธอ ขอให้เธอมีความสุขที่ได้อยู่กับเรานานๆนะงับบ";
let speed = 100;

function typeWriter(text, para){
	if(ok == 2){
		clearInterval(typeInterval);
	}
	if(i < text.length){
		document.getElementById(para).innerHTML += text.charAt(i);
		i++;
		speed = Math.random() * 50 + 100;
	}
	else{
		if(ok == 0){
			i = 0;
		}
		ok += 1;
	}
}

var typeInterval;

//window.onload = function() {
//	window.onload = function(){};
   	typeInterval = setInterval(function(){
		if(ok == 0){
			typeWriter(text1, "txt1");
		}
		else if(ok == 1){
			typeWriter(text2, "txt2");
		}
	}, 100);
//};
