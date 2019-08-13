const express=require('express');
//引入路由器
const proRouter=require('./routes/pro.js');
//引入body-parser
const bodyParser=require('body-parser');
// 解决跨域问题
const cors=require("cors");
//创建web服务器
var server=express();
server.listen(8080);
// 跨域请求
server.use(cors({
  origin:["*",
  "http://127.0.0.1:5501","http://127.0.0.1:8080","http://localhost:8080"]
}))
//托管静态资源到public下
server.use( express.static('public') );
//使用body-parser中间件，将post请求的数据格式化为对象
server.use( bodyParser.urlencoded({
  extended:false
}) );
//挂载路由器
//使用(挂载)的url: /user
// /user/reg
server.use('/pro',proRouter);

