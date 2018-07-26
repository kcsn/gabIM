/**
 * Created by wunai on 2018/7/12.
 */
gabFrame.form=function(options){
    //默认设置
    var form_={
        //按钮栏
        //搜索栏
        //form
        //翻页
        formId:'g_f_form',
        $e:null,
        testTag:'form',
        formPrefix:'g_f_',
        readonly:false,
        url:null,
        //'table-striped table-bordered table-hover'
        columns:[],
        data:null,//列表数据
        onSave:null
    };

    //用户自定义设置应用
    var form=$.extend(gabFrame.base_component(),form_, options||{});

    form.init=function(){
        if(!form.$e){
            form.$e=$('<div style="width:100%;height:auto;"></div>');
        }
        if(!form.$formBox){
            form.$formBox=$('<div style="width:100%;height:auto;"></div>');
            form.$e.append(form.$formBox);
        }
        form.data=form.data||{id:form.objectId};
        form.$formBox.html(createForm(form.columns,form.data,form));
    }
    form.load=function(caller,data){
        if(data){
            //本地加载
            form.objectId=data.id;
            form.data=data;
            form.$formBox.html(createForm(form.columns,form.data,form));
            try{caller(form.data)}catch (e){console.log(e);}
        }else{
            if(form.objectId){
                //发请求
                form.sendRequest('form_load',form.url+'select-'+form.pageCode,function(data){
                    //回调函数里执行如下:
                    form.data=data.data||{id:form.objectId};
                    form.$formBox.html(createForm(form.columns,form.data,form));
                    try{caller(form.data)}catch (e){console.log(e);}
                },{id:form.objectId},"加载账号",null,false,null,'POST',function(){});
            }else{
                form.data={};
                form.$formBox.html(createForm(form.columns,form.data,form));
                try{caller(form.data)}catch (e){console.log(e);}
            }
        }

    };

  



    form.selfClear=function(){
        //中断连接
        //清除控件
    }

    
    form.save=function(caller){
        form.data=form.data||{id:form.objectId};
    	form.getFormValue(form.columns,form.data);
        form.data.id=form.data.id||form.objectId;
    	var url=form.url+'add-'+form.pageCode;
    	var op_="新增";
    	if(form.objectId){
    		url=form.url+'update-'+form.pageCode;
    		op_="修改";
    	}
    	form.sendRequest('form_update',url,function(data){
    		//回调函数里执行如下:
        	form.data=data.data||{id:form.objectId};
            form.$formBox.html(createForm(form.columns,form.data,form));
           try{caller(form.data)}catch (e){console.log(e);}
    	},form.data,op_+"账号",null,false,null,'POST',function(){});
    
    }

    
/*    form.save=function(caller){
    	getFormValue(form.columns,form.data);
    	form.data=form.data||{};
    	if(form.data.newpassword!=form.data.newpassword1){
    		alert("两次输入的密码不一致！请重新输入！")
    	}else{
    	form.data.password=form.data.newpassword;
    	form.data.id=form.objectId;
    	var url=form.url+'add-'+form.pageCode;
    	var op_="新增";
    	if(form.objectId){
    		url=form.url+'update-'+form.pageCode;
    		op_="修改";
    	}
    	form.sendRequest('form_update',url,function(data){
    		//回调函数里执行如下:
        	form.data=data.data||{};
            form.$formBox.html(createForm(form.columns,form.data,form));
           try{caller(form.data)}catch (e){console.log(e);}
    	},form.data,op_+"账号",null,false,null,'POST',function(){});
    }
    }*/





    form.getFormValue=function(columns,data){
        try {
            for(var i=0;i<columns.length;i++){
                try {
                    
                    var columnType=columns[i].formtype;
                    if(columnType=='radio'){
                    	//如果是单选按钮
//                    	var value=$('#'+form.formPrefix+columns[i].value+":checked").val();
                    	var value=$("input[name='"+form.formPrefix+columns[i].value+"']:checked").val();
//                    	var value=$('#'+form.formPrefix+columns[i].value).val();
                        trueValue(data, columns[i].value, value);
                    }else if(columnType=='checkbox'){
                    	//如果是复选框
                    	var value=$('#'+form.formPrefix+columns[i].value+":checked").val();
//                    	var value=$('#'+form.formPrefix+columns[i].value).val();
                        trueValue(data, columns[i].value, value);
                    }else{
                    	//其他
                    	var value=$('#'+form.formPrefix+columns[i].value).val();
                        trueValue(data, columns[i].value, value);
                    }
                    
                    
                    
                    
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
        var hideStyle="";
        if(hidden){
            hideStyle="display:none;";
        }
            // input+='<input id="'+form.formPrefix+name+'" type="hidden" name="'+name+'" value="'+value+'">';
        // }else{
        input+='<div class="form-group" style="'+hideStyle+'"><label for="'+form.formPrefix+name+'" class="col-sm-3 control-label">'+text+'</label><div class="col-sm-9">'+
            '<input type="'+type+'" class="form-control" id="'+form.formPrefix+name+'" placeholder="'+tips+'" value="'+value+'" '+ readonlystr+'></div></div>'
        // }
        return input;
    }

    function createForm(columns,data,form){
        var formSTR='';
        for(var i=0;i<columns.length;i++){
            if(columns[i].selfformformat){
                formSTR+=columns[i].selfformformat(data,data[columns[i].value],columns[i]);
            }else{
                formSTR+=createInput(columns[i].text, columns[i].value, data[columns[i].value], columns[i].formtype, !columns[i].formvisable,columns[i].readonly||form.readonly);
            }
        }
        return '<form id="'+form.formId+'" class="form-horizontal" role="form">'+formSTR+'</form>';
    }











    form.init();
    return form;
}