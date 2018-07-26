/**
 * Created by wunai on 2018/7/15.
 */
gabFrame.info_fill_form=function(options){
    var info_fill_form=$.extend(gabFrame.base_component(),{testTag:'fillInfo'}, options||{});
    var $selectModel = null;
    //刷新下拉框
    info_fill_form.flushdbox = function(){
    	if($selectModel!=null){
        $selectModel.children().remove();
        }
        info_fill_form.sendRequest('theme_list',BASE_HOST+SERVER_NAME+'/api/theme/theme-list',function(data){
        	var themes=data.data;
        	if(!themes||!themes.length){
        	    showTips("还没有创建任何主题");
        	    return;
            }
        	for(var i=0;i<themes.length;i++){
            	$selectModel.append("<option value='"+themes[i].id+"'>"+themes[i].name+"</option>");
            };
            info_fill_form.themeId=themes[0].id;
            info_fill_form.loadModel(themes[0].id);
    	},null,"获取主题列表",null,false,null,'POST',function(){});
        
    };
    
    

    info_fill_form.loadModel=function(){
        info_fill_form.sendRequest('block_list',BASE_HOST+SERVER_NAME+'/api/block/select-blockVo-list',function(data){
            var blockArray=data.data;
            info_fill_form.$blockStatusBar.empty();
            info_fill_form.$blocksPanel.empty();
            info_fill_form.renderBlockStatus(blockArray);
            info_fill_form.renderBlockPanels(blockArray);
        },{themeId:info_fill_form.themeId,policeId:1},"获取块模板",null,false,null,'POST',function(){});
    }


    info_fill_form.init=function() {
        info_fill_form.$e = $('<div style="width:100%;height:auto;"></div>');
        info_fill_form.flushdbox();    
        //模板控制区
        info_fill_form.$modelBar = $('<div style="width:100%;height:auto;padding:20px 0;"></div>');
        info_fill_form.$e.append(info_fill_form.$modelBar);
        $selectModel=$('<select id="slpk" data-live-search="true" style="width:280px;border-radius: 5px;height: 33px;" ></select>');

        info_fill_form.$modelBar.append($selectModel);




        $selectModel.change(function(){
        	info_fill_form.themeId = $(this).val();
            info_fill_form.loadModel();
        })
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
        	var columns_addtheme=[
                {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
                {text:'',value:'name',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:themeFormat,readonly:false,hint:"主题名不超过30个字符"}
            ];
        	
        	info_fill_form.addControl(null,new gabFrame.form({readOnly:false,listvisable:false,pageCode:'theme',url:BASE_HOST+SERVER_NAME+'/api/theme/',columns:columns_addtheme}),'form_addtheme');        	
        	gabFrame.formWin.show('创建填报主题',info_fill_form.form_addtheme.$e);
        	gabFrame.formWin.onSubmit=function(evt){
        		//提交表单,1保存表单,2关闭弹框,3重新加载
        		var newFormData={};
        		info_fill_form.form_addtheme.save(function(){
        			gabFrame.formWin.close();
        			info_fill_form.flushdbox();
        		});
        	};
        });
        
        this.$manageThemeButton=$('<button type="button" class="btn btn-primary" id="btn-search" style="margin: 0 0 0 25px;">主题管理</button>');
        info_fill_form.$modelBar.append(this.$manageThemeButton);
        
        this.$manageThemeButton.click(function(){
        	 var columns=[
                 {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
                 {text:'账号',value:'name',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
             ];
        	 var options={
        	            url:BASE_HOST+SERVER_NAME+'/api/theme/',
        	            pageOptions:{
        	                page:1,//当前页码
        	                total:0,//记录总数
        	                totalPage:0,//总页数
        	                pageSize:5
        	            },
        	            columns:columns,
        	            pageCode:'theme',
        	            oprate:
        	            {head:"操作",col:[
        	                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.update(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>修改</button>'},coldata:['id']},
        	                {text:function(){return '<button type="button" onclick="gabFrame.viewPort.curPanel.view.del(\'{-1}\',\'{0}\',\'{1}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>删除</button>'},coldata:['id','name']}
        	            ]},
        	            showLineNum:true,
        	            listData:[]//列表数据
        	 }
        	 // info_fill_form.addControl(info_fill_form.$e,new gabFrame.grid(options),'grid_themeManage');
        	 // gabFrame.formWin.show('主题管理',info_fill_form.grid_themeManage.$e,true);
        	 // info_fill_form.grid_themeManage.load();


            info_fill_form.addControl(null,new gabFrame.themeEditor(options),'grid_themeManage');
            gabFrame.formWin.show('主题管理',info_fill_form.grid_themeManage.$e,true);
            info_fill_form.grid_themeManage.load();
        });

        //删除事件
        info_fill_form.del=function(){
        	var id=arguments[1];
        	 gabFrame.formWin.close();
        	 Modal.confirm({ msg: "是否刪除"+arguments[2]+"？"})	//弹出对话框,
             .on( function (e) {
                 if(e){
                	 info_fill_form.sendRequest('theme_del',BASE_HOST+SERVER_NAME+'/api/theme/delete-theme',function(data){
                		 gabFrame.formWin.show('主题管理',info_fill_form.grid_themeManage.$e);
                		 info_fill_form.grid_themeManage.load();
                		 info_fill_form.flushdbox();
                 	},{id:id},"刪除账号",null,false,null,'POST',function(){});
                 }
             });
        }
        
        //修改主题名
        info_fill_form.update=function(){
        	var id = arguments[1];
        	
        	
        
        }

        
        
        //状态栏
        info_fill_form.$blockStatusBar=$('<div style="width:100%;height:auto;overflow-x: auto;white-space:nowrap;"></div>');
        info_fill_form.blockStatusHelper={};
        info_fill_form.blockPanelHelper={};
        info_fill_form.$e.append(info_fill_form.$blockStatusBar);

        info_fill_form.$blocksPanel=$('<div style=""></div>')
        info_fill_form.$e.append(info_fill_form.$blocksPanel);


        var $processHeader=$('<div><span class="glyphicon glyphicon-triangle-right" style="padding-bottom: 15px;"></span>资料填写流程</span></div>');
        info_fill_form.$blockStatusBar.append($processHeader);
        var count=1;
        // info_fill_form.sendRequest('block_list',BASE_HOST+SERVER_NAME+'/api/block/select-blockVo-list',function(data){
        	// var blockArray=data.data;
         //    info_fill_form.renderBlockStatus(blockArray);
         //    info_fill_form.renderBlockPanels(blockArray);
    	// },{themeId:1,policeId:1},"获取块模板",null,false,null,'POST',function(){});
        
        /*var blockArray=[
            {id:1,name:'实力管理',icon:'glyphicon-star',status:1,items:[
                {id:count++,itemType:'2_1',name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_2',name:'民警人数',isLeaf:false,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_1',name:'所领导人数',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_2',name:'社区警务',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_1',name:'所领导人数',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_2',name:'社区警务',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_1',name:'勤务模式',isLeaf:true,itemtype:'radio',required:true,hint:'',selfformat:'',options:[{id:1,value_:'一室两队',name:'一室两队',selfformat:''},{id:2,value_:'一室三队',name:'一室三队',selfformat:''},{id:3,value_:'一警多能',name:'一警多能',selfformat:''},{id:4,value_:'其他',name:'其他',selfformat:''}],itemvalues:[{id:2,itemid:2,optionsId:1,value_:'一室两队',number_:null}]},
                {id:count++,itemType:'2_1',name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_2',name:'民警人数',isLeaf:false,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_1',name:'所领导人数',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_2',name:'社区警务',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_1',name:'所领导人数',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'2_2',name:'社区警务',pid:9,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,itemType:'1_1',name:'社区警务',pid:2,isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'勤务模式',isLeaf:true,itemtype:'radio',required:true,hint:'',selfformat:'',options:[{id:1,value_:'一室两队',name:'一室两队',selfformat:''},{id:2,value_:'一室三队',name:'一室三队',selfformat:''},{id:3,value_:'一警多能',name:'一警多能',selfformat:''},{id:4,value_:'其他',name:'其他',selfformat:''}],itemvalues:[{id:2,itemid:2,optionsId:1,value_:'一室两队',number_:null}]}
            ]},
            {id:2,name:'人口管理',icon:'glyphicon-user',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'checkbox',required:true,hint:'填写0~999',selfformat:'',options:[{id:1,value_:'一室两队',name:'一室两队',selfformat:''},{id:2,value_:'一室三队',name:'一室三队',selfformat:''},{id:3,value_:'一警多能',name:'一警多能',selfformat:''}],itemvalues:[{id:2,itemid:2,optionsId:1,value_:'一室两队',number_:9},{id:2,itemid:2,optionsId:2,value_:'一室三队',number_:9}]}
            ]},
            {id:3,name:'治安管理',icon:'glyphicon-home',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]},
            {id:4,name:'安全防范',icon:'glyphicon-lock',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]},
            {id:5,name:'执法办案',icon:'glyphicon-briefcase',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]},
            {id:6,name:'服务群众',icon:'glyphicon-heart',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]},
            {id:7,name:'队伍建设',icon:'glyphicon-tree-conifer',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]},
            {id:8,name:'内务管理',icon:'glyphicon-bed',status:0,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]},
            {id:9,name:'警务保障',icon:'glyphicon-phone-alt',status:1,items:[
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:1,itemid:1,optionsId:null,value_:9,number_:9}]},
                {id:count++,name:'民警人数',isLeaf:true,itemtype:'number',required:true,hint:'填写0~999',selfformat:'',options:[],itemvalues:[{id:2,itemid:2,optionsId:null,value_:9,number_:9}]}
            ]}
            ];*/
        
        /*info_fill_form.renderBlockStatus(blockArray);
        info_fill_form.renderBlockPanels(blockArray);*/
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

    //rowType  1 一列  2 两列  3 3列
    info_fill_form.formRow=function($e,$parent){
        var formRow={
            $e:null,
            init:function(){
                if(!$e){
                    this.$e=$('<div></div>');
                }else{
                    this.$e=$e;
                }
                if($parent){
                    $parent.append(this.$e);
                }
            },
            addItem:function(itemControl){
                var item=itemControl.item;
                var itemType=item.itemType||'1_1';
                this.getItemBox(itemType).append(itemControl.$e);
            },
            getItemBox:function(itemType){
                var rowType=parseInt(itemType.split("_")[0]);
                var itemCol=parseInt(itemType.split("_")[1]);
                if(this.curRowType!=rowType){
                    this.createRow(rowType);
                    this.curRowType=rowType;
                }
                return this[itemCol];
            },
            createRow:function(rowType){
                for(var i=1;i<=rowType;i++){
                    this[i]=$('<div class="form-group col-sm-'+Math.floor(12/rowType)+'" style="padding:0;margin: 0;"></div>');
                    this.$e.append(this[i]);
                }
            }
        };
        formRow.init();
        return formRow;
    }
   
    //修改指定blockid的填报状态
    info_fill_form.changeBlockStatus=function(blockId,blockStatus){
        info_fill_form.blockStatusHelper[blockId]&&info_fill_form.blockStatusHelper[blockId].setStatus(blockStatus)
        info_fill_form.blockPanelHelper[blockId]&&info_fill_form.blockPanelHelper[blockId].setStatus(blockStatus)
    }
    info_fill_form.init();
    return info_fill_form;
}





//填写流程状态板
//填写流程状态板
//填写流程状态板
//填写流程状态板
//填写流程状态板
function addStatusControl(info_fill_form){
    //状态元素
    info_fill_form.createStatusBlock=function(id,icon,text,status,withRightArrow){
        var block_={
            $e:null,
            init:function(){
                this.$icon=$('<span class="glyphicon '+icon+'" style="width: 90px;font-size: 36px;text-align: center;color: rgba(145, 155, 181,1);"></span>');
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
                this.$e=$('<div style="display: inline-block; position: absolute;right: -8px;top: 13px;"></div>');
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




//渲染单独的block
//渲染单独的block
//渲染单独的block
//渲染单独的block
//渲染单独的block
function addFillBlock(info_fill_form){
	    info_fill_form.createBlockPanel=function(block){
	        var createBlockPanel_={
	            $e:null,
	            info_fill_form:info_fill_form,
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
	                this.formRow=info_fill_form.formRow(this.$form);
	                // this.renderFormColumn();
	                renderItem(this,block);
	                this.blockId=block.id;
	                //btn
	                this.$footer=$('<div style="width:100%;height:auto;padding:15px;text-align: center;"></div>');
	                this.$e.append(this.$footer);
	                this.setStatus(block.status);
	            },
	            //block中存在一列或两列，在此做特殊处理
	            // renderFormColumn:function(){
	            //     if(block.formtype==1){
	            //
	            //     }else{
	            //
	            //     }
	            // },
	            setStatus:function(status){
	                //切换状态
	                //待提交、已提交
	            	if(status===null){
	            		status=0;
	            	}
//	                if(this.status!=status){
	                    this.$footer.empty();
	                    if(status==1){//已提交
	                        this.$footer.append($('<div style="width:100%;height:25px;line-height: 25px;text-align: center;"><span class="glyphicon glyphicon-ok-circle" style="color:green;font-size: 24px;"></span></div>'));
	                    }else{//待提交
	                        this.$saveBtn=$('<button type="button" class="btn" id="btn-search" style="margin: 0 0 0 25px;">保存</button>');
	                        this.$submitBtn=$('<button type="button" class="btn btn-primary" id="btn-search" style="margin: 0 0 0 25px;">提交</button>');
	                        var self=this;
	                        this.$saveBtn.click(function(){
	                            //保存按钮点击事件
	                        	self.getItemValues(false);
	                        });
	                        this.$submitBtn.click(function(){
	                        	//提交按钮点击事件
	                        	self.getItemValues(true);
	                        });
	                        this.$footer.append(this.$saveBtn);
	                        this.$footer.append(this.$submitBtn);
	                    }
	                    this.status=status;
//	                }
	                var readonly=status==1;
	                this.$form.find('input').attr('readonly',readonly);
	                this.$form.find('input').attr('disabled',readonly);
	
	            },
	            
	            getItemValues:function(isCommit){
	            	//用于验证必填项是否填写
	            	var validate = true;
	            	//用于获取保存时传给后台的itemValues
	                var result1=[];
	                //用于初始化块状态
	                var t = this.$form.serializeArray();
	                var self=this;
	                var result2={themeId:info_fill_form.themeId,policeId:1,blockId:self.blockId};
	                $.each(t, function () {
	                    // d[this.name] = this.value;
	                    if(this.name.startsWith('block_item_')){
	                        var itemid=this.name.replace('block_item_','');
	                        var itemValue={itemId:itemid,themeId:info_fill_form.themeId,policeId:1,blockId:self.blockId};
	                        var name =self.itemMap[itemid].item.name;
	                        itemValue.name=name;
	                        if(self.itemMap[itemid].item.pid==0){
	                        var required = self.itemMap[itemid].item.required; 
	                        }else{
	                        var required = self.itemMap[itemid].item.required || self.itemMap[self.itemMap[itemid].item.pid].item.required
	                        }
	                        var options=self.itemMap[itemid].options;
	                        if(options&&options.length){
	                            itemValue.optionsId=this.value;
	                            for(var i=0;i<options.length;i++){
	                                if(this.value==options[i].id){
	                                    itemValue.value=options[i].value;
	                                }
	                            }
	                        }else{
	                            itemValue.value=this.value;
	                        }
	                        try{
	                            itemValue.number=new Number(itemValue.value);
	                        }catch (e){}
	                        if(required){
	                        	if(itemValue.value==null||itemValue.value==''){
	                        	validate = false;
	                        	}
	                        }
	                        result1.push(itemValue);
	                    }
	                });
	              /*  alert(JSON.stringify(result2))
	                alert(JSON.stringify(result1));*/
	                //返回的result为itemvalue数组，传到后台直接处理保存
	                //初始化块状态操作
	                info_fill_form.sendRequest('block_init',BASE_HOST+SERVER_NAME+'/api/blockStatus/block-init',function(data){
	                },result2,"初始化块状态",null,false,null,'POST',function(){});
	                if(isCommit){
	                	if(validate){
	                		//验证通过 保存数据 并且改变块状态
	                		info_fill_form.sendRequest('block_save',BASE_HOST+SERVER_NAME+'/api/value-desc/save-block',function(data){
	                			info_fill_form.sendRequest('block_update',BASE_HOST+SERVER_NAME+'/api/blockStatus/block-update',function(data){
	                				self.info_fill_form.changeBlockStatus(self.blockId,data.data.status%2);
		    	                },result2,"更新块状态",null,false,null,'POST',function(){});
		                		
	                		},JSON.stringify(result1),"保存模块数据",null,false,null,'POST',function(){},"application/json");
	                		
	                	}else{
	                		alert("请填写所有必填项再提交！");
	                		return;
	                	}
	                }else{
	                	//数据保存操作
	                	info_fill_form.sendRequest('block_save',BASE_HOST+SERVER_NAME+'/api/value-desc/save-block',function(data){
	  	                },JSON.stringify(result1),"保存模块数据",null,false,null,'POST',function(){},"application/json");
	                }
	                // 具体传回参数  {blockid:1,itemvalues:result}
	                // 后台定义一个参数实体接收
	                // 先清空blockid对应的itemvalues
	                // 然后再批量保存
	
	
	                //提交按钮直接修改block对应状态
	                //前提先校验block必填项是否填写
	                //提交完成的block不允许再修改,请调用状态更改方法更改其状态
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
                info_fill_form.addControl(info_fill_form.$blocksPanel,blockPanel,'');
                info_fill_form.blockPanelHelper[block.id]=blockPanel;
            }
        }
    }
}





function renderItem(panel,block){
    var items=block.itemVos;
    if(items&&items.length){
        for(var i=0;i<items.length;i++){
            var item=items[i];
            var itemOptions=item.options;
            var itemValues=item.gabUValueDescs;
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
            // if(!itemControl.item.isLeaf){
            itemControl.formRow=panel.info_fill_form.formRow(itemControl.$inputBox);
            // }
            if(item.isleaf&&item.pid){//叶子//如果存在父级
                panel.itemMap[item.pid].formRow.addItem(itemControl);
                // panel.itemMap[item.pid].$inputBox.append(itemControl.$e);
            }else{
                panel.formRow.addItem(itemControl);
            }
        }
    }
}


gabFrame.defaultItemRender=function(itemControl){
    itemControl.init=function(){
        if(this.item.isleaf&&this.item.pid){
            var rowType=parseInt((this.item.itemType||"1").split("_")[0]);
            var labelClass="col-sm-6";
            var inputClass="col-sm-6";
            if(rowType==1){
                labelClass="col-sm-3";
                inputClass="col-sm-9";
            }
            
            var requiredText='';
            if(this.item.required){
                requiredText='<span style="color:red;">* </span>'
            }
            
            this.$e=$('<div class="form-group col-sm-12" style="padding:0;margin: 0;"></div>');
            this.$e.append($('<div class="'+labelClass+'" style="background-color: #EAEAEA;line-height: 32px;text-align: left;padding:0 5px;margin: 0;border: 1px solid #CCC;">'+requiredText+this.item.name+'</div>'));
            this.$inputBox=$('<div class="'+inputClass+'" style="padding:0;margin: 0;"></div>');
            this.$e.append(this.$inputBox);
            var $input=$('<input type="'+this.item.inputType+'" style="border-radius:0;" class="form-control" name="block_item_'+this.item.id+'" placeholder="'+(this.item.placehold||'')+'" '+(this.item.required?'required':'')+'>');
            this.$inputBox.append($input);
            //填充数据
            try {
                $input.val(this.values[0].value||'');
            }catch (e){}
        }else if(this.item.isleaf){
            this.$e=$('<div class="form-group col-sm-12"></div>');
            var requiredText='';
            if(this.item.required){
                requiredText='<span style="color:red;">* </span>'
            }
            var rowType=parseInt((this.item.itemType||"1").split("_")[0]);
            var labelClass="col-sm-4";
            var inputClass="col-sm-8";
            if(rowType==1){
                labelClass="col-sm-2";
                inputClass="col-sm-10";
            }
            this.$e.append($('<label class="'+labelClass+' control-label" >'+requiredText+this.item.name+'</label>'));
            this.$inputBox=$('<div class="'+inputClass+'"></div>');
            this.$e.append(this.$inputBox);
            if(!this.item.pid){
                var style_='';
                var cols=' col-sm-6';
                if(this.item.inputType=='checkbox'){
                    cols=' col-sm-12';
                }else if(rowType==1){
                    style_='width:auto;';
                    // cols=' col-sm-'+Math.floor(12/(this.item.options.length||1));
                }
                if(this.item.inputType=='radio'||this.item.inputType=='checkbox'){
                    for(var i=0;i<this.item.options.length;i++){
                        var checked='';
                        if(this.values&&this.values.length){
                            for(var j=0;j<this.values.length;j++){
                                if(this.values[j].optionsId==this.item.options[i].id){
                                    checked=' checked';
                                    break;
                                }
                            }
                        }
                        var $input=$('<div class="'+this.item.inputType+cols+'" style="'+style_+'"><label><input '+checked+' type="'+this.item.inputType+'" name="block_item_'+this.item.id+'" value="'+this.item.options[i].id+'">'+this.item.options[i].name+'</label></div>');
                        this.$inputBox.append($input);
                    }
                }else{
                    var $input=$('<input type="'+this.item.inputType+'" class="form-control" name="block_item_'+this.item.id+'" placeholder="'+(this.item.placehold||'')+'" '+(this.item.required?'required':'')+'>');
                    this.$inputBox.append($input);
                    //填充数据
                    try {
                        $input.val(this.values[0].value||'');
                    }catch (e){}
                }
            }
        }else{
            this.$e=$('<div class="form-group col-sm-12"></div>');
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


