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


var header={
    id:'frame_header',
    init:function($parent){
        var $frameIcon=$('<img style="width:41px;height:45px;left:30px;top:12px;position: absolute;" src="../imgs/raw_1529567785.png"/>');
        $parent.append($frameIcon);
        $parent.append($('<H3 style="color:white;left:85px;top:0;position: absolute;">GAB信息采集分析系统</H3>'));


        $parent.append($('<ul style="float:right;height:100%;padding-left:10px;margin-bottom: 0;line-height:  '+(gabFrame.hearderHeight)+'px;"'+
            '    <li class="dropdown">'+
            '    <a style="line-height:  '+(gabFrame.hearderHeight)+'px;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><div style="display:inline-block;width:45px;line-height:45px;height:45px;border-radius: 100%;background-color: #FFF;color:#111020;text-align: center;font-size: 24px;margin:10px 10px 0 0;"><span class="glyphicon glyphicon-user"></span></div><span class="caret" style="border-width: 8px;border-top-color: #FFF;margin-right:15px;"></span></a>'+
            '    <ul class="dropdown-menu">'+
            '    <li><a href="#"><span class="glyphicon glyphicon-lock"></span> 修改密码</a></li>'+
            '    <li><a href="#"><span class="glyphicon glyphicon-off"></span> 退出</a></li>'+
            '</ul>'));

        $parent.append('<div style="font-size:15px;color:#FFF;float:right;margin:auto 0;height:100%;text-align: right;padding:'+(gabFrame.hearderHeight/2-20)+'px 0;">欢迎您<br>乌镇派出所</div>');

        // var $demoLink=$('<a href="https://pro.modao.cc/app/yJ5PPWLhT0ejlOl3IvMu9lvXv6pPZOY" style="position: absolute;top: 25px;right: 35px;color: #FFF;" target="view_window">原型地址</a>');
        // $parent.append($demoLink);
    }
}

