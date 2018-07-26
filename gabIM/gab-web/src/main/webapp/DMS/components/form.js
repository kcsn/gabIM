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
        url:null,
        //'table-striped table-bordered table-hover'
        columns:[],
        data:{},//列表数据
        onSave:null
    };

    //用户自定义设置应用
    var form=$.extend(gabFrame.base_component(),form_, options||{});
    form.save=function(){
        //校验
        //保存
        getFormValue(form.columns,form.data);
    };
    form.init=function(){
        if(!form.$e){
            form.$e=$('<div style="width:100%;height:auto;"></div>');
        }
        // if(!form.$toolBarBox){
        //     form.$toolBarBox=$('<div style="width:100%;height:auto;"></div>');
        //     var $button_=$('<button type="button" class="btn btn-success" id="btn-submit">保存</button>');
        //     $button_.click(function(){
        //         form.save();
        //     });
        //     var $sub_=$('<div class="form-group"></div>');
        //     var $box_=$(' <div class="col-sm-6"  style="width:80px;"></div>');
        //     $sub_.append($button_);
        //     $box_.append($sub_);
        //     form.$toolBarBox.append($box_);
        //     form.$e.append(form.$toolBarBox);
        // }
        if(!form.$formBox){
            form.$formBox=$('<div style="width:100%;height:auto;"></div>');
            form.$e.append(form.$formBox);
        }
        form.$formBox.html(createForm(form.columns,form.data));
    }
    form.load=function(caller){
        if(form.objeId){

        }else{

        }
        form.data={id:1,itemid:'test1',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'};
        form.$formBox.html(createForm(form.columns,form.data));
        try{caller(form.data)}catch (e){console.log(e);}
    };
    form.selfClear=function(){
        //中断连接
        //清除控件
    }









    function getFormValue(columns,data){
        try {
            for(var i=0;i<columns.length;i++){
                try {
                    var value=$('#'+form.formPrefix+columns[i].value).val();
                    trueValue(data, columns[i].value, value);
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

    function createForm(columns,data){
        var formSTR='';
        for(var i=0;i<columns.length;i++){
            if(columns[i].selfformformat){
                formSTR+=columns[i].selfformformat(data,data[columns[i].value],columns[i]);
            }else{
                formSTR+=createInput(columns[i].text, columns[i].value, data[columns[i].value], columns[i].formtype, !columns[i].formvisable,columns[i].readonly);
            }
        }
        return '<form id="'+form.formId+'" class="form-horizontal" role="form">'+formSTR+'</form>';
    }











    form.init();
    return form;
}