let { src, dest, watch, pipe, series, parallel } = require("gulp");
let htmlmin = require("gulp-htmlmin")
let htmlminTask1 = () => {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: false, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
// ,"./src/client/html/category.html","./src/client/html/fixed.html","./src/client/html/footer.html","./src/client/html/index.html","./src/client/html/login.html","./src/client/html/product.html","./src/client/html/register.html","./src/client/html/tops.html"]
    // return src(["./src/client/html/category.html","./src/client/html/fixed.html","./src/client/html/footer.html","./src/client/html/index.html","./src/client/html/login.html","./src/client/html/product.html","./src/client/html/register.html","./src/client/html/tops.html"]).pipe(htmlmin(options)).pipe(dest("./build/client/html"));
    return src("./src/client/html/*.html").pipe(htmlmin(options)).pipe(dest("./build/client/html"));

}
exports.htmlminTask1 = htmlminTask1;

let cssmin = require("gulp-cssmin")

/* (3) 定制任务*/
let cssminTask = () => {
    return src("./src/client/css/*.css").pipe(cssmin()).pipe(dest("./build/client/css"));
}
exports.cssminTask = cssminTask;

/* 把js文件合并、压缩、重命名 */
/* (1) 安装模块 */
/* $ npm install gulp-concat gulp-rename gulp-uglify --save-dev */
// /* (2) 加载模块 */
// let rename = require("gulp-rename");
// let concat = require("gulp-concat");
let uglify = require("gulp-uglify");

/* (3) 指定任务 */
let task = () => {
    return src("./src/client/js/*.js").pipe(dest("./build/client/js"))
}

exports.task = task;


