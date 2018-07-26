function login() {
    if (validate()){
    var name = $("input[name='name']").val();
    var pwd = $("input[name='password']").val();
    if (name == "" || name == null || name == undefined) {
        alert("请输入用户名");
        return false;/*阻止表单提交*/
    } else if (pwd == "" || pwd == null || pwd == undefined) {
        alert("请输入密码");
        return false;/*阻止表单提交*/
    } else {
        $.ajax({
            async : false,
            cache : false,
            type : "get",
            dataType : 'json',
            url : "../api/police/login?name="+name+"&password="+pwd,// 请求的action路径
            data : {
                name : $("#name").val(),
                password : $("#password").val()
            },
            success : function(data) { // 请求成功后处理函数。
                var success = data.success;
                if (success == true) {
                    document.write(data.msg);
                    window.location.href="http://localhost:8080/gabIM/gab/index.html";
                } else {// 后台异常处理
                    document.write(data.msg);
                }
            },
            error : function() {// 请求失败处理函数
                alert('网络异常，请稍后重试');
            }

        });
        return true;
    }
    }
}