const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
	//登录
router.get('/login',function(req,res){
   var obj=req.query;
   console.log(obj);
   if(!obj.user_phone){
   res.send('用户名不能为空！')
	   return;
   }
   if(!obj.u_pwd){
   res.send('密码不能为空');
       return;
   }
   pool.query('select * from mi_user where phone=? and upwd=?',[obj.user_phone,obj.u_pwd],function(err,result){
	   console.log(result);
	 if(err) throw err;
	 if(result.length>0){
	 res.send('1')
	 }else{
	 res.send('0')
	 }
   })
})
	   //查询列表
router.get('/list',function(req,res){
   pool.query('select * from mi_product_list',function(err,result){
	  if(err) throw err;
	//   console.log(result);
	  if(result.length>0){
	  res.send(result);
	  }
   })
   })
	   //按uid查询
router.get('/list_uid',function(req,res){
	var obj=req.query;
	// console.log(obj);
  pool.query('select * from mi_product_list where pid=?',[obj.lid],function(err,result){
      if(err) throw err;
	  if(result.length>0){
	  res.send(result[0]);
	  }else{
	  res.send('查询不到该数据');
	  }
  })
})


//查询用户手机 
router.get('/user_phone',function(req,res){
				var obj=req.query;
		pool.query('select * from mi_user where phone=?',[obj.user_phone],function(err,result){
		  if(err) throw err;
			console.log(result);
		  if(result.length>0){
		    res.send('1')
		  }else{
			res.send('0');
			}
		})

})
//注册
router.post('/reg',function(req,res){
        var obj=req.body;
        console.log(obj);
        pool.query('insert into mi_user value(?,?,?,?)'
        ,[null,obj.uname,obj.upwd,obj.phone],function(err,result){
        if(err) throw err;
		if(result.affectedRows>0){
		res.send('1');
		console.log("注册成功")
		}else{
		res.send('0');console.log("注册失败")
		}
})
})
// 加入购物车
router.get('/shopcar',function(req,res){
        var obj=req.query;
		pool.query('select count from mi_shopingcar where pid=?',[obj.pid],function(err,result){
			if(err) throw err;
			if(result.length==0){
				pool.query('insert into mi_shopingcar value(?,?,?,?,?,?,?)'
				,[null,obj.pid,obj.jname,obj.jprice,1,0,obj.jpic],function(err,result){
				if(err) throw err;
				if(result.affectedRows>0){
				res.send("1");
				console.log("添加成功")
			}else{
				console.log("添加失败")
				res.send('0');
			}
				})
				}else{
				var scount=result[0].count;
				console.log(scount)
				pool.query("update mi_shopingcar set count=? where pid=?",[scount+1,obj.pid],function(err,result){
					if(err) throw err;
					if(result.affectedRows>0){
						console.log(result);
						res.send("2")
					}else{
						res.send("3")
					}
				})
			}
		})
 
})
// 查询购物车
router.get('/allcar',function(req,res){
	pool.query('select * from mi_shopingcar',function(err,result){
	   if(err) throw err;
	//    console.log(result);
	   if(result.length>0){
	   res.send(result);
	   }
	})
	})
//单条删除购物车数据
router.get('/cardelete',function(req,res){
	var obj=req.query;
	console.log(obj);
pool.query('delete from mi_shopingcar where sid=?',[obj.sid],function(err,result){
	   console.log(result);
   if(err) throw err;
   if(result.affectedRows>0){
   res.send('1');
   }else{
   res.send('0');
   }
})
})	
//监听数量改变
// router.get('/countchange',function(req,res){
// 	var obj=req.query;
// 	pool.query("update mi_shopingcar set count=? where sid=?",[obj.count,obj.sid],(err,result)=>{
// 		if(err) throw err;
// 		if(result.affectedRows>0){
// 			console.log("修改成功");
// 			res.send(1)
// 		}else{
// 			console.log("修改失败")
// 		}
//  	})
// })
//导出路由器对象
module.exports=router;