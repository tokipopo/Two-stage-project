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

    
})