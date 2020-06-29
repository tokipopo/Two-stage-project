$(() => {

    /* 获取登录按钮，添加事件 */
    $(".confirmButton2").click(function() {
        let username = $.trim($("#username-ID").val());
        let password = $.trim($("#password-ID").val());

        /* 先检查用户名和密码和是否勾选，都满足则发请求 */
        if (username.length == 0) {
            alert("用户名不能为空");
            return
        }

        if (password.length == 0) {
            alert("密码不能为空");
            return;
        }

        if (!$("#protocol").is(":checked")) {
            alert("请阅读并同意用户协议");
            return;
        }

        $.ajax({
            type: "post",
            url: "../../server/login.php",
            dataType: "json",
            data: `username=${username}&password=${md5(password).slice(0,15)}`,
            success:function(data){
                    console.log(data)
                    if (data.status == "success") {
                        alert(data.msg);
                        location.href = "../html/";
                    } else {
                        alert(data.msg);
                    }}
            
        })

    })

})