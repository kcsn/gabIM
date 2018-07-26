/**
 * Created by huren on 2018/7/13.
 */
gabFrame.searchAndManageBar=function(options){
//默认设置

    var baseBarRender=function( searchAndManageBar){
        //默认的  按钮在左侧，搜索栏在右侧
        var $container=$('<div class="container" style="width:100%;"></div>');
        searchAndManageBar.$searchBox.append($container);
        var $row=$(' <div class="row" style="position: relative;"></div>');
        $container.append($row);
        var $leftCon=$('<div style="position: relative;width: 20%;float:left;"></div>');
        var $rightCon=$('<div style="position: relative;float:right;min-width:30%;max-width: 80%"></div>');
        $row.append($leftCon);
        $row.append($rightCon);
        if(searchAndManageBar.buttons&&searchAndManageBar.buttons.length){
            for(var i=0;i<searchAndManageBar.buttons.length;i++){
                $leftCon.append(createToolBarButton(searchAndManageBar.buttons[i]));
            }
        }

        if(searchAndManageBar.fields&&searchAndManageBar.fields.length){
            for(var i=0;i<searchAndManageBar.fields.length;i++){
                $rightCon.append(createSearchInput(searchAndManageBar.fields[i]));
            }
            // $rightCon.append($('<div class="col-sm-2" style="width:100px;"><div class="form-group"><button type="button" class="btn btn-success"  id="btn-clear-search"><span class="glyphicon glyphicon-search"></span>查询</button></div></div>'));
            var $div1 = $('<div class="col-sm-2" style="width:100px;"></div>');
            var $div2 = $('<div class="form-group"></div>');
            var $button = $('<button type="button" class="btn btn-success"  id="btn-clear-search"><span class="glyphicon glyphicon-search"></span>查询</button>');
            $div1.append($div2);
            $div2.append($button);
            $rightCon.append($div1);
           //搜索按钮点击事件
            $button.click(function () {
                searchAndManageBar.grid.load();
            });
        }




        // var $col1=$(' <div class="col-sm-6"  style="width:80px;"><div class="form-group"><button type="button" class="btn btn-success" id="btn-search">Search</button></div></div>');
        // $leftCon.append($col1);
        //
        //
        // var $groupBox=$('<div  class="col-sm-4" style="width:400px;"></div>');
        // $rightCon.append($groupBox);
        // var $col2=$(' <div class="col-sm-5"><div class="form-group"><label for="input-search" class="control-label" style="line-height: 34px;width: 100%;text-align: right;">Search Tree:</label></div></div>');
        // $groupBox.append($col2);
        // var $col3=$(' <div class="col-sm-7"><div class="form-group"><input type="input" class="form-control" id="input-search" placeholder="Type to search..." value=""/></div></div>');
        // $groupBox.append($col3);


        // this.$treeBox=$('<div id="'+leftMenu.id+'" style="margin-left:0;"></div>');
    };
    var searchAndManageBar_={
        $e:null,
        grid:null,
        testTag:'search',
        id_pre:'s_i_',
        padding:'15px',
        barRender:baseBarRender,
        paramMap:{},
        fields:[],//{name:'name',type:'text',selfformat:'',value:'',icon:'',label:'名称',visable:true,hint:''}
        buttons:[],//{icon:'',text:'',caller:''},
        //是否重新获取输入框的值
        getParams:function(reDo){
            if(reDo){
            	this.paramMap={};
                var $inputs=this.$e.find('input');
                for(var i=0;i<$inputs.length;i++){
                	var value=$($inputs[i]).val();
                	if(value!==''){
                		this.paramMap[$inputs[i].name]=$($inputs[i]).val();
                	}
                }
            }
            return this.paramMap;
        }
    };

    //用户自定义设置应用
    var searchAndManageBar=$.extend(gabFrame.base_component(),searchAndManageBar_, options||{});
    searchAndManageBar.init=function() {
        if(!searchAndManageBar.$e){
            searchAndManageBar.$e=$('<div style="width:100%;height:auto;"></div>');
        }
        if(!searchAndManageBar.$searchBox){
            searchAndManageBar.$searchBox = $('<div style="width:100%;padding:'+searchAndManageBar.padding+';"></div>');
            searchAndManageBar.$e.append(searchAndManageBar.$searchBox);
        }
        searchAndManageBar.barRender(searchAndManageBar);
    }
    searchAndManageBar.selfClear=function(){

    };

    function createToolBarButton(option){
        var $button_=$('<button type="button" class="btn btn-primary" id="btn-search"><span class="'+option.icon+'"></span>'+option.text+'</button>');
        $button_.click(function(){
            option.caller(searchAndManageBar);
        });
        var $sub_=$('<div class="form-group"></div>');
        var $box_=$(' <div class="col-sm-6"  style="width:80px;"></div>');
        $sub_.append($button_);
        $box_.append($sub_);
        return $box_;
    }

    function createSearchInput(option){
        // {name:'name',type:'text',selfformat:'',value:'',icon:'',label:'名称',visable:true,hint:''}
        var $groupBox=$('<div  class="col-sm-4" style="width:350px;"></div>');
        var $col2=$(' <div class="col-sm-5"><div class="form-group"><label for="input-search" class="control-label" style="line-height: 34px;width: 100%;text-align: right;">'+option.label+':</label></div></div>');
        $groupBox.append($col2);
        var $col3=$(' <div class="col-sm-7"><div class="form-group"><input type="'+option.type+'" class="form-control" name="'+option.name+'" id="'+searchAndManageBar.id_pre+option.name+'" placeholder="'+option.hint+'" value="'+option.value+'"/></div></div>');
        $groupBox.append($col3);
        if(option.visable===false){
            $groupBox.hide();
        }
        return $groupBox;
    }
    searchAndManageBar.init();
    return searchAndManageBar;
}

