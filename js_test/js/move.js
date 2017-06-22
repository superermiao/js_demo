
/*event.clientX、event.clientY鼠标相对于浏览器窗口可视区域的X，Y坐标（窗口坐标），可视区域不包括工具栏和滚动条。
event.offsetX、event.offsetY鼠标相对于事件源元素（srcElement）的X,Y坐标
event.screenX、event.screenY鼠标相对于用户显示器屏幕左上角的X,Y坐标。
event.pageX、event.pageY类似于event.clientX、event.clientY，但它们使用的是文档坐标而非窗口坐标。
* */

window.onload = function ()
{
	var oDiv = document.getElementsByTagName("div")[0];
	var aInput = document.getElementsByTagName("input");
	var oP = document.getElementsByTagName("p")[0];
	var i = 0;
	
	aInput[0].onclick = function (event)
	{		
		(event || window.event).cancelBubble = true;//阻止事件冒泡，e:源事件元素->>父级元素事件->>body-->>document
		clearEvent();//清除上一次点击的事件
		aInput[0].value += "(已激活)";
		oP.innerHTML = "鼠标点击页面， 人物将移动至鼠标位置！";
		document.onclick = function (event)//在空白出点击的时候
		{
			var event = event || window.event;//阻止事件冒泡，当点击按钮不会动
			oDiv.style.background = "url(img/p2.gif) no-repeat";//改变移动的时候的图片
			startMove(oDiv, {x:event.clientX, y:event.clientY}, function(){oDiv.style.background = "url(img/p1.gif) no-repeat"});//开始移动
			return false;
		}	
	};
	
	aInput[1].onclick = function (event)
	{		
		(event || window.event).cancelBubble = true;
		clearEvent();
		this.value += "(已激活)";
		oP.innerHTML = "按住鼠标左键，在页面划动，人物将按照鼠标轨迹移动。"
		var aPos = [{x:oDiv.offsetLeft, y:oDiv.offsetTop}];
		document.onmousedown = function (event)
		{
			var event = event || window.event;			
			aPos.push({x:event.clientX, y:event.clientY});
			document.onmousemove = function (event)//鼠标移动轨迹
			{
				var event = event || window.event;
				aPos.push({x:event.clientX, y:event.clientY});	
				return false;
			}
			return false;
		}
		document.onmouseup = function ()
		{
			document.onmousemove = null;//事件为空
			oDiv.style.background = "url(img/p2.gif) no-repeat";		
			var timer = setInterval(function ()//设置定时器
			{
				if(aPos.length == 0)//当没有移动的时候
				{
					clearInterval(timer);//清除定时器
					oDiv.style.background = "url(img/p1.gif) no-repeat";//背景换成原来的
					return;	
				};
				oDiv.style.left = aPos[0].x + "px";
				oDiv.style.top = aPos[0].y + "px";
				aPos.shift();//shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
			}, 30);
		};
	}
	
	//没有此函数，则当鼠标按下的时候，已激活不会取消.
	function clearEvent()
	{
		
		document.onclick = null;//清楚鼠标点击的事件执行
		document.onmousedown = null;//清楚鼠标按下后的事件执行
		document.onmousemove = null;//清楚鼠标移动的事件执行
		document.onmouseup = null;//清楚文档鼠标按下起来后的事件执行
		for (i = 0; i < aInput.length; i++)
		{
			aInput[i].value = aInput[i].value.replace("(已激活)", "");//先取消激活状态
			aInput[i].onmousedown = aInput[i].onmouseup = function (event)//防止事件冒泡
			{
				(event || window.event).cancelBubble = true;	
			};
		}
	}
};
function startMove(obj, oTarget, fnEnd)
{
	clearInterval(obj.timer);//先清除目标定时器
	obj.timer = setInterval(function ()
	{
		doMove(obj, oTarget, fnEnd)	
	}, 30)	
}
function doMove(obj, oTarget, fnEnd)
{
	var iX = (oTarget.x - obj.offsetLeft) / 5;
	var iY = (oTarget.y - obj.offsetTop) / 5;
	iX = iX > 0 ? Math.ceil(iX) : Math.floor(iX);
	iY = iY > 0 ? Math.ceil(iY) : Math.floor(iY);
	if (oTarget.x == obj.offsetLeft && oTarget.y == obj.offsetTop)
	{
		clearInterval(obj.timer);
		fnEnd && fnEnd();	
	}
	else
	{
		obj.style.left = obj.offsetLeft + iX + "px";
		obj.style.top = obj.offsetTop + iY + "px";	
	}
}

