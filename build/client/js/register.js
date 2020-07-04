$(()=>{
    
    // 图形验证码
    let imgCode;
    /*不传值，统一走默认值*/
    let captcha = new Captcha({
        lineWidth: 1, //线条宽度
        lineNum: 10, //线条数量
        dotR: 2, //点的半径
        dotNum: 10, //点的数量
        preGroundColor: [10, 80], //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 100, //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'], //字体类型
        fontStyle: 'fill', //字体绘制方法，有fill和stroke
        content: '0123456789', //验证码内容
        length: 4 //验证码长度
    });

    captcha.draw(document.querySelector('#captcha'), r => {
        // console.log('验证码', r);
        imgCode = r;

        /* 自动触发标签的事件 */
        $("#imageCode").trigger("blur");
    });

    let options = {
        "usernameID": {
            reg: `/^[a-zA-Z]{2,6}$/.test(val)`,
            msg: "用户名不符合规范!!!"
        },
        "phoneID": {
            reg: `/^1[3-9]\\d{9}$/.test(val)`,
            msg: "手机号码不符合规范!!!"
        },
        "passwordA": {
            reg: `/^[a-zA-Z0-9]{3,16}$/.test(val)`,
            msg: "密码不符合规范!!!"
        },
        "passwordB": {
            reg: `$.trim($("#passwordA").val()) === val`,
            msg: "两次输入的密码不相同!!!"
        },
        "imageCode": {
            reg: "val == imgCode",
            msg: "图形验证码不正确！！！"
        }
    }
    $(".SepBaseInput-chen input").focus(function () { 
        $(this).parent().addClass("borderb");
    });
    $(".SepBaseInput-chen input").blur(function(){
        $(this).parent().removeClass("borderb");
        let option_id = this.id;
        let val = $.trim($(this).val());
        if(eval(options[option_id].reg)){
            $(this).parent().siblings(".errorTip").children(".errorFont").text("");
            $(this).parent().removeClass("form-group-error");
            $(this).parent().siblings(".errorTip").children(".errorRedIcon").removeClass("erroron");
        }else{
            $(this).parent().siblings(".errorTip").children(".errorFont").text(options[option_id].msg);
            $(this).parent().addClass("form-group-error");
            $(this).parent().siblings(".errorTip").children(".errorRedIcon").addClass("erroron");
        }
    })

    $(".confirmButton2").click(function () { 
        $("#phoneID,#usernameID,#passwordA,#passwordB,#imageCode").trigger("blur");
        if($(".form-group-error").length !=0){
            return;
        }
        let isCheck = $("#protocol").is(":checked");
        if (!isCheck) {
            alert("请阅读并同意用户的注册协议!!!");
            return;
        }
        let data = {
            username: $.trim($("#usernameID").val()),
            phone: $.trim($("#phoneID").val()),
            password: md5($.trim($("#passwordA").val())).slice(0, 15)
        }
        // 连接数据库
        $.ajax({
            type: "post",
            url: "../../server/res.php",
            data,
            dataType: "json",
            success:function(data){
                if(data.status == "success"){
                alert("注册成功");
                location.href = "../html/login.html";
            }else{
                alert(data.msg);
            }
            }
        });
       

        
    });


    








})