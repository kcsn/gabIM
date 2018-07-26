gabFrame.info_fill_view=function(options){
	var info_fill_view=$.extend(gabFrame.base_component(),{testTag:'infoView'}, options||{});
	
	info_fill_view.init =function(){
		info_fill_view.$e=$('<div style="width:100%;height:auto;"></div>');
		var columns=[
            {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
            {text:'填报主题',value:'themeName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'填报时间',value:'createTime',listvisable:true,position:'left',selflistformat:timeformat,formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'填报单位',value:'policeName',listvisable:true,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
            {text:'状态',value:'status',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
        ];
        var options={
            url:BASE_HOST+SERVER_NAME+'/api/police-theme/',
            pageOptions:{
                page:1,//当前页码
                total:0,//记录总数
                totalPage:10,//总页数
                pageSize:5
            },
            columns:columns,
            pageCode:'police-theme',
            oprate:
            {head:"操作",col:[
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.detail(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>详情</button>'},coldata:['id']},
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.update(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>修改</button>'},coldata:['id']},
                {text:function(tr){
                	if(tr.status!=1){
                		return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.checkout(\'{-1}\',\'{0}\',\'{1}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>审核</button>';
                	}else{
                		return '<button type="button" disabled class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>已审核</button>';
                	}
                },coldata:['id','status']},
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.del(\'{-1}\',\'{0}\',\'{1}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>删除</button>'},coldata:['id','themeId']}
            ]},
            showLineNum:true,
            searchOptions:{
                visable:true,
                className:'searchAndManageBar',
                options:{
                    fields:[{name:'themeName',type:'text',selfformat:'',value:'',label:'填报主题',visable:true,hint:'请输入填报主题名称'},
                    		{name:'policeName',type:'text',selfformat:'',value:'',label:'填报单位',visable:true,hint:'请输入填报单位名称'},
                    		{name:'status',type:'text',selfformat:'',value:'',label:'填报状态',visable:true,hint:'请输入填报状态'},
                    		{name:'name',type:'text',selfformat:'',value:'',label:'填报时间',visable:true,hint:'请输入起始时间'},
                    		{name:'name',type:'text',selfformat:'',value:'',label:'至',visable:true,hint:'请输入结尾时间'}
                    ],
                    buttons:[{icon:'glyphicon glyphicon-plus',text:'信息填报',caller:function(a){
                   	     
                    }}]
                }	
            },
            listData:[],//列表数据
        };

        var auditingColumns=[
            {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
            {text:'是否通过',value:'status',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'radio',selfformformat:radioFormat,readonly:false},
            {text:'审核意见',value:'auditDesc',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
        ];

        info_fill_view.addControl(info_fill_view.$e,new gabFrame.grid(options),'grid');
        info_fill_view.addControl(null,new gabFrame.form({pageCode:'auditing',url:BASE_HOST+SERVER_NAME+'/api/police-theme/',columns:auditingColumns}),'auditingform');
        info_fill_view.grid.load();
        
        //详情
        info_fill_view.detail=function(){
        	alert("11111111");
        }
        //修改
        info_fill_view.update=function(){
        	alert("2222");
        }
        //审核
        info_fill_view.checkout=function(){
            info_fill_view.auditingform.readonly=false;
            info_fill_view.auditingform.objectId=arguments[1];
            info_fill_view.auditingform.load(null,{id:arguments[1]});//加载本地表单
            gabFrame.formWin.show('审核',info_fill_view.auditingform.$e);	//回显表单
            gabFrame.formWin.onSubmit=function(evt){
                
                info_fill_view.auditingform.save(function(){
                    gabFrame.formWin.close();
                    info_fill_view.grid.load();
                });
            };
            //info_fill_view.auditingform.load();
        }
        //删除
        info_fill_view.del=function(){
        	var id = arguments[1];
        	//alert("44444444---"+id+"--"+arguments[2]);
        	Modal.confirm({ msg: "是否刪除"+arguments[2]+"？"})
        	.on( function (e){
                if(e){
                	info_fill_view.sendRequest('view_del',BASE_HOST+SERVER_NAME+'/api/police-theme/delete-police-theme',function(data){
               		info_fill_view.grid.load();
                	},{id:id},"刪除账号",null,false,null,'POST',function(){});
                }
            });
        	
        }
     
        
        
        
        
        

	
	
	}
	info_fill_view.init();
    return info_fill_view;
}