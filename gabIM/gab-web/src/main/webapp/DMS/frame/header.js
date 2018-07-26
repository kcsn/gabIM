/**
 * Created by huren on 2018/7/12.
 */

//创建标题栏
gabFrame.createHeader=function(){
    if(!gabFrame.header){
        gabFrame.header={
            $header:null,
            init:function(){
                this.$header=$('<div id="'+gabFrame.headerConfig.id+'"></div>');
                this.$header.css(gabFrame.headerConfig.css);
                gabFrame.gabFrame.$gabFrame.append(this.$header);
                header.init(this.$header);
            },
            getHeight:function(){
                return gabFrame.hearderHeight;
            }
        };
        gabFrame.header.init();
    }
    return gabFrame.header
}
var count=1;
var menuData=[
    {id:count++,code:'data_search',name:'数据检索',children:[]},
    {id:count++,code:'data_backup',name:'数据备份',children:[
        {id:count++,code:'add_backup',name:'拍摄快照',children:[]},
        {id:count++,code:'manage_backup',name:'快照管理',children:[]},
        {id:count++,code:'setting_backup',name:'备份设置',children:[]}
    ]},
    {id:count++,code:'data_recovery',name:'数据恢复',children:[
        {id:count++,code:'backup_recovery',name:'快照恢复',children:[]},
        {id:count++,code:'timing_recovery',name:'定时恢复',children:[]}
    ]},
    {id:count++,code:'data_import',name:'数据导入',children:[]},
    {id:count++,code:'data_export',name:'数据导出',children:[]},
    {id:count++,code:'data_merge',name:'数据融合',children:[]},
    {id:count++,code:'data_edit',name:'数据编辑',children:[
        {id:count++,code:'target_edit',name:'目标编辑',children:[]},
        {id:count++,code:'dict_edit',name:'字典编辑',children:[]}
    ]},
    {id:count++,code:'settings',name:'设置',children:[]},
    {id:count++,code:'account_manage',name:'账号管理',children:[]}
];
var header={
    id:'frame_header',
    init:function($parent){
        var $nav=$('<nav class="navbar navbar-inverse" style="border:none;"></nav>');
        $parent.append($nav);
        var $container_fluid=$('<div class="container-fluid"></div>');
        $nav.append($container_fluid);

        var $container_header=$('<div class="navbar-header"></div>');
        $container_fluid.append($container_header);

        var $ICON_NAME=$('<div style="position:relative;display:inline-block;color:white;padding:0 20px 0 45px;height: 100%;line-height: '+(gabFrame.hearderHeight)+'px;font-size: 18px;">数据管理系统</div>');
        $container_header.append($ICON_NAME);
        var $frameIcon=$('<div style="width:'+(gabFrame.hearderHeight-8)+'px; height:'+(gabFrame.hearderHeight-8)+'px; border-radius:100%; overflow:hidden;position: absolute;top:4px;left:0px;"><img style="width:100%;height:100%;vertical-align:top;" src="imgs/big_data.jpg"/></div>');
        $ICON_NAME.append($frameIcon);

        var $menuBox=$('<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div>');
        $container_fluid.append($menuBox);

        var $menuUL=$('<ul class="nav navbar-nav"></ul>');
        $menuBox.append($menuUL);
        this.renderMenu(menuData,$menuUL);

        $menuBox.append($('<ul class="nav navbar-nav navbar-right">'+
            '    <li class="dropdown">'+
            '    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"></span>Admin<span class="caret"></span></a>'+
            '    <ul class="dropdown-menu">'+
            '    <li><a href="#"><span class="glyphicon glyphicon-lock"></span> 修改密码</a></li>'+
            '    <li><a href="#"><span class="glyphicon glyphicon-off"></span> 退出</a></li>'+
            '</ul>'));
        var $demoLink=$('<a href="https://pro.modao.cc/app/a9WiADVqvGcDDvV6WTnW5pRVynIjOBW" style="position: absolute;top: 15px;right: 115px;color: #FFF;" target="view_window">原型地址</a>');
        $parent.append($demoLink);
    },
    menuClick:function(a){
        if(!$(a).hasClass('dropdown')){
            gabFrame.viewPort.switchPanel(a.mdata);
        }
        $('li.active').removeClass('active');
        $(a).addClass('active');
    },
    renderMenu:function(menuDatas,$parent){
        if(menuDatas&&menuDatas.length){
            for(var i=0;i<menuDatas.length;i++){
                var menuData=menuDatas[i];
                if(menuData.children&&menuData.children.length){
                    var $menu=$('<li id="top_menu_'+menuData.id+'" class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">'+menuData.name+'<span class="caret"></span></a></li>');
                    $menu[0].mdata=menuData;
                    var $menuSubUL=$('<ul class="dropdown-menu"></ul>');
                    $menu.append($menuSubUL);
                    this.renderMenu(menuData.children,$menuSubUL);
                    $menu.click(function(){
                        header.menuClick(this);
                    });
                    $parent.append($menu);
                }else{
                    var $menu=$('<li id="top_menu_'+menuData.id+'" ><a href="#">'+menuData.name+'</a></li>');
                    $menu[0].mdata=menuData;
                    $menu.click(function(){
                        header.menuClick(this);
                    });
                    $parent.append($menu);
                }
            }
        }
    }
}