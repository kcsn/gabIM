/**
 * Created by huren on 2018/7/12.
 */

//创左侧菜单栏
gabFrame.createLeftMenu=function(){
    if(!gabFrame.leftMenu){
        gabFrame.leftMenu={
            $leftMenu:null,
            init:function(){
                this.$leftMenu=$('<div id="'+gabFrame.leftMenuConfig.id+'"></div>');
                this.$leftMenu.css(gabFrame.leftMenuConfig.css);
                gabFrame.gabFrame.$gabFrame.append(this.$leftMenu);
                leftMenu.init(this.$leftMenu);
            }
        };
        gabFrame.leftMenu.init();
    }
    return gabFrame.leftMenu
}

var defaultData = [
    {
        id:'sys_manage',
        text: '系统管理',
        href: '#parent1',
        tags: ['4'],
        selectable:false,
        icon: 'glyphicon glyphicon-asterisk',
        nodes: [
            {
                id:'account_manage',
                text: '账号管理',
                href: '#child1',
                tags: ['2'],
                icon: '',
                selectedColor: "yellow",
                backColor:'rgb(0, 26, 87)'
            },
            {
                id:'role_manage',
                text: '角色管理',
                href: '#child2',
                tags: ['0'],
                icon: '',
                selectedColor: "yellow",
                backColor:'rgb(0, 26, 87)'
            }
        ]
    },
    {
        id:'info_report',
        text: '信息采集分析',
        href: '#parent2',
        tags: ['0'],
        icon: 'glyphicon glyphicon-stats'
    },
    {
        id:'info_fill',
        text: '信息填报',
        href: '#parent3',
        tags: ['0'],
        icon: 'glyphicon glyphicon-list',
        selectable:false,
        nodes: [
            {
                id:'info_fill_form',
                text: '信息填报',
                href: '#child1',
                tags: ['2'],
                icon: '',
                selectedColor: "yellow",
                backColor:'rgb(0, 26, 87)'
            },
            {
                id:'info_fill_view',
                text: '填报状态查看',
                href: '#child2',
                tags: ['0'],
                icon: '',
                selectedColor: "yellow",
                backColor:'rgb(0, 26, 87)'
            }
        ]
    },
    {
        id:'message_panel',
        text: '问题留言板',
        href: '#parent4',
        tags: ['0'],
        icon: 'glyphicon glyphicon-envelope'
    }
];
var leftMenu={
    id:'left_menu_box',
    init:function($parent){
        var $container=$('<div class="container" style="width:'+(gabFrame.leftMenuWidth+30)+'px;margin-left:-15px;font-size:14px;"></div>');
        $parent.append($container);
        var $row=$(' <div class="row"></div>');
        var $col=$(' <div class="col-sm-12"></div>');
        this.$treeBox=$('<div id="'+leftMenu.id+'" style="margin-left:0;"></div>');
        $container.append($row);
        $row.append($col);
        $col.append(this.$treeBox);
        $('#'+leftMenu.id).treeview({
            expandIcon: 'glyphicon glyphicon-chevron-right',
            collapseIcon: 'glyphicon glyphicon-chevron-down',
            // nodeIcon: "glyphicon glyphicon-user",
            color: "white",
            backColor: "rgb(3, 33, 99)",
            onhoverColor: "orange !important",
            borderColor: "red",
            showBorder: false,
            showTags: false,
            highlightSelected: true,
            selectedColor: "yellow",
            selectedBackColor: "rgb(190, 2, 1)",
            data: defaultData,
            onNodeSelected: function (event, data) {
                if(data.nodes){
                    return;
                }
                data.code=data.id;
                gabFrame.viewPort.switchPanel(data);
            }
        });
    }
}