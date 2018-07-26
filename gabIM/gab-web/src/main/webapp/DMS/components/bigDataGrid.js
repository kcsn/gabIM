/**
 * Created by huren on 2018/7/25.
 */
gabFrame.bigDataGrid=function(options){
    var bigDataGrid_={
        //根容器
        $e:null,
        //请求部分说明：最终请求地址为【baseURL+pageCode+'-list'】
        //请求地址
        baseURL:null,
        //请求页面码
        pageCode:null,
        //是否显示行号
        showLineNumber:false,
        //行选择模式  单选 single【s】  多选 multi【m】
        rowSelectModel:s,
        //列选择模式
        colSelectModel:s,
        //可编辑
        editable:false,
        //头部菜单
        headTools:null,
        //行样式
        rowStyle:null,
        //过滤条件  自定义
        filter:{},
        //列配置
        columns:[],
        //列表数据
        data:[],
        //分页控制对象
        pagination:null,
        //分页信息
        pageOptions:{
            page:1,//当前页码
            total:0,//记录总数
            totalPage:0,//总页数
            pageSize:10
        },
        //查询框
        searchBox:null,
        title:{text:'表格标题',icon:'',format:''},
        showTitle:true
    }

    var bigDataGrid=$.extend(gabFrame.base_component(),bigDataGrid_,options||{});

    bigDataGrid.init=function(){
        if(!this.$e){
            this.$e=$('<div style="width:100%;height:auto;"></div>');
        }
        if(!this.$searchBox){
            this.$searchBox=$('<div style="width:100%;height:auto;"></div>');
            this.$e.append(this.$searchBox);
        }
        if(!this.$titleBar){
            this.$titleBar=$('<div style="width:100%;height:auto;"></div>');
            this.$e.append(this.$titleBar);
        }
        if(!this.$gridBox){
            this.$gridBox=$('<div style="width:100%;height:auto;"></div>');
            this.$e.append(this.$gridBox);
        }
        if(!this.$pageBox){
            this.$pageBox=$('<div style="width:100%;height:auto;"></div>');
            this.$e.append(this.$pageBox);
        }

        this.renderSearchBox();
        this.renderTitleBar();
        this.renderGrid();
        this.renderPageBar();
    }

    bigDataGrid.renderSearchBox=function(force){
        //强制重绘查询框
        force&&this.$searchBox.empty();
        if(this.searchBox){
            this.$searchBox.empty().append(this.searchBox);
            //DataControl 必须存在search方法;searchbox始终会调用this.dataControl.search();
            this.searchBox.setDataControl(this);
        }
    }


    bigDataGrid.renderTitleBar=function(force){
        force&&this.$titleBar.empty();
        if(this.showTitle){
            if(this.title&&this.title.format){
                this.$titleBar.html(this.title.format(this));
            }else{
                //default
            }
        }
    }

    bigDataGrid.renderGrid=function(force){
        force&&this.$gridBox.empty();
        //头部
        //数据
        this.$table=$();
        this.$THeader=$('<thead></thead>');
        this.$THeaderRow=$('<tr></tr>');
        this.$TBody=$('<tbody></tbody>');
        this.ths=[];
        for(var i=0;i<this.columns.length;i++){

        }
        //右键菜单
        this.$gridBox.append();

    }

    bigDataGrid.createTH_=function(config){
        var th={
            $e:null,
            config:config,
            showCheckBox:this.colSelectModel=='m',
            checked:false,
            onChecked:function(){

            },
            beforeChecked:function(){

            },
            afterChecked:function(){

            },
            //右键菜单
            context:null
        };

    }


    bigDataGrid.renderPageBar=function(force){
        force&&this.$titleBar.empty();
        if(this.showTitle){
            if(this.title&&this.title.format){
                this.$titleBar.html(this.title.format(this));
            }else{
                //default
            }
        }
    }





















    bigDataGrid.init();
    return bigDataGrid;
}




gabFrame.gridRow=function(options){
    var defaultOptions={

    }

    var gridRow=$.extend(gabFrame.base_component(),defaultOptions,options||{});

    gridRow.init=function(){

    }


























    gridRow.init();
    return gridRow;
}



gabFrame.gridCell=function(options){

    var defaultOptions={
        //根容器
        $e:null,
        //类型
        cellType:null,
        //是否只读
        readonly:true,
        //编辑器
        editor:null,
        //自定义显示
        format:null,
        //校验状态
        valid:true,
        //是否有改动
        hasChange:false,
        //
    }

    var gridCell=$.extend(gabFrame.base_component(),defaultOptions,options||{});

    gridCell.init=function(){

    }


























    gridCell.init();
    return gridCell;
}