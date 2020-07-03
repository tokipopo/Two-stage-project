$(()=>{
    /* 
    连接两个php  getCate2.php  addCar.php 
    1.根据good_id     goods表渲染
    2.点击按钮
    
    */
   let good_id = localStorage.getItem("data_id") || "";
   console.log(good_id)
   $.ajax({
    url: "../../server/getCate2.php",
    data: {good_id},
    dataType: "json",
    success: function (data) {
      let html = data.map((item) => {
          $(".imgBig").before(`<img src="${item.src}" alt="">`);
          $(".picture").html(`<img src="${item.src}" alt="">`);
          $(".title-info").text(`${item.info}`)
          $(".price").text(`${item.price}`)
        })
    },
  });

  //   点击立即购买
  // 查询登录状况 登录就传商品id

  $(".cata-prod").on("click",".p-buy",function(){
    // console.log("aa")
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    // console.log(user_id, user_name,good_id);
    if(user_id && user_name){
        $.ajax({
            url: "../../server/addCar.php",
            data: { user_id, good_id },
            success: function (data) {
                alert(data);
            }
        });
    }else{
        location.href = "./login.html";
    }

  })






})


