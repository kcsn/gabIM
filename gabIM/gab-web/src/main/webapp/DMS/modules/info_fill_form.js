/**
 * Created by wunai on 2018/7/15.
 */
gabFrame.info_fill_form=function(options){
    var info_fill_form=$.extend(gabFrame.base_component(),{testTag:'fillInfo'}, options||{});
    info_fill_form.init=function() {
        info_fill_form.$e = $('<div style="width:100%;height:auto;"></div>');

        //模板控制区
        info_fill_form.$modelBar = $('<div style="width:100%;height:auto;padding:20px 0;"></div>');
        info_fill_form.$e.append(info_fill_form.$modelBar);
        var $selectModel=$('<select id="slpk" data-live-search="true" style="width:280px;border-radius: 5px;height: 33px;" ></select>');
        $selectModel.append("<option value='1'>香蕉</option>");
        $selectModel.append("<option value='2'>苹果</option>");
        $selectModel.append("<option value='3'>橘子</option>");
        $selectModel.append("<option value='4'>石榴</option>");
        $selectModel.append("<option value='5'>棒棒糖</option>");
        $selectModel.append("<option value='6'>桃子</option>");
        $selectModel.append("<option value='7'>陶子</option>");
        info_fill_form.$modelBar.append($selectModel);

        //获取选值
        // var selectedValues = [];
        // $("#slpk:selected").each(function(){
        //     selectedValues.push($(this).val());
        // });
        // alert($selectModel.val());
        // $("option:selected").each(function(){
        //     alert($(this).val());
        // });

        this.$addThemeButton=$('<button type="button" class="btn btn-primary" id="btn-search" style="margin: 0 0 0 25px;">创建填报主题</button>');
        info_fill_form.$modelBar.append(this.$addThemeButton);
        this.$addThemeButton.click(function(){

        });

        this.$manageThemeButton=$('<button type="button" class="btn btn-primary" id="btn-search" style="margin: 0 0 0 25px;">主题管理</button>');
        info_fill_form.$modelBar.append(this.$manageThemeButton);
        this.$manageThemeButton.click(function(){

        });



        //状态栏
        info_fill_form.$blockStatusBar=$('<div style="width:100%;height:auto;overflow-x: auto;white-space:nowrap;"></div>');
        info_fill_form.blockStatusHelper={};
        info_fill_form.blockPanelHelper={};
        info_fill_form.$e.append(info_fill_form.$blockStatusBar);
        var $processHeader=$('<div><span class="glyphicon glyphicon-triangle-right"></span>资料填写流程</span></div>');
        info_fill_form.$blockStatusBar.append($processHeader);
        var count=1;
        var blockArray=[
            {id:1,name:'实力管理',icon:'glyphicon-star',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:false,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'所领导人数',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'社区警务',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'所领导人数',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'社区警务',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'勤务模式',isLeaf:true,itemtype:'radio',required:true,hint:'',selfformat:'',options:[{id:1,value_:'一室两队',name:'一室两队',selfformat:''},{id:2,value_:'一室三队',name:'一室三队',selfformat:''},{id:3,value_:'一警多能',name:'一警多能',selfformat:''},{id:4,value_:'其他',name:'其他',selfformat:''}],itemvalues:[{id:2,itemid:2,valueid:1,value_:'一室两队',number_:null}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:false,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'所领导人数',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'社区警务',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'所领导人数',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'社区警务',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'勤务模式',isLeaf:true,itemtype:'radio',required:true,hint:'',selfformat:'',options:[{id:1,value_:'一室两队',name:'一室两队',selfformat:''},{id:2,value_:'一室三队',name:'一室三队',selfformat:''},{id:3,value_:'一警多能',name:'一警多能',selfformat:''},{id:4,value_:'其他',name:'其他',selfformat:''}],itemvalues:[{id:2,itemid:2,valueid:1,value_:'一室两队',number_:null}]}
            ]},
            {id:2,name:'人口管理',icon:'glyphicon-user',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'checkbox',required:true,hint:'填写0~999',selfformat:'',options:[{id:1,value_:'一室两队',name:'一室两队',selfformat:''},{id:2,value_:'一室三队',name:'一室三队',selfformat:''},{id:3,value_:'一警多能',name:'一警多能',selfformat:''}],itemvalues:[{id:2,itemid:2,valueid:1,value_:'一室两队',number_:9},{id:2,itemid:2,valueid:2,value_:'一室三队',number_:9}]}
            ]},
            {id:3,name:'治安管理',icon:'glyphicon-home',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]},
            {id:4,name:'安全防范',icon:'glyphicon-lock',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]},
            {id:5,name:'执法办案',icon:'glyphicon-briefcase',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]},
            {id:6,name:'服务群众',icon:'glyphicon-heart',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]},
            {id:7,name:'队伍建设',icon:'glyphicon-tree-conifer',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]},
            {id:8,name:'内务管理',icon:'glyphicon-bed',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]},
            {id:9,name:'警务保障',icon:'glyphicon-phone-alt',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,valueid:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,valueid:null,value_:9,number_:9}]}
            ]}
            ];
        info_fill_form.renderBlockStatus(blockArray);
        info_fill_form.renderBlockPanels(blockArray);
    };









    //状态栏控件封装
    addStatusControl(info_fill_form);


    //填报区域封装
    addFillBlock(info_fill_form);

    info_fill_form.selfClear=function(){
        for(var key in info_fill_form.blockStatusHelper){
            try{
                info_fill_form.blockStatusHelper[key]==null;
            }catch (e){}
        }
        info_fill_form.blockStatusHelper=null;

        for(var key in info_fill_form.blockPanelHelper){
            try{
                info_fill_form.blockPanelHelper[key]==null;
            }catch (e){}
        }
        info_fill_form.blockPanelHelper=null;
    }
    info_fill_form.init();
    return info_fill_form;
}






function addStatusControl(info_fill_form){
    //状态元素
    info_fill_form.createStatusBlock=function(id,icon,text,status,withRightArrow){
        var block_={
            $e:null,
            init:function(){
                this.$icon=$('<span class="glyphicon '+icon+'" style="width: 90px;font-size: 50px;text-align: center;color: rgba(145, 155, 181,1);"></span>');
                this.$e=$('<a href="#block_'+id+'"><div style="display: inline-block; margin: 5px;position: relative;"></div></a>');
                this.$box=$('<div style="display: inline-block; margin: 5px;position: relative;"></div>');
                this.$e.append(this.$box);
                var $badgeBox=$('<div></div>');
                this.$box.append(this.$icon);
                this.$box.append($badgeBox);
                this.$badge=$('<span class="badge" style="padding:4px 12px;background-color: rgba(145, 155, 181,0.2);;color:#000000;font-weight: 500;opacity: 1;border-radius: 20px;"></span>');
                this.$badgeText=$('<span>'+text+'</span>');
                this.$badgeStatus=$('<span class="glyphicon glyphicon-ok" style="opacity: 1;margin: 0 3px;color: #22e834;top: 2px;"></span>');
                $badgeBox.append(this.$badge);
                this.$badge.append(this.$badgeText);
                this.$badge.append(this.$badgeStatus);
                if(withRightArrow){
                    // this.$box.append(info_fill_form.createRightArrow().$e);
                    this.addControl(this.$box,info_fill_form.createRightArrow(),'');
                }
            },
            setStatus:function(status){
                if(status==1){
                    this.$badgeStatus.removeClass('glyphicon-remove');
                    this.$badgeStatus.addClass('glyphicon-ok');
                    this.$badgeStatus.css({color:'#22e834'});
                }else{
                    this.$badgeStatus.removeClass('glyphicon-ok');
                    this.$badgeStatus.addClass('glyphicon-remove');
                    this.$badgeStatus.css({color:'red'});
                }
            }
        };
        var block=$.extend(gabFrame.base_component(),block_);
        block.init();
        block.setStatus(status);
        return block;
    };
    //右箭头
    info_fill_form.createRightArrow=function(){
        var rightArrow_={
            $e:null,
            init:function(){
                this.$e=$('<div style="display: inline-block; position: absolute;right: -8px;top: 20px;"></div>');
                this.$icon=$('<span class="glyphicon glyphicon-arrow-right" style="width: 10px;text-align: center;color: rgba(145, 155, 181,1);"></span>');
                this.$e.append(this.$icon);
            }
        }
        var rightArrow=$.extend(gabFrame.base_component(),rightArrow_);
        rightArrow.init();
        return rightArrow;
    }


    //状态板
    info_fill_form.renderBlockStatus=function(blockArray){
        if(blockArray&&blockArray.length){
            for(var i=0;i<blockArray.length;i++){
                var block=blockArray[i];
                var statusBlock=info_fill_form.createStatusBlock(block.id,block.icon,block.name,block.status,i!=blockArray.length-1);
                // info_fill_form.$blockStatusBar.append(statusBlock.$e);
                info_fill_form.addControl(info_fill_form.$blockStatusBar,statusBlock,'');
                info_fill_form.blockStatusHelper[block.id]=statusBlock;
            }
        }
    }
}





function addFillBlock(info_fill_form){
    info_fill_form.createBlockPanel=function(block){
        var createBlockPanel_={
            $e:null,
            itemMap:{},
            init:function(){
                this.$e=$('<div style="width:100%;height:auto;padding:15px 0;"></div>');
                //title
                this.$title=$('<div id="block_'+block.id+'" style="width:100%;height:50px;line-height: 50px;padding:0 15px;background-color: rgb(240, 240, 240);">'+block.name+'</div>');
                this.$e.append(this.$title);
                //content
                this.$content=$('<div class="row" style="width:100%;min-width:1000px;height:auto;padding:15px;"></div>');
                this.$e.append(this.$content);
                this.$form=$('<form class="form-horizontal" role="form"></form>');
                this.$content.append(this.$form);
                renderItem(this,block);

                //btn
                this.$footer=$('<div style="width:100%;height:auto;padding:15px;text-align: center;"></div>');
                this.$e.append(this.$footer);
                this.refreshStatus(block);
            },
            refreshStatus:function(block){
                //切换状态
                //待提交、已提交
                if(this.status!=block.status){
                    this.$footer.empty();
                    if(block.status==1){//已提交
                        this.$footer.append($('<div style="width:100%;height:25px;line-height: 25px;text-align: center;"><span class="glyphicon glyphicon-ok-circle" style="color:green;font-size: 24px;"></span></div>'));
                    }else{//待提交
                        this.$saveBtn=$('<button type="button" class="btn" id="btn-search" style="margin: 0 0 0 25px;">保存</button>');
                        this.$submitBtn=$('<button type="button" class="btn btn-primary" id="btn-search" style="margin: 0 0 0 25px;">提交</button>');
                        this.$footer.append(this.$saveBtn);
                        this.$footer.append(this.$submitBtn);
                    }
                    this.status=block.status;
                }
            },
            getItemValues:function(){
                //用于获取保存时传给后台的itemValues
            }
        };
        var createBlockPanel=$.extend(gabFrame.base_component(),createBlockPanel_);
        createBlockPanel.init();
        return createBlockPanel;
    }

    info_fill_form.renderBlockPanels=function(blockArray){
        if(blockArray&&blockArray.length){
            for(var i=0;i<blockArray.length;i++){
                var block=blockArray[i];
                var blockPanel=info_fill_form.createBlockPanel(block);
                // info_fill_form.$blockStatusBar.append(statusBlock.$e);
                info_fill_form.addControl(info_fill_form.$e,blockPanel,'');
                info_fill_form.blockPanelHelper[block.id]=blockPanel;
            }
        }
    }
}


function renderItem(panel,block){
    var items=block.items;
    if(items&&items.length){
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var itemOptions=item.options;
            var itemValues=item.itemvalues;
            var itemControl={
                item:item,
                values:itemValues,
                options:itemOptions,
                $e:null
            };
            var format=item.selfformat||'defaultItemRender';
            gabFrame[format](itemControl);
            itemControl.init();
            panel.itemMap[item.id]=itemControl;

            if(item.isLeaf&&item.pid){//叶子//如果存在父级
                panel.itemMap[item.pid].$inputBox.append(itemControl.$e);
            }else{
                panel.$form.append(itemControl.$e);
            }
        }
    }
}


gabFrame.defaultItemRender=function(itemControl){
    itemControl.init=function(){
        if(this.item.isLeaf&&this.item.pid){
            this.$e=$('<div class="form-group col-sm-6" style="padding:0;margin: 0;"></div>');
            this.$e.append($('<div class="col-sm-6" style="background-color: #EAEAEA;line-height: 32px;text-align: left;padding:0 5px;margin: 0;border: 1px solid #CCC;">'+this.item.name+'</div>'));
            this.$inputBox=$('<div class="col-sm-6" style="padding:0;margin: 0;"></div>');
            this.$e.append(this.$inputBox);
            var $input=$('<input type="'+this.item.itemtype+'" style="border-radius:0;" class="form-control" name="block_item_'+this.item.id+'" placeholder="'+this.item.hint+'" '+(this.item.required?'required':'')+'>');
            this.$inputBox.append($input);
            //填充数据
            try {
                $input.val(this.values[0].value_);
            }catch (e){}
        }else if(this.item.isLeaf){
            this.$e=$('<div class="form-group col-sm-5"></div>');
            var requiredText='';
            if(this.item.required){
                requiredText='<span style="color:red;">* </span>'
            }

            this.$e.append($('<label class="col-sm-4 control-label" >'+requiredText+this.item.name+'</label>'));
            this.$inputBox=$('<div class="col-sm-8"></div>');
            this.$e.append(this.$inputBox);
            if(!this.item.pid){

                if(this.item.itemtype=='radio'||this.item.itemtype=='checkbox'){
                    for(var i=0;i<this.item.options.length;i++){
                        var checked='';
                        if(this.values&&this.values.length){
                            for(var j=0;j<this.values.length;j++){
                                if(this.values[j].valueid==this.item.options[i].id){
                                    checked=' checked';
                                    break;
                                }
                            }
                        }
                        var cols=' col-sm-6';
                        if(this.item.itemtype=='checkbox'){
                            cols=' col-sm-12';
                        }

                        var $input=$('<div class="'+this.item.itemtype+cols+'"><label><input '+checked+' type="'+this.item.itemtype+'" name="block_item_'+this.item.id+'" value="'+this.item.options[i].id+'">'+this.item.options[i].name+'</label></div>');
                        this.$inputBox.append($input);
                    }
                }else{
                    var $input=$('<input type="'+this.item.itemtype+'" class="form-control" name="block_item_'+this.item.id+'" placeholder="'+this.item.hint+'" '+(this.item.required?'required':'')+'>');
                    this.$inputBox.append($input);
                    //填充数据
                    try {
                        $input.val(this.values[0].value_);
                    }catch (e){}
                }
            }
        }else{
            this.$e=$('<div class="form-group col-sm-7"></div>');
            var requiredText='';
            if(this.item.required){
                requiredText='<span style="color:red;">* </span>'
            }

            this.$e.append($('<label class="col-sm-3 control-label" >'+requiredText+this.item.name+'</label>'));
            this.$inputBox=$('<div class="col-sm-9" style=""></div>');
            this.$e.append(this.$inputBox);
        }
    };
}


