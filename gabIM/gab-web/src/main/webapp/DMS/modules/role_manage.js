/**
 * Created by wunai on 2018/7/15.
 */
gabFrame.role_manage=function(options){
    var role_manage=$.extend(gabFrame.base_component(),{testTag:'viewAccount'}, options||{});
    role_manage.init=function(){
        role_manage.$e=$('<div style="width:100%;height:auto;"></div>');
        var columns=[
            {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'text',selfformformat:'',readonly:true},
            {text:'角色码',value:'itemid',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'角色编码',value:'itemcode',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'角色名称',value:'itemname',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'角色原售价',value:'reprice',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'角色单位',value:'unit',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
        ];
        var options={
            url:null,
            pageOptions:{
                page:1,//当前页码
                total:0,//记录总数
                totalPage:10,//总页数
                pageSize:10
            },
            columns:columns,
            oprate:
            {head:"操作",col:[
                {text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>详情</button>'},coldata:['id']},
                {text:function(){return '<button type="button" onclick="gotoAssist(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>车位列表</button>'},coldata:['id']}
            ]},
            showLineNum:true,
            searchOptions:{
                visable:true,
                className:'searchAndManageBar',
                options:{
                    fields:[{name:'name',type:'text',selfformat:'',value:'',label:'名称',visable:true,hint:'test'},
                        {name:'address',type:'number',selfformat:'',value:'',label:'地址',visable:true,hint:'test'}],
                    buttons:[{icon:'glyphicon glyphicon-plus',text:'新增',caller:function(a){
                        gabFrame.formWin.show('新增账号',role_manage.form.$e);
                        role_manage.form.load();
                    }}]
                }

            },
            listData:[{id:1,itemid:'test1',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:2,itemid:'test2',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:3,itemid:'test3',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:4,itemid:'test4',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:5,itemid:'test5',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:6,itemid:'test6',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'}],//列表数据
        };
        // role_manage.grid=new gabFrame.grid(options);
        // role_manage.children.push(role_manage.grid);
        // role_manage.form=new gabFrame.form({columns:columns});
        // role_manage.children.push(role_manage.form);
        // role_manage.$e.append(role_manage.grid.$e);

        role_manage.addControl(role_manage.$e,new gabFrame.grid(options),'grid');
        role_manage.addControl(null,new gabFrame.form({columns:columns}),'form');
    }
    role_manage.selfClear=function(){
    };
    role_manage.init();
    return role_manage;
}