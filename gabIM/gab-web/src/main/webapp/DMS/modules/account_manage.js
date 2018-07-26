/**
 * Created by wunai on 2018/7/14.
 */
gabFrame.account_manage=function(options){
    var account_manage=$.extend(gabFrame.base_component(),{testTag:'viewAccount'}, options||{});
    account_manage.init=function(){
        account_manage.$e=$('<div style="width:100%;height:auto;"></div>');
        var columns=[
            {text:'ID',value:'id',listvisable:false,position:'left',selflistformat:'',formvisable:false,formtype:'hidden',selfformformat:'',readonly:true},
            {text:'派出所名称',value:'name',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'LOCATION',value:'locationId',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'详细地址',value:'address',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'所长名称',value:'headerName',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false},
            {text:'所长电话',value:'headerPhone',listvisable:true,position:'left',selflistformat:'',formvisable:true,formtype:'text',selfformformat:'',readonly:false}
        ];
        var options={
            url:BASE_HOST+SERVER_NAME+'/api/police/police-list-page',
            pageOptions:{
                page:1,//当前页码
                total:0,//记录总数
                totalPage:10,//总页数
                pageSize:2
            },
            columns:columns,
            pageCode:'police',
            oprate:
            {head:"操作",col:[
                {text:function(){return '<button type="button" onclick="operate(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-info-sign"></span>修改</button>'},coldata:['id']},
                {text:function(){return '<button type="button" onclick="gotoAssist(\'{-1}\',\'{0}\')" class="btn btn-link"><span class="glyphicon glyphicon-list-alt"></span>删除</button>'},coldata:['id']}
            ]},
            showLineNum:true,
            searchOptions:{
                visable:true,
                className:'searchAndManageBar',
                options:{
                    fields:[{name:'name',type:'text',selfformat:'',value:'',label:'名称',visable:true,hint:'test'}],
                    buttons:[{icon:'glyphicon glyphicon-plus',text:'新增',caller:function(a){
                        gabFrame.formWin.show('新增账号',account_manage.form.$e);
                        account_manage.form.load();
                    }}]
                }

            },
            listData:[{id:1,itemid:'test1',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:2,itemid:'test2',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:3,itemid:'test3',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:4,itemid:'test4',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:5,itemid:'test5',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'},
                {id:6,itemid:'test6',itemcode:'55433323',itemname:'啊啊啊啊',reprice:88.9,unit:'盒'}]//列表数据
        };
        // account_manage.grid=new gabFrame.grid(options);
        // account_manage.children.push(account_manage.grid);
        // account_manage.$e.append(account_manage.grid.$e);
        account_manage.addControl(account_manage.$e,new gabFrame.grid(options),'grid');
        account_manage.addControl(null,new gabFrame.form({columns:columns}),'form');
        // account_manage.form=new gabFrame.form({columns:columns});
        // account_manage.children.push(account_manage.form);
        account_manage.grid.load();

    }
    account_manage.selfClear=function(){
    };
    account_manage.init();
    return account_manage;
}