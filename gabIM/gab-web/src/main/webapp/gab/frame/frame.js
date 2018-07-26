/**
 * Created by huren on 2018/7/12.
 */
var gabFrame={
    frameId:'GAB_FRAME',
    hearderHeight:65,
    leftMenuWidth:240,
    'css':{
        'width':'100%',
        'height':'100%',
        'overflow-x':'hidden',
        'overflow-y':'hidden'
    }
};
gabFrame.headerConfig={
    'id':'gab_frame_header',
    'heightValue':65,
    'css':{
        'position':'absolute',
        'left':'0',
        'top':'0',
        'width':'100%',
        'height':gabFrame.hearderHeight+'px',
        'background-color':'rgb(3, 33, 99)'
    }
};
gabFrame.leftMenuConfig={
    'id':'gab_frame_l_menu',
    'css':{
        'position':'absolute',
        'left':'0',
        'top':'0',
        'width':gabFrame.leftMenuWidth+'px',
        'height':'100%',
        'padding-top':gabFrame.hearderHeight+'px',
        'background-color':'rgb(3, 33, 99)'
    }
};
gabFrame.viewPortConfig={
    'id':'gab_frame_viewport',
    'css':{
        'width':'100%',
        'height':'100%',
        'padding-top':gabFrame.hearderHeight+'px',
        'padding-left':gabFrame.leftMenuWidth+'px',
        'background-color':'#FEFEFE'
    }
}
//创建根容器
gabFrame.createFrame=function(){
    if(!gabFrame.gabFrame){
        gabFrame.gabFrame={
            $gabFrame:null,
            init:function(){
                this.$gabFrame=$('#'+gabFrame.frameId);
                this.$gabFrame.css(gabFrame.css);
                // $(document.body).append(this.$gabFrame);
                gabFrame.createViewPort();
                gabFrame.createLeftMenu();
                gabFrame.createHeader();
            }
        };
        gabFrame.gabFrame.init();
    }
    return gabFrame.gabFrame;
}


// function appendTipsAndMode() {
//     $(document.body).append($('<div id="ycf-alert" class="modal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>'+
//         '<h5 class="modal-title"> <i class="fa fa-exclamation-circle"></i> [Title] </h5> </div> <div class="modal-body small"> <p>[Message]</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-primary ok" data-dismiss="modal">[BtnOk]</button> <button type="button" class="btn btn-default cancel" data-dismiss="modal">[BtnCancel]</button></div></div></div></div><div id="ycf-loading" class="modal"><div id="ycf-loading-box" class="modal-dialog modal-sm"></div></div>'));
// }

//由于布局设计，渲染页面，先渲染视图区域，再渲染左侧菜单栏，最后渲染顶部标题

$(function() {
    gabFrame.createFrame();
    gabFrame.leftMenu.leftMenuTool.selectFirstNode();
});