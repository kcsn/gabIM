/**
 * Created by wunai on 2018/7/15.
 */
gabFrame.role_manage=function(options){
    var role_manage=$.extend(gabFrame.base_component(),{testTag:'viewAccount'}, options||{});
    role_manage.init=function(){
        role_manage.$e=$('<div style="width:100%;height:auto;"></div>');
        var columns=[
            {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
            {text:'角色名称',value:'name',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'角色描述',value:'roleDesc',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
        ];
        var options={
            url:BASE_HOST+SERVER_NAME+'/api/role/',
            pageOptions:{
                page:1,//当前页码
                total:0,//记录总数
                totalPage:10,//总页数
                pageSize:5
            },
            columns:columns,
            pageCode:'role',
            oprate:
            {head:"操作",col:[
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.detail(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>详情</button>'},coldata:['id']},
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.update(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>修改</button>'},coldata:['id']},
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.del(\'{-1}\',\'{0}\',\'{1}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>删除</button>'},coldata:['id','name']}
            ]},
            showLineNum:true,
            searchOptions:{
                visable:true,
                className:'searchAndManageBar',
                options:{
                    fields:[{name:'name',type:'text',selfformat:'',value:'',label:'名称',visable:true,hint:'请输入角色名称'}],
                        
                    buttons:[{icon:'glyphicon glyphicon-plus',text:'新增',caller:function(a){
                    	role_manage.form.objectId=0;
                        role_manage.form.readonly=false;
                        gabFrame.formWin.show('新增账号',role_manage.form.$e);
                        gabFrame.formWin.onSubmit=function(evt){
                    		//提交表单,1保存表单,2关闭弹框,3重新加载
                    		role_manage.form.save(function(){
                    			gabFrame.formWin.close();
                    			role_manage.grid.load();
                    		});
                    	};
                        role_manage.form.load();
                    }}]
                }	

            },
            listData:[],//列表数据
        };
        // role_manage.grid=new gabFrame.grid(options);
        // role_manage.children.push(role_manage.grid);
        // role_manage.form=new gabFrame.form({columns:columns});
        // role_manage.children.push(role_manage.form);
        // role_manage.$e.append(role_manage.grid.$e);

        role_manage.addControl(role_manage.$e,new gabFrame.grid(options),'grid');
        role_manage.addControl(null,new gabFrame.form({pageCode:'role',url:BASE_HOST+SERVER_NAME+'/api/role/',columns:columns}),'form');
        role_manage.grid.load();

    }
    role_manage.selfClear=function(){
    };
    
    //详情事件
    role_manage.detail=function(){
    	//alert(arguments[1]);
        role_manage.form.readonly=true;
    	role_manage.form.objectId=arguments[1];
    	gabFrame.formWin.show('详情',role_manage.form.$e,true);	//回显表单
    	//回显信息,并 只读
    	role_manage.form.load();
    }
    
    //修改事件
    role_manage.update=function(){
        role_manage.form.readonly=false;
    	//alert(arguments[1]);
    	role_manage.form.objectId=arguments[1];
    	gabFrame.formWin.show('修改角色',role_manage.form.$e);	//回显表单
    	gabFrame.formWin.onSubmit=function(evt){
    		//提交表单,1保存表单,2关闭弹框,3重新加载
    		role_manage.form.save(function(){
    			gabFrame.formWin.close();
    			role_manage.grid.load();
    		});
    	};
    	role_manage.form.load();
    }
    //删除事件
    role_manage.del=function(){
    var id=arguments[1];
   	 Modal.confirm({ msg: "是否刪除"+arguments[2]+"？"})
        .on( function (e) {
            if(e){
            	role_manage.sendRequest('account_del',BASE_HOST+SERVER_NAME+'/api/role/delete-role',function(data){
            		role_manage.grid.load();
            	},{id:id},"刪除账号",null,false,null,'POST',function(){});
            }
        });
    	
    }
    
    role_manage.init();
    return role_manage;
}