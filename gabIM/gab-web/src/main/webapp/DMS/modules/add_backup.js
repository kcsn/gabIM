/**
 * Created by wunai on 2018/7/15.
 */
gabFrame.add_backup=function(options){
    var add_backup=$.extend(gabFrame.base_component(),{testTag:'viewAccount'}, options||{});
    add_backup.init=function(){
        add_backup.$e=$('<div style="width:70%;min-width:1000px;margin:auto;height:auto;text-align:center;"></div>');
        var $ul=$('<ul class="nav nav-pills" style="display:inline-block;text-align:center;"></ul>');
        var $li1=$('<li role="presentation"><a href="#" style="background-color:transparent;padding:10px 0;margin:0 15px;font-size: 16px;color:rgb(153, 153, 153);border-radius: 0;border-bottom: 2px solid transparent;">库检索</a></li>');
        var $li2=$('<li role="presentation"><a href="#" style="background-color:transparent;padding:10px 0;margin:0 15px;font-size: 16px;color:rgb(153, 153, 153);border-radius: 0;border-bottom: 2px solid transparent;">全文检索</a></li>');
        $ul.append($li1);
        $ul.append($li2);
        $ul.children().click(function(){
            $ul.children('.active1').removeClass('active1').children('a').css({color:'rgb(153, 153, 153)','border-color':'transparent'});
            $(this).addClass('active1').children('a').css({color:'#449d44','border-color':'#449d44'});
        });
        add_backup.$e.append($ul);
        add_backup.$e.append('<div class="col-lg-12">'+
            '<div class="input-group">'+
            '<input type="text" class="form-control" placeholder="输入检索条件...">'+
            '<span class="input-group-btn">'+
            '<button id="data_search_btn" class="btn btn-success" type="button"><span class="glyphicon glyphicon-search"></span> 检索</button>'+
            ' </span>'+
            ' </div><!-- /input-group -->'+
            '</div>');

        var $row_filter=$('<div class="col-sm-12" style="margin-top:15px;"></div>');
        add_backup.$e.append($row_filter);
        // var $filter_label=$('<div class="col-sm-1" style="padding-left:0;padding-top:5px;text-align: left;color:rgb(153, 153, 153);"><span>筛选：</span></div>');
        // var $filter_items=$('<div class="col-sm-11"></div>');
        var $filter_label=$('<div class="col-sm-1" style="position:absolute;left:16px;width:60px;top:0;padding-left:0;padding-top:4px;text-align: left;color:rgb(153, 153, 153);"><span>筛选：</span></div>');
        var $filter_items=$('<div style="padding-left:20px;"></div>');
        $filter_items.append($filter_label);
        $row_filter.append($filter_items);
        var $filter_ul=$('<ul class="inline" style="text-align: left;"></ul> ');
        $filter_ul.html('<li class="tag">新闻资讯</li>'+
            '<li class="tag">体育竞技</li>'+
            '<li class="tag">娱乐八卦</li>'+
            '<li class="tag">前沿科技</li>'+
            ' <li class="tag">环球财经</li>'+
            '<li class="tag">天气预报</li>'+
            '<li class="tag">房产家居</li>'+
            '<li class="tag">网络游戏</li>'+
            '<li class="tag">新闻资讯</li>'+
            '<li class="tag">体育竞技</li>'+
            '<li class="tag">娱乐八卦</li>'+
            '<li class="tag">前沿科技</li>'+
            ' <li class="tag">环球财经</li>'+
            '<li class="tag">天气预报</li>'+
            '<li class="tag">房产家居</li>'+
            '<li class="tag selected">网络游戏</li><li style="border-color:#999;padding: 1px 4px 1px 3px; "><span class="caret" style="font-size: 20px;border-width: 6px;"></span></li>');
        $filter_items.append($filter_ul);
        $filter_ul.children('li.tag').click(function(){
            $filter_ul.find('.selected').removeClass('selected');
            var $this=$(this);
            // if($this.hasClass('selected')){
            //     $this.removeClass('selected');
            // }else{
                $this.addClass('selected');
            // }
        });

        var $searchResultHeader=$('<div class="col-sm-12" style="text-align: left;"><h3>检查结果</h3><p style="color:rgb(153, 153, 153);">3条记录，你可以直接进行数据编辑</pstyle></div>');
        add_backup.$e.append($searchResultHeader);


        // <div class="panel-header" style="width: 700px;/* line-height:25px; */height: 40px;"><div class="panel-title panel-with-icon">Cell Editing in DataGrid</div><div class="panel-icon icon-edit"></div><div class="panel-tool" style="
        // height: auto;
        // top: 34%;
        // "><button class="btn btn-success btn-xs" type="button" style="line-height: 23px;"><span class="glyphicon glyphicon-log-out"></span> 测试</button>
        // </div></div>


        var $datagridBox=$('<div class="col-sm-12"></div>');
        var $datagridBoxSub_=$('<div></div>');
        var $dataGrid=$('<table id="dg" class="easyui-datagrid" title="Cell Editing in DataGrid" style="width:1000px;height:auto"'+
            ' data-options="'+
            ' iconCls: \'icon-large-smartart\','+
            '  singleSelect: true'+
            // '  ,fitColumns:true'+
            // '  url: \'datagrid_data1.json\','+
            // '  method:\'get\''+
            '  ">'+
            ' <thead>'+
            ' <tr>'+
            '  <th data-options="field:\'itemid\',width:80">Item ID</th>'+
            '  <th data-options="field:\'productid\',width:100,editor:\'text\'">Product</th>'+
            '      <th data-options="field:\'listprice\',width:80,align:\'right\',editor:{type:\'numberbox\',options:{precision:1}}">List Price</th>'+
            '  <th data-options="field:\'unitcost\',width:80,align:\'right\',editor:\'numberbox\'">Unit Cost</th>'+
            '   <th data-options="field:\'attr1\',width:250,editor:\'text\'">Attribute</th>'+
            '      <th data-options="field:\'status\',width:460,align:\'center\',editor:{type:\'checkbox\',options:{on:\'P\',off:\'\'}}">Status</th>'+
            '      </tr>'+
            '      </thead>'+
            '     </table>');
        $datagridBoxSub_.append($dataGrid);
        $datagridBox.append($datagridBoxSub_);

        add_backup.$e.append($datagridBox);

        var $main=$('<div id="main" data-toggle="context">This is an area where the context menu is active <span style="background-color: #cecece">However, we wont allow it here.</span> But anywhere else in this text should be perfectly fine. This one is started with only javascript</div>')
        add_backup.$e.append($main);
        var $context=$('<div id="context-menu2">\n' +
            '          <ul class="dropdown-menu" role="menu">\n' +
            '              <li><a tabindex="-1">Action</a></li>\n' +
            '              <li><a tabindex="-1">Another action</a></li>\n' +
            '              <li><a tabindex="-1">Something else here</a></li>\n' +
            '              <li class="divider"></li>\n' +
            '              <li><a tabindex="-1">Separated link</a></li>\n' +
            '          </ul>\n' +
            '        </div>');
        add_backup.$e.append($context);
        $main.contextmenu({
            target: '#context-menu2',
            before: function (e) {
                // This function is optional.
                // Here we use it to stop the event if the user clicks a span
                e.preventDefault();
                if (e.target.tagName == 'SPAN') {
                    e.preventDefault();
                    this.closemenu();
                    return false;
                }
                this.getMenu().find("li").eq(2).find('a').html("This was dynamically changed"+new Date().getSeconds());
                return true;
            },
            onItem: function (context, e) {
                alert($(e.target).text());
            }
        });

        $context.on('show.bs.context', function (e) {
            console.log('before show event');
        });
        $context.on('shown.bs.context', function (e) {
            console.log('after show event');
        });

        $context.on('hide.bs.context', function (e) {
            console.log('before hide event');
        });

        $context.on('hidden.bs.context', function (e) {
            console.log('after hide event');
        });
        $.extend($.fn.datagrid.methods, {
            editCell: function(jq,param){
                return jq.each(function(){
                    var opts = $(this).datagrid('options');
                    var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
                    for(var i=0; i<fields.length; i++){
                        var col = $(this).datagrid('getColumnOption', fields[i]);
                        col.editor1 = col.editor;
                        if (fields[i] != param.field){
                            col.editor = null;
                        }
                    }
                    $(this).datagrid('beginEdit', param.index);
                    var ed = $(this).datagrid('getEditor', param);
                    if (ed){
                        if ($(ed.target).hasClass('textbox-f')){
                            $(ed.target).textbox('textbox').focus();
                        } else {
                            $(ed.target).focus();
                        }
                    }
                    for(var i=0; i<fields.length; i++){
                        var col = $(this).datagrid('getColumnOption', fields[i]);
                        col.editor = col.editor1;
                    }
                });
            },
            enableCellEditing: function(jq){
                return jq.each(function(){
                    var dg = $(this);
                    var opts = dg.datagrid('options');
                    opts.oldOnClickCell = opts.onClickCell;
                    opts.onClickCell = function(index, field){
                        if (opts.editIndex != undefined){
                            if (dg.datagrid('validateRow', opts.editIndex)){
                                dg.datagrid('endEdit', opts.editIndex);
                                opts.editIndex = undefined;
                            } else {
                                return;
                            }
                        }
                        dg.datagrid('selectRow', index).datagrid('editCell', {
                            index: index,
                            field: field
                        });
                        opts.editIndex = index;
                        opts.oldOnClickCell.call(this, index, field);
                    }
                });
            }
        });
        var data_={"total":28,"rows":[
            {"productid":"FI-SW-01","productname":"Koi","unitcost":10.00,"status":"P","listprice":36.50,"attr1":"Large","itemid":"EST-1"},
            {"productid":"K9-DL-01","productname":"Dalmation","unitcost":12.00,"status":"P","listprice":18.50,"attr1":"Spotted Adult Female","itemid":"EST-10"},
            {"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":38.50,"attr1":"Venomless","itemid":"EST-11"},
            {"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":26.50,"attr1":"Rattleless","itemid":"EST-12"},
            {"productid":"RP-LI-02","productname":"Iguana","unitcost":12.00,"status":"P","listprice":35.50,"attr1":"Green Adult","itemid":"EST-13"},
            {"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":158.50,"attr1":"Tailless","itemid":"EST-14"},
            {"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":83.50,"attr1":"With tail","itemid":"EST-15"},
            {"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":23.50,"attr1":"Adult Female","itemid":"EST-16"},
            {"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":89.50,"attr1":"Adult Male","itemid":"EST-17"},
            {"productid":"AV-CB-01","productname":"Amazon Parrot","unitcost":92.00,"status":"P","listprice":63.50,"attr1":"Adult Male","itemid":"EST-18"}
        ]};

        // $dataGrid.datagrid('loadData', data_);
        $dataGrid.datagrid().datagrid('enableCellEditing');
        // var $testEasyuiBtn=$('<button class="btn btn-success" type="button"><span class="glyphicon glyphicon-search"></span> 测试</button>');
        // add_backup.$e.append($testEasyuiBtn);
        // $testEasyuiBtn.click(function(){
        //     $dataGrid.datagrid('loadData', data_);
        //     $datagridBox.find('.panel-header').html('<div class="panel-title panel-with-icon">Cell Editing in DataGrid</div><div class="panel-icon icon-edit"></div><div class="panel-tool" style="\n' +
        //         '             height: auto;\n' +
        //         '             top: 34%;\n' +
        //         '             "><button class="btn btn-success btn-xs" type="button" style="line-height: 23px;"><span class="glyphicon glyphicon-log-out"></span> 测试</button>\n' +
        //         '             </div>');
        // });

        $datagridBoxSub_.find('.panel-header').html('<div class="panel-title panel-with-icon" style="line-height:28px;">标签测试</div><div class="panel-icon " style="margin-top:-10px;"><span class="glyphicon glyphicon-th-list" style="color:#5cb85c;"></span></div><div class="panel-tool" style="\n' +
            '             height: auto;\n' +
            '             top: 34%;\n' +
            '             "><button class="btn btn-success btn-xs" type="button" style="line-height: 23px;"><span class="glyphicon glyphicon-log-out"></span> 导出</button>\n' +
            '             </div>').height(40);



        this.$e.find('#data_search_btn').click(function(){
            $dataGrid.datagrid('loadData', data_);
            $dataGrid.datagrid('fitColumns',true);
            // $datagridBox.find('.panel-header').html('<div class="panel-title panel-with-icon" style="line-height:23px;">标签测试</div><div class="panel-icon "><span class="glyphicon glyphicon-th-list" style="color:#5cb85c;"></span></div><div class="panel-tool" style="\n' +
            //     '             height: auto;\n' +
            //     '             top: 34%;\n' +
            //     '             "><button class="btn btn-success btn-xs" type="button" style="line-height: 23px;"><span class="glyphicon glyphicon-log-out"></span> 导出</button>\n' +
            //     '             </div>');
        });
    }
    add_backup.selfClear=function(){
    };
    add_backup.init();
    return add_backup;
}