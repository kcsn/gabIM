/**
 * Created by huren on 2018/7/23.
 */
gabFrame.themeEditor=function(options){
    //默认设置
    var themeEditor_={
        //按钮栏
        //搜索栏
        //form
        //翻页
        height:'400px',
        editorId:'g_f_theditor',
        $e:null,
        testTag:'theditor',
        editorPrefix:'g_f_',
        readonly:false,
        url:null,
        pageCode:null,
        columns:[],
        data:null,//列表数据
        onSave:null
    };

    //用户自定义设置应用
    var themeEditor=$.extend(gabFrame.base_component(),themeEditor_, options||{});

    themeEditor.init=function(){
        if(!themeEditor.$e){
            themeEditor.$e=$('<div style="width:100%;max-height:'+themeEditor.height+';overflow-y: auto"></div>');
        }
        this.setData([]);
    }
    themeEditor.load=function(caller){
        var params={};
        params.pageNum=1;
        params.pageSize=1000000;
        themeEditor.sendRequest(themeEditor.pageCode+'-list',themeEditor.url+themeEditor.pageCode+'-list',function(data){
            themeEditor.setData(data.data.list||data.data);
            try{caller(themeEditor.data)}catch (e){console.log(e);}
        },params,"获取账号列表",null,false,null,'POST',function(){});


    };


    themeEditor.setData=function(data){
        this.data=data;
        this.$e.empty();
        if(this.data&&this.data.length){
            for(var i=0;i<this.data.length;i++){
                var options={
                    rowIndex:i,
                    url:this.url,
                    pageCode:this.pageCode,
                    data:this.data[i],
                    deleteCaller:function(){
                        themeEditor.load();
                    }
                };
                this.addControl(this.$e,new gabFrame.themeEditorItem(options),'row_'+i);
            }
        }
    }


    themeEditor.selfClear=function(){
        //中断连接
        //清除控件
    }
    themeEditor.init();
    return themeEditor;
}




gabFrame.themeEditorItem=function(options){
    //默认设置
    var themeEditorItem_={
        height:'40px',
        $e:null,
        testTag:'theditor',
        editorPrefix:'g_f_',
        readonly:false,
        url:null,
        btnWidth:'40px',
        inputType:'text',
        pageCode:null,
        required:true,
        columns:[],
        backgroundColors:['rgb(238, 238, 238)','#FFF'],
        rowIndex:0,
        // states:['E','V'],
        state:0,
        data:null,//列表数据
        onSave:null,
        getHeight:function(){
            return new Number(this.height.replace('px',''));
        }
    };

    //用户自定义设置应用
    var themeEditorItem=$.extend(gabFrame.base_component(),themeEditorItem_, options||{});

    themeEditorItem.init=function(){
        if(!themeEditorItem.$e){
            themeEditorItem.$e=$('<div style="width:100%;height:'+themeEditorItem.height+';overflow: hidden;background-color: '+this.backgroundColors[(this.rowIndex%2)]+'"></div>');
        }
        themeEditorItem.renderItem();
        themeEditorItem.setData(this.data);
    }

    //在根容器中放一个面板div  上半部分显示 名称 修改按钮 删除按钮  下半部分显示input框 提交按钮

    themeEditorItem.renderItem=function(){

        themeEditorItem.$itemPanel=$('<div style="width:100%;height:'+(themeEditorItem.getHeight()*2)+'px;margin-top: 0;"></div>');
        themeEditorItem.$e.append(themeEditorItem.$itemPanel);

        themeEditorItem.$viewPart=$('<div style="width:100%;height:'+themeEditorItem.height+';line-height:'+themeEditorItem.height+';padding-right:'+themeEditorItem.btnWidth+';position: relative;"></div>');
        themeEditorItem.$editPart=$('<div style="width:100%;height:'+themeEditorItem.height+';line-height:'+themeEditorItem.height+';padding-right:'+themeEditorItem.btnWidth+';position: relative;"></div>');
        themeEditorItem.$itemPanel.append(themeEditorItem.$viewPart);
        themeEditorItem.$itemPanel.append(themeEditorItem.$editPart);


        themeEditorItem.$textSpan=$('<span style="padding-left:15px;"></span>');
        themeEditorItem.$viewPart.append(themeEditorItem.$textSpan);

        themeEditorItem.editBtn=$('<button type="button" class="btn btn-link" style="float:right;margin-top: 4px;"><span class="glyphicon glyphicon-pencil"></button>');
        themeEditorItem.removeBtn=$('<button type="button" class="btn btn-link" style="position: absolute;top:4px;right: 0;"><span class="glyphicon glyphicon-trash"></button>');
        themeEditorItem.$viewPart.append(themeEditorItem.editBtn);
        themeEditorItem.$viewPart.append(themeEditorItem.removeBtn);

        this.editBtn.click(function(){
            themeEditorItem.toggle();
        });
        this.removeBtn.click(function(){
            themeEditorItem.deleteItem();
        });



        themeEditorItem.$commitBtn=$('<button type="button" class="btn btn-link" style="position: absolute;top:4px;right: 0;color:darkgreen;"><span class="glyphicon glyphicon-ok"></button>');
        //自定义后面再扩展 inputType
        themeEditorItem.$input=$('<input type="'+themeEditorItem.inputType+'" style="border-radius:0;width:100%;height:100%;" class="form-control"  placeholder="输入...">');
        themeEditorItem.$editPart.append(themeEditorItem.$input);
        themeEditorItem.$editPart.append(themeEditorItem.$commitBtn);
        this.$commitBtn.click(function(){
            themeEditorItem.save();
        });
    }
    themeEditorItem.setData=function(data){
        this.data=data||this.data||{};
        this.$textSpan.text(data.name);
        this.$input.val(data.name);
    }

    themeEditorItem.toggle=function(){
        this.setState((this.state+1)%2);
    }

    themeEditorItem.setState=function(state){
        if(this.state!=state){
            var height=-this.getHeight()*state;
            this.$itemPanel.css({'margin-top':height+'px'});
            this.state=state;
            if(state==1){
                this.$input.focus();
            }
        }
    }


    themeEditorItem.deleteItem=function(){
        var id=this.data.id;
        Modal.confirm({ msg: "是否刪除"+this.data.name+"？"})	//弹出对话框,
            .on( function (e) {
                if(e){
                    var url=themeEditorItem.url+'delete-'+themeEditorItem.pageCode;
                    themeEditorItem.sendRequest('theme_del',url,function(data){
                        try{
                            themeEditorItem.deleteCaller(data);
                        }catch (e){}
                    },{id:id},"刪除账号",null,false,null,'POST',function(){});
                }
            });
    }

    themeEditorItem.save=function(caller){
        var hasChange=this.$input.val()!=this.data.name;
        if(hasChange){
            //保存
            if(!this.$input.val()){
                showTips("名称不能为空");
                return;
            }
            var params=$.extend(true, {}, this.data);
            params.name=this.$input.val();
            var url=themeEditorItem.url+'update-'+themeEditorItem.pageCode;
            themeEditorItem.sendRequest('themeEditorItem_update',url,function(data){
                //回调函数里执行如下:
                themeEditorItem.setData(data.data||params||{});
                themeEditorItem.toggle();
                try{caller(themeEditorItem.data)}catch (e){console.log(e);}
            },params,"修改主题",null,false,null,'POST',function(){});

        }else{
            themeEditorItem.toggle();
        }
        info_fill_form.flushdbox;
    }

    themeEditorItem.selfClear=function(){
        //中断连接
        //清除控件
    }
    themeEditorItem.init();
    return themeEditorItem;
}













