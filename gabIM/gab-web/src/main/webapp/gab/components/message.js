
gabFrame.message=function(options){
	
	var message_ ={
	//根节点
	$e:null,
	//标题
    title:'',
	//用户名	
    policeName:'',
	//创建时间	
    createTime:'',
	//操作(收起)	
    oprate:'收起',
	//浏览次数	
    viewCount:'',
    //内容
    content:'',
    //回复集合
    messages:[],
    url:null,
	//分页组件
    pageOptions:{
         page:1,//当前页码
         total:0,//记录总数
         totalPage:0,//总页数
         pageSize:10
     }
	
	};
	var message=$.extend(gabFrame.base_component(),message_,options||{});
	
	message.init =function(){
		
		if(!message.$e){
			message.$e=$('<div style="width:100%;height:200px;"></div>');
        }
		var fieldset = $('<fieldset></fieldset>');
		var legend = $ ('<h4 style="margin:25px 0 10px 0">'+message.title+'</h4>');
		var span1 = $('<span style="margin:0 20px 20px 0px">'+message.policeName+'</span>');
		var span2 = $('<span style="margin:0 20px 20px 0px">'+message.createTime+'</span>');
		var span3 = $('<span style="margin:0 20px 20px 0px">'+message.oprate+'</span>');
		var span4 = $('<span style="margin:0 20px 20px 0px"><span class="glyphicon glyphicon-eye-open"></span>'+message.viewCount+'</span>');
		var lable = $('<p class="help-block" style="margin:20px">'+message.content+'</p>');
		var $mess = $('<div></div>');
		for(var i = 0;i<message.messages.length;i++){
			var $mes = $('<div style="margin:5px 20px"><span style="color:blue">'+message.messages[i].name+'</span>:'+message.messages[i].content+'</div>');
			$mess.append($mes);
		}
		var input = $('<input type="text" placeholder="我要留言" style="margin:5px 20px">');
		var button = $('<div style="margin:5px 20px"><button type="submit" class="btn btn-primary" >提交</button></div>');

		message.$e.append(fieldset);
        fieldset.append(legend);
        fieldset.append(span1);
        fieldset.append(span2);
        fieldset.append(span3);
        fieldset.append(span4);
        fieldset.append(lable);
        fieldset.append($mess);
        fieldset.append(input);
        fieldset.append(button);
	}
    
	
	//分页组件
    
	 /*message.load=function(){
	    	//获取参数
	    	//请求处理
	    	message.search(1,true);
	    }
	
	 //翻页
	message.search=function(page,isKeepParams){
    	var params={};
    	try {
    		params=message.searchAndManageBar.getParams(isKeepParams);
		} catch (e) {}
		params.pageNum=page;
		params.pageSize=message.pageOptions.pageSize;
    	message.sendRequest(message.pageCode+'_list',message.url+message.pageCode+'-list-page',function(data){
    		message.listData=data.data.list||data.data;
    		//page totalRe totalPages
    		message.pageOptions.totalPage=data.data.pages;
    		message.pageOptions.page=data.data.pageNum;
    		message.pageOptions.total=data.data.total;
    		message.$gridBox.html(createTable(message.listData,message.columns,message.tableClasses));
    	},params,"获取账号列表",null,false,null,'POST',function(){});
    }
	
    message.getPage =function(page){
    	message.search(page,false);
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

        var pre='onclick="gabFrame.viewPort.curPanel.view.message.getPage('+(message.pageOptions.page-1)+')"';
        var next='onclick="gabFrame.viewPort.curPanel.view.message.getPage('+(message.pageOptions.page+1)+')"';
        var preStyle='';
        var nextStyle='';
        if(message.pageOptions.page<=1){
            pre='';
            preStyle='class="disabled"';
        }
        if(message.pageOptions.page>=message.pageOptions.totalPage){
            next='';
            nextStyle='class="disabled"';
        }
        var pagebarHtml='<ul class="pagination pagination-sm" style="position: relative;float: right;'+message.pageOptions.pageStyle+'"><li  '+preStyle+'><a href="#" '+pre+'>上一页</a></li>';
        for(var i=0;i<pageList.length;i++){
            if(pageList[i]==message.pageOptions.page){
                pagebarHtml+='<li class="active"><a href="#"  onclick="gabFrame.viewPort.curPanel.view.message.getPage('+pageList[i]+')">'+pageList[i]+'</a></li>';
            }else{
                pagebarHtml+='<li><a href="#" onclick="gabFrame.viewPort.curPanel.view.message.getPage('+pageList[i]+')">'+pageList[i]+'</a></li>';
            }
        }
        pagebarHtml+='<li '+nextStyle+'><a href="#" '+next+'>下一页</a></li></ul>';
        return pagebarHtml;
    }
    
    function createTable(data,columns,tableClasses){
        lineNum=message.showLineNum;
        totalPage=message.pageOptions.totalPage;
        page=message.pageOptions.page||1;
        page>totalPage?page=totalPage:'';
        var tableHtml='<table class="table '+tableClasses+'">';
        tableHtml+=createTHeader(columns,lineNum);
        if(data&&data.length){
            tableHtml+=createTBody(data,columns,lineNum);
        }else{
            tableHtml+='<tbody><div style="width:100px;height:50px;left: 50%;position: absolute;margin-left: -50px;top:43px;">无数据</div></tbody>';
        }

        tableHtml+='</table>'+createPageBar(page, totalPage);
        return tableHtml;
    }
    

    function createTHeader(columns,lineNum){
        var theader='<thead><tr>';
        try{
            if(lineNum){
                theader+='<th>序号</th>';
            }
            for(var i=0;i<columns.length;i++){
                if(columns[i].listvisable){
                    theader+='<th>'+columns[i].text+'</th>';
                }
            }
        }catch (e) {
            console.log(e);
        }
        if(message.oprate){
            theader+='<th>'+message.oprate.head+'</th>';
        }

        theader+='</tr></thead>';
        return theader;
    }
	
    function createTBody(data,columns,lineNum){
        var tbody='<tbody>';
        try{
            for(var i=0;i<data.length;i++){
                var tr=data[i];
                var trHtml='';
                if(lineNum){
                    // if(message.pageOptions.cur_nav == "per"){
                    //     trHtml+='<td align="center"><input type="checkbox"  name="preManage" value="'+tr.user_id+'" ></td>';
                    // }else if(message.pageOptions.cur_nav == "cashManage"){
                    //     trHtml+='<td align="center"><input type="checkbox"  name="cashOption" value="'+tr.user_id+'" ></td>';
                    // }else if(message.pageOptions.cur_nav == "itemreport" || message.pageOptions.cur_nav == "cashview"){
                    //     trHtml+='<td align="center">'+(i+1)+'</td>'
                    // }else if(message.pageOptions.cur_nav == 'authcard'){
                    //     trHtml+='<td align="center"><input type="checkbox"  name="authcardOption" value="authCard_'+tr.id+'" ></td>';
                    // }else{
                        trHtml+='<td align="left">'+(i+1)+'</td>';
                    // }

                }
                for(var j=0;j<columns.length;j++){
                    if(columns[j].listvisable){
                        var temp_value=trueValue(tr, columns[j].value);
                        if(columns[j].selflistformat){
                            trHtml+='<td align="'+columns[j].position+'">'+columns[j].selflistformat(tr,temp_value)+'</td>';
                        }else{
                            trHtml+='<td align="'+columns[j].position+'">'+temp_value+'</td>';
                        }
                    }
                }

                if(message.oprate&&message.oprate.col){
                    var opstr='';
                    for(var oi=0;oi<message.oprate.col.length;oi++){
                        opstr+=formatStr(message.oprate.col[oi].text(tr),tr,message.oprate.col[oi].coldata,i);
                    }
                    trHtml+='<td align="left">'+opstr+'</td>';
                }

                tbody+='<tr>'+trHtml+'</tr>';
            }
        }catch (e) {
            console.log(e);
        }
        tbody+='</tbody>';
        return tbody;
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
                    console.log(e);
                }
            }
        }
        return src;
    }*/
	
	
	



    message.init();
    return message;
	
	
}