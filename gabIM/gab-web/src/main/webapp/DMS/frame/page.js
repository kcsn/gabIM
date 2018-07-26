//紧急变价
var mainManager=getOptionManager();
mainManager.insertTable=function(id,id1,page){//从这里开始优化吧
	page=page?page:1;
	var d=new Date();
	
	var caller=function(msg){
		
    	if(mainManager.cur_nav == "cashmanage" || mainManager.cur_nav == "cashparameters" || mainManager.cur_nav == "cashupdate"){
    		mainManager.listData=msg.data.content;
    	}else{
    		mainManager.listData=msg.data;
    	}
		
		var options=mainManager.getHeaderOptions()||{};
		options.page=page;
		options.totalPage=msg.totalPages||1;
		mainManager.page=page;
		mainManager.totalPage=options.totalPage;
		$('#'+id).html(createTable(mainManager.listData,mainManager.dataConfig,options));
		// $('#'+id1).html(createTable(mainManager.listData1,mainManager.dataConfig1,options));
		try {
			$('#'+mainManager.searchTAG).html(searchAreaManager[mainManager.cur_nav].insertSearchPanel());
		} catch (e) {
			// TODO: handle exception
		}
		
	};
	//url,caller,data,title,Nasync,cache,dataType,type,errorCaller
	var name=controlor.cur.cur_nav+'list';
	controlor.cur.ajaxManager.abort(name);
	controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[this.cur_nav+'list'], caller, mainManager.searchParams, "获取列表", false,null,null,"GET");
};



//dataconfig配置表格和表单显示
//text   显示label
//value 对应字段
//listvisable 表格显示
//selflistformat 表格自定义格式化
//formvisable  表单显隐
//formtype  表单字段类型
//selfformformat  表单字段自定义格式化



function gotoAssist(price,id){
	viewPrice(id);
	assitManager.clear();
	assitManager.parentID=id;
	assitManager.getPage(1,null,"changeprice");
}

function gotoMain(){
	mainManager.backToMe();
}

var assitManager=getOptionManager();
assitManager.insertTable=function(id,id1,page){//从这里开始优化吧
	page=page?page:1;
	var caller=function(msg){
		assitManager.listData=msg.data;
		alert('111');
		if(assitManager.cur_nav1 == "changeprice"){
			assitManager.listData1 = demodata[assitManager.cur_nav1];
		}
		var options=assitManager.getHeaderOptions()||{};
		options.page=page;
		options.totalPage=msg.totalPages||1;
		assitManager.page=page;
		assitManager.totalPage=options.totalPage;
		//$('#'+id).html(createTable(assitManager.listData,assitManager.dataConfig,options));
		$('#'+id1).html(createTable(assitManager.listData1,assitManager.dataConfig1,options));
	};
	//url,caller,data,title,Nasync,cache,dataType,type,errorCaller
	var name=controlor.cur.cur_nav1+'list';
	controlor.cur.ajaxManager.abort(name);
	controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[this.cur_nav1+'list'], caller, assitManager.searchParams, "获取车位列表", false,null,null,"GET");
};
//变价
var changeManager = getOptionManager();
changeManager.insertTable=function(id,id1,page){//从这里开始优化吧
	page=page?page:1;
	var caller=function(msg){
		changeManager.listData=msg.data;
		alert('111');
		if(changeManager.cur_nav1 == "changeprice"){
			changeManager.listData1 = demodata[mainManager.cur_nav1];
		}
		var options=changeManager.getHeaderOptions()||{};
		options.page=page;
		options.totalPage=msg.totalPages||1;
		changeManager.page=page;
		changeManager.totalPage=options.totalPage;
		$('#'+id1).html(createTable(changeManager.listData1,changeManager.dataConfig1,options));
	};
	var name=controlor.cur.cur_nav1+'list';
	controlor.cur.ajaxManager.abort(name);
	controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[this.cur_nav1+'list'], caller, changeManager.searchParams, "获取车位列表", false,null,null,"GET");
};

var monitorManager=getOptionManager();
monitorManager.listTAG='monitor-table';
monitorManager.formTAG='form_panel';
monitorManager.searchTAG='search_area';
monitorManager.formPrefix='form_commu_';
monitorManager.formID='form_commu';
monitorManager.pageStyle='margin: 0;padding:0;';
monitorManager.insertTable=function(id,id1,page){//从这里开始优化吧
	page=page?page:1;
	var caller=function(msg){
		monitorManager.listData=msg.data;
		var options=monitorManager.getHeaderOptions()||{};
		options.page=page;
		options.totalPage=1;
		monitorManager.page=page;
		monitorManager.totalPage=options.totalPage;
		$('#'+id).html(createTableMonitor(monitorManager.listData,monitorManager.dataConfig,options));
		// $('#'+id1).html(createTable(mainManager.listData,mainManager.dataConfig,options));
	}
	//url,caller,data,title,Nasync,cache,dataType,type,errorCaller
	var name=controlor.cur.cur_nav+'list';
	controlor.cur.ajaxManager.abort(name);
	controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[this.cur_nav+'list'], caller, this.searchParams, "获取列表", false,null,null,"GET");
};

monitorManager.timmer=null;
monitorManager.dosearch=function(){
	if(monitorManager.timmer){
		clearInterval(monitorManager.timmer);
		monitorManager.timmer=null;
	}
	setTimeout(function(){monitorManager.searchExt()}, 200);
//	monitorManager.timmer=setInterval(function(){
//		if(controlor.cur==monitorManager){
//			monitorManager.searchExt();
//		}
//	}, 3000*2);
}
monitorManager.searchExt=function(){
	this.getSearchParams(this.cur_nav);
	this.getPage(1,null,true);
}

var tipsT=null;
var tipsWinHideTime=4000;//tip框消失时间设置
function showTips(msg){
	if(tipsT){
		clearTimeout(tipsT);
		tipsT=null;
	}
	$('.sidebar').addClass('sidebar_loading');
	$('#win_tips').html(msg);
	$(".alert").show();
}

function hdieTips(){
	$(".alert").hide();
}

//请求
//地址     回调函数   参数    不同步(false)     加载主题      缓存(false)    返回结果格式(json)    请求方式(post) 
function sendRequest(url,caller,data,title,Nasync,cache,dataType,type,errorCaller){
	if(title){
		showTips("正在"+(title||"")+"，请稍候……");
	}
	return $.ajax({
		async:!Nasync,cache:!!cache,type:type||"post",dataType:dataType||"json",data:data||null,
		url:url,
		timeout:20*1000,
//		contentType:"application/x-www-form-urlencoded",
		success:function(msg){
			if(title){
				if(msg&&msg.code===0){
					//成功
					showTips((title||"")+"成功！");
				}else{
					//失败
//					showTips((title||"")+"失败！");
					var errorstr="";
					if(msg){
						if(msg.code==99){
							window.location.href=BASE_HOST+SERVER_NAME+"/resources/bhgadmin/login.html";
						}
						errorstr=msg.errorDescription||'';
					}
					showTips((title||"")+"失败！"+errorstr);					
				}
				$('.sidebar').removeClass('sidebar_loading');
				tipsT=setTimeout('hdieTips()', tipsWinHideTime);
			}
			if(caller){
				caller(msg);
			}
		},
		error:function(){
			if(title){
				showTips((title||"")+"失败！请重试");
				$('.sidebar').removeClass('sidebar_loading');
				tipsT=setTimeout('hdieTips()', tipsWinHideTime);
			}
			if(errorCaller){
				errorCaller();
			}
		}
	});
}

var ajaxTempRoleList=null;
var ajaxTempAuthList=null;
var ajaxTempDaAcList=null;

var perRoleList =null;
var perAuthList = null;
var perDaAcList = null;
var perStoreList = null;

//请求门店属性数据
function gitStoreList(caller){
	if(ajaxTempAuthList){
		ajaxTempAuthList.abort();
		ajaxTempAuthList=null;
	}
	ajaxTempAuthList=sendRequest(URLManager.baseurl+URLManager['store'], caller, null, "门店属性", false,null,null,"GET");
}

//请求权限数据
function getAuthList(caller){
	if(ajaxTempAuthList){
		ajaxTempAuthList.abort();
		ajaxTempAuthList=null;
	}
	ajaxTempAuthList=sendRequest(URLManager.baseurl+URLManager['authlist'], caller, null, "获取列表", false,null,null,"GET");
}




//请求角色数据
function getRoleList(caller){
	if(ajaxTempRoleList){
		ajaxTempRoleList.abort();
		ajaxTempRoleList=null;
	}
	ajaxTempRoleList=sendRequest(URLManager.baseurl+URLManager['rolelist'], caller, null, "获取列表", false,null,null,"GET");
}

//请求数据权限数据
function getDataAccess(caller){
	if(ajaxTempDaAcList){
		ajaxTempDaAcList.abort();
		ajaxTempDaAcList=null;
	}
	ajaxTempDaAcList=sendRequest(URLManager.baseurl+URLManager['dateaccesslist'], caller, null, "获取列表", false,null,null,"GET");
}

//树的递归
function recursion(node,treeObj){
	var num = null;
	if(node){
		num = node.length;
		for (var i = 0; i < num; i++) {
			if(!node[i].children){
				node[i].isParent = false;
				treeObj.updateNode(node[i]);
			}else{
				node[i].isParent = true;
				treeObj.updateNode(node[i]);
				recursion(node[i].children,treeObj);
				
			}
		}
	}
	
}
//点击导航入口
function navClick(obj){
	var tar=obj.id.substr(4);
	var tar1 = obj.id.substr(5);
	if(controlor.cur){
		controlor.cur.ajaxManager.abort();
	}


	//加操作按钮
	if(tar=='args'){
		$('#operate_bar').html('<button onclick="copyCurModel()">复制模板</button><button onclick="saveModel()">修改</button><button onclick="reselectModel()">重置</button><button onclick="delModel()">删除</button>');
	}else{
		$('#operate_bar').html('');
	}
	if(tar=='monitor'){
		controlor.setCur(monitorManager);
	}else if(tar=='stor'){
		var caller_store = function(msg){
			perStoreList = msg.data;
			baseStorInfo(perStoreList);
		}
		gitStoreList(caller_store);
	}else if(tar == "per"){
		//请求角色数据
		var caller=function(msg){
			perRoleList=msg.data;
			var topTree = new Object();
			if(perRoleList){
				for(var i=0;i<perRoleList.length;i++){
					
					perRoleList[i].pId=perRoleList[i].pid;
					perRoleList[i].isParent=!perRoleList[i].isLeaf;
					perRoleList[i].iconSkin = 'diy02';				}
			}
			topTree.pId = -1;
			topTree.id = 0;
			topTree.open = true;
			topTree.name = stor_name;
			topTree.iconSkin = 'diy01';
			perRoleList.push(topTree);
			//渲染页面
			$.fn.zTree.init($("#leftPerRole"), setting2, perRoleList);
			var treeObj = $.fn.zTree.getZTreeObj("leftPerRole");
			var dataListTree = treeObj.getNodes()[0].children;
			recursion(dataListTree,treeObj);
			mainManager.getPage(1, tar,tar1);
			panelMove("0");
			
		};
		getRoleList(caller);
	}else if(tar == "role"){
		//请求角色数据回调函数
		var caller_role=function(msg){
			perRoleList=msg.data;
			var topTree = new Object();
			if(perRoleList){
				for(var i=0;i<perRoleList.length;i++){
					perRoleList[i].pId=perRoleList[i].pid;
					perRoleList[i].isParent=!perRoleList[i].isLeaf;
					perRoleList[i].iconSkin = 'diy02';
				}
			}
			//渲染页面
			topTree.pId = -1;
			topTree.id = 0;
			topTree.open = true;
			topTree.name = stor_name;
			topTree.iconSkin = 'diy01';
			perRoleList.push(topTree);
			$.fn.zTree.init($("#leftPerRole"), setting, perRoleList);
			var treeObj = $.fn.zTree.getZTreeObj("leftPerRole");
			
			var dataListTree = treeObj.getNodes()[0].children;
			recursion(dataListTree,treeObj);
			var node = treeObj.getNodeByParam("id", "0");
			treeObj.selectNode(node);
			add();
			mainManager.getPage(1, tar,tar1);
			panelMove("0");
		};
		
		//请求权限数据回调函数
		var caller_auth=function(msg){
			perAuthList=msg.data;
			if(perAuthList){
				for(var i=0;i<perAuthList.length;i++){
					perAuthList[i].pId=perAuthList[i].pid;
				}
			}
			getRoleList(caller_role);
		};
		getAuthList(caller_auth);
		
	}else if(tar == "args"){
		//获取参数模板基础信息列表
		showArgsModel();
		
	}else {//if(tar=='community'||tar=='approval'||tar=='extract'||tar=='rentalParking')
		mainManager.getPage(1, tar,tar1);
		panelMove("0");
	}
}


function panelMove(direct){
	$("#movePanel").stop();
	$('#movePanel').animate({marginLeft:direct});
}

function  operate(index,id){
	panelMove("-100%");
	insertForm(index);
}

function approvalByid(index,id){
	controlor.cur.detailDataIndex=index;
	controlor.cur.detailData=controlor.cur.listData[index];
	controlor.cur.saveItem();
}

function clearTable(){
	
}

function createPageBar(currentPage,totalPage){
	currentPage=currentPage?currentPage:1;
	var pageMinRed=currentPage-1;
	pageMinRed>4?pageMinRed=4:'';
	var pageMaxRed=totalPage-currentPage;
	pageMaxRed>4?pageMaxRed=4:'';
	var pageList=[];
	var totalAllow=pageMinRed+pageMaxRed+1;
	if(totalAllow>6){
		pageList=[currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2];
	}else if(totalAllow==6){
		if(pageMinRed<3){
			for(var i=0;i<5;i++){
				pageList.push(currentPage-pageMinRed+i);
			}
		}else{
			for(var i=4;i>=0;i--){
				pageList.push(currentPage+pageMaxRed-i);
			}
		}
	}else{
		pageList=[];
		for(var i=0;i<totalAllow;i++){
			pageList.push(currentPage-pageMinRed+i);
		}
	}
	
	var pre='onclick="controlor.cur.getPage('+(controlor.cur.page-1)+')"';
	var next='onclick="controlor.cur.getPage('+(controlor.cur.page+1)+')"';
	var preStyle='';
	var nextStyle='';
	if(controlor.cur.page==1){
		pre='';
		preStyle='class="disabled"';
	}
	if(controlor.cur.page==controlor.cur.totalPage){
		next='';
		nextStyle='class="disabled"';
	}
	var pagebarHtml='<ul class="pagination pagination-sm" style="position: relative;float: right;'+controlor.cur.pageStyle+'"><li  '+preStyle+'><a href="#" '+pre+'>上一页</a></li>';
	for(var i=0;i<pageList.length;i++){
		if(pageList[i]==controlor.cur.page){
			pagebarHtml+='<li class="active"><a href="#"  onclick="controlor.cur.getPage('+pageList[i]+')">'+pageList[i]+'</a></li>';
		}else{
			pagebarHtml+='<li><a href="#" onclick="controlor.cur.getPage('+pageList[i]+')">'+pageList[i]+'</a></li>';
		}
	}
	pagebarHtml+='<li '+nextStyle+'><a href="#" '+next+'>下一页</a></li></ul>';
	return pagebarHtml;
}
//商品列表
function createPageBar1(currentPage,totalPage,value){
	currentPage=currentPage?currentPage:1;
	var pageMinRed=currentPage-1;
	pageMinRed>4?pageMinRed=4:'';
	var pageMaxRed=totalPage-currentPage;
	pageMaxRed>4?pageMaxRed=4:'';
	var pageList=[];
	var totalAllow=pageMinRed+pageMaxRed+1;
	if(totalAllow>6){
		pageList=[currentPage-2,currentPage-1,currentPage,currentPage+1,currentPage+2];
	}else if(totalAllow==6){
		if(pageMinRed<3){
			for(var i=0;i<5;i++){
				pageList.push(currentPage-pageMinRed+i);
			}
		}else{
			for(var i=4;i>=0;i--){
				pageList.push(currentPage+pageMaxRed-i);
			}
		}
	}else{
		pageList=[];
		for(var i=0;i<totalAllow;i++){
			pageList.push(currentPage-pageMinRed+i);
		}
	}
	
	if(value){
		var pre='onclick="addItemList('+(controlor.cur.page-1)+','+value+')"';
		var next='onclick="addItemList('+(controlor.cur.page+1)+','+value+')"';
	}else{
		pre='onclick="addItemList('+(controlor.cur.page-1)+')"';
		next='onclick="addItemList('+(controlor.cur.page+1)+')"';
	}
	
	var preStyle='';
	var nextStyle='';
	if(controlor.cur.page==1){
		pre='';
		preStyle='class="disabled"';
	}
	controlor.cur.totalPage = totalPage;
	if(controlor.cur.page==controlor.cur.totalPage){
		next='';
		nextStyle='class="disabled"';
	}
	var pagebarHtml='<ul class="pagination pagination-sm" style="position: relative;left: 290px;'+controlor.cur.pageStyle+'"><li  '+preStyle+'><a href="#" '+pre+'>上一页</a></li>';
	for(var i=0;i<pageList.length;i++){
		if(value){
			if(pageList[i]==controlor.cur.page){
				pagebarHtml+='<li class="active"><a href="#"  onclick="addItemList('+pageList[i]+',\''+value+'\')">'+pageList[i]+'</a></li>';
			}else{
				pagebarHtml+='<li><a href="#" onclick="addItemList('+pageList[i]+',\''+value+'\')">'+pageList[i]+'</a></li>';
			}
		}else{
			if(pageList[i]==controlor.cur.page){
				pagebarHtml+='<li class="active"><a href="#"  onclick="addItemList('+pageList[i]+')">'+pageList[i]+'</a></li>';
			}else{
				pagebarHtml+='<li><a href="#" onclick="addItemList('+pageList[i]+')">'+pageList[i]+'</a></li>';
			}
		}
		
	}
	pagebarHtml+='<li '+nextStyle+'><a href="#" '+next+'>下一页</a></li></ul>';
	return pagebarHtml;
}


function createTable(data,columns,options){
	options=options||{};
	lineNum=options.line;
	totalPage=options.totalPage?options.totalPage:controlor.cur.totalPage;
	page=options.page?options.page:1;
	page>totalPage?page=totalPage:'';
	var tableHtml='<table class="table table-striped table-bordered table-hover">';
	tableHtml+=createTHeader(columns,lineNum,options);
	if(data&&data.length){
		tableHtml+=createTBody(data,columns,lineNum,options);
	}else{
		tableHtml+='<tbody><div style="width:100px;height:50px;left: 50%;position: absolute;margin-left: -50px;top:43px;">无数据</div></tbody>';
	}
	
	tableHtml+='</table>'+createPageBar(page, totalPage);
	return tableHtml;
}
function createTableMonitor(data,columns,options){
	options=options||{};
	lineNum=options.line;
	totalPage=options.totalPage?options.totalPage:controlor.cur.totalPage;
	page=options.page?options.page:1;
	page>totalPage?page=totalPage:'';
	$('#monitor-page').html(createPageBar(page, totalPage));
	var tableHtml='<table class="table table-striped table-bordered table-hover">';
	tableHtml+=createTHeader(columns,lineNum,options);
	tableHtml+=createTBody(data,columns,lineNum,options);
	tableHtml+='</table>';
	return tableHtml;
}

function createTHeader(columns,lineNum,options){
	var theader='<thead><tr>';
	try{
		if(lineNum){
			theader+='<th>'+lineNum+'</th>';
		}
		for(var i=0;i<columns.length;i++){
			if(columns[i].listvisable){
				theader+='<th>'+columns[i].text+'</th>';
			}
		}
	}catch (e) {}
	if(options){
		if(options.oprate){
			theader+='<th>'+options.oprate.head+'</th>';
		}
	}
	
	theader+='</tr></thead>';
	return theader;
}

function createTBody(data,columns,lineNum,options){
	var tbody='<tbody>';
	try{
		for(var i=0;i<data.length;i++){
			var tr=data[i];
			var trHtml='';
			if(lineNum){
				if(controlor.cur.cur_nav == "per"){
					trHtml+='<td align="center"><input type="checkbox"  name="preManage" value="'+tr.user_id+'" ></td>';
				}else if(controlor.cur.cur_nav == "cashManage"){
					trHtml+='<td align="center"><input type="checkbox"  name="cashOption" value="'+tr.user_id+'" ></td>';
				}else if(controlor.cur.cur_nav == "itemreport" || controlor.cur.cur_nav == "cashview"){
					trHtml+='<td align="center">'+(i+1)+'</td>'
				}else if(controlor.cur.cur_nav == 'authcard'){
					trHtml+='<td align="center"><input type="checkbox"  name="authcardOption" value="authCard_'+tr.id+'" ></td>';
				}else{
					trHtml+='<td align="center">'+(i+1)+'</td>';
				}
				
			}
			for(var j=0;j<columns.length;j++){
				if(columns[j].listvisable){
//					var casca=columns[j].value.split(".");
//					var temp_value=tr[casca[0]];
//					if(temp_value&&casca.length>1){
//						for(var ci=1;ci<casca.length;ci++){
//							temp_value=temp_value[casca[ci]];
//							if(!temp_value){
//								break;
//							}
//						}
//					}
//					temp_value=temp_value||"";//tr[columns[j].value]
					temp_value=trueValue(tr, columns[j].value);
					if(columns[j].selflistformat){
						trHtml+='<td align='+columns[j].position+'>'+columns[j].selflistformat(tr,temp_value)+'</td>';
					}else{
						trHtml+='<td align='+columns[j].position+'>'+temp_value+'</td>';
					}
				}
			}
			
			if(options.oprate&&options.oprate.col){
				var opstr='';
				for(var oi=0;oi<options.oprate.col.length;oi++){
					opstr+=formatStr(options.oprate.col[oi].text(),tr,options.oprate.col[oi].coldata,i);
				}
				trHtml+='<td align='+columns[j].position+'>'+opstr+'</td>';
			}
			
			tbody+='<tr>'+trHtml+'</tr>';
		}
	}catch (e) {}
	tbody+='</tbody>';
	return tbody;
}









function stroggleMonitorWindow(){
	if($('#darg_container')[0].drag){
		return;
	}
	$(".drag_body").stop();
	var height=$('.drag_body').height();
	if(height>0){
		height=0;
	}else{
		height=400
		$('.drag_body').show();
	}
	$('.drag_body').animate({height:height+"px"},null,function(){if(!height){
		$('.drag_body').hide();
	}});
	
}



function refreshMonitor(){
	alert($('#overtime')[0].checked);
}






















function trueValue(obj,column,value){
	var casca=column.split(".");
	var target=obj;//对象
	var attr=casca[0];//属性
	if(casca.length>1){//不存在级别
		for(var ci=0;ci<casca.length-1;ci++){
			target=target[casca[ci]];
			if(!target){
				break;
			}
		}
		if(target){
			attr=casca[casca.length-1];
		}
	}
	if(arguments.length==3){
		target[attr]=value;
	}else{
		return (target&&target[attr])||"";
	
	}
}


function getFormValue(){
	var columns=controlor.cur.dataConfig;
	try {
		for(var i=0;i<columns.length;i++){
			try {
				var value=$('#'+controlor.cur.formPrefix+columns[i].value).val();
				trueValue(controlor.cur.detailData, columns[i].value, value);
//				controlor.cur.detailData[columns[i].value]=value
			} catch (e) {
				// TODO: handle exception
				alert(e.message);
			}
		}
	} catch (e) {
		// TODO: handle exception
	}
}


//表单
function createInput(text,name,value,type,hidden,readonly){
	var input='';
	value?'':value='';
	var tips='';
	if(!readonly){
		tips='输入...';
	}
	var readonlystr= readonly?(' readonly="'+readonly+'"'):'';
	if(hidden){
		input+='<input id="'+controlor.cur.formPrefix+name+'" type="hidden" name="'+name+'" value="'+value+'">';
	}else{
		input+='<div class="form-group"><label for="'+controlor.cur.formPrefix+name+'" class="col-sm-2 control-label">'+text+'</label><div class="col-sm-5">'+
		'<input type="'+type+'" class="form-control" id="'+controlor.cur.formPrefix+name+'" placeholder="'+tips+'" value="'+value+'" '+ readonlystr+'></div></div>'
	}
	return input;
}

function createForm(columns,index){
	controlor.cur.detailDataIndex=index;
	controlor.cur.detailData=controlor.cur.listData[index]||{};
	var formSTR='';
	for(var i=0;i<columns.length;i++){
		if(columns[i].selfformformat){
			formSTR+=columns[i].selfformformat(controlor.cur.detailData,controlor.cur.detailData[columns[i].value],columns[i]);
		}else{
			formSTR+=createInput(columns[i].text, columns[i].value, controlor.cur.detailData[columns[i].value], columns[i].formtype, !columns[i].formvisable,columns[i].readonly);
		}
	}
	return '<form id="'+controlor.cur.formID+'" class="form-horizontal" role="form">'+formSTR+'</form>';
}

function insertForm(index){
	$('#'+controlor.cur.formTAG).html(createForm(controlor.cur.dataConfig,index));
	$('#form-submit-footer').html(submitManager[controlor.cur.cur_nav]());
}



function approvalParkspace(status,id,commit){
	var str="未审核";
	if(status){
		str="已审核";
	}
	var identify='asel-'+id;
	if(!commit){
		identify+='-';
	}
	$('#'+identify).html(str);
	if(commit){
//		controlor.cur.saveItem();
	}
}


function createApprovalSel(status,id,commit){
	var str="未审核";
	if(status){
		str="已审核";
	}
	var identify='asel-'+id;
	if(!commit){
		identify+='-';
	}
	return '<div class="btn-group"> <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span id="'+identify+'">'+str+'</span><span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#" onclick="approvalParkspace(0,'+id+','+commit+')">待审核</a></li><li><a href="#" onclick="approvalParkspace(1,'+id+','+commit+')">已审核</a></li> </ul></div>'
}







//参数模板
var argsContrlObj={
		values:{
			ajax:null,
			data:null
		},
		models:{
			ajax:null,
			data:null
		},
		curInfo:{
			ajax:null,
			data:null,
			curIndex:null
		},
		copy:{
			ajax:null
		},
		update:{
			ajax:null
		},
		del:{
			ajax:null
		}
};

function showArgsModel(){
	var caller_models=function(msg){
		argsContrlObj.models.data=msg.data;
		var html='';
		for(var i=0;i<msg.data.length;i++){
			var index=i+'';
			html+='<div id="arg_model_'+index+'" class="leftPerTop leftBar" onclick="selectArgsModel(this)">'+msg.data[i].argModelName+'</div>'
		}
		$('#parameLeft').html(html);
		//页面展示
		//获取激活的页面信息
		selectArgsModel({id:'arg_model_0'});
//		$('[data-number="3043"]').css('display','none');
	};
	//获取参数值集信息列表
	var caller_values=function(msg){
		argsContrlObj.values.data=msg.data;
		//页面展示
		var html='';
		if(argsContrlObj.values.data&&argsContrlObj.values.data.values){
			for(var i in argsContrlObj.values.data.values){
				html+='<tr>';
				html+='<td align="left"  style="vertical-align:middle;text-align:left;margin:5px 10px;border:1px solid #CCC;min-width:80px;color:#008d83;">'+i+'</td><td style="margin:5px 10px;border:1px solid #CCC;" valign="middle">';
				var values=argsContrlObj.values.data.values[i];
				var tds=[];
				for(var i=0;i<values.length;i++){
					tds.push('<span style="color:#008d83;">值：</span><span style="color:#008d83;">'+values[i].confValue+'</span><br/><span style="color:#666;">描述：'+values[i].confComment+'</span>');
				}
				html+=tds.join('<br/>')+'</td></tr>';
			}
		}
		$('#value_table').html(html);
		//获取参数模板列表
		getArgsInfoList(caller_models);
	};
	
	//获取参数详细信息
	getArgsValueList(caller_values);
}
function copyCurModel(){
	var caller=function(){
		showArgsModel();
	};
	if(argsContrlObj.copy.ajax){
		argsContrlObj.copy.ajax.abort();
		argsContrlObj.copy.ajax=null;
	}
	argsContrlObj.copy.ajax=sendRequest(URLManager.baseurl+URLManager['argsadd'], caller, {mid:argsContrlObj.curInfo.data.id,name:encodeURI(argsContrlObj.curInfo.data.argModelName+"-副本")}, "获取列表", false,null,null,"GET");
}

function reselectModel(){
	selectArgsModel({id:argsContrlObj.curInfo.curIndex});
}


function saveModel(){
	var caller=function(msg){
		argsContrlObj.curInfo.data.argModelName=msg.data.argModelName;
		$('#'+argsContrlObj.curInfo.curIndex).html(msg.data.argModelName);
	};
	if(argsContrlObj.update.ajax){
		argsContrlObj.update.ajax.abort();
		argsContrlObj.update.ajax=null;
	}
	var data={};
	data.mid=argsContrlObj.curInfo.data.id;
	data.name=encodeURI($('#args_name').val());
	if(!data.name){
		alert('模板名称不能为空!');
	}
	data.values=[];
	data.ids=[];
	var dataColumn=$("[id^=model_value_]");
	for(var i=0;i<dataColumn.length;i++){
		var cid=dataColumn[i].id;
		var configId=dataColumn[i].name;
		var ischoose=true;
		if(argsContrlObj.values.data.configs){
			for(var x in argsContrlObj.values.data.configs){
				if(argsContrlObj.values.data.configs[x].id+''==configId){
					if(argsContrlObj.values.data.configs[x].writeSelf==1){
						ischoose=false;
					}
					break;
				}
			}
		}
		if(ischoose){
			if($(dataColumn[i]).val()){
				var chooseValues=$(dataColumn[i]).val().split(",");
				if(chooseValues&&chooseValues.length){
					for(var j in chooseValues){
						data.ids.push(chooseValues[j]);
					}
				}
			}
		}else{
			data.values.push(encodeURI(configId+";"+$(dataColumn[i]).val()));
		}
	}
	argsContrlObj.update.ajax=sendRequest(URLManager.baseurl+URLManager['argsupdate'], caller, data, "获取列表", false,null,null,"GET");
}


function delModel(){
	var caller=function(msg){
		showArgsModel();
	};
	if(argsContrlObj.del.ajax){
		argsContrlObj.del.ajax.abort();
		argsContrlObj.del.ajax=null;
	}
	var data={};
	data.id=argsContrlObj.curInfo.data.id;
	argsContrlObj.del.ajax=sendRequest(URLManager.baseurl+URLManager['argsdel'], caller, data, "操作", false,null,null,"GET");
}

//请求参数集列表
function getArgsValueList(caller){
	if(argsContrlObj.values.ajax){
		argsContrlObj.values.ajax.abort();
		argsContrlObj.values.ajax=null;
	}
	argsContrlObj.values.ajax=sendRequest(URLManager.baseurl+URLManager['argsvaluelist'], caller, {type:1}, "获取列表", false,null,null,"GET");
}
//请求参数模板列表
function getArgsInfoList(caller){
	if(argsContrlObj.models.ajax){
		argsContrlObj.models.ajax.abort();
		argsContrlObj.models.ajax=null;
	}
	argsContrlObj.models.ajax=sendRequest(URLManager.baseurl+URLManager['argsinfolist'], caller, null, "获取列表", false,null,null,"GET");
}

function selectArgsModel(obj){
//	if(obj.id == "arg_model_0"){
//		$('[data-number="3043"]').css('display','none');
//	}else{
//		$('[data-number="3043"]').css('display','block');
//	}
	$('.leftBarActive').removeClass('leftBarActive');
	$('#'+obj.id).addClass('leftBarActive');
	argsContrlObj.curInfo.curIndex=obj.id;
	argsContrlObj.curInfo.data=argsContrlObj.models.data[obj.id.substr(10)];
	//<--add liwei 数据不一定存在
	if(!argsContrlObj.curInfo.data){
		return;
	}
	if(!argsContrlObj.curInfo.data.editable||argsContrlObj.curInfo.data.isDefault){
		$('[data-number="3043"]').css('display','none');
	}else{
		$('[data-number="3043"]').css('display','block');
	}
	//-->
	$('#args_code').val(argsContrlObj.curInfo.data.id);
	$('#args_name').val(argsContrlObj.curInfo.data.argModelName);
	$('#args_time').val(new Date(argsContrlObj.curInfo.data.createTime).Format(timeFormat));
	mainManager.getPage(1, 'args','argsee');
	panelMove("0");
	$('#myTabs a[href="#datalist"]').tab('show')
}


//到出报表
function exportMethod(obj) {  
  
    // var curTbl = document.getElementById(tableid);  
    var oXL = new ActiveXObject("Excel.Application");  
    var oWB = oXL.Workbooks.Add();  
    var oSheet = oWB.ActiveSheet;  
    var sel = document.body.createTextRange();  
    sel.moveToElementText(obj);  
    sel.select();  
    sel.execCommand("Copy");  
    oSheet.Paste();  
    oXL.Visible = true;  

}  

















function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("Text", ev.target.id);
}
var ticketNode={
		'storeName':'<span  class="ticket_node" onclick="show_ticket_node(this)">北京华联创新中心店</span>',
		'storeBR':'<div></div>',
		'id':'<img src=""/>',
		'id1':'',
		'id2':''
			};
function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("Text");
	$(ev.target).append(ticketNode[data]);
}

var show_ticket_node_select=null;
function show_ticket_node1(obj){
	if(show_ticket_node_select){
		show_ticket_node_select.style.color="black";
		show_ticket_node_select.style.backgroundColor="white";
	}
	show_ticket_node_select=obj;
	$("#select_node_content").html(obj.innerText);
	obj.style.color="white";
	obj.style.backgroundColor="red";
	$("#select_node_content").focus();
}

function ticket_node_update1(){
	show_ticket_node_select.innerText=$("#select_node_content").text();
}

//修改密码
function User(){
	// this.user = user;
	this.param = {};
	this.oldPass = null;
	this.newPass = null;
	this.surePass = null;
}
User.prototype.show = function(){
	var _that = this;	
	$('#save_pass').on('click',function(event) {
		_that.newPass = $("#new_pass").val();
		_that.surePass = $("#sure_pass").val();
		if(_that.newPass&&_that.surePass){
			if(_that.newPass != _that.surePass){
				$("#pass_prompt")[0].innerText = '密码不一致';
				$("#sure_pass").css({
					background: '#FFFACD',
					border: '1px solid red'
				});

				$("#sure_pass").focus();
				return false;
			}else{
				$("#pass_prompt")[0].innerText = '';
			}
		}
		_that.oldPass = $("#old_pass").val();
		_that.param = {'oripassword':_that.oldPass,'newpassword':_that.newPass};
		var dataUser = new Datauser(null,'api/user/changePassword');
		event.preventDefault();
		dataUser.postdata(_that.caller,_that.param);
	});

	$('#sure_pass').keyup(function(event) {
		$("#sure_pass").css({
			background: '#fff',
			border: '1px solid #ccc'
		});
		$("#pass_prompt")[0].innerText = '';
	});

	$('#moddify_model_pass').on('click', function(event) {
		event.preventDefault();
		$('#popShieldCon').empty();
		$('#myModal').modal('hide');
	});
}

User.prototype.caller = function(msg){
	if(msg.code == 1){
		alert(msg.errorDescription);
	}else{
		alert('修改成功');
		$('#popShieldCon').empty();
		$('#myModal').modal('hide');
	}
	
}

//接口调用
function Datauser(id,url){
	this.id = id;
	this.url = window.location.protocol+"//"+window.location.host+"/POSServer/"+url;
}
Datauser.prototype.getdata = function(fn,param){
	$.getJSON(this.url, param, fn);
}
Datauser.prototype.postdata = function(fn,param){
	$.ajax({
		url: this.url,
		type: 'POST',
		dataType: 'json',
		data: param,
	})
	.done(fn)
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}















// var $selectModel=$('<input list="source" id="ipt"/>');
// var $dataList=$('<datalist id="source"></datalist>');
// $selectModel.append($dataList);
// info_fill_form.$modelBar.append($selectModel);
// // <select id="slpk" class="selectpicker" data-live-search="true" multiple></select>
// // 设置multiple时为多选，data-live-search="true"时显示模糊搜索框，不设置或等于false时不显示。
// // var $selectModel=$('<select id="slpk" class="selectpicker" data-live-search="true" ></select>');
// // $selectModel.selectpicker({
// //     noneSelectedText : '请选择'//默认显示内容
// // });
// $dataList.append("<option id='1' value='香蕉'></option>");
// $dataList.append("<option id='2' value='苹果'></option>");
// $dataList.append("<option id='3' value='橘子'></option>");
// $dataList.append("<option id='4' value='石榴'></option>");
// $dataList.append("<option id='5' value='棒棒糖'></option>");
// $dataList.append("<option id='6' value='桃子'></option>");
// $dataList.append("<option id='7' value='陶子'></option>");
// // info_fill_form.$modelBar.append($selectModel);
// // $selectModel.selectpicker('refresh');
// var button_=$('<button type="button" class="btn btn-primary" id="btn-search">选值</button>');
// //获取选值
// // var selectedValues = [];
// // $("#slpk:selected").each(function(){
// //     selectedValues.push($(this).val());
// // });
// info_fill_form.$modelBar.append(button_);
// button_.click(function(){
// 	alert($selectModel.val());
// 	$("option:selected").each(function(){
// 		aler($(this).val());
// 	});
// });