/* 
let str="￥590.00";
        let num = 3;
        let search = "~￥";
        let adds;
        if(search){
            let start = str.indexOf(search);//获得字符串的开始位置
            let result = str.substring(start+search.length);//截取字符
            adds =parseInt(result)*num
        }else{
            let search2 = "￥";
            let start = str.indexOf(search2);//获得字符串的开始位置
            let result = str.substring(start+search2.length);//截取字符
            adds =parseInt(result)*num
        }
        console.log(adds)
         */

