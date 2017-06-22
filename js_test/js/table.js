function CreateTable() {//创建生成表格函数
	this.oTable  = null;
	this.bgColor = 0;
}
CreateTable.prototype = {//生成表格需要的属性与方法
	init: function(row, col) {
		var oFrag = document.createDocumentFragment();//创建文档片段对象
		var oTemp = document.createElement("div");//创建一个包含表格的div
		var oBody = document.body;
		var aRow  = [];//行数组
	    var aCol  = [];//列数组
		for(var i = row; i--;) {
			aCol.length = 0;			
			for(var j = col; j--;) {
				this.bgColor = this.getRanColor();//随机颜色
				aCol.push("<td style=\"background:"+ this.bgColor +";\">"+this.randomRange(1, 15)+"</td>");
			}
				aRow.push("<tr>"+ aCol.join("") +"</tr>")
		}
		//oTemp.innerHTML = "";
		oTemp.innerHTML = "<table><tbody>"+ aRow.join("") +"</tbody></table>";////join() 方法用于把数组中的所有元素转换一个字符串。join("")去掉原本格式
		//while(oTemp.firstChild){//如果<table>存在，就放进创建的文档片段对象
		//	oFrag.appendChild(oTemp.firstChild);
		//}
		//this.oTable && oBody.removeChild(this.oTable);//把之前的table去掉
		//oBody.appendChild(oFrag);
		
		this.oTable && oBody.removeChild(this.oTable);//把之前的table去掉
		while(oTemp.firstChild){
			oBody.appendChild(oTemp.firstChild);
		}
	
		this.oTable = oBody.lastChild;
	},
	randomRange: function(lower, upper) {//随机数字
		return Math.floor(Math.random() * (upper - lower + 1) + lower)	
	},
	getRanColor: function() {//随机颜色
		var str = this.randomRange(0, 0xF0F0F0).toString(16);//将随机的颜色转为16进制的字符串
		while(str.length < 6) str = "0" + str;
		return "#" + (this.bgColor.toString().replace("#", "").toString(10) === str.toString(10) ? str + 100000 : str)
	}
};
			
window.onload = function() {
	var oTab = new CreateTable();
	var oRow = document.getElementById("row");
	var oCol = document.getElementById("col");
	var oBtn = document.getElementById("btn");
	var oMsg = document.getElementById("msg");
			
	oBtn.onclick = function() {
		var reg = /^((?!0)\d{1,2}|100)$/;//使用正则表达式，只允许输入1-100之间的数
		if(!reg.test(oRow.value)) {//test() 方法用于检测一个字符串是否匹配某个模式.这里匹配行里输入的值是否在1-100
			alert("请输入1-100之间的数");
			oRow.select();
			return
		}
					else if(!reg.test(oCol.value)) {//这里匹配列里输入的值是否在1-100
						alert("请输入1-100之间的数");
						oCol.select();
						return
					}
					//隐藏信息区域
					oMsg.style.display = "none";
					//防止内存泄漏
					oTab.oTable && (oTab.oTable.onclick = null);
					//重新渲染表格
					oTab.init(oRow.value, oCol.value);
					//事件代理
					oTab.oTable.onclick = function(e) {
						e = e || event;
						var oTarget = e.target || e.srcElement;
						if(oTarget.tagName.toUpperCase() === "TD") {
							oMsg.style.display = "block";
							oMsg.innerHTML = "";
							oMsg.innerHTML = "<span>\u60a8\u9009\u62e9\u7684\u533a\u57df\u6570\u5b57\u662f\uff1a"+oTarget.innerHTML+"\uff0c\u989c\u8272\u4e3a\uff1a"+"</span><em style=\"background:"+ oTarget.style.backgroundColor +";\"></em><span>"+oTarget.style.backgroundColor+"</span>";	
						}
					}
				}
};











/*window.onload=function(){
	var oRow = document.getElementById("row");
	var oCol = document.getElementById("col");
	var oBtn = document.getElementById("btn");
	var oMsg = document.getElementById("msg");
    var s=document.getElementById("setting");
    alert(s.childNodes.length);
	oBtn.onclick=function(){
		//判断行与列中输入的数字，限制在1-50以内
		JudgeNumberRange(oRow.value);
		JudgeNumberRange(oCol.value);
		
		//生成一表格，表格的行是数组，列也是数组，表格里数字时随机的，外部函数
		RemoveTable();
		CreateTable(oRow.value,oCol.value);
	}
	
    function JudgeNumberRange(em){
		var reg=/^((?!0)\d{1,2}|100)$/;
		if(!reg.test(em)){
			alert("请输入1-100之间的数");
			em.select();
			return
		}
	}
	
	function CreateRangeNumber(){
		return Math.floor(Math.random() * 15 + 1);
	}
	
	function CreateTable(row,col){//生成表格，传入输入的行数值与列数值
		
		var oFrag = document.createDocumentFragment();//创建文档片段对象
		var oTemp = document.createElement("div");//创建一个包含表格的div
		var oBody = document.body;//得到body对象，方便创建的表格div放入
		var aRow  = new Array();//行数组
	    var aCol  = new Array();//列数组
	    for(var i=row;i--;){
	    	aCol.length=0;
	    	for (var j=col;j--;) {
	    		aCol.push("<td>"+CreateRangeNumber()+"</td>");
	    	}
	    	aRow.push("<tr>"+aCol.join("")+"</tr>");//join() 方法用于把数组中的所有元素转换一个字符串。join("")去掉原本格式
	    }
		//在div中插入表格，也可以使用appendChild()
		oTemp.innerHTML = "<table><tbody>"+ aRow.join("") +"</tbody></table>";//在oTemp里插入<table>
		oTemp.setAttribute("id","tablec");
		while(oTemp.firstChild){//如果<table>存在，就放进创建的文档片段对象
			oFrag.appendChild(oTemp.firstChild);
		}
		oBody.appendChild(oFrag);//将新的table添加进去
	}
	
	function RemoveTable(){
		var oTable=null;
		oTable=document.body.lastChild;
		if (oTable) {
			document.body.removeChild(oTable);
		}
		
	}
	
	
}*/	
	
	

