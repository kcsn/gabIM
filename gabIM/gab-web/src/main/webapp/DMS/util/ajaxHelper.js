/**
 * Created by wunai on 2018/7/12.
 */
BASE_HOST=window.location.protocol+"//"+window.location.host;//服务地址
//SERVER_NAME="/POSServer";
var pathName=window.document.location.pathname;
SERVER_NAME=pathName.substring(0,pathName.substr(1).indexOf('/')+1);

LOGIN_PATH=BASE_HOST+SERVER_NAME+"/api/admin/login";
LOGOUT_PATH=BASE_HOST+SERVER_NAME+"/api/admin/logout";



var tipsT=null;
var tipsWinHideTime=4000;//tip框消失时间设置
function showTips(msg,hide){
    if(tipsT){
        clearTimeout(tipsT);
        tipsT=null;
    }
    $('.sidebar').addClass('sidebar_loading');
    $('#win_tips').html(msg);
    $(".alert").show();
    if(hide){
        tipsT=setTimeout('hdieTips()', tipsWinHideTime);
    }
}

function hdieTips(){
    $(".alert").hide();
}

//请求
//地址     回调函数   参数  加载主题  不同步(false)    缓存(false)    返回结果格式(json)    请求方式(post)
function sendRequest(url,caller,data,title,Nasync,cache,dataType,type,errorCaller){
    if(title){
        showTips("正在"+(title||"")+"，请稍候……");
    }
    return $.ajax({
        async:!Nasync,cache:!!cache,type:type||"post",dataType:dataType||"json",data:data||null,
        url:url,
        timeout:20*1000,
//		contentType:"application/x-www-form-urlencoded",
        success:function(msg){
            if(title){
                if(msg&&msg.httpCode===200){
                    //成功
                    showTips((title||"")+"成功！",true);
                }else{
                    //失败
//					showTips((title||"")+"失败！");
                    var errorstr="";
                    if(msg){
                    	//未登录处理
                        if(msg.httpCode==99){
                            window.location.href=BASE_HOST+SERVER_NAME+"/resources/bhgadmin/login.html";
                        }
                        errorstr=msg.errorDescription||'';
                    }
                    showTips((title||"")+"失败！"+errorstr,true);
                }
                // $('.sidebar').removeClass('sidebar_loading');
                // tipsT=setTimeout('hdieTips()', tipsWinHideTime);
            }
            if(caller){
                caller(msg);
            }
        },
        error:function(){
            if(title){
                showTips((title||"")+"失败！请重试",true);
                // $('.sidebar').removeClass('sidebar_loading');
                // tipsT=setTimeout('hdieTips()', tipsWinHideTime);
            }
            if(errorCaller){
                errorCaller();
            }
        }
    });
}
