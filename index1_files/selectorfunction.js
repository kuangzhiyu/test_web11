//点击层外关闭层
function closeAllDiv(layer0,but0){
	
	obj = document.activeElement;
	flag = true;
	var i=0;
	while(obj != null && flag)
	{
		i++;
		if(obj.id == layer0 || obj.id == but0)
		{	
			flag = false;
		} 

		obj = obj.parentElement;
	}
	
	if(flag&i>0)
	{
		obj0 = document.getElementById(layer0);
		
		obj0.style.display = "none";
 	    showSelect(layer0);
	}
	
}


function showOrHid(objId){
	obj=document.getElementById(objId);
	if(obj==null) return;
	if(obj.style.display==""){
	  obj.style.display="none";
	}else{
	  obj.style.display=""
	}
}

function show(objId){
	obj=document.getElementById(objId);
	obj.style.display="";	
}

function ridFromAry(str,ary){
	var strResult="";
    for(i=0;i<ary.length;i++){
	//alert("ary="+ary[i]+":str="+str);
	    if(ary[i]==str){
	       continue;
	    }else{
	       if(strResult==""){
		       strResult=ary[i];
		   }else{
		      strResult+=";"+ary[i];
		   }
	   }
	}
    return strResult;
}

/** 判断变量值是否存在数组元素中
@param strAim 目标变量
@param arySource 要判断的数组
@return true变量存在于数组中，false变量不在数组中
*/
function inAry(strAim,arySource){
  for(h=0;h<arySource.length;h++){
    if(strAim==arySource[h]){
	  return true;
	  break;
	}
  }
  return false;
}

/** 判断变量值是否存在数组元素中
@param strAim 目标变量
@param arySource 要判断的数组
@return 变量存在于数组中的第一维的位置，－1变量不在数组中
*/
function inAryIndex(strAim,arySource){
  for(h=0;h<arySource.length;h++){
    if(strAim==arySource[h]){
	  return h;
	  break;
	}
  }
  return -1;
}

/** 判断变量值是否存在数组元素中
@param strAim 目标变量
@param arySource 要判断的数组为二维数组
@return 变量存在于数组中的第一维的位置，－1变量不在数组中
*/
function inAry2(strAim,arySource){
  for(h=0;h<arySource.length;h++){
    if(strAim==arySource[h][5]){
	  return h;
	  break;
	}
  }
  return -1;
}

function divClose(strDiv){
	showSelect(strDiv);
  	var oDiv=document.getElementById(strDiv);
  	var t   =document.getElementById("temp");
  	if(t!=null) document.getElementById("temp").value=1;
  	if(oDiv!=null) oDiv.style.display="none";
	if(b_trigger != ""){
		eval(b_trigger);
	}
}

//将悬浮层的位置定位在屏幕中央
function setDivInCenter(divId){
	/**
	var objdiv=document.getElementById(divId);
	x = document.documentElement.scrollLeft;
	y=0;
	frameHeight=0;
	topFrameHeight=0;
	try{
	if(parent!=null){
	  y = parent.document.documentElement.scrollTop;
	  var oframe=parent.document.getElementById("frame_main");
	  var otopframe=parent.document.getElementById("frame_top");
	  if(oframe!=null){
		  frameHeight=oframe.style.height;
		  frameHeight=frameHeight.substring("0",frameHeight.indexOf("px"));
	  }
	  if(otopframe!=null){
		  topFrameHeight=otopframe.style.height;
		  topFrameHeight=topFrameHeight.substring("0",topFrameHeight.indexOf("px"));
	  }
	}else{
	  y = document.documentElement.scrollTop;		
	}
	}catch(e){}

	//获取屏幕宽度
	availWidth = window.document.body.offsetWidth;
	availHeight = window.document.body.clientWidth;
  
  var tblWidth = parseInt(objdiv.style.width);

	if(frameHeight>y&y>topFrameHeight){//处于框架中，并且滚动条已拉动的距离大于头部框架的高度
	  y = y -topFrameHeight;		
	}else{
	  y = y + availHeight/5;		
	}
	x = (availWidth - tblWidth)/2;	
	
	objdiv.style.top = y+"px";
	objdiv.style.left = x+"px";
	*/
}

//
function revertCheck(oCheck){
  if(oCheck.checked==false){
	oCheck.checked=true;  
  }else{
	oCheck.checked=false;  	  
  }
}

function hiddenSelect(id){ 
	   var objDiv;
	   if(id){
		  objDiv = document.getElementById(id);
		  if(!objDiv.arrToggleTags) objDiv.arrToggleTags=new Array();
		  if(!objDiv.exCon) objDiv.exCon = '';
   
		  if(objDiv.arrToggleTags){
		     objDiv.arrToggleTags = fToggleTags(objDiv,objDiv.exCon,'select');
		     for(var i=0;objDiv.arrToggleTags[i];i++) {
				 objDiv.arrToggleTags[i].style.visibility = "hidden";
			 }
		  }
	   }
}

function showSelect(id){ 
	   var objDiv;
	   if(id){
		  objDiv = document.getElementById(id);
		  if(objDiv.arrToggleTags){
		     for(var i=0;objDiv.arrToggleTags[i];i++) objDiv.arrToggleTags[i].style.visibility = "visible";
		     objDiv.arrToggleTags.length=0;
		  }
	   }
}

function fToggleTags(objLayer,exConTagInBound,tagN){
    var exConStr = '';
	var arrToggleTags = new Array();
    if(exConTagInBound!='') exConStr=exConTagInBound;
    var arrTags = document.getElementsByTagName(tagN);
    for(var i=0;i<arrTags.length;i++)
 		if((exConStr!=''?eval('arrTags.item(i).'+exConStr):true) && fTagInBound(objLayer,arrTags.item(i))){
			if(document.arrExCon && document.arrExCon.length){
			   for(var j=0;document.arrExCon[j];j++) if(eval('arrTags.item(i).'+document.arrExCon[j])) arrToggleTags[arrToggleTags.length] = arrTags.item(i);}
			else arrToggleTags[arrToggleTags.length] = arrTags.item(i);
		}
	return arrToggleTags;
}
function fTagInBound(objLayer,aTag){
  with (objLayer){
  	var l = parseInt(style.left);
  	var t = parseInt(style.top);
  	var r = l+parseInt(offsetWidth);
  	var b = t+parseInt(offsetHeight);
	var ptLT = fGetXY(aTag);
	return !((ptLT.x>r)||(ptLT.x+aTag.offsetWidth<l)||(ptLT.y>b)||(ptLT.y+aTag.offsetHeight<t));
  }
}
function fGetXY(aTag){
  var oTmp = aTag;
  var pt = new Point(0,0);
  do {
  	pt.x += oTmp.offsetLeft;
  	pt.y += oTmp.offsetTop;
	if(!oTmp.offsetParent) return false; //for NS
  	oTmp = oTmp.offsetParent;
  } while(oTmp.tagName!="BODY");
  return pt;
}
function Point(iX, iY){
	this.x = iX;
	this.y = iY;
}