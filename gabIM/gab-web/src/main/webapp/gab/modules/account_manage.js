/**
 * Created by wunai on 2018/7/14.
 */
gabFrame.account_manage=function(options){
    var account_manage=$.extend(gabFrame.base_component(),{testTag:'viewAccount'}, options||{});
    account_manage.init=function(){
        account_manage.$e=$('<div style="width:100%;height:auto;"></div>');
        var columns=[
            {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
            {text:'账号',value:'name',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'所辖区划',value:'locationId',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:locationFormat,readonly:false},
            {text:'地址',value:'address',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'类别',value:'categoryId',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:categoryFormat,readonly:false},
            {text:'辖区面积',value:'erea',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'所长姓名',value:'headerName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'所长手机号',value:'headerPhone',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'值班电话',value:'telephone',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'密码',value:'password',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:false},
            {text:'评分等级',value:'rating',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'角色',value:'position',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
        ];
        var options={
            url:BASE_HOST+SERVER_NAME+'/api/police/',
            pageOptions:{
                page:1,//当前页码
                total:0,//记录总数
                totalPage:0,//总页数
                pageSize:5
            },
            columns:columns,
            pageCode:'police',
            oprate:
            {head:"操作",col:[
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.update(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>修改</button>'},coldata:['id']},
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.del(\'{-1}\',\'{0}\',\'{1}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>删除</button>'},coldata:['id','name']},
                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.reset(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>重置密码</button>'},coldata:['id']}
            ]},
            showLineNum:true,
            searchOptions:{
                visable:true,
                className:'searchAndManageBar',
                options:{
                    fields:[{name:'name',type:'text',selfformat:'',value:'',label:'账号',visable:true,hint:'请输入警局名称'},
                            {name:'headerName',type:'text',selfformat:'',value:'',label:'所长姓名',visable:true,hint:'请输入所长姓名'}],
                    buttons:[{icon:'glyphicon glyphicon-plus',text:'新增',caller:function(a){
                    	
                    	account_manage.form.columns[9].formvisable=true;
                        account_manage.form.objectId=null;
                        gabFrame.formWin.show('新增账号',account_manage.form.$e);
                        gabFrame.formWin.onSubmit=function(evt){
                    		//提交表单,1保存表单,2关闭弹框,3重新加载
                    		account_manage.form.save(function(){
                    			gabFrame.formWin.close();
                    			account_manage.grid.load();
                    		});
                    	};
                        account_manage.form.load();
                    }}]
                }

            },
            listData:[]//列表数据
        };
        // account_manage.grid=new gabFrame.grid(options);
        // account_manage.children.push(account_manage.grid);
        // account_manage.$e.append(account_manage.grid.$e);
        account_manage.addControl(account_manage.$e,new gabFrame.grid(options),'grid');
        account_manage.addControl(null,new gabFrame.form({pageCode:'police',url:BASE_HOST+SERVER_NAME+'/api/police/',columns:columns}),'form');
        // account_manage.form=new gabFrame.form({columns:columns});
        // account_manage.children.push(account_manage.form);
        account_manage.grid.load();
       
        var columns_psw=[
                     {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
                     {text:'原密码',value:'password',listvisable:true,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:false},
                     {text:'新密码',value:'newpassword',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
                     {text:'确认密码',value:'newpassword1',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
                 ];
        account_manage.addControl(null,new gabFrame.form({readOnly:false,listvisable:false,pageCode:'police-repassword',url:BASE_HOST+SERVER_NAME+'/api/police/',columns:columns_psw}),'form_psw');

    }
    
    
    
    account_manage.selfClear=function(){
    };
    
    //修改事件
    account_manage.update=function(){
    	//alert(arguments[1]);
    	account_manage.form.columns[9].formvisable=false;
    	account_manage.form.objectId=arguments[1];
    	gabFrame.formWin.show('修改账号',account_manage.form.$e);	//回显表单
    	gabFrame.formWin.onSubmit=function(evt){
    		//提交表单,1保存表单,2关闭弹框,3重新加载
    		account_manage.form.save(function(){
    			gabFrame.formWin.close();
    			account_manage.grid.load();
    		});
    	};
    	account_manage.form.load();
    }
    //删除事件
    account_manage.del=function(){
    	var id=arguments[1];
    	 Modal.confirm({ msg: "是否刪除"+arguments[2]+"？"})	//弹出对话框,
         .on( function (e) {
             if(e){
            	 account_manage.sendRequest('account_del',BASE_HOST+SERVER_NAME+'/api/police/delete-police',function(data){
            		 account_manage.grid.load();
             	},{id:id},"刪除账号",null,false,null,'POST',function(){});
             }
         });
    	
    }
    //重置密码事件
    account_manage.reset=function(){
    	account_manage.form_psw.columns[1].formvisable=false;
    	//account_manage.form.listvisable=true;
    	account_manage.form_psw.objectId=arguments[1];
    	gabFrame.formWin.show('重置密码',account_manage.form_psw.$e);
    	gabFrame.formWin.onSubmit=function(evt){
    		//提交表单,1保存表单,2关闭弹框,3重新加载
    		var newFormData={};
        	account_manage.form_psw.getFormValue(account_manage.form_psw.columns,newFormData);
    		//在这里进行判断
    		if (newFormData.newpassword!=newFormData.newpassword1) {
    			alert("两次输入的密码不一致！请重新输入！")
    			return ;
			}
    		newFormData.id=account_manage.form_psw.objectId;
    		newFormData.password=account_manage.form_psw.newpassword;
    		account_manage.form_psw.save(function(){
    			gabFrame.formWin.close();
    			account_manage.grid.load();
    		});
    	};
    
    	//account_manage.form.load();
      // account_manage.form_psw.load();

    }


    //保存重置密码
  /*  form_psw.save=function(caller){
    	form_psw.data=form_psw.data||{};
        getFormValue(form.columns,form.data);
        var url=form.url+'update_'+form.pageCode;
        var op_="重置";
        form.sendRequest('form_insert',url,function(data){
            //回调函数里执行如下:
        	form_psw.data=data.data;
            form.$formBox.html(createForm(form_psw.columns,form_psw.data,form_psw));
            try{caller(form_psw.data)}catch (e){console.log(e);}
        },form_psw.data,op_+"账号",null,false,null,'POST',function(){});
    }*/


    account_manage.init();
    return account_manage;
}