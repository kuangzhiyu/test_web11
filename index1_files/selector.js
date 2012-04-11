//InstanceName:对象名称；maxNum：最多可以选择多少类别；sType：0城市选择，1岗位选择
//colNUM://分成多少列来显示
function Selector(InstanceName,maxNum,sType,colNUM){
//对象名称
  this.instanceName=InstanceName;
//保存结果的表单域
  this.oResultField=null;
//最多选择的个数
  this.maxNum=maxNum;

  this.rowHeight=22;//选择器的行高
  this.divWidth=500;


//不同类别选择器的不同参数  
  this.parentTitle="(选择此大类，将包括以下所有小类)";
  this.selectorName="城市";
  this.typeAry=new Array();//类别数组
  this.title1="";//第一级内容的标题
  this.typeAryLength=0;//类别数组长度
  this.selectLevel=0;//可以选择的层次，大于等于该层次的都可以选
  this.sType=sType;//0:省市选择;1:岗位类型选择;2:行业类型选择;3:地铁；4:商圈；5:行业分站

//放置选择器的div的id
  this.divId=InstanceName+"Div";
  this.frmId=InstanceName+"blockSelect";
  
  this.colNUM=3;//分成多少列来显示
	if(colNUM!=null) this.colNUM=colNUM;

	this.title2="";//第二级内容的标题html
	this.title3="";//第三级内容的标题html
	
	this.content1="";//第一级内容的html
	this.content2="";//第二级内容的html
	this.content3="";//第三级内容的html
	
	this.title2Id=InstanceName+"Title2";//放置第二级的标题
	this.title3Id=InstanceName+"Title3";//放置第三级的标题

//放置城市span标志的id	
	this.span1Id=InstanceName+"Span1";//放置第一级的内容
	this.span2Id=InstanceName+"Span2";//放置第二级的内容
	this.span3Id=InstanceName+"Span3";//放置第三级的内容
//放置每一级实际内容的table的id
	this.table1Id=InstanceName+"Table1";
	this.table2Id=InstanceName+"Table2";
	this.table3Id=InstanceName+"Table3";	
//放置显示选择结果的span的id	
	this.spanResultId=InstanceName+"Result";
	this.resultTblId=InstanceName+"TblResult";
	this.outDivResultId=InstanceName+"Show";
	
//点击的按钮
  this.but=null;
	this.butInitValue="请选择";//按钮初始值
	
//函数
  this.returnFormatResult=returnFormatResult;//返回格式化过的结果
  this.returnCheckStatus=returnCheckStatus;//根据格式化过的结果返回第i个类型的选择状态
  this.setContent=setContent;//设置当前要显示的内容
  this.setContent1=setContent1;//设置第一级类型的内容
  this.setContent2=setContent2;//设置第二级类型的内容
  this.setContent3=setContent3;//设置第三级类型的内容
  this.setTitleHtml=setTitleHtml;//设置当前类别的标题
  this.isFather=isFather;//是否有下级
  this.filterSon=filterSon;//选择某一类时，从结果中去掉该类的所有子类
  this.updateSonCheck=updateSonCheck;//当选中父类后更新子类的复选框
  this.addChoosed=addChoosed;//将选择的类型放入结果中,已经有的不再放入，并且限制最多选择的项数
  this.updateResult=updateResult;//更新结果
  this.showResult=showResult;//显示已经选择的结果
  this.removeResult=removeResult;//从结果中取消某一类型

  this.clickTitleName=clickTitleName;//点击标题中类别名称
  this.clickContentName=clickContentName;//点击内容中类别名称
  this.clickTitleBox=clickTitleBox;//点击内容的标题的复选框
  this.clickContentBox=clickContentBox;//点击内容的复选框（现不被直接调用，点击复选框也调用clickContentName）
  this.clickResult=clickResult;//点击结果中的类别
  this.showSon=showSon;//显示下一级的分类

  this.getFirstResult=getFirstResult;//返回结果的第一个值
  this.clearTitle2=clearTitle2;//清除第二级的标题
  this.clearTitle3=clearTitle3;//清除第三级的标题
  this.clearContent1=clearContent1;//清除第一级的内容
  this.clearContent2=clearContent2;//清除第二级的内容
  this.clearContent3=clearContent3;	//清除第三级的内容
  this.assembleAll=assembleAll;//将各个层次的类型组装起来
  this.getSpace=getSpace;//设置标题或内容前的空格
  this.getPos=getPos;//得到对应类型id的数组下标
  this.getFatherPos=getFatherPos;//得到当前类别的上一级的数组下标，返回0表示当前为第一级

  this.Init=selectorInit;//初始化各级类型的容器
  this.setType=setType;//设置不同的类型使用不同的参数，
  this.initResult=initResult;//初始化结果
  this.showSelector=showSelector;//显示选择器
  this.setFrmHeight=setFrmHeight;//设置框架高度
  this.setDefaultShow=setDefaultShow;//设置默认显示的类别
  this.trigger=selectorTrigger;
  this.triggername = null;
  this.setType(sType);
}

function setType(sType){
  if(sType==0) {//省市选择
	//选择器的标题  
  	this.selectorName="城市";
  	this.typeAry=catelogsCity;
  	this.typeAryLength=catelogCountCity;
  	this.title1="返回省及直辖市";
  }else if(sType==1){//岗位类型选择
	//选择器的标题    	
		this.selectorName="岗位";
  	this.typeAry=catelogsJob;  	
  	this.typeAryLength=catelogCountJob;
  	this.title1="返回职能";
  }else if(sType==2){//行业类型选择
	//选择器的标题    	
		this.selectorName="行业";
  	this.typeAry=catelogsIndustry;  	
  	this.typeAryLength=catelogCountIndustry;
  	this.title1="返回行业";
  }else if(sType==3){
	//选择器的标题    	
	this.selectorName="地铁站";
  	this.typeAry=catelogsSubWay;  	
  	this.typeAryLength=catelogCountSubWay;
  	this.title1="返回城市";	  
  	this.parentTitle="";
		this.selectLevel=3;
  }else if(sType==4){
	//选择器的标题    	
		this.selectorName="商圈";
  	this.typeAry=catelogsCbd;  	
  	this.typeAryLength=catelogCountCbd;
  	this.title1="返回城市";	  
  	this.parentTitle="";
		this.selectLevel=2;
   }else if(sType==5){
	//选择器的标题    	
		this.selectorName="行业分站";
  	this.typeAry=catelogsIndusWeb;  	
  	this.typeAryLength=catelogCountIndusWeb;
  	this.title1="返回行业站点";	  
		this.selectLevel=2;
  	this.parentTitle="";
  }else if(sType==6) {//山东站省市选择
	//选择器的标题  
  	this.selectorName="城市";
  	this.typeAry=catelogsCityShanDong;
  	this.typeAryLength=catelogCountCityShanDong;
  	//this.title1="返回省及直辖市";
  }else if(sType==7) {//广东新区域选择
	//选择器的标题  
  	this.selectorName="城市";
  	this.typeAry=catelogsCityGuangDong;
  	this.typeAryLength=catelogCountCityGuangDong;
  	this.title1="返回省及直辖市";
  }else if(sType==8) {//72站省市选择
	//选择器的标题  
  	this.selectorName="城市";
  	this.typeAry=catelogsCity72site;
  	this.typeAryLength=catelogCountCity72site;
  	this.title1="返回省及直辖市";
  }
}

function selectorTrigger(str){
	this.triggername = str;
}

//点击结果中的类别
function clickResult(pos){
	var objBox=document.getElementById(this.instanceName+pos);
	if(objBox!=null) objBox.checked=false;
	this.updateSonCheck(pos);
  this.removeResult(pos);
  //alert(pos);
	this.showResult();		
}

//点击内容的标题类别的复选框
function clickTitleBox(pos,curBox){
	if(curBox.checked==true){
	  if(this.addChoosed(pos)){
		  this.updateSonCheck(pos,true);
	    this.showResult();	
	  }
  }else{
		//替换直辖市的bug
		/*if(pos==124){
			pos=123;//北京市
		}else if(pos==2511){
			pos=2510;//上海市
		}else if(pos==2940){
			pos=2939;//天津市	
		}*/
  	  this.removeResult(pos);
	  this.updateSonCheck(pos,false);    	
	  this.showResult();	
  }
}

//点击标题的类别的名称
function clickTitleName(pos){
	var objBox=document.getElementById(this.instanceName+pos);
	if(objBox!=null&&objBox.disabled==true) {
		alert("您已经选择了上级"+this.selectorName+",请先去掉再选择！");
		return;
	}
	var curLevel=this.typeAry[pos][4];
  if(curLevel==1){//标题类别为第一级，
  	 if(this.title3!="")//如果第三级内容的标题不为空，点击后显示其子类，如广东
  	   this.clickContentName(pos);
  	 else{//如果第三级内容的标题为空，点击就等于点击复选框
       objBox.checked=!objBox.checked;	
       this.clickTitleBox(pos,objBox);  	   
  	 }
  }else{//标题类为第二级，点击就等于点击复选框
    objBox.checked=!objBox.checked;	
    this.clickTitleBox(pos,objBox);
  }
}

//点击内容的复选框(现不被直接调用，点击复选框也调用clickContentName)
function clickContentBox(pos,curBox){
	if(curBox.checked==true){
	  if(this.addChoosed(pos)){
	    this.showResult();	
	  }
  }else{
  	  this.removeResult(pos);
	    this.showResult();	
  }
}
//点击内容类别名称
//pos:类型的数组下标
//clickType:0点击复选框，1点击名称
function clickContentName(pos,clickType){
	var objBox=document.getElementById(this.instanceName+pos);
	if(objBox!=null&&objBox.disabled==true){
		alert("您已经选择了上级"+this.selectorName+",请先去掉再选择！");
		return;
	}
	if(objBox!=null&&clickType==0) objBox.checked=!objBox.checked;
	
	if(this.isFather(pos)){//有下级，展开下级,点击的类别作为标题
    	this.showSon(pos,objBox);
	}else{//没有下级，则等于点击复选框
		objBox.checked=!objBox.checked;
		this.clickContentBox(pos,objBox);
	}
}

/**
pos:当前点击的类别的数组位置
objBox:但前点击的类别的复选框对象
*/
function showSon(pos,objBox){
	  	var level=this.typeAry[pos][4];//要显示的内容的父级的级别，即当前被点击的类别的级别	
  		var isChecked=objBox==null?false:objBox.checked;
		
    	this.setTitleHtml(pos,isChecked);
    	if(level==1) {
      		this.setContent2(pos,isChecked);
    	}else{
    		this.setContent3(pos,isChecked);
    	}

    	this.assembleAll();	
}
/** 从结果中取消某一类型
@param pos 取消的类型的数组下标
*/
function removeResult(pos){
	  var cityId=this.typeAry[pos][5];
    var chooseResult=this.oResultField.value;//已经选择的结果
	  var aryChooseResult=chooseResult.split(";");
	  chooseResult=ridFromAry(cityId,aryChooseResult);//去掉取消的类型后的结果
	  this.updateResult(chooseResult);
}

//显示已经选择的结果
function showResult(){ 
  var chooseResult=this.oResultField.value;
  var filterResult="";//去掉不存在的id后的结果
  var i=0;
  var itemHtml="";
  var itemHtmlBut="";//在按钮上显示的结果
  if(chooseResult!=""){
    var aryChooseResult=chooseResult.split(";");
	  itemHtml="<table id=\""+this.resultTblId+"\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	  var sitem="";
	  for(var i=0;i<aryChooseResult.length; i++){	  
	       var isAdd=0;//是否有类别加入到结果中,1有
	       for (var j=0;j<this.colNUM;j++){
    			  h=inAry2(aryChooseResult[i],this.typeAry);
	          if(h!=-1){
				       if(filterResult==""){
 					        filterResult=aryChooseResult[i];
				       }else{
					        filterResult+=";"+aryChooseResult[i];  
				       }
	             sitem="<td height=\""+this.rowHeight+"\"><input type=\"checkbox\" name=\""+this.instanceName+this.typeAry[h][3]+"result\" id=\""+this.instanceName+this.typeAry[h][3]+"result\" checked onclick=\""+this.instanceName+".clickResult("+h+")\" value=\""+this.typeAry[h][5]+"\"><a href=\"####\" onclick=\""+this.instanceName+".clickResult("+h+")\">"+this.typeAry[h][0]+"</a></td>"; 
		           itemHtml+=sitem;  
		           isAdd=1;
				   
				       if(itemHtmlBut==""){
					        itemHtmlBut=this.typeAry[h][0]; 
				       }else{
					        itemHtmlBut+=","+this.typeAry[h][0]   
				       }
	          }else{				  
		           j--;
		        }
		        if(i==aryChooseResult.length-1) {
		           break;
		        }
		        if(j<(this.colNUM-1)) i++;
	      }	  
	      if(isAdd==1) itemHtml="<tr>"+itemHtml+"</tr>";	
	  }	
	  itemHtml+="</table>";	
  }

  this.oResultField.value=filterResult;

  if(filterResult=="") itemHtml="";
//if(itemHtmlBut!=""){
//在层内显示选择结果  
  objdiv=document.getElementById(this.spanResultId);
  objdiv.innerHTML=itemHtml;	

  this.setFrmHeight();

//在层外显示选择结果
	objdiv=document.getElementById(this.outDivResultId);
	if(objdiv!=null){
	  objdiv.innerHTML=itemHtml;	
	}else if(this.but!=null){
	  if(itemHtmlBut==""){
		 itemHtmlBut=this.butInitValue;			  
	  }
	  this.but.value=itemHtmlBut;
	}
//}

}
/**更新结果
@param strResult 结果
@param curRecordFieldId 保存真正结果的表单域id
*/
function updateResult(strResult){
  this.oResultField.value=strResult;
}

/**选择某一类时，从结果中去掉该类的所有子类
@param pos 选择的类型的数组下标
@ param aryChooseResult 结果数组
@ return 过滤后的结果数组
*/
function filterSon(pos,aryChooseResult){
	   if(this.isFather(pos)==false) return aryChooseResult;
	   var i=0;
	   var sonPos=pos+1;//子类开始的数组位置
	   var curLevel=this.typeAry[pos][4];//当前所处的层次
	   var parentId=this.typeAry[pos][2];
    
  	for(var i=sonPos;i<this.typeAryLength;i++){
	     if((this.typeAry[i][2]!=parentId||this.typeAry[i][4]==curLevel)){//当不是当前分类的子类时跳出循环	    
	        break;
	     }else{
		
		      if(curLevel==2){//如果当前分类是第二级，到达下一个第二级分类跳出循环
		         if(this.typeAry[i][4]==2) break;	
		      }
		
		      aryIndex=inAryIndex(this.typeAry[i][5],aryChooseResult);
		      if(aryIndex!=-1){//分类存在结果数组中，要将结果数组中的该项设为空    
			       aryChooseResult[aryIndex]="";
		      }		
	     }
	  }
	
	  return aryChooseResult;
}

/**将选择的类型放入结果中,已经有的不再放入，并且限制最多选择的项数
@param pos 选择的类型的数组下标
@param curBox 当前选择的复选框
*/
function addChoosed(pos){
	var booleanResult=false;//是否有成功将类别添加到结果中
  var chooseResult=this.oResultField.value;
  var cityId=this.typeAry[pos][5]

	//alert(cityId);
	
	/*替换直辖市的bug
	if(cityId=='34,398'){
		cityId = '34';//北京市
	}
	if(cityId=='36,400'){
		cityId = '36';//上海市
	}
	if(cityId=='35,399'){
		cityId = '35';//天津市
	}*/

  if(chooseResult==""){
     chooseResult=cityId;
     booleanResult=true;
	   if(this.maxNum==1) {
	   	 divClose(this.divId);	
	   }
  }else{
     var aryChooseResult=chooseResult.split(";");
     if(!inAry(cityId,aryChooseResult)) {//没有重复选择
		    if(aryChooseResult.length<this.maxNum || this.maxNum==0){
		       aryChooseResult=this.filterSon(pos,aryChooseResult);//从结果中去掉该类的所有子类
		       chooseResult="";
		       for(var i=0;i<aryChooseResult.length;i++){
			        if(aryChooseResult[i]!=""){
				         if(chooseResult==""){
				            chooseResult=aryChooseResult[i]; 
				         }else{
					          chooseResult+=";"+aryChooseResult[i]; 
				         }
			        }
		       }
		  
		       if(chooseResult==""){
				      chooseResult=cityId; 
				      booleanResult=true;
		       }else{
				      chooseResult+=";"+cityId; 
				      booleanResult=true;
		       }
      
		    }else{
		    	 var objBox=document.getElementById(this.instanceName+pos);
		       alert("最多只能选"+this.maxNum+"项");
		       objBox.checked=false;
		       booleanResult=false;
		       return booleanResult;
		    }
	   }else{//已经选择过了
	      return true;
	   }
  }
  this.updateResult(chooseResult);//更新结果
  return booleanResult;
}

//是否有下级
//pos：当前类型的数组下标；
//return: true 有下级；false 没有下级
function isFather(pos){
	if(this.typeAry[pos][4]==3) return false;
	var nextPos=pos+1;
	if(nextPos>=this.typeAryLength) return false;
	if(this.typeAry[pos][4]==(this.typeAry[nextPos][4]-1)) return true;
	return false;
}

//设置标题或内容前的空格
//level:内容或标题类别的级别
function getSpace(level){
	var spaceStr="";
	for (var i=1;i<level;i++){
	  spaceStr+="&nbsp;&nbsp;";	
	}	
	return spaceStr;
}

//更新子类复选框的状态
//isForbid:true禁用 false不禁用
function updateSonCheck(pos,isForbid){
	if(!this.isFather(pos)) return;
	var level=this.typeAry[pos][4];
	var sonLevel=level+1;
	var parentId=this.typeAry[pos][2];
  for(var i=pos+1;i<this.typeAryLength;i++){
  	
  	if(level==2){//如果点击的是第二级，当循环到不是第三级时跳出循环
  	  if(this.typeAry[i][4]!=3){
  	     break;
  	  }
  	}
  	
  	if(this.typeAry[i][2]==parentId){
  		 if(this.typeAry[i][4]==sonLevel||this.typeAry[i][4]==sonLevel+1){
  	      var objBox=document.getElementById(this.instanceName+i);
  	      if(objBox!=null){
  	        objBox.disabled=isForbid;	
  	        if(isForbid) objBox.checked=false;
  	      }
  	   }
    }    
  }
}

//设置类别内容的标题，标题为类别内容的父类别
//pos：标题类型的数组下标；
//isChecked:是否选中
function setTitleHtml(pos,isChecked){
	var strChecked="";
	if(isChecked){
	   	strChecked=" checked";
	}
	
	var level=this.typeAry[pos][4];
	var spaceStr=this.getSpace(level);
	var itemHtml="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";	
	if(this.typeAry[pos][4]>=this.selectLevel){//可以选择
		itemHtml+="<tr><td height=\""+this.rowHeight+"\">"+spaceStr+"<input"+strChecked+" type=\"checkbox\" name=\""+this.instanceName+pos+"\" id=\""+this.instanceName+pos+"\" onclick=\""+this.instanceName+".clickTitleBox("+pos+",this);\" value=\""+this.typeAry[pos][5]+"\"><a style=\"cursor:pointer\" onclick=\"javascript:"+this.instanceName+".clickTitleName("+pos+");\">"+this.typeAry[pos][0]+"</a><span class=\"hong\">"+this.parentTitle+"</span></td></tr></table>";		
	}else{
		itemHtml+="<tr><td height=\""+this.rowHeight+"\"><span style='cursor:pointer' onclick='"+this.instanceName+".clickContentName("+pos+");'>"+spaceStr+this.typeAry[pos][0]+"</span></td></tr></table>";
	}
  
  if(level==1){//设置前先将对应的标题清除
    var objTitle2=document.getElementById(this.title2Id);
    objTitle2.innerHTML="";  
  }
  else if(level==2){
    var objTitle3=document.getElementById(this.title3Id);
    objTitle3.innerHTML="";  
  }

  if(level==1){
    this.title2=itemHtml;	
    this.clearTitle3();
  }
  else
  	this.title3=itemHtml;
}

//得到对应类型id的数组下标
function getPos(id){
  var curPos=0;
	for(var i=0;i<this.typeAryLength; i++){
	   if(this.typeAry[i][5]==id){
		    curPos=i;
		    break;
	   }
	}
	return i;
}

//得到当前类别的上一级的数组下标，如果为第一级则返回自己
//sonPos当前类别的数组下标，
//level当前类别的级别：1第一级，2第二级，3第三级
function getFatherPos(sonPos,level){
	   if(level==1) return sonPos;
	   var fatherLevel=level-1;
	   var fatherPos=0;
	   for(var i=sonPos;i>0; i--){
	      if(this.typeAry[i][4]==fatherLevel){
		       fatherPos=i;
		       break;
	      }
	   }
	   return fatherPos;
}

function clearTitle2(){
   this.title2="";	
}

function clearTitle3(){
   this.title3="";	
}
function clearContent1(){
   this.content1="";	
}
function clearContent2(){
   this.content2="";	
}
function clearContent3(){
   this.content3="";	
}

//返回结果的第一个值
function getFirstResult(){
  var result=this.oResultField.value;//已选结果
  if(result==null||result==""){
    return "";
  }else{
    var aryResult=result.split(";");
    return aryResult[0];
  }
}

//将各个层次的类型组装起来,不包括显示结果的层
function assembleAll(){
    var objSpan1=document.getElementById(this.span1Id);
    objSpan1.innerHTML=this.content1;	
  
    var objTitle2=document.getElementById(this.title2Id);    
    if(objTitle2.innerHTML==""||this.title2=="") objTitle2.innerHTML=this.title2;  

    var objSpan2=document.getElementById(this.span2Id);    
    if(objSpan2.innerHTML==""||this.content2=="") objSpan2.innerHTML=this.content2;

    var objTitle3=document.getElementById(this.title3Id);    
    if(objTitle3.innerHTML==""||this.title3=="") objTitle3.innerHTML=this.title3;  

    var objSpan3=document.getElementById(this.span3Id);    
    if(objSpan3.innerHTML==""||this.content3=="") objSpan3.innerHTML=this.content3;  
   
    this.setFrmHeight();
    var objDiv=document.getElementById(this.divId);
    objDiv.style.display="";  
    //document.getElementById("bbb").value=objDiv.innerHTML;
}

//设置默认的选项
function setDefaultShow(firstResult,defaultShow){
/**    if(firstResult==""&&(defaultShow==null||defaultShow=="")){
	  if(this.sType==0){
		defaultShow="18";//显示山东省下的市区
	  }else if(this.sType==3){//地铁
    	defaultShow="398";//北京  				
 	  }else if(this.sType==6){
		defaultShow="25";//烟台
	  }
    }*/
  return defaultShow;
}

/**显示选择器
@param oInstance 选择器对象
*/

function showSelector(defaultShow){
   var firstResult=this.getFirstResult();
	 defaultShow=this.setDefaultShow(firstResult,defaultShow);
   var 
check=false;
   if(firstResult==""&&(defaultShow==null||defaultShow=="")){
     this.setContent1();
     this.clearTitle2();
     this.clearTitle3();
     this.clearContent2();
     this.clearContent3();
     this.assembleAll();	
   }else{
	   var curPos=0;
	   if(firstResult!=""){
 
	   	 	 check=true;	
     		curPos=this.getPos(firstResult);
	   }else{
     		curPos=this.getPos(defaultShow);		   
		}
     var curLevel=this.typeAry[curPos][4];
     if(curLevel==1){//选中的是第一级类别,如广东	
       var fatherPos=this.getFatherPos(curPos,curLevel);
       if(this.isFather(curPos)){//还有下级并且没有选中结果则显示下级firstResult==""
       		this.setTitleHtml(fatherPos,check);
     			//this.clearTitle2();
     			this.clearTitle3();
     			this.clearContent1();
     			this.clearContent3();
       		this.setContent2(fatherPos,check);
       	}else{ //没有下级且结果为空，则显示同级别的分类
     			this.clearTitle2();
     			this.clearTitle3();
     			this.clearContent2();
     			this.clearContent3();
       		this.setContent1();       		
       	}
       this.assembleAll();	
	 
     }else if(curLevel==2){//选中的是第二级类别，如中山
	 			var fatherPos=this.getFatherPos(curPos,curLevel);
       	var fatherLevel=this.typeAry[fatherPos][4];
       	this.setTitleHtml(fatherPos,false);
       	if(this.isFather(curPos)){//还有下级且结果不为空则显示下级firstResult!="")
	       	this.setTitleHtml(curPos,check);
     			//this.clearTitle3();
     			this.clearContent1();
     			this.clearContent2();
       		this.setContent3(curPos,check);
       	}else{//没有下级且结果为空，则显示同级别的分类
     			this.clearTitle3();
     			this.clearContent1();
     			this.clearContent3();
       		this.setContent2(fatherPos,false);
      	}	
       	this.assembleAll();	     
     }else if(curLevel==3){//选中的是第三级类别，如小榄
       var fatherPos=this.getFatherPos(curPos,curLevel);
       var fatherLevel=this.typeAry[fatherPos][4];
       var grandfatherPos=this.getFatherPos(fatherPos,fatherLevel);
       this.setTitleHtml(grandfatherPos,false);
       this.setTitleHtml(fatherPos,false);
     	 this.clearContent1();
     	 this.clearContent2();
       this.setContent3(fatherPos,false);
       this.assembleAll();	     

     }
     this.showResult();
   }
   
   setDivInCenter(this.divId); 	 
   
   hiddenSelect(this.divId);
   b_trigger = this.triggername;
}

/*显示默认结果
*/
function initResult(){
   this.showResult();
}

//返回格式化过的结果
 function returnFormatResult(){
    var chooseResult=this.oResultField.value;//已选结果
    if(chooseResult!="") {
    	chooseResult=";"+chooseResult+";";
    }
    return chooseResult; 	
 }

//根据格式化过的结果返回第i个类型的选择状态
 function returnCheckStatus(chooseResult,i){
 	  var isChecked="";
	  if(chooseResult=="") {
		   isChecked="";
	  }else{
			 if(chooseResult.indexOf(";"+this.typeAry[i][5]+";")!=-1) {
			    isChecked="checked";
			 }else{
        	isChecked="";						  
			 }
	  }
	  return isChecked;
 	}
 	
//设置第一级类型的内容
 function setContent1(){
    this.content1=this.setContent(-1,false);
 }  

//设置第二级类型的内容,不包括标题，如列出广东下的所有市
//pos当前第二级的父级的数组下标
//isChecked:父级是否被选中，如果被选中子类全部禁用
 function setContent2(pos,isChecked){
	var objSpan2=document.getElementById(this.span2Id);//设置内容前现清空之前的内容 
	objSpan2.innerHTML="";
	this.content2=this.setContent(pos,isChecked); 
	this.clearContent1();
	this.clearContent3();
 }  
//设置第三级类型的内容,不包括标题，如列出中山下的所有镇
//pos当前第三级的父级的数组下标
//isChecked:父级是否被选中，如果被选中子类全部禁用
 function setContent3(pos,isChecked){
 	 var objSpan3=document.getElementById(this.span3Id); //设置内容前现清空之前的内容
 	 objSpan3.innerHTML="";   
   this.content3=this.setContent(pos,isChecked);
   this.clearContent1();
   this.clearContent2();
 }  

//设置当前要显示的内容,不包括标题
//pos当前要显示内容的父级的数组下标,-1表示列第一级
//isChecked:父级是否被选中，如果被选中子类全部禁用
function setContent(pos,isChecked){
	  var strDisabled="";
	  if(isChecked) strDisabled=" disabled";
 	  var chooseResult=this.returnFormatResult();
 	  var level=1;
	  if(pos!=-1) level=this.typeAry[pos][4]+1;
    var spaceStr=this.getSpace(level);	
	  var itemHtml="<table id=\""+this.instanceName+"table"+level+"\" width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	  var sitem="";//每个类型的html
	  for(var i=pos+1;i<this.typeAryLength;i++){
	     var isAdd=0;//在下面的循环是否有添加类别到内容，1有     
	     for (var j=0;j<this.colNUM;j++){
	        if(pos==-1||this.typeAry[i][2]==this.typeAry[pos][2]){//判断是否列第一级或数组元素和被点击的元素是否是同一父级
		         if(this.typeAry[i][4]==level){//是否是当前要列的级
			  		
					if(this.typeAry[i][4]>=this.selectLevel){//可以选择的级别
			          //如果选框的值存在已选择结果中则选框变为选中
				 		isChecked=this.returnCheckStatus(chooseResult,i);
						sitem="<td height=\""+this.rowHeight+"\" class=\"td_width\">"+spaceStr+"&nbsp;<input"+strDisabled+" type=\"checkbox\" id=\""+this.instanceName+i+"\" name=\""+this.instanceName+i+"\"  value=\""+this.typeAry[i][5]+"\" "+isChecked+" onclick=\""+this.instanceName+".clickContentName("+i+",0);\"><a style=\"cursor:pointer\" onclick=\"javascript:"+this.instanceName+".clickContentName("+i+",1);\">"+this.typeAry[i][0]+"</a></td>"; 
					}else{
			        	  //如果选框的值存在已选择结果中则选框变为选中
					 	//isChecked=this.returnCheckStatus(chooseResult,i);
						sitem="<td height=\""+this.rowHeight+"\" class=\"td_width\">"+spaceStr+"&nbsp;<a style=\"cursor:pointer\" onclick=\"javascript:"+this.instanceName+".showSon("+i+",null);\">"+this.typeAry[i][0]+"</a></td>"; 
					}
		            itemHtml+=sitem;
				    isAdd=1;
			     }else{
                	if(level==3){//如果是第三级，当当前数组元素不是第三级时直接跳出
		               i=this.typeAryLength;
		               break;
                }else{
                   j--;
                }
			        }
	       }else{//数组元素和被点击的元素不是同一父级，直接跳出循环，并且设置外层循环条件变量到最后结束循环
		        i=this.typeAryLength;
		        break;
		      }
		      if(i==this.typeAryLength-1) {//遍历所有数组元素后跳出内部循环
		         break;
		      }
		      if(j<(this.colNUM-1)) i++;
	    }
	    if(j<3) itemHtml += "<td colspan='" + (3-j) + "'>&nbsp;</td>";	// add by 詹威, wei.zhan@myjob.com.cn, 2011-12-01
	    if(isAdd==1)itemHtml="<tr>"+itemHtml+"</tr>";	  
	 }
	 itemHtml+="</table>";

	 return itemHtml;	
}

//建立selector的各个层次的容器（div，span等）
//oResultField:保存结果的隐藏域对象
//objBut触发选择器的按钮对象
//pos：left居左 center居中 right居右
//colNUM:分成多少列来显示
//offset;偏移量（px）
function selectorInit(oResultFieldId,butId,pos,offset){

  this.oResultField=document.getElementById(oResultFieldId);	
  this.but=document.getElementById(butId);
  this.butInitValue=this.but.value;

  var divClass="div_p";
  if(pos=='left') divClass="div_l_js";
  if(pos=='center') divClass="div_c";

  var objJobType=document.getElementById(this.divId);
 
  if(objJobType!=null){
    return;
  }

  var divHtml="";
  if(offset==null){
  	divHtml="<DIV id=\""+this.divId+"\"  class=\""+divClass+"\" style='display:none; Z-INDEX:999'>";
	}else{
  	divHtml="<DIV id=\""+this.divId+"\"  class=\""+divClass+"\" style='display:none; Z-INDEX:999; margin:24px 0 0 "+offset+"px'>";
	}
  divHtml+="<table width=\""+this.divWidth+"px\" border=\"0\"  cellpadding=\"0\" cellspacing=\"0\">";
  divHtml+="<tr>";
/*  divHtml+="<td width=\"9\" height=\"9\">";
  divHtml+="<img src=\"/themes/default/selector/images/typeselector/div_01.gif\"></td>";
  divHtml+="<td background=\"/themes/default/selector/images/typeselector/div_02.gif\">";
  divHtml+="</td>";
  divHtml+="<td>";
  divHtml+="<img src=\"/themes/default/selector/images/typeselector/div_03.gif\"></td>";
  divHtml+="</tr>";
  divHtml+="<tr>";
  divHtml+="<td background=\"/themes/default/selector/images/typeselector/div_04.gif\">";
  divHtml+="</td>";
*/  divHtml+="<td valign=\"top\" bgcolor=\"#FFFFFF\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" id=\"divtt\">";
  divHtml+="<tr>"; 
  divHtml+="<td class=\"tt\">"+this.selectorName+"选择器<span class=\"hong\">";
  if(this.maxNum>0) divHtml+="(最多可选"+this.maxNum+"项)</span></td>";
  divHtml+="<td align=\"right\"><span style='cursor:pointer' onclick=\"javascript:divClose('"+this.divId+"');\">[确定]</span> <a href=\"help.html\" target=\"_blank\" style='display:none'>[帮助]</a></td>";
  divHtml+="</tr>";
  divHtml+="</table>";
  divHtml+="<table width=\"100%\" border=\"0\" cellspacing=\"2\" cellpadding=\"0\" align=\"center\">";
  divHtml+="<tr>";
  divHtml+="<td class=\"dl\"><span style='cursor:pointer' onclick=\"javascript:"+this.instanceName+".setContent1();"+this.instanceName+".clearContent2();"+this.instanceName+".clearContent3();"+this.instanceName+".clearTitle2();"+this.instanceName+".clearTitle3();"+this.instanceName+".assembleAll();\"><b>"+this.title1+"</b></span></td>";
  divHtml+="</tr>";
  divHtml+="<tr>";
  divHtml+="<td>";
  divHtml+="<span id=\""+this.span1Id+"\"></span>";//第一级的内容
  divHtml+="</td>";
  divHtml+="</tr>";
  divHtml+="</table>";
  divHtml+="<span id=\""+this.title2Id+"\"></span>";//第二级的标题
  divHtml+="<span id=\""+this.span2Id+"\" ></span>";//第二级的内容
  divHtml+="<span id=\""+this.title3Id+"\" ></span>";//第三级的标题
  divHtml+="<span id=\""+this.span3Id+"\"></span>";//第三级的内容
  divHtml+="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"2\"  align=\"center\">";
  divHtml+="<tr><td class=\"dl\">您已经选择的"+this.selectorName+"是:<span class=\"hong\">(点击可以取消选择)</span></td></tr>";
  divHtml+="<tr><td>";
  divHtml+="<span id=\""+this.spanResultId+"\"></span>";
  divHtml+="</td></tr></table>";
  divHtml+="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" id=\"divtt\">";
  divHtml+="<tr>";
  divHtml+="<td align=\"right\" height=\""+this.rowHeight+"\" ><span style='cursor:pointer' onclick=\"javascript:divClose('"+this.divId+"');\">[确定]</span> <a href=\"help.html\" target=\"_blank\" style='display:none'>[帮助]</a></td>";
/*  divHtml+="</tr>";
  divHtml+="</table></td>";
  divHtml+="<td background=\"/themes/default/selector/images/typeselector/div_06.gif\">";
  divHtml+="</td></tr>";
  divHtml+="<tr><td>";
  divHtml+="<img src=\"/themes/default/selector/images/typeselector/div_07.gif\"></td>"; 
  divHtml+="<td background=\"/themes/default/selector/images/typeselector/div_08.gif\"></td>";
  divHtml+="<td width=\"1\" height=\"1\">";
  divHtml+="<img src=\"/themes/default/selector/images/typeselector/div_09.gif\"></td>";
*/  divHtml+="</tr></table></div>";
  
  //document.getElementById("showhtml").value=divHtml;  
  //document.write(divHtml);
 	$("#"+butId).before(divHtml);
}

//设置框架高度
function setFrmHeight(){
	/*
	var totalRow=0;
	var totalheight=93;
	var objTable1=document.getElementById(this.table1Id);
	if(objTable1!=null){
		totalRow+=objTable1.rows.length;
	}	
	var objTable2=document.getElementById(this.table2Id);
	if(objTable2!=null){
		totalRow+=objTable2.rows.length;
	}	
	var objTable3=document.getElementById(this.table3Id);
	if(objTable3!=null){
		totalRow+=objTable3.rows.length;
	}	
	oo=document.getElementById(this.resultTblId);
	if(oo!=null){
		totalRow+=oo.rows.length;
	}	
  if(this.title2!="") totalRow++;
  if(this.title3!="") totalRow++;
	
	var ofrm=document.getElementById(this.frmId);
	totalheight+=totalRow*this.rowHeight;
	ofrm.style.height=totalheight+"px";
	*/
}
