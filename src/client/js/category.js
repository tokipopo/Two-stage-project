$(() => {
  $.ajax({
    url: "../../server/getCate.php",
    dataType: "json",
    success: function (data) {
      let html = data.map((item) => {
          return `<li class="list" data-id=${item.good_id}>
                <div class="p-cont">
                  <div class="p_img">
                    <a href=""><img src="${item.src}" alt=""></a>
                    <div class="p-buy">立即购买</div>
                  </div>
                  <div class="p-tags"></div>
                  <div class="p-brand">${item.title}</div>
                  <div class="p-product">
                    <a href="">${item.info}</a>
                  </div>
                  <div class="p-discount">
                    ${item.price}
                  </div>
                </div>
              </li>`
        })
        .join("");
      $(".cata-prod").html(html);
    },
  });
  $(".cata-prod").on("mouseenter",".list",function(){
      $(this).find(".p-buy").addClass("p-buyon");
      $(this).siblings().find(".p-buy").removeClass("p-buyon");
    //   console.log("aa")
  })
  $(".cata-prod").on("click",".p-buy",function(){
    // console.log("aa")
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    let good_id = $(this).parent().attr("data-id");

    if(user_id && user_name){
        $.ajax({
            url: "../../server/addCar.php",
            data: {user_id,good_id},
            success: function (data) {
                
            }
        });
    }

  })







});
