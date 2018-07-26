function regist() {
    var name = $("input[id='name']").val();
    var province = $("select[id='province']").val();
    var city = $("select[id='city']").val();
    var area = $("select[id='area']").val();
    var railway = $("select[id='railway']").val();
    var address = $("input[id='address']").val();
    var property = $("select[id='property']").val();
    var residence = $("select[id='residence']").val();
    var erea = $("input[id='erea']").val();
    var header_name = $("input[id='header_name']").val();
    var header_phone = $("input[id='header_phone']").val();
    var email = $("input[id='email']").val();
    var telephone = $("input[id='telephone']").val();
    var password = $("input[id='password']").val();
    var repassword = $("input[id='repassword']").val();
    if (name == "" || name == null || name == undefined) {
        alert("请输入名称");
        return false;/*阻止表单提交*/
    }else if (province == "" || province == null || province == undefined || city == "" || city == null || city == undefined || area == "" || area == null || area == undefined || railway == "" || railway == null || railway == undefined) {
        alert("请选择所辖区域");
        return false;/*阻止表单提交*/
    }else if (address == "" || address == null || address == undefined) {
        alert("请输入地址");
        return false;/*阻止表单提交*/
    }else if (property == "" || property == null || property == undefined || residence == "" || residence == null || residence == undefined) {
        alert("请选择类别");
        return false;/*阻止表单提交*/
    }else if (erea == "" || erea == null || erea == undefined) {
        alert("请输入辖区面积");
        return false;/*阻止表单提交*/
    }else if (header_name == "" || header_name == null || header_name == undefined) {
        alert("请输入所长（负责人）姓名");
        return false;/*阻止表单提交*/
    }else if (header_phone == "" || header_phone == null || header_phone == undefined) {
        alert("请输入所长（负责人）手机号");
        return false;/*阻止表单提交*/
    }else if (email == "" || email == null || email == undefined) {
        alert("请输入邮箱");
        return false;/*阻止表单提交*/
    }else if (telephone == "" || telephone == null || telephone == undefined) {
        alert("请输入值班电话");
        return false;/*阻止表单提交*/
    }else if (password == "" || password == null || password == undefined) {
        alert("请输入密码");
        return false;/*阻止表单提交*/
    }else if (repassword == "" || repassword == null || repassword == undefined) {
        alert("请输入确认密码");
        return false;/*阻止表单提交*/
    }else if (password != repassword) {
        alert("两次密码不一致，请重新输入");
        return false;/*阻止表单提交*/
    } else {
        $.ajax({
            async : false,
            cache : false,
            type : "post",
            dataType : 'json',
            url : "../api/police/register",// 请求的action路径
            data : {
                name : name,
                // province : province,
                // city : city,
                // area : area,
                // railway : railway,
                address : address,
                // property : property,
                // residence : residence,
                erea : erea,
                headerName : header_name,
                headerPhone : header_phone,
                email : email,
                telephone : telephone,
                password : password
                // repassword : repassword,
            },
            success : function(data) { // 请求成功后处理函数。
                var success = data.success;
                if (success == true) {
                    document.write(data.msg);
                    window.location.href="http://localhost:8080/gabIM/gab/login.html";
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