/**
 * Created by wunai on 2018/7/13.
 */
function trueValue(obj,column,value){
    var casca=column.split(".");
    var target=obj;//对象
    var attr=casca[0];//属性
    if(casca.length>1){//不存在级别
        for(var ci=0;ci<casca.length-1;ci++){
            target=target[casca[ci]];
            if(!target){
                break;
            }
        }
        if(target){
            attr=casca[casca.length-1];
        }
    }
    if(arguments.length==3){
        target[attr]=value;
    }else{
        return (target&&target[attr])||"";

    }
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var timeFormatShort="yyyy-MM-dd";
var timeFormat = "yyyy-MM-dd hh:mm:ss";



//confirm
function initAlert() {
    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
    var alr = $("#ycf-alert");
    var ahtml = alr.html();

    //关闭时恢复 modal html 原样，供下次调用时 replace 用
    //var _init = function () {
    //	alr.on("hidden.bs.modal", function (e) {
    //		$(this).html(ahtml);
    //	});
    //}();

    /* html 复原不在 _init() 里面做了，重复调用时会有问题，直接在 _alert/_confirm 里面做 */


    var _alert = function (options) {
        alr.html(ahtml);	// 复原
        alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
        alr.find('.cancel').hide();
        _dialog(options);

        return {
            on: function (callback) {
                if (callback && callback instanceof Function) {
                    alr.find('.ok').click(function () { callback(true) });
                }
            }
        };
    };

    var _confirm = function (options) {
        alr.html(ahtml); // 复原
        alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
        alr.find('.cancel').show();
        _dialog(options);

        return {
            on: function (callback) {
                if (callback && callback instanceof Function) {
                    alr.find('.ok').click(function () { callback(true) });
                    alr.find('.cancel').click(function () { callback(false) });
                }
            }
        };
    };

    var _dialog = function (options) {
        var ops = {
            msg: "提示内容",
            title: "操作提示",
            btnok: "确定",
            btncl: "取消"
        };

        $.extend(ops, options);

        console.log(alr);

        var html = alr.html().replace(reg, function (node, key) {
            return {
                Title: ops.title,
                Message: ops.msg,
                BtnOk: ops.btnok,
                BtnCancel: ops.btncl
            }[key];
        });

        alr.html(html);
        alr.modal({
            width: 500,
            backdrop: 'static'
        });
    }

    window.Modal =  {
        alert: _alert,
        confirm: _confirm
    }

};


function initFormWindow() {
    gabFrame.formWin={
        onClose:function(){},
        onSubmit:function(){}
    };
    // gabFrame.formWin.win = $("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" style=\"display: none;\">\n" +
    //     "        <div id=\"win_port\" class=\"modal-dialog modal-sm\" style=\"width:600px;\">\n" +
    //     "            <div class=\"modal-content\">\n" +
    //     "                <div class=\"modal-header\">\n" +
    //     "                    <button type=\"button\" class=\"close form-close-btn\">×</button>\n" +
    //     "                    <h3 id=\"myModalLabel\" contenteditable=\"false\">标题栏</h3>\n" +
    //     "                </div>\n" +
    //     "                <div class=\"modal-body\">\n" +
    //     "                </div>\n" +
    //     "                <div class=\"modal-footer\" style=\"text-align: center;\">\n" +
    //     "                    <button class=\"btn form-close-btn\" >取消</button>\n" +
    //     "                    <button id=\"form-submit-btn\" class=\"btn btn-primary\" contenteditable=\"false\">保存设置</button>\n" +
    //     "                </div>\n" +
    //     "            </div>\n" +
    //     "        </div>\n" +
    //     "    </div>");
    gabFrame.formWin.win = $('#modal-form');
    gabFrame.formWin.header=gabFrame.formWin.win.find("#myModalLabel");
    gabFrame.formWin.body=gabFrame.formWin.win.find(".modal-body");
    gabFrame.formWin.submitBtn=gabFrame.formWin.win.find("#form-submit-btn");
    gabFrame.formWin.colseBtn=gabFrame.formWin.win.find(".form-close-btn");
    gabFrame.formWin.colseBtn.click(function(){
        var colseEvt={
            cancle:false
        };
        try{
            gabFrame.formWin.onClose(colseEvt);
        }catch (e){}
        if(!colseEvt.cancle){
            gabFrame.formWin.win.modal('hide');
        }
    });
    gabFrame.formWin.submitBtn.click(function(){
        var submitEvt={
            cancle:true
        };
        try{
            gabFrame.formWin.onSubmit(submitEvt);
        }catch (e){}
        if(!submitEvt.cancle){
            gabFrame.formWin.win.modal('hide');
        }
    });
    gabFrame.formWin.show=function(title,view){
        gabFrame.formWin.header.html(title);
        gabFrame.formWin.body.empty().append(view);
        gabFrame.formWin.win.modal({
            width: 900,
            backdrop: 'static'
        });
    };
};
// function initFormWindow() {
//     gabFrame.formWin={
//         onClose:function(){},
//         onSubmit:function(){}
//     };
//     gabFrame.formWin.win = $("#modal-form");
//     gabFrame.formWin.header=gabFrame.formWin.win.find("#myModalLabel");
//     gabFrame.formWin.body=gabFrame.formWin.win.find(".modal-body");
//     gabFrame.formWin.submitBtn=gabFrame.formWin.win.find("#form-submit-btn");
//     gabFrame.formWin.colseBtn=gabFrame.formWin.win.find(".form-close-btn");
//     gabFrame.formWin.colseBtn.click(function(){
//         var colseEvt={
//             cancle:false
//         };
//         try{
//             gabFrame.formWin.onClose(colseEvt);
//         }catch (e){}
//         if(!colseEvt.cancle){
//             gabFrame.formWin.win.modal('hide');
//         }
//     });
//     gabFrame.formWin.submitBtn.click(function(){
//         var submitEvt={
//             cancle:true
//         };
//         try{
//             gabFrame.formWin.onSubmit(submitEvt);
//         }catch (e){}
//         if(!submitEvt.cancle){
//             gabFrame.formWin.win.modal('hide');
//         }
//     });
//     gabFrame.formWin.show=function(title,view){
//         gabFrame.formWin.header.html(title);
//         gabFrame.formWin.body.empty().append(view);
//         gabFrame.formWin.win.modal({
//             width: 900,
//             backdrop: 'static'
//         });
//     };
// };







initAlert();
initFormWindow();


