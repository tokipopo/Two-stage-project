$(()=>{

    // 渲染列表部分
    $.getJSON("../../server/json/data-rea.json", 
        function (data) {
            let html = data.map(item =>{
                return `<li class="navm-info-manu-more">
                            <span></span>
                            <a href="">${item.title}</a>
                            <ul class="navm-menu-info">
                                <li>
                                    <a href="" class="toProduct">${item.infof}</a>
                                </li>
                                <li>
                                    <a href="" class="toProduct">${item.infos}</a>
                                </li>
                            </ul> 
                        </li>`
            }).join("");
            $(".navm-menu-list-col").html(html);
        }
    );

    // 渲染品牌列表

    $.getJSON("../../server/json/brand.json",
        function (data) {
            let html =data.map(item =>{
                return `<li>
                <a href="javascript:void(0)" class="module_tabGroupList_link"><img src="${item.src}" alt=""></a>
                <div class="module_tabGroupList_hover">
                  <div class="module_tabGroupList_banner">${item.title}</div>
                  <a href="" class="module_tabGroupList_link">点击查看</a>
                </div>
              </li>`
            }).join("");
            $(".module_tabGroupList_show").html(html);
            
        }
    );
    // 鼠标滑过显示品牌名字
    $(".module_tabGroupList_show").on("mouseenter","li",function(){
        $(this).children(".module_tabGroupList_hover").css("display", "block");
        $(this).siblings().children(".module_tabGroupList_hover").css("display", "none");
    })
    $(".module_tabGroupList_show").on("mouseleave","li",function(){
        $(this).children(".module_tabGroupList_hover").css("display", "none");
    })
    // 渲染品类
    $.getJSON("../../server/json/loc.json", 
        function (data) {
            let html =data.map(item=>{
                return `<li class="cate-list">
                <div class="catalist-title">${item.title}</div>
                <div class="catalist-info">${item.info}</div>
                <div class="catalist-price">${item.price}</div>
                <div class="catalist-img"><img src="${item.src}" alt=""></div>
              </li>`
            }).join("");
            $(".cate-right").html(html);
        }
    );
    // -----------------
    $.getJSON("../../server/json/catabranf.json",
        function (data) {
            let html =data.map(item=>{
                return`<li><img src="${item.src}" alt=""></li>`
            }).join("");
            $(".cate-brand").html(html);
        }
    );
    
    $.getJSON("../../server/json/other.json", 
        function (data) {
            let html =data.map(item=>{
                return `<li class="cate-list">
                <div class="catalist-img"><img src="${item.src}" alt=""></div>
                <div class="catalist-title">${item.title}</div>
                <div class="catalist-info">${item.info}</div>
                <div class="catalist-price">${item.price}</div>
                
              </li>`
            }).join("");
            $(".guess-list").html(html);
        }
    );


    // 左侧固定滚动监听
    $(window).scroll(function () { 
        let scrollTop = $(window).scrollTop();
        // console.log(scrollTop);
        if(scrollTop >= 700){
          $(".list-group").addClass("list-groupto");
        }else{
          $(".list-group").removeClass("list-groupto");
        }
        
      });
    //   回到顶部
    $(".backTop").click(function(){
        $("html,body").animate({scrollTop:0},300);
        return false;
    })


    // 跳转购物车
    $(".shopbagmain").click(function(){
        location.href="../html/cart.html";
    })

   


    
    

    
})