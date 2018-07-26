// BASE_HOST="http://"+window.location.host;//服务地址
// RESOURCE_ADRR="http://wesales.net/";//资源服务器


Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var timeFormatShort="yyyy-MM-dd";
var timeFormat = "yyyy-MM-dd hh:mm:ss"; 





//控制器  控制当前模块
var controlor={
		cur:null,
		old:null,
		back:function(caller){
			var temp=this.cur;
			this.cur=this.old;
			this.old=this.cur;
			try {
				caller(this.cur,this.old);
			} catch (e) {
			}
		},
		setCur:function(tar){
			if(tar!=this.cur){
				this.old=this.cur;
				this.cur=tar;
			}
		}
};


var timeUnit=1000*60//一分钟
var allowTime=timeUnit*5;//5分钟
var overtime_one=allowTime*12//一个小时
var overtime_two=overtime_one*24//一天
function updateFormat(tr,time){
	var dis=comptime(time, null);
	if(dis<timeUnit){
		dis= "1分钟";
	}else if(dis<overtime_one){
		dis= Math.ceil(dis/timeUnit)+"分钟";
	}else if(dis<overtime_two){
		dis= Math.ceil(dis/overtime_one)+"小时";
	}else{
		dis= Math.ceil(dis/overtime_two)+"天";
	}
	return dis+"以内"
}
function add0(m){return m<10?'0'+m:m }
function powerFormat(tr,period)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(period);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
var value = period?y+'-'+add0(m)+'-'+add0(d):"";
return value;
}

//时间格式化
function dateInit(tr,data){
	if(data.length == 8){
		var pattern = /(\d{4})(\d{2})(\d{2})/;
		var formatedDate = data.replace(pattern, '$1-$2-$3');
	}
	return formatedDate;
}
function powerFormats(tr,period)
{
//shijianchuo是整数，否则要parseInt转换
var time = new Date(period);
var y = time.getFullYear();
var m = time.getMonth()+1;
var d = time.getDate();
var h = time.getHours();
var mm = time.getMinutes();
var s = time.getSeconds();
var value = period?y+'-'+add0(m)+'-'+add0(d)+'  '+add0(h)+':'+add0(mm)+':'+add0(s):"";
return value;
}

function detailGap(tr,time){
	var dis=comptime(new Date(), tr.leaseOrder.plan_end_time);
	var days=Math.floor(dis/overtime_two);
	days=days?(days+'天'):'';
	var daysleft=dis%overtime_two;
	var hours=Math.floor(daysleft/overtime_one);
	var hoursleft=daysleft%overtime_one;
	var minuts=Math.floor(hoursleft/timeUnit);
	return days+hours+'时'+minuts+'分';
}

function updateFormatForMonitor(tr,time){
	var dis=comptime(time, null);
	var result='';
	if(dis<timeUnit){
		result= "1分钟";
	}else if(dis<overtime_one){
		result= Math.ceil(dis/timeUnit)+"分钟";
	}else if(dis<overtime_two){
		result= Math.ceil(dis/overtime_one)+"小时";
	}else{
		result= Math.ceil(dis/overtime_two)+"天";
	}
	var outerTag='<span style="color:red;">'+result+'以内</span>';
	if(dis<=allowTime){
		outerTag='<span style="color:green;">'+result+'以内</span>';
	}
	return outerTag;
}

function timeformat(tr,value,config){
	var str=value?new Date(value).Format(timeFormat):'';
	if(config){
		str= createInput(config.text, config.value,str, config.formtype, !config.formvisable,config.readonly);
	}
	return str;
}



//function modelValueChange(obj){
//	var id=obj.id;
//	var chooseValue=$('#'+id).val();
//	var values=argsContrlObj.values.data[id.replace('model_value_','')];
//	for(var i=0;i<values.length;i++){
//		if(values[i].confValue==chooseValue){
//			$('#'+id.replace('value','comment')).html(values[i].confComment);
//			break;
//		}
//	}
//}

////参数值
//function confValueFormat(tr,value,config){
//	var id='model_value_'+tr['confCode'];
//	var str = '';
//	if(argsContrlObj.curInfo.data.editable == 0){
//		str +='<select id="'+id+'" name="'+tr.id+'" onchange="modelValueChange(this)" style="width:100%;" disabled=true>';
//	}else{
//		str +='<select id="'+id+'" name="'+tr.id+'" onchange="modelValueChange(this)" style="width:100%;">';
//	}
//	
//	var values=argsContrlObj.values.data[tr['confCode']];
//	for(var i=0;i<values.length;i++){
//		var valueTemp=values[i].confValue;
//		if(value==valueTemp){
//			str+='<option selected value="'+valueTemp+'">'+valueTemp+'</option>';
//		}else{
//			str+='<option value="'+valueTemp+'">'+valueTemp+'</option>';
//		}
//	}
//	return str+'</select>';
//}
//
//
//function confCommentFormat(tr,value,config){
//	var str='<span id="model_comment_'+tr['confCode']+'">'+value+'</span>';
//	return str;
//}

//年龄
function ageFormat(tr){
	var time = tr.birthday;
	var year = new Date(time);
	var year1 = new Date();
	var age = year1.getFullYear() - year.getFullYear();
	return age;
}


var traslateData={'m':'男',
		'f':'女',
		'1':'是',
		'0':'否'
		};


function optionFormat(tr,value,config){
	value=value||'0';
	var text = traslateData[value+'']||'';
	return text;
}

//性别
function sexFormat(tr,value,config){
	var text = tr.sex;
	if(text == "m"){
		return "男";
	}else{
		return "女";
	}
}
//是否启用
function sexFormat(tr){
	var text = tr.sex;
	if(text == "0"){
		return "是";
	}else{
		return "否";
	}
}

//0 待审核   1 已审核
function approvFormat(tr,value,config){
	var str=value?'已审核':'待审核';
	if(config){
		str= createInput(config.text, config.value,str, config.formtype, !config.formvisable,config.readonly);
	}
	return str;
}

function selectformat(tr,value,config){
	var str=value?value+'':'1';
	// if(config){
	// 	str= createInput(config.text, config.value,str, config.formtype, !config.formvisable,config.readonly);
	// }
	str+='<select style="width:100px;margin-top: -4px;">'+
						'<option value="1">1</option>'+
						'<option value="2">2</option>'+
						'<option value="3">3</option>'+
					'</select>'
	return str;
}


//0 支付宝   1 微信  2 银联
function aaccountTypeFormat(tr,value,config){
	var str=value==0?'支付宝':value==1?'微信':'银联';
	if(config){
		str= createInput(config.text, config.value,str, config.formtype, !config.formvisable,config.readonly);
	}
	return str;
}


function imgFormat(tr,imgdata,config){
	var str= createInput(config.text, config.value, tr[config.value], config.formtype, config.formvisable,config.readonly);
	if(imgdata&&imgdata.length){
		str+=createIMGView(eval(imgdata));
	}
	return str;
}

var imgheight=400;
function createIMGView(imgData){
	if(!imgData||!imgData.length){
		return '';
	}
	var listr='';
	var imgstr='';
	listr+='<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>';
	imgstr+='<div class="item active"><div class="img-box"><span></span><img alt="First slide" src="'+URLManager.resourceurl+imgData[0]+'"></div></div>';
	for(var i=1;i<imgData.length;i++){
		listr+='<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class=""></li>';
		imgstr+='<div class="item"><div class="img-box"><span></span><img alt="First slide" src="'+URLManager.resourceurl+imgData[i]+'"></div></div>';
	}
	var imgView='<div id="carousel-example-generic" class="carousel slide" data-ride="carousel"><ol class="carousel-indicators">'+listr+
	    '</ol> <div class="carousel-inner">'+imgstr+
	   '</div><a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a class="right carousel-control" href="#carousel-example-generic" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a></div>';
	return imgView; 
}


//提现账号信息格式化@openId;nickName;
function extraaccount(tr,value,config){
	var str=tr['nickName'];
	var str2=tr['openId'];
	if(str&&str2){
		str=str+"/"+str2;
	}else{
		str=str||str2;
		str=str?str:'';
	}
	if(config){
		str= createInput(config.text, config.value,str, config.formtype, !config.formvisable,config.readonly);
	}
	return str;
}


//工具方法 Time = "2009-09-21 00:00:00";
function getDate(time){
  var times = time.substring(0, 10).split('-');
  time = times[1] + '-' + times[2] + '-' + times[0] + ' ' + time.substring(10, 19);
  return Date.parse(time);
}

function comptime(timesrc,timedes){
	timedes=timedes||new Date();
	return timedes-timesrc;
}




function formatStr(src,trdata,des,index){
	if(des||des===0){
		if(!$.isArray(des)){
			des=[des];
		}
		src=src.replace('{-1}',index);
		for(var i=0;i<des.length;i++){
			try{
				src=src.replace('{'+i+'}',trdata[des[i]]);
			}catch (e) {
				// TODO: handle exception
			}
		}
	}
	return src;
}

//款台格式化
function posNoFormat(tr,data){
	var text = '';
	return text = data < 10 ? '0' + data : data;
}







//地址管理  公用
//加入权限功能的话，URLManager需要动态从后台获取。当前用户的权限列表中，存在权限，存在对应地址！
//后续按钮显示控制，接口访问控制，页面显示控制 均基于此
//后台也加入接口访问限制，以防造假


var URLManager={
		baseurl:BASE_HOST+"/gabIM/",
		resourceurl:RESOURCE_ADRR,
		
		//pos  pos
		auditlist:"api/user/priceChangeList",
		emergencylist:"api/user/priceChangeList",
		perlist:"api/user/list",
		percardlist:"api/user/list",
		perupdate:"api/user/add",
		rolelist:"api/user/rolelist",
		roleadd:"api/user/addrole",
		authlist:"api/user/authlist",
		authadd:"api/user/addauth",
		dateaccesslist:"api/user/dateaccesslist",
		daacadd:"api/user/adddaac",
		itemclasslist:"api/biz/itemclasslist",
		daacdel:"api/user/deldaac",
		userdel:"api/user/deluser",
		store:"api/biz/store",
		itemlist:"api/user/itemListForApply",
		pricechangeitemlist:"api/user/priceChangeItemList",
		createpricechange:"api/user/createPriceChange",
		addpriceitems:"api/user/addPriceItems",
		pricechangelist:"api/user/priceChangeList",
		commitpricechange:"api/user/commitPriceChange",
		delpriceitems:"api/user/delPriceItems",
		pricechangeitemlist:"api/user/priceChangeItemList",
		auditpricechange:"api/user/auditPriceChange",
		cashmanagelist:"api/posterminal/listStatusAndPosType",
		cashparameterslist:"api/posterminal/listStatusAndPosType",
		cashupdatelist:"api/posterminal/listStatusAndPosType",
		//liststatuspostype:"api/posterminal/listStatusAndPosType",//款台刷选接口
		terraceseach:"api/posterminal/get",//款台号搜索接口
		addcash:"api/posterminal/add",//款台增加接口
		argsinfolist:"api/args/getModels",//参数模板基础信息列表接口
		argsupdate:"api/args/updateModel",//参数模板更新接口
		argsadd:"api/args/createModel",//复制参数模板接口
		argsvaluelist:"api/args/getValuesOfType",//获取参数值集接口
		argsdel:"api/args/delModelById",//删除参数模板接口
		argslist:"api/args/getModelById",//获取参数模板详情接口
		cashierlist:"api/cash/paymentsList",//收银缴款单列表 
		foremanlist:"api/cash/summaryList",//领班班结单列表 		
		monitorpointlist:"api/user/priceChangeList",
		paragraphlist:"api/user/priceChangeList",
		createPayment:"api/cash/createPayment",//创建缴款单
		getCashRoundDetail:"api/cash/getCashRoundDetail",//根据ID获取缴款单信息
		getModelById:"api/args/getModelById"//获取系统参数值
};

var saveManager={
		community:function(){
			getFormValue();
			controlor.cur.detailData.createdAt=null;
			controlor.cur.detailData.updatedAt=null;
			if(!controlor.cur.detailData.name){
				showTips("请输入名称！");
				tipsT=setTimeout('hdieTips()', tipsWinHideTime);
				$('#'+controlor.cur.formPrefix+'name').focus();
				return;
			}
			var caller=function(){
				controlor.cur.backToMe();
				
			};
			if(controlor.cur.detailDataIndex!=-1){
				var name=controlor.cur.cur_nav+'update';
				controlor.cur.ajaxManager.abort(name);
				controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[name], caller, controlor.cur.detailData, "更新小区", false,null,null);
			}else{
				var name=controlor.cur.cur_nav+'add';
				controlor.cur.ajaxManager.abort(name);
				controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[controlor.cur.cur_nav+'add'], caller, controlor.cur.detailData, "添加小区", false,null,null);
			}
			
		},       //name参数
		extract:function(){
			Modal.confirm({ msg: "请确认是否付款完成！"})
					  .on( function (e) {
					    	if(e){
					    		var caller=function(){
									controlor.cur.backToMe();
								};
								
								var name=controlor.cur.cur_nav+'update';
								controlor.cur.ajaxManager.abort(name);
								controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[controlor.cur.cur_nav+'update'], caller, controlor.cur.detailData, "完成付款", false,null,null);
					    	}
					  });
					},
		parkingspace:'',
		consumer:'',
		monitor:'',
		approval:function(){
			controlor.cur.detailData.isVerified=(1-controlor.cur.detailData.isVerified);
			var caller=function(){
				controlor.cur.backToMe();
			};
			var name=controlor.cur.cur_nav+'update';
			controlor.cur.ajaxManager.abort(name);
			controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[controlor.cur.cur_nav+'update'], caller, controlor.cur.detailData, "审核车位", false,null,null);
		},
		rental:'',
		rentalParking:'',

		//pos
		emergency:'',
		per:function(){
			controlor.cur.detailData={};
			var perArrt = [];
			var nodes = userInform;
			// var reNodes = removeInform;
			
			var perData = $.fn.zTree.getZTreeObj("addPerRole");
			var nodePer = perData.getCheckedNodes(true);
			for(var i=0;i < nodePer.length;i ++){
				perArrt.push(nodePer[i].id);
			}
			if(ROLE_MANAGER_OPRATION == 2){//修改
				controlor.cur.detailData=nodes;
//				controlor.cur.detailData.user_id=nodes.id;
			}
			var bloon = "";
			if($("input[name = 'proflag']")[0].checked == true){
				bloon = 1;
			}else{
				bloon = 0;
			}	
			var userName = $('.userInfo #name')[0].value;
			var password = $('#password').val() == '******' ? '' : $('#password').val();
			if(!userName){Modal.alert({msg:'姓名不能为空'});return false; }
			// if(!password){alert('密码不能为空');return false; }
			controlor.cur.detailData.name=userName;
			controlor.cur.detailData.user_code=$('.userInfo #no')[0].value;
			controlor.cur.detailData.flag=bloon;
			controlor.cur.detailData.job=$(".userInfo #post").find("option:selected").val();
			var age = $(".userInfo #age").val();
			var time = age.replace(/\-/g,'');
			controlor.cur.detailData.birthday=time+'000000000';
			controlor.cur.detailData.password = password;
			controlor.cur.detailData.sex=$(".userInfo #sex").find("option:selected").val();
			controlor.cur.detailData.telephone=$('.userInfo #tel')[0].value;
			controlor.cur.detailData.roleids=perArrt.join(",");
			
			var name=controlor.cur.cur_nav+'update';
			controlor.cur.ajaxManager.abort(name);
			if(!age){Modal.alert({msg:'年龄不能为空'});return false; }
			var caller=function(msg){
				var nodeData = msg.data;
				$('#myModal').modal('hide');
				if(ROLE_MANAGER_OPRATION==1){
					controlor.cur.getPage(controlor.cur.page,null,'123',true);
				}else if(ROLE_MANAGER_OPRATION==2){
					controlor.cur.detailData.name=encodeURI(nodeData.name);
					controlor.cur.detailData.user_code=nodeData.user_code;
					controlor.cur.detailData.flag=nodeData.flag;
					controlor.cur.detailData.job=nodeData.job;
					controlor.cur.detailData.birthday=nodeData.birthday;
					controlor.cur.detailData.sex=nodeData.sex;
					controlor.cur.detailData.password=nodeData.password;
					controlor.cur.detailData.telephone=nodeData.telephone;
					controlor.cur.detailData.roleids=nodeData.roleids;
					controlor.cur.getPage(controlor.cur.page,null,'123',true);
				}
				
			};
			controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[controlor.cur.cur_nav+'update'], caller, controlor.cur.detailData, "添加用户", false,null,null);
			
		},
		role:function(){
			
			var auth=[];
			var class_value1 = [];
			var class_value2 = [];
			var treeObj = $.fn.zTree.getZTreeObj("leftPerRole");
			var nodes = treeObj.getSelectedNodes();
			//获取子节点
			// if(nodes.length > 0){
			// 	var node_index = nodes[0].getIndex();
			// }
			
			if(nodes[0].children){
				var allNodes = nodes[0].children;
			}
			

			var authData = $.fn.zTree.getZTreeObj("backPromiss");
			var nodeAuth = authData.getCheckedNodes(true);
			var nodeAuth1 = $("input[name='auth']:checked");
			//获取数据集权限id
			 var text = $('#dataSetShow tr');
			 for(var p=0;p < text.length;p ++){
				 var dataForm = text[p].childNodes;
				 var dataForm1 = $('#dataSetShow input');
				 if(dataForm1[p].value == 1){
					 class_value1.push(dataForm[2].innerText);
				 }else{
					 class_value2.push(dataForm[2].innerText);
				 }
			 }
			 var bloon = '';
			if($("input[name = 'userflag']")[0].checked == true){
				bloon = 1;
			}else{
				bloon = 0;
			}
			var dataBloon = '';
			if($("input[name = 'dataAuth']")[0].checked == true){
				dataBloon = 1;
			}else{
				dataBloon = 0;
			}
			if(ROLE_MANAGER_OPRATION==1){//新增
				controlor.cur.detailData={};
				controlor.cur.detailData.role_id=0;
				controlor.cur.detailData.level=0;
				if(nodes.length > 0){
					controlor.cur.detailData.pid=nodes[0].id;
					if(nodes[0].flag == 0){
						if(bloon == 0){
							controlor.cur.detailData.flag=bloon;
						}else{
							Modal.alert({msg:'父节点未启用'});
							return;
						}
					}else{
						controlor.cur.detailData.flag=bloon;
					}
				}else{
					controlor.cur.detailData.pid=0;
					controlor.cur.detailData.flag=bloon;
				}
				
				controlor.cur.detailData.deleted=0;
				controlor.cur.detailData.role_code=0;
			}else{//修改
				controlor.cur.detailData=$.extend(true, {}, nodes[0]);
				controlor.cur.detailData.role_id=nodes[0].id;
			}
			if(ROLE_MANAGER_OPRATION==3){
				if(!controlor.cur.detailData.flag){
					controlor.cur.detailData.deleted=1;
				}else{
					Modal.alert({msg:'该组正被启用，不能删除'});
					ROLE_MANAGER_OPRATION = 2;
					return;
				}
			}else{
				for(var i=0;i < nodeAuth.length;i ++){
					auth.push(nodeAuth[i].id);
				}
				for(var j=0;j<nodeAuth1.length;j ++){
					auth.push(nodeAuth1[j].value)
				}
				var groupName = $('#groupName')[0].value;
				if(!groupName){Modal.alert({msg:'请输入用户组名称'});return;}
				controlor.cur.detailData.name=groupName;
				if(ROLE_MANAGER_OPRATION==2){
					controlor.cur.detailData.flag=bloon;
					
				}
				controlor.cur.detailData.isLeaf=1;
				controlor.cur.detailData.data_access=dataBloon;
				controlor.cur.detailData.role_desc=$('#role_desc_box').text();
				controlor.cur.detailData.authids=auth.join(',');
				controlor.cur.detailData.class_value_1=class_value1.join(',');
				controlor.cur.detailData.class_value_2=class_value2.join(',');
			}
			
			var name=controlor.cur.cur_nav+'add';
			controlor.cur.ajaxManager.abort(name);
			var caller=function(msg){
				if(!msg || msg.code !== 0)return;
				curRightPage.pageObj.isChange = false;
				var nodeData=msg.data;
				if(nodeData){
					nodeData.isParent=!nodeData.isLeaf;
					nodeData.pId=nodeData.pid;
				}
				var zTree = $.fn.zTree.getZTreeObj("leftPerRole");
				nodes = zTree.getSelectedNodes();

				treeNode = nodes[0];
				if(treeNode){
					var treeParent = treeNode.getParentNode();
				}
				
				if(ROLE_MANAGER_OPRATION==1){
					var node1 = treeObj.getNodeByParam("id", "0");
					// zTree.selectNode(node1);
					if (treeNode) {
						treeNode = zTree.addNodes(treeNode, nodeData);
					} else {
						treeNode = zTree.addNodes(node1, nodeData);
					}
					add();
				}else if(ROLE_MANAGER_OPRATION==2){
					//修改
					//复制节点属性
					treeNode.name = nodeData.name;
					if(nodeData.pid == 0){
						treeNode.flag = nodeData.flag;
					}else{
						if(treeParent.flag == 0){
							if(nodeData.flag == 0){
								treeNode.flag = nodeData.flag;
							}
						}else{
							treeNode.flag = nodeData.flag;
						}
					}
					
					treeNode.isLeaf =nodeData.isLeaf;
					treeNode.data_access = nodeData.data_access;
					treeNode.authids =nodeData.authids;
					treeNode.level = nodeData.level;
					treeNode.deleted = nodeData.deleted;
					treeNode.auths = nodeData.auths;
					//更新节点
			        treeObj.updateNode(treeNode);
//			        setRoleAuthChecked(treeNode);
				}else if(ROLE_MANAGER_OPRATION==3){
					//删除
					
					$('#rightPart').empty();
					treeObj.removeNode(treeNode, null);
				}
				
				
				
			};
			var neirong = null;
			if(ROLE_MANAGER_OPRATION==1){
				neirong = '添加';
			}else if(ROLE_MANAGER_OPRATION==2){
				neirong = '修改';
			}else{
				neirong = '删除';
			}
			controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[controlor.cur.cur_nav+'add'], caller, controlor.cur.detailData, neirong, false,null,null);
		}
		
		
};
var removeManager={
		role:function(){
			controlor.cur.detailData={};
			controlor.cur.detailData.deleted=1;
			var name=controlor.cur.cur_nav+'add';
			controlor.cur.ajaxManager.abort(name);
			var caller=function(msg){
				$('#rightPerRole').remove();
			};
			controlor.cur.ajaxManager.ajaxCollect[name]=sendRequest(URLManager.baseurl+URLManager[controlor.cur.cur_nav+'add'], caller, controlor.cur.detailData, "添加节点", false,null,null);
		}
}
//参数管理   公用

var paramsManger={
		community:function(){
			var name='';
			try{
				name=$('#comm_name_inp').val();
			}catch (e) {
				// TODO: handle exception
			}
			return {name: name};
		},       //name参数
		extract:function(){
			var status='1';
			try{
				status=document.getElementById("approval_status").mark;
			}catch (e) {
				// TODO: handle exception
			}
			return {status: status};
		},
		parkingspace:function(){
			var cid='';
			try{
				cid=assitManager.parentID;
			}catch (e) {
				// TODO: handle exception
			}
			return {cid: cid};
		},
		consumer:'',
		monitor:function(){
			var asc=$('#option_asc')[0].checked;
			var overtime=$('#overtime')[0].checked;
			var intime=$('#intime')[0].checked;
			var name='';
			var minutes=5;
			var order=1;//逆序 2 顺序
			var timly=3;//1实时 2过期
			try{
				if(asc){
					order=2;
				}
				if(overtime&&!intime){
					timly=2;
				}else if(!overtime&&intime){
					timly=1;
				}
				name=$('#monitor-comm-inpu').val();
			}catch (e) {
				// TODO: handle exception
			}
			return {name: name,minutes:minutes,order:order,timly:timly};
		},
		approval:function(){
			var isVerified='0';
			try{
				if($('#verified')[0].checked){
					isVerified='1';
				}
			}catch (e) {
				// TODO: handle exception
			}
			return {isVerified: isVerified};
		},
		rental:function(){
			var pid=rentalManager.searchPart.parkingspaceSelected.id;
			var cid=rentalManager.searchPart.commSelected.id;
			var date=$('#rental_date').val();
			if(pid&&date){
				return {pid:pid,date:date};
			}else if(cid&&date){
				return {cid:cid,date:date};
			}
			return null;
		},
		rentalParking:'',

		//pos
		emergency:'',
		per:function(){
			var treeObj = $.fn.zTree.getZTreeObj("leftPerRole");
			var param = {};
			var nodes = treeObj.getSelectedNodes();
			var nameSear = $('#searchPer')[0].value;
			if(nameSear){
				param = {'name':encodeURI(nameSear)};
			}
			
			if(nodes&&nodes[0]&&!(nodes[0].id == 0)){
				param.role_id=nodes[0].id;
			}
			return param;
		},
		args:function(){
			return {id:argsContrlObj.curInfo.data.id};
		},
		itemreport:function(){
			return {size:10};
		}
};

var headerOptions={
		community:{oprate:
							{head:"操作",col:[
							     {text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>详情</button>'},coldata:['id']},
							     {text:function(){return '<button type="button" onclick="gotoAssist(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>车位列表</button>'},coldata:['id']}
							 ]},
							line:"序号"},       //name参数
		extract:{oprate:
		{head:"操作",col:[
						//{text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>详情</button>'},coldata:['id']},
						{text:function(){
							if(controlor.cur.searchParams.status!=1){
								return '';
							}
							var str="完成付款";
							return '<button type="button" onclick="approvalByid(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-user"></span>'+str+'</button>'},coldata:['id']}
					 ]},
					line:"序号"},
		queryIntItem1:{oprate:
		{head:"操作",col:[
					     {text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-primary button_b" disabled="true">修改</button>'},coldata:['id']},
					     {text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-primary button_b">删除</button>'},coldata:['id']}
					 ]}},
		consumer:{},
		monitor:{oprate:null,
					line:"序号"},
		approval:{oprate:
		{head:"操作",col:[
						{text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>详情</button>'},coldata:['id']},
						{text:function(){
							var str="通过审核";
							if(controlor.cur.searchParams.isVerified!='0'){
								str="取消审核";
							}
							return '<button type="button" onclick="approvalByid(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-user"></span>'+str+'</button>'},coldata:['id']}
					 ]},
					line:"序号"},
		rental:{},
		rentalParking:{oprate:null,
			line:"序号"},

		//pos
		
		per:{oprate:null,
			line:'<input type="checkbox" onclick="allCheck($(this))">'},
		changeprice:{oprate:
							{head:"操作",col:[
							     {text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>删除</button>'},coldata:['id']}
							 ]},
							line:""},
		// cashManage:{oprate:null,
		// 	line:'<input type="checkbox" onclick="allCheck($(this))">'},
		args:{}
};


var submitManager={
		base:function(botton){
			return '<button type="submit" onclick="controlor.cur.saveItem()" class="btn btn-default">'+botton+'</button>';
		},
		community:function(){
			return submitManager.base("保存修改");
		},       //name参数
		extract:function(){
			return submitManager.base("保存修改");
		},
		parkingspace:function(){
			return submitManager.base("保存修改");
		},
		consumer:function(){
			return submitManager.base("保存修改");
		},
		monitor:function(){
			return submitManager.base("保存修改");
		},
		approval:function(){
			var str="通过审核";
			if(controlor.cur.searchParams.isVerified!='0'){
				str="取消审核";
			}
			return submitManager.base(str);
		}
		//pos
		
};



var searchAreaManager={
		community:{
			insertSearchPanel:function(){
				var name=mainManager.searchParams?(mainManager.searchParams.name||''):'';
				//adadad
				var html='<div class="input-group input-group-sm"><span class="input-group-addon">小区名称</span><input id="comm_name_inp" type="text" class="form-control" value="'+name+'" placeholder="请输入..."><span onclick="controlor.cur.dosearch()" class="input-group-addon glyphicon glyphicon-search glyphicon_btn" style="top:0;"></span><span class="input-group-addon" style="width:35%;background:#FFFFFF;border-color:#FFFFFF;"></span><span onclick="operate(-1)" class="input-group-addon glyphicon glyphicon-plus glyphicon_btn" style="top:0;border:1px solid green;border-radius: 3px;background:#FFFFFF;">添加小区</span></div>';
				return html;
			}
		},       //name参数
		extract:{
			insertSearchPanel:function(){
//				var name=mainManager.searchParams?(mainManager.searchParams.name||''):'';
				var html='<div class="btn-group"><input type="button" class="btn btn-nomal" id="approval_status" value="审核中"><button type="button" class="btn btn-nomal dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height: 34px;"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li id="p_m_0" onclick ="transfer(this)"><a href="#">审核失败</a></li><li id="p_m_1" onclick ="transfer(this)"><a href="#">审核中</a></li><li id="p_m_2" onclick ="transfer(this)"><a href="#">审核通过</a></li><li id="p_m_3" onclick ="transfer(this)"><a href="#">完成付款</a></li></ul></div>';
					 
				return html;
			}
		},
		parkingspace:{
			insertSearchPanel:function(){
				var html='<div class="input-group input-group-sm"><span class="input-group-addon">车位号</span><input id="parking_name_inp" type="text" class="form-control" placeholder="请输入..."><span onclick="controlor.cur.dosearch()" class="input-group-addon glyphicon glyphicon-search glyphicon_btn" style="top:0;"></span><span class="input-group-addon" style="width:35%;background:#FFFFFF;border-color:#FFFFFF;"></span><span onclick="gotoMain()" class="input-group-addon glyphicon glyphicon-arrow-left glyphicon_btn" style="top:0;border:1px solid green;border-radius: 3px;background:#FFFFFF;">返回小区列表</span></div>';
				return html;
			}
		},
		consumer:'',
		monitor:'',
		approval:{
			insertSearchPanel:function(){
				var vstr='';
				var uvstr='';
				if(controlor.cur.searchParams.isVerified!='0'){
					vstr='checked="checked"';
				}else{
					uvstr='checked="checked"';
				}
				var html='<div class="checkbox" ><label  onclick="dosearchLater()"><input id="unverified" type="radio" name="options" '+uvstr+'> 未审核</label><label  onclick="dosearchLater()"><input id="verified" type="radio" name="options" '+vstr+'> 已审核</label></div>';
				return html;
			}
		},
		//pos
		// emergency:{
		// 	insertSearchPanel:function(){
		// 		var name=mainManager.searchParams?(mainManager.searchParams.name||''):'';
		// 		//adadad
		// 		var html='<div id="movePanel1" style="width:200%;position: relative;margin-left: 0;">'+
		//   		'<div class="cashManageTitle" style=" margin-top: 10px;">'+
		// 			'<p>审核状态：</p>'+
		// 			'<select style="width:100px;margin-top: -4px;" id = "stateScreening">'+
		// 				'<option value = 1>全部</option>'+
		// 				'<option value = 2>未审核</option>'+
		// 				'<option value = 3>退回</option>'+
		// 				'<option value = 4>已审核</option>'+
		// 			'</select>'+
		// 		'</div>'+
		// 		'<div class="changeApp_time" style=" margin: 10px;">'+
		// 			'<p>申请时间：</p>'+
		// 			'<input type="text" name="logOutTime"    disabled="disabled" class="dialogtip form-txt" maxlength="20" style="margin-top:-5px;width: 100px"> '+
		// 		'</div>'+
		//   		'<div class="cashManageTitle" style=" margin-top: 10px;">'+
		// 			'<p>变价原因：</p>'+
		// 			'<select style="width:100px;margin-top: -4px;">'+
		// 				'<option>1</option>'+
		// 				'<option>2</option>'+
		// 				'<option>3</option>'+
		// 			'</select>'+
		// 		'</div>'+
		//   		'<button style="margin: 8px 0 0 140px;" id="apply_add" onclick="ApplicationPrice()">申请变价</button>'+
		//   		'</div>';
		// 		return html;
		// 	}
		// },
		per:'',
		args:''
};

var approvalTimmer=null;
function dosearchLater(){//为了审核
	if(approvalTimmer){
		clearTimeout(approvalTimmer);
		approvalTimmer=null;
	}
	approvalTimmer=setTimeout('controlor.cur.dosearch()', 100);
}
//审核状态
function approvalStatus(data,a){
	var tr=data.auditorState;
	var html='';
	if(tr == 1){
		html +='<div class="auditBox" id="'+data.id+'" style="color:#000;background:#fff;border:0;">未审核</div>';
	}else if(tr == 0){
		html +='<div class="auditBox" id="'+data.id+'" style="color:#000;background:#fff;border:0;">未提交</div>';
	}
	else if(tr == 2){
		html +='<div class="auditBox" id="'+data.id+'" style="color:#fff;background:rgb(0,204,102);border:0;">已审核</div>';
		
	}else if(tr == 3){
		html +='<div class="auditBox" id="'+data.id+'" style="color:#fff;background:red;border:0;">退回</div>';
	}
	return html;
}
//变价申请-添加申请商品
function addApplication(data){
	var html='';
	if(data){
		html += '<div style="text-align:center;cursor: pointer;" onclick="removeGoods(this)"><img src="imgs/delet.png"></div>';
	}
	return html;
}
//变价申请时间
function applyTime(tr,value){
	var time = new Date(value);
	var text = time.Format(timeFormat);
	return text;
}


//查看用户信息
function useIntion(tr,a){
	var html = '';
	for(var i=0;i<SYS_AUTH_DATA.auths.length;i++){
		if(SYS_AUTH_DATA.auths[i].id === 1022){
			html = '<a onclick="viewUserIn(this,'+tr.user_id+')" style="color:rgb(0,141,255);cursor: pointer;" data-toggle="modal" data-target="#myModal">'+a+'</a>';
			break;
		}else{
			html = a;
		}
	}
	
	return html;
}
//查看变价详情
function viewPriceDetail(tr,a){
	var html = '<a onclick="viewPrice('+tr.id+')" style="color:rgb(0,141,255);cursor: pointer;" >'+a+'</a>';
	return html;
}

//修改新变价
function updatePrice(tr,a){
	var html = '<a onclick="addPriceCon(newPrice)" style="color:rgb(0,141,255);cursor: pointer;" data-toggle="modal" data-target="#myModal">'+a+'</a>';
	return html;
}

//人员管理-用户组文本
function userGroupDisp(obj,data){
	var roles = obj.roles;
	var value ="";
	if(roles.length == 1){
		value += roles[0].name;
	}else if(roles.length>1){
		for(var i=0;i < roles.length-1;i ++){
			value += roles[i].name +",";		
		}
		value += roles[roles.length-1].name
	}else{
		value=""
	}
	
	return value;
}
//人员管理-角色显示
function roleDisplay(role,data){
	var jobDis = "";
	if(role.job == 1){
		jobDis = "店长";
	}else if(role.job == 2){
		jobDis = "部门负责人";
	}else{
		jobDis = "员工";
	}
	return jobDis;
}


//款台管理-联网状态
function networkinState(tr,data){
	var html= "";
	if(tr.status == 1){
		html += '<div style="height: 20px;margin:6px auto;background:url(imgs/cut/wifi.png) center no-repeat;"></div>';
	}else{
	 	html += '<div style="height: 20px;margin:6px auto;background:url(imgs/cut/wifi-off.png) center no-repeat;"></div>';
	}
	return html;
	
}
//款台管理-销售类型
function salesType(num){
	var type = "";
	if(num == 1){
		type = "销售";
	}else if(num == 3){
		type = "退货";
	}else if(num == 2){
		type = "团购";
	}else{
		type = "培训模式";
	}
	return type;
}
function salesTypeData(tr,data){
	var value = tr.posTypesIds;
	var text = '';
	if(value.length == 1){
		text = salesType(value[0])
	}else if(value.length > 1){
		for(var i = 0;i < value.length - 1;i ++){
			text += salesType(value[i]) + '，';
		}
		text += salesType(value[value.length - 1]);
	}
	return text;
}
//款台管理-查看修改
function updateCash(tr,a){
	var html = '';
	for(var i=0;i<SYS_AUTH_DATA.auths.length;i++){
		if(SYS_AUTH_DATA.auths[i].id === 3012){
			html = '<a onclick="viewCash('+tr.posNo+')" style="color:rgb(0,141,255);cursor: pointer;" data-toggle="modal" aria-hidden="true" data-backdrop="static" data-target="#myModal">'+tr.posNoName+'</a>';
			break;
		}else{
			html = a;
		}
	}
	
	return html;
}

//营收稽核-收银缴款单-查看修改
function cashierByDate(tr){
	var html = '<a href="javascript:void(0);" onclick="cashierAdd('+tr.id+')" >'+tr.cashDate+'</a>';
	return html;
}

//营收稽核-领班班结单-查看修改
function foremanByDate(tr){
	var html = '<a href="javascript:void(0);" onclick="foremanAdd('+tr.id+')" >'+tr.cashDate+'</a>';
	return html;
}

//营收稽核-总手稽核-查看修改
function aduitByDate(tr){
//	var str = new Array(tr.cashDate,tr.posNo,tr.casherCode,tr.casherName,tr.id);
	var html = '<a href="javascript:void(0);" onclick="aduitAdd('+tr.id+')" >'+tr.cashDate+'</a>';
	return html;
}

//班结状态
function summaryStatus(data,value){
	var html='';
	var summaryState = data.summaryState;
	if(value == 1){
		html +='<span style="color:rgb(0,204,102);">已提交</span>';	
	}else if(value == 2){
		html +='<span style="color:#7B68EE;">已稽核</span>';
	}
	return html;
}
function summaryStatusAll(data,value){
	var html='';
	var summaryState = data.summaryState;
	if(value == 1 || value == 2){
		html +='<span style="color:rgb(0,204,102);">已提交</span>';	
	}else{
		html +='<span>未提交</span>';
	}
	return html;
}
//班结稽核状态
function summaryCheckState(data,value){
	var html='';
	if(value == 2){
		html +='<div class="auditBox" style="color:#fff;background:rgb(0,204,102);" aria-hidden="true" data-backdrop="static" data-toggle="modal" data-target="#myModal" onclick="modal(0,'+data.id+')">已稽核</div>';	
	}else{
		if(data.summaryState){
			html +='<div class="auditBox" data-toggle="modal" data-target="#myModal" aria-hidden="true" data-backdrop="static" onclick="modal(0,'+data.id+')">未稽核</div>';
		}else{
			html +='<div class="auditBox">未稽核</div>';
		}
		
	}
	return html;
}

//缴款状态
function paymentStatus(data,value){
	var html='';
	var paymentState = data.paymentState;
    if(value == 1 || value == 3 || value == 5){
		html ='<span style="color:rgb(0,204,102);" >已提交</span>';	
	}else if(value == 2){
		html ='<span style="color:red;" >异常，待审核</span>';
	}else if(value == 4){
		html ='<span style="color:red;" >审核退回</span>';
	}else{
		html = '<span>未提交</span>'
	}
	return html;
}
//交款稽核状态
function payCheckState(data,value){
	var html='';
	if(value == 5){
		html ='<div class="auditBox" style="color:#fff;background:rgb(0,204,102);" data-toggle="modal" aria-hidden="true" data-backdrop="static" data-target="#myModal" onclick="modal(1,'+data.id+')">已稽核</div>';	
	}else{
		if(data.paymentState != null && data.summaryState === 2 && value != 4 && value != 2){
			html ='<div class="auditBox" data-toggle="modal" data-target="#myModal" aria-hidden="true" data-backdrop="static" onclick="modal(1,'+data.id+')">未稽核</div>';
		}else{
			html ='<div class="auditBox">未稽核</div>';
		}
		
	}
	return html;
}

//监点审核状态
function superviseStatus(tr,data){
	var html='';

	if(data == 1){
		html ='<span style="color:rgb(0,204,102);" >通过</span>';	
	}else if(data == 2){		
		html ='<div class="auditBox" style="color:#fff;background:red;" data-toggle="modal" aria-hidden="true" data-backdrop="static" data-target="#myModal" onclick="modal(0,'+tr.id+')">退回</div>';	
	}else{
		html ='<span>未审核</span>';
	}
	return html;
}
function supervisePayStatus(tr,data){
	var html='';

	if(data == 1){
		html ='<span style="color:rgb(0,204,102);" >通过</span>';	
	}else if(data == 2){		
		html ='<div class="auditBox" style="color:#fff;background:red;" data-toggle="modal" aria-hidden="true" data-backdrop="static" data-target="#myModal" onclick="modal(1,'+tr.id+')">退回</div>';	
	}else{
		html ='<span>未审核</span>';
	}
	return html;
}
function superviseStatus1(tr,data){
	var html='';

	if(data == 1){
		html ='<span style="color:rgb(0,204,102);" >通过</span>';	
	}else if(data == 2){		
		html ='<span style="color:red;">退回</span>';	
	}else{
		html ='<span>未审核</span>';
	}
	return html;
}
function supervisePayStatus1(tr,data){
	var html='';

	if(data == 1){
		html ='<span style="color:rgb(0,204,102);" >通过</span>';	
	}else if(data == 2){		
		html ='<span style="color:red;">退回</span>';	
	}else{
		html ='<span>未审核</span>';
	}
	return html;
}


//长短款状态状态
function averageStatus(data){
	var html='';
	var averageState = data.averageConfirm;
	if(averageState == 1){
		html ='<span style="color:rgb(0,204,102);" >已提交</span>';	
	}else{
		html ='<span>未提交</span>';	
	}
	return html;
}
function radioPerCard(tr,data){
	var html = '<input type="radio" value="'+data+'">';
	return html;
}

var dataConfigManager={
		emergency:[
					{text:'ID',value:'id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true}, 
					{text:'申请编号',value:'id',listvisable:true,position:'center',selflistformat:viewPriceDetail,formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'变价原因',value:'reasonDesc',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'变价生效时间',value:'effectDay',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 	    
		           {text:'申请人',value:'applicantName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'申请时间',value:'applicantTime',listvisable:true,position:'left',selflistformat:timeformat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'审核人',value:'auditorName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'审核时间',value:'auditorTime',listvisable:true,position:'left',selflistformat:timeformat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'审核状态',value:'auditorState',listvisable:true,position:'left',selflistformat:approvalStatus,formvisable:true,formtype:'text',selfformformat:'',readonly:false}

		],
		item:[
					{text:'ID',value:'id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
					{text:'商品码',value:0,listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false},  
		           {text:'商品编码',value:2,listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false}, 
		           {text:'商品名称',value:1,listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'原售价',value:3,listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},  
		           {text:'单位',value:5,listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
		],
		audit:[
					{text:'ID',value:'id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true}, 
					{text:'申请编号',value:'id',listvisable:true,position:'center',selflistformat:viewPriceDetail,formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'变价原因',value:'reasonDesc',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'变价生效时间',value:'effectDay',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 	    
		           {text:'申请人',value:'applicantName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'申请时间',value:'applicantTime',listvisable:true,position:'left',selflistformat:timeformat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'审核人',value:'auditorName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'审核时间',value:'auditorTime',listvisable:true,position:'left',selflistformat:timeformat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'审核状态',value:'auditorState',listvisable:true,position:'center',selflistformat:approvalStatus,formvisable:true,formtype:'text',selfformformat:'',readonly:false}

		],
		changeprice:[
					{text:'ID',value:'id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},  
		           {text:'商品码',value:'code',listvisable:true,position:'center',selflistformat:updatePrice,formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false}, 
		           {text:'商品名称',value:'itemcode',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'商品编号',value:'name',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},  
		           {text:'单位',value:'unit',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'原售价',value:'price',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'会员零售价',value:'cprice',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'促销价格',value:'pprice',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'新售价',value:'nprice',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'操作',value:'operating',listvisable:true,position:'center',selflistformat:addApplication,formvisable:true,formtype:'text',selfformformat:'',readonly:false}

		],
		changeprice1:[
					{text:'ID',value:'id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},  
		           {text:'商品码',value:'code',listvisable:true,position:'center',selflistformat:updatePrice,formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false}, 
		           {text:'商品名称',value:'itemcode',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'商品编号',value:'name',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},  
		           {text:'单位',value:'unit',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'原售价',value:'price',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'会员零售价',value:'cprice',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'促销价格',value:'pprice',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'新售价',value:'nprice',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
		],
		per:[
					{text:'ID',value:'user_id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},  
		           {text:'编号',value:'user_code',listvisable:true,position:'center',selflistformat:useIntion,formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false}, 
		           {text:'姓名',value:'name',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'职务',value:'job',listvisable:true,position:'left',selflistformat:roleDisplay,formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'用户组',value:'roles',listvisable:true,position:'left',selflistformat:userGroupDisp,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'电话',value:'telephone',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'性别',value:'sex',listvisable:true,position:'left',selflistformat:optionFormat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'年龄',value:'birthday',listvisable:true,position:'right',selflistformat:ageFormat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'是否启用',value:'flag',listvisable:true,position:'center',selflistformat:optionFormat,formvisable:true,formtype:'text',selfformformat:'',readonly:false}
		],
		percard:[{text:'ID',value:'user_id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},  
		            {text:'',value:'user_code',listvisable:true,position:'center',selflistformat:radioPerCard,formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false},
		           {text:'编号',value:'user_code',listvisable:true,position:'center',selflistformat:'',formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false}, 
		           {text:'姓名',value:'name',listvisable:true,position:'center',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'职务',value:'job',listvisable:true,position:'center',selflistformat:roleDisplay,formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'用户组',value:'roles',listvisable:true,position:'center',selflistformat:userGroupDisp,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		            {text:'是否启用',value:'flag',listvisable:true,position:'center',selflistformat:optionFormat,formvisable:true,formtype:'text',selfformformat:'',readonly:false}
		          ],
		cashmanage:[
					{text:'ID',value:'id',listvisable:false,position:'center',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},  
		           {text:'款台号',value:'posNoName',listvisable:true,position:'center',selflistformat:'',formvisable:true,formtype:'text',selfformformat:selectformat,readonly:false}, 
		           {text:'IP地址',value:'ip',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}, 
		           {text:'联网状态',value:'status',listvisable:true,position:'center',selflistformat:networkinState,formvisable:true,formtype:'text',selfformformat:'',readonly:false},  
		           {text:'款台类型',value:'posTypesIds',listvisable:true,position:'left',selflistformat:salesTypeData,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'数据最后更新时间',value:'dataUpdateTime',listvisable:true,position:'left',selflistformat:powerFormats,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'登陆人员编码',value:'loginCode',listvisable:true,position:'right',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'登陆人员姓名',value:'loginName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
		           {text:'登录时间',value:'loginTime',listvisable:true,position:'left',selflistformat:powerFormat,formvisable:true,formtype:'text',selfformformat:'',readonly:false}	           
		]
		
};

function getOptionManager(){
	var optionManager={
			ajaxManager:{
				ajaxCollect:{
					// "save":"save1",
					// "update":"update2"
				},
				abort:function(tar){
					if(tar){
						if(this.ajaxCollect[tar]){
							this.ajaxCollect[tar].abort();
							this.ajaxCollect[tar]=null;
						}
					}else{
						for(var name in this.ajaxCollect){
							if(this.ajaxCollect[name]){
								this.ajaxCollect[name].abort();
								this.ajaxCollect[name]=null;
							}
						}
						this.ajaxCollect={};
					}
					try {
						optionManager.hide();
						optionManager.destroy();
					} catch (e) {
					}
				}
			},
			page:1,//当前页码
			total:0,//记录总数
			totalPage:0,//总页数
			pageSIze:10,
			listData:null,//列表数据
			detailData:null,//表单数据   主要用于改动数据缓存，提交
			detailDataIndex:null,//表单数据对应列表数据中下标  重置数据
			searchParams:null,
			cur_nav:null,//当前导航激活项
			listTAG:'datatest',
			listTAG1:'datatest1',
			formTAG:'form_panel',
			searchTAG:'search_area',
			formPrefix:'form_commu_',
			formID:'form_commu',
			pageStyle:'',
			getSearchParams:function(navID){//点击查询时，需先执行
				//获取搜索参数，并记录
				try{
					this.searchParams=paramsManger[navID]();
				}catch (e) {
					// TODO: handle exception
				}
			},
			dosearch:function(){
				this.getSearchParams(this.cur_nav);
				this.getPage(1,null,'123',true);
			},
			clear:function(){
				this.page=1;
				this.total=0;
				this.totalPage=0;
				this.listData=null;
				this.detailData=null;
				this.detailDataIndex=null;
				this.searchParams=null;
				this.cur_nav=null;
				this.cur_nav1=null;
			},
			getPage:function(page,nav,nav1,dosearch){
				if(!nav&&!this.cur_nav){//没指定导航项，找不到对应设置，不执行
					return;
				}
				this.totalPage=Math.max(this.totalPage,0);
				page=Math.max(1,Math.min(page,this.totalPage));
				if(page==this.page&&(!nav)&&!dosearch){//页面不变 不做动作
					return;
				}
				if(nav){//变更时才会填写此参数
					controlor.setCur(this);
					this.clear();
					this.cur_nav=nav;
					this.cur_nav1=nav1;
					this.getSearchParams(nav);
					this.getSearchParams(nav1);
					this.dataConfig=dataConfigManager[nav];
					this.dataConfig1=dataConfigManager[nav1];
					try {
						$('#'+this.searchTAG).html(searchAreaManager[nav].insertSearchPanel());
					} catch (e) {
						// TODO: handle exception
					}
				}
				this.searchParams=this.searchParams||{};
				this.searchParams.page=page;
				this.searchParams.size=this.pageSIze;
				this.insertTable(this.listTAG,this.listTAG1,page);
			},
			backToMe:function(){
				try {
					$('#'+this.searchTAG).html(searchAreaManager[this.cur_nav].insertSearchPanel());
				} catch (e) {
					// TODO: handle exception
				}
				controlor.setCur(this);
				this.insertTable(this.listTAG,this.listTAG1,this.page);
			},
			insertTable:function(id,id1,page){//从这里开始优化吧
			},
			getHeaderOptions:function(){
				return headerOptions[this.cur_nav];
			},
			saveItem:function(){
				try {
					saveManager[this.cur_nav]();
				} catch (e) {
					// TODO: handle exception
				}
			},
			removeItem:function(){
				try {
					removeManager[this.cur_nav]();
				}catch (e){
					
				}
			}
		}
	
	return optionManager;
}






//confirm
function initAlert() {
    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
    var alr = $("#ycf-alert");
    var ahtml = alr.html();

    //关闭时恢复 modal html 原样，供下次调用时 replace 用
    //var _init = function () {
    //	alr.on("hidden.bs.modal", function (e) {
    //		$(this).html(ahtml);
    //	});
    //}();

    /* html 复原不在 _init() 里面做了，重复调用时会有问题，直接在 _alert/_confirm 里面做 */


    var _alert = function (options) {
      alr.html(ahtml);	// 复原
      alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
      alr.find('.cancel').hide();
      _dialog(options);

      return {
        on: function (callback) {
          if (callback && callback instanceof Function) {
            alr.find('.ok').click(function () { callback(true) });
          }
        }
      };
    };

    var _confirm = function (options) {
      alr.html(ahtml); // 复原
      alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
      alr.find('.cancel').show();
      _dialog(options);

      return {
        on: function (callback) {
          if (callback && callback instanceof Function) {
            alr.find('.ok').click(function () { callback(true) });
            alr.find('.cancel').click(function () { callback(false) });
          }
        }
      };
    };

    var _dialog = function (options) {
      var ops = {
        msg: "提示内容",
        title: "操作提示",
        btnok: "确定",
        btncl: "取消"
      };

      $.extend(ops, options);

      console.log(alr);

      var html = alr.html().replace(reg, function (node, key) {
        return {
          Title: ops.title,
          Message: ops.msg,
          BtnOk: ops.btnok,
          BtnCancel: ops.btncl
        }[key];
      });
      
      alr.html(html);
      alr.modal({
        width: 500,
        backdrop: 'static'
      });
    }

    window.Modal =  {
      alert: _alert,
      confirm: _confirm
    }

  };
  
  
  