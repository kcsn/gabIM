gabFrame.message_panel = function(options) {

	var message_panel = $.extend(gabFrame.base_component(), //贴子列表  分页查询
			//记住查询到的当前页帖子列表
			{noteListOfPage:{
					page:1,
					pageSize:10,
					total:10,
					totalPages:10,
					datas:[]
			}}, options || {});

	message_panel.init = function() {

		message_panel.$e = $('<div style="width:100%;height:auto;"></div>');
         //搜索组件
		var searchOptions = {

					fields : [ {
						name : 'keyword',
						type : 'text',
						selfformat : '',
						value : '',
						label : '搜索关键字',
						visable : true,
						hint : '请输入关键字'
					} ],
					buttons : [ {
						icon : 'glyphicon glyphicon-plus',
						text : '我要留言',
						caller : function(a) {

						}
					} ]
		
		};
		
		//导航栏
	   var nav = $('<div style="width:100%;height:auto;"></div>');
	   var div1 = $('<div class="view"></div>');
	   var div2 = $('<div class="tabbable" id="tabs-245436"></div>');
	   var ul = $('<ul class="nav nav-tabs"></ul>');
	   var li1 = $('<li class=""><a href="#" data-toggle="tab" >全部</a></li>');
	   var li2 = $('<li class=""><a href="#" data-toggle="tab" >已回答</a></li>');
	   var li3 = $('<li class=""><a href="#" data-toggle="tab" >待回答</a></li>');
	   var li4 = $('<li class=""><a href="#" data-toggle="tab" >我的留言</a></li>');
	   var div3 = $('<div class="tab-content"></div>');
	   ul.append(li1);
	   ul.append(li2);
	   ul.append(li3);
	   ul.append(li4);
	   div1.append(div2);
	   div2.append(ul);
	   div2.append(div3);
	   nav.append(div1);
	 message_panel.addControl(message_panel.$e,new gabFrame.searchAndManageBar(searchOptions),'search');
	 message_panel.$e.append(nav);
	
	 var options ={
			 	title:'关于XXXXXXX的问题',
				//用户名	
			    policeName:'XX出所',
				//创建时间	
			    createTime:'2018-10-28 12:00',
				//操作(收起)	
			    oprate:'收起',
				//浏览次数	
			    viewCount:'23',
			    //回复集合
			    messages:[{name:'系统管理员',content:'这是因为XXX,您可以通过XX方案解决,步骤如下....'},
			    	{name:'XXX派出所',content:'我也遇到过这个问题'},{name:'XXX公安局',content:'已经解决了'}],
				//内容
			    content:'在XXXXX的时候,会出现XXXXXX的情况'  
			    	}  
	 
	 
	 message_panel.load();
	 
	}
	
	
	message_panel.load = function(){
		
	message_panel.sendRequest('select_all_message',BASE_HOST+SERVER_NAME+'/api/message/select-all-message',function(data){
		//alert(data.data.length);
		
		//根据请求结果  更新分页信息  到了第几页
		
		//清空之前的数据结果
		message_panel.noteListOfPage.datas=[];
		
		//转换数据结构
		for(var i=0;i<data.data.length;i++){
			var messageOfPage={};
			messageOfPage.title=data.data[i].title;
			messageOfPage.content = data.data[i].content;
			messageOfPage.policeName = data.data[i].policeName;
			messageOfPage.createTime = data.data[i].createTime;
			messageOfPage.oprate = data.data[i].count;
			messageOfPage.viewCount = data.data[i].visitCount;
			messageOfPage.messages = data.data[i].mesList;
			message_panel.noteListOfPage.datas.push(messageOfPage);
//			message_panel.addControl(message_panel.$e,new gabFrame.message(messageOfPage),'message'+i);	
		}
    	},null,"获取全部留言",null,false,null,'POST',function(){});
		
	}

	message_panel.init();
	return message_panel;

}