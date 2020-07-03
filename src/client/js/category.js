$(() => {
    // 渲染
    getDataAndRenderUI("default");

    //获取总页码的数量 
    getPageCount();
    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../../server/getPageCount.php",
            success: function(response) {
                let pageStr = "";
                for (let i = 0; i < response; i++) {
                    pageStr += `<li class='p-class ${i == 0 ? "active":""}'><a href="javascript:void(0)">${i+1}</a></li>`;
                }
                $(pageStr).insertBefore("#nextPage");
            }
        });
    }

    function getDataAndRenderUI(sort, page = 0) {
        $.ajax({
            url: "../../server/getCate.php",
            data: {
                sort,
                page: page
            },
            dataType: "json",
            success: function (data) {
                let html = data.map((item) => {
                    return `<li class="list" data-id=${item.good_id}>
                          <div class="p-cont">
                            <div class="p_img">
                              <a href=""><img src="${item.src}" alt="" title="${item.info}"></a>
                              <div class="p-buy">立即购买</div>
                            </div>
                            <div class="p-tags"></div>
                            <div class="p-brand">${item.title}</div>
                            <div class="p-product">
                              <a href="">${item.info}</a>
                            </div>
                            <div class="p-discount">
                              ￥${item.price}
                            </div>
                          </div>
                        </li>`
                  })
                  .join("");
                $(".cata-prod").html(html);
              }
        })

    }



/* 
  $.ajax({
    url: "../../server/getCate.php",
    dataType: "json",
    success: function (data) {
      let html = data.map((item) => {
          return `<li class="list" data-id=${item.good_id}>
                <div class="p-cont">
                  <div class="p_img">
                    <a href=""><img src="${item.src}" alt="" title="${item.info}"></a>
                    <div class="p-buy">立即购买</div>
                  </div>
                  <div class="p-tags"></div>
                  <div class="p-brand">${item.title}</div>
                  <div class="p-product">
                    <a href="">${item.info}</a>
                  </div>
                  <div class="p-discount">
                    ￥${item.price}
                  </div>
                </div>
              </li>`
        })
        .join("");
      $(".cata-prod").html(html);
    },
  }); */


//   商品列表鼠标滑过
  $(".cata-prod").on("mouseenter",".list",function(){
      $(this).find(".p-buy").addClass("p-buyon");
      $(this).siblings().find(".p-buy").removeClass("p-buyon");
    //   console.log("aa")
  })
  $(".cata-prod").on("mouseleave",".list",function(){
    $(this).find(".p-buy").removeClass("p-buyon");
  //   console.log("aa")
})

//   点击立即购买

  $(".cata-prod").on("click",".p-buy",function(){
    // console.log("aa")
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    let good_id = $(this).parents(".list").attr("data-id");
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

//   跳转到购物车
  $(".cart").click(function(){
      open("./cart.html");
  })

//   存入商品id 
  $(".cata-prod").on("click",".p_img a",function(){
    console.log("aaa")
    let good_id = $(this).parents(".list").attr("data-id");
    localStorage.setItem("data_id", good_id);
    open("./product.html");
    })
    $(".cata-prod").on("click",".p-product a",function(){
        console.log("aaa")
        let good_id = $(this).parents(".list").attr("data-id");
        localStorage.setItem("data_id", good_id);
        open("./product.html");
    })


    // 4、排序功能
    $(".sort >li").click(function() {

        /* 设置选中状态 */
        $(this).addClass("cur").siblings().removeClass("cur");
        let sortType = $(this).data().sort;

        getDataAndRenderUI(sortType);
    })

     // 5、分页功能
     $(".pagination").on("click", ".p-class", function() {
        $(this).addClass("active").siblings().removeClass("active");
        let page = $(this).text() * 1 - 1;
        // console.log(page);
        getDataAndRenderUI($(".cur").data().sort, page)
    })

    // 上一页和下一页的功能
    // console.log($("#prevPage,#nextPage"));
    $("#prevPage,#nextPage").click(function() {
        console.log("1")
        /* 设置选中状态 */
        let page = $(".pagination .active").index() * 1 - 1;
        // console.log($("pagination .active").index())
        if (this.id == "prevPage") {
            page--;
        } else if (this.id == "nextPage") {
            page++;
        }
        

        $(".p-class").eq(page).addClass("active").siblings().removeClass("active")
        getDataAndRenderUI($(".cur").data().sort, page)
    })

    $(window).scroll(function () { 
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop >= 700){
        $(".fixedtop-content").addClass("fixedtop-contentto");
      }else{
        $(".fixedtop-content").removeClass("fixedtop-contentto");
      }
      
    });







});
