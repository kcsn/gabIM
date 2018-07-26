/**
 * Created by huren on 2018/7/12.
 */

//创建视图区域
gabFrame.createViewPort=function(){
    if(!gabFrame.viewPort){
        gabFrame.viewPort={
            $viewPort:null,
            //路由配置
            router:{

            },
            curPanel:{},
            switchPanel:function(config){
                // config={
                //     code:'',
                //     params:{}
                // };
                if(this.curPanel.code!=config.code){
                    if(!gabFrame[config.code]){
                        showTips('找不到视图！',true);
                        return;
                        // Modal.alert({ msg: "是否放弃编辑的内容！"});
                        // .on( function (e) {
                        //     if(e){
                        //         curRightPage.pageObj.stopRun();
                        //         curRightPage.pageObj=null;
                        //         if(caller){
                        //             try {
                        //                 caller();
                        //             } catch (e) {}
                        //         }else{
                        //             curRightPage.loadPage(code);
                        //         }
                        //     }
                        // });
                    }
                    this.curPanel.code=null;
                    try{
                        this.curPanel.view.clear();
                    }catch (e){}
                    try{
                        var view=new gabFrame[config.code]();
                        this.$viewPort.empty().append(view.$e);
                        this.curPanel.code=config.code;
                        this.curPanel.config=config.config;
                        this.curPanel.view=view;
                    }catch (e){
                        console.log(e);
                    }
                }
            },
            init:function(){
                var $box=$('<div></div>');
                $box.css(gabFrame.viewPortConfig.css);
                this.$viewPort=$('<div id="'+gabFrame.viewPortConfig.id+'" style="width:100%;height:100%;padding: 20px;overflow-y: auto;overflow-x: hidden;"></div>');
                $box.append(this.$viewPort);
                gabFrame.gabFrame.$gabFrame.append($box);
            }
        };
        gabFrame.viewPort.init();
    }
    return gabFrame.header
}






var curRightPage={
    //切换页面
    code:null,
    changePage:function(code,caller){
        if(this.pageObj){//存在当前页面
            if(this.pageObj.isChange){
                Modal.confirm({ msg: "是否放弃编辑的内容！"})
                    .on( function (e) {
                        if(e){
                            curRightPage.pageObj.stopRun();
                            curRightPage.pageObj=null;
                            if(caller){
                                try {
                                    caller();
                                } catch (e) {}
                            }else{
                                curRightPage.loadPage(code);
                            }
                        }
                    });
            }else{
                curRightPage.pageObj.stopRun();
                curRightPage.pageObj=null;
                if(caller){
                    try {
                        caller();
                    } catch (e) {}
                }else{
                    curRightPage.loadPage(code);
                }
            }
        }else{//不存在当前页面
            if(caller){
                try {
                    caller();
                } catch (e) {}
            }else{
                curRightPage.loadPage(code);
            }
        }
    },
    initPage:function(){
        curRightPage.pageObj={
            ajaxCollect:{
            },
            abort:function(tar){
                if(tar){
                    if(this.ajaxCollect[tar]){
                        this.ajaxCollect[tar].abort();
                        this.ajaxCollect[tar]=null;
                    }
                }else{
                    for(var name in this.ajaxCollect){
                        if(this.ajaxCollect[name]){
                            this.ajaxCollect[name].abort();
                            this.ajaxCollect[name]=null;
                        }
                    }
                    this.ajaxCollect={};
                }
            },
            isChange:false,
            stopRun:function(){
                this.abort();
            }
        }
    },
    pageLoader:null,
    pageObj:{
        isChange:false,
        stopRun:function(){}
    },
    loadPage:function(code){
        if(curRightPage.pageLoader){
            curRightPage.pageLoader.abort();
            curRightPage.pageLoader=null;
        }

        curRightPage.initPage();
        var title="加载资源";
        if(title){
            showTips("正在"+(title||"操作")+"，请稍候……");
        }
        curRightPage.pageLoader=$.ajax({
            cache:false,type:"get",dataType:"text",
            url:BASE_HOST+SERVER_NAME+"/resources/bhgadmin/html/"+code+".html",
            timeout:10*1000,
            success:function(result){
                $(".body_right").css('display','block');
                $(".body_right").html(result+'<script src="html/'+code+'.js"></script>');
                showTips((title||"操作")+"完成！");
                tipsT=setTimeout('hdieTips()', tipsWinHideTime);
                $('.sidebar').removeClass('sidebar_loading');
                curRightPage.pageLoader=null;
                try {
                    start();
                } catch (e) {}
            },
            error:function(){
                $(".body_right").html('<div style="padding:20px 40px;">找不到对应资源！</div>');
                showTips((title||"操作")+"失败！");
                tipsT=setTimeout('hdieTips()', tipsWinHideTime);
                $('.sidebar').removeClass('sidebar_loading');
                curRightPage.pageLoader=null;
            }
        });
        var state = {code:code};
        //history.pushState(state, null, '#/'+code);
    }
};