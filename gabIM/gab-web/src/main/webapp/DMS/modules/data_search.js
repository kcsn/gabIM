/**
 * Created by wunai on 2018/7/15.
 */
gabFrame.data_search=function(options){
    var data_search=$.extend(gabFrame.base_component(),{testTag:'viewAccount'}, options||{});
    data_search.init=function(){
        data_search.$e=$('<div style="width:100%;height:auto;"></div>');
        data_search.addControl(data_search.$e,new gabFrame.popUp_form(null),'popForm');
    }
    data_search.selfClear=function(){
    };
    data_search.init();
    return data_search;
}