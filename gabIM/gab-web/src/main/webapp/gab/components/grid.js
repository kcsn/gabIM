/**
 * Created by wunai on 2018/7/12.
 */
gabFrame.grid=function(options){
    //默认设置
    var grid_={
        //按钮栏
        //搜索栏
        //grid
        //翻页
        $e:null,
        pageCode:'',
        url:null,
        //'table-striped table-bordered table-hover'
        tableClasses:'table-striped table-hover',
        pageOptions:{
            page:1,//当前页码
            total:0,//记录总数
            totalPage:0,//总页数
            pageSize:10
        },
        columns:[],
        testTag:'grid',
        searchOptions:{
            visable:false,
            className:'searchAndManageBar',
            options:{
                fields:[{name:'name',type:'text',selfformat:'',value:'',icon:'',label:'名称',visable:true,hint:''}]
            }

        },
        listData:null,//列表数据
    };

    //用户自定义设置应用
    var grid=$.extend(gabFrame.base_component(),grid_,options||{});

    grid.init=function(){
        if(!grid.$e){
            grid.$e=$('<div style="width:100%;height:auto;"></div>');
        }
        if(!grid.$searchBox){
            grid.$searchBox=$('<div style="width:100%;height:auto;"></div>');
            grid.$e.append(grid.$searchBox);
        }
        if(!grid.$gridBox){
            grid.$gridBox=$('<div style="width:100%;height:auto;"></div>');
            grid.$e.append(grid.$gridBox);
        }
        if(grid.searchOptions.visable){
            // grid.searchOptions.options.$e=grid.$searchBox;
            grid.searchOptions.options.grid=grid;
            // grid.searchAndManageBar=new gabFrame[grid.searchOptions.className](grid.searchOptions.options);
            this.addControl(grid.$searchBox,new gabFrame[grid.searchOptions.className](grid.searchOptions.options),'searchAndManageBar');
            // grid.children.push(grid.searchAndManageBar);
            // grid.$searchBox.append(grid.searchAndManageBar.$e);
            // grid.searchAndManageBar.init();
        }
        grid.$gridBox.html(createTable(grid.listData,grid.columns,grid.tableClasses));
    }
    
    //重新加载方法 //点击查询按钮入口
    grid.load=function(){
    	//获取参数
    	//请求处理
    	grid.search(1,true);
//    	var params={};
//    	try {
//    		params=grid.searchAndManageBar.getParams(true);
//		} catch (e) {}
//		params.pageNum=1;
//		params.pageSize=grid.pageOptions.pageSize;
//    	grid.sendRequest(grid.pageCode+'_list',grid.url,function(data){
//    		grid.listData=data.data.list;
//    		//page totalRe totalPages
//    		grid.pageOptions.totalPage=data.data.pages;
//    		grid.pageOptions.page=data.data.pageNum;
//    		grid.pageOptions.total=data.data.total;
//    		grid.$gridBox.html(createTable(grid.listData,grid.columns,grid.tableClasses));
//    	},params,"获取账号列表",null,false,null,'POST',function(){});
    }
    

    //翻页
    grid.search=function(page,isKeepParams){
    	var params={};
    	try {
    		params=grid.searchAndManageBar.getParams(isKeepParams);
		} catch (e) {}
		params.pageNum=page;
		params.pageSize=grid.pageOptions.pageSize;
    	grid.sendRequest(grid.pageCode+'_list',grid.url+grid.pageCode+'-list-page',function(data){
    		grid.listData=data.data.list||data.data;
    		//page totalRe totalPages
    		grid.pageOptions.totalPage=data.data.pages;
    		grid.pageOptions.page=data.data.pageNum;
    		grid.pageOptions.total=data.data.total;
    		grid.$gridBox.html(createTable(grid.listData,grid.columns,grid.tableClasses));
    	},params,"获取账号列表",null,false,null,'POST',function(){});
    }


    grid.selfClear=function(){
    }

    
    grid.getPage =function(page){
    	grid.search(page,false);
//    	var params={};
//    	try {
//    		params=grid.searchAndManageBar.getParams(false);
//		} catch (e) {}
//		params.pageNum=1;
//		params.pageSize=grid.pageOptions.pageSize;
//    	grid.sendRequest(grid.pageCode+'_list',grid.url,function(data){
//    		grid.listData=data.data.list;
//    		//page totalRe totalPages
//    		grid.pageOptions.totalPage=data.data.pages;
//    		grid.pageOptions.page=data.data.pageNum;
//    		grid.pageOptions.total=data.data.total;
//    		grid.$gridBox.html(createTable(grid.listData,grid.columns,grid.tableClasses));
//    	},params,"获取账号列表",null,false,null,'POST',function(){});
    	
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

        var pre='onclick="gabFrame.viewPort.curPanel.view.grid.getPage('+(grid.pageOptions.page-1)+')"';
        var next='onclick="gabFrame.viewPort.curPanel.view.grid.getPage('+(grid.pageOptions.page+1)+')"';
        var preStyle='';
        var nextStyle='';
        if(grid.pageOptions.page<=1){
            pre='';
            preStyle='class="disabled"';
        }
        if(grid.pageOptions.page>=grid.pageOptions.totalPage){
            next='';
            nextStyle='class="disabled"';
        }
        var pagebarHtml='<ul class="pagination pagination-sm" style="position: relative;float: right;'+grid.pageOptions.pageStyle+'"><li  '+preStyle+'><a href="#" '+pre+'>上一页</a></li>';
        for(var i=0;i<pageList.length;i++){
            if(pageList[i]==grid.pageOptions.page){
                pagebarHtml+='<li class="active"><a href="#"  onclick="gabFrame.viewPort.curPanel.view.grid.getPage('+pageList[i]+')">'+pageList[i]+'</a></li>';
            }else{
                pagebarHtml+='<li><a href="#" onclick="gabFrame.viewPort.curPanel.view.grid.getPage('+pageList[i]+')">'+pageList[i]+'</a></li>';
            }
        }
        pagebarHtml+='<li '+nextStyle+'><a href="#" '+next+'>下一页</a></li></ul>';
        return pagebarHtml;
    }
    
    function createTable(data,columns,tableClasses){
        lineNum=grid.showLineNum;
        totalPage=grid.pageOptions.totalPage;
        page=grid.pageOptions.page||1;
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
        if(grid.oprate){
            theader+='<th>'+grid.oprate.head+'</th>';
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
                    // if(grid.pageOptions.cur_nav == "per"){
                    //     trHtml+='<td align="center"><input type="checkbox"  name="preManage" value="'+tr.user_id+'" ></td>';
                    // }else if(grid.pageOptions.cur_nav == "cashManage"){
                    //     trHtml+='<td align="center"><input type="checkbox"  name="cashOption" value="'+tr.user_id+'" ></td>';
                    // }else if(grid.pageOptions.cur_nav == "itemreport" || grid.pageOptions.cur_nav == "cashview"){
                    //     trHtml+='<td align="center">'+(i+1)+'</td>'
                    // }else if(grid.pageOptions.cur_nav == 'authcard'){
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

                if(grid.oprate&&grid.oprate.col){
                    var opstr='';
                    for(var oi=0;oi<grid.oprate.col.length;oi++){
                        opstr+=formatStr(grid.oprate.col[oi].text(tr),tr,grid.oprate.col[oi].coldata,i);
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
    }
    grid.init();
    return grid;
}