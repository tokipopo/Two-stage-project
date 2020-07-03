$(() => {
    /* 登录状态的处理 */
    /* 检查本地是否保存user_id和user_name的值，如果本地有，那么表示当前是登录状态 */
    /* 如果没有，那么表示当前是未登录的状态 */
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $(".carusername").text(`${user_name}`);
        $(".userstatus").text("退出");
    } else {
        // $(".carusername").text(`请登录`);
        $(".userstatus").text("登录");
    }

    $(".userstatus").click(function() {
        if ($(this).text() == "登录") {
            location.href = "./login.html";
        } else {
            localStorage.removeItem("user_id")
            localStorage.removeItem("user_name");
            /* 重新加载 */
            window.location.reload();
        }
    })

    /* 发请求获取购物车的商品信息 */
    $.ajax({
        url: "../../server/getCart.php",
        data: { user_id },
        dataType: "json",
        success:function(data){
            let html = data.map((item)=>{
                return `<tr datafc-id="${item.good_id}">
                <th scope="row">
                  <input type="checkbox" name="" id="" class="onecheck" />
                </th>
                <td><img src="${item.src}" alt="" style="width:74px;height:74px;"/></td>
                <td>
                  <div class="carttitle">${item.title}</div>
                  <div class="shopcarinfo">${item.info}</div>
                </td>
                <td class="justo">${item.price}</td>
                <td class="cartonenum">
                <a href="javascript:;" class="reduce">-</a><input type="text" value=${item.num} class="sum"><a href="javascript:;" class="plus">+</a>
                </td>
                <td class="oneallmoney">${item.num * item.price}</td>
                <td class="delete"><i class="cartdelete"></i></td>
              </tr>`
            }).join("");
            $(".shopbodyt").html(html);
        }
    })

    /* 删除功能 ：点击 删除数据库内容 刷新页面*/
    /* 点 传good_id 删除该id在cart的 */
    $(".shopbodyt").on("click",".cartdelete",function(){
        let user_id = localStorage.getItem("user_id") || "";
        let good_id = $(this).parent().parent().attr("datafc-id");
        //  console.log(good_id)
         deleteShop(user_id,good_id)
            // $.ajax({
            //     url: "../../server/deleteCart.php",
            //     data: { user_id, good_id },
            //     success: function (data) {
            //         alert(data);
            //     }
            // });
            // window.location.reload();
            $(this).parent().parent().remove();
       
    })
    function deleteShop(user_id,good_id){
        $.ajax({
            url: "../../server/deleteCart.php",
            data: { user_id, good_id },
            success: function (data) {
                alert(data);
            }
        });
    }

    /* 批量删除 */
    $(".allcheckdelete").click(function(){
        console.log($(".allcheck"),$(".allcheck").parents(".carttable").find(".onecheck"));
        let user_id = localStorage.getItem("user_id") || "";
        let arrp= []
        if($(".allcheck").is(":checked")){
            let good_id = $(".allcheck").parents(".carttable").find(".shopbodyt tr");            
            $(good_id).each(function(){
                arrp.push($(this).attr("datafc-id"))
            })    
        }else{
            let isOnecheck = $(".allcheck").parents(".carttable").find(".shopbodyt tr th input");
            console.log(isOnecheck);
            for(let i=0;i<isOnecheck.length;i++){
                if($(isOnecheck[i]).is(":checked")){
                    arrp.push($(isOnecheck[i]).parent().parent().attr("datafc-id"))
                }
            }
        }
        good_id =JSON.stringify(arrp);
        console.log(good_id);
        deleteShop(user_id,good_id);
        window.location.reload();
        
    })
    // 计算选中总价
    let arrnum = 0;
    let arrnom=[];
    let shoppnu;
    $(".shopbodyt").on("click",".onecheck",function(){
        let isOnecheck =$(this).is(":checked");
        let onemoney = $(this).parent().siblings(".oneallmoney").text()*1;
        // console.log(onemoney)
        // $.ajax({
        //     url: "../../server/getCart.php",
        //     data: {user_id},
        //     success: function (data2) {
                
        //         JSON.parse(data2).map(item =>{
        //             shoppnu=item.num;
        //         })
        //         // console.log(data2)
                
        //     }
        // });
        if(isOnecheck){
            arrnom.push(onemoney)
        }else{
            arrnom.splice($.inArray(onemoney,arrnom),1)
            console.log(arrnom)
        }
        if(arrnom.length>0){
            arrnum=eval(arrnom.join("+")) 
         }else{
             arrnum=0;
         }
        
        
        $(".checkoutSubmit-info-content-right-li-price").text(arrnum);
        $(".alfunck").text(arrnum);
        // console.log(isOnecheck,$(this).parent().siblings(".oneallmoney").text());
        // console.log(arrnum)
        // console.log(arrnom)
    })
    

    /* 全选的功能：点击的时候切换选中的状态(改变自己的状态 + 改变所有其他复选框的状态) */
    $(".allcheck").click(function() {
        let arrnom=[];
        // console.log(this, $(this).is(":checked"));
        let isAllcheck = $(this).is(":checked");
         $(this).parents(".carttable").find(".onecheck").each(function(){
            // console.log(this)
            this.checked = isAllcheck;
            // $(this)
        })
        if(isAllcheck){
           
        // console.log($(".shopbodyt").children().children(".oneallmoney"))
        let msc=$(".shopbodyt").children().children(".oneallmoney");
        // let sdff = $(msc[1]).text();
        for(let i=0;i<msc.length;i++){
            arrnom.push($(msc[i]).text())
            // console.log(arrnom)
        }
        }else{
            arrnum1=0;
        }
        if(arrnom.length>0){
            arrnum1=eval(arrnom.join("+")) 
         }else{
             arrnum1=0;
         }
        // arrnum1=eval(arrnom.join("+"))
        console.log(arrnum1)
        $(".checkoutSubmit-info-content-right-li-price").text(arrnum1)

        
    })
    // 加减数量事件
    
    $(".shopbodyt").on("click",".reduce",function(){
        let good_id = $(this).parent().parent().attr("datafc-id");
        let justo=$(this).parent().siblings(".justo").text();
        let orgnum= $(this).siblings(".sum").attr("value");
        if(orgnum<2){
            orgnum = 2;
        }
        orgnum--;
        $.ajax({
            url: "../../server/changeNum.php",
            data: {user_id,good_id,orgnum},
            success: function (data) {
                
            }
        });


        $(this).siblings(".sum").attr("value",orgnum);
        $(this).parent().siblings(".oneallmoney").text(orgnum*justo);
        // console.log(orgnum)
    })
    $(".shopbodyt").on("click",".plus",function(){
        let good_id = $(this).parent().parent().attr("datafc-id");
        let orgnum= $(this).siblings(".sum").attr("value");
        let justo=$(this).parent().siblings(".justo").text();
        orgnum++;
        $.ajax({
            url: "../../server/changeNum.php",
            data: {user_id,good_id,orgnum},
            success: function (data) {
                
            }
        });
        $(this).siblings(".sum").attr("value",orgnum);
        $(this).parent().siblings(".oneallmoney").text(orgnum*justo);
    })

    
        // window.onscroll = function () {
        //     var oLi = document.getElementById(oDom)
        //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        //     if (scrollTop >= 200) {
        //         oLi.style.display = "flex"
        //     }
        //     else {
        //         oLi.style.display = "none"
        //     }
        //     // console.log(scrollTop)
        // }
    

    




    
})