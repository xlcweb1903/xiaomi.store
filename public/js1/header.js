$(function(){
    $(".head-right>div").hide();
     // 加载购物车    
    function car(){
        console.log("加载购物车")
        $.ajax({
            url:"http://localhost:8080/pro/allcar",
            type:"get",
        }).then(result=>{
            // console.log(result)
            $(".head-right>div>ul").children().remove();
            var html="";
            
            for(var item of result){
                html+=`<li>
                <span style="width:110px"><input type="checkbox" data-num="${item.sid}" class="check"></span>
                <span style="width:110px"><img src="${item.src}" alt=""></span>
                <span style="width:140px" >${item.sname}</span>
                <span style="width:80px" class="price">${item.sprice}</span>
                <span style="width:110px">
                    <a style="width:20px;">-</a>
                    <input type="text" class="count" style="width:50px" disabled value="${item.count}"
                    min="1" max="10" data-num="${item.sid}">
                    <a style="width:20px">+</a>
                </span>
                <span style="width:110px" class="subtotal">${item.count*item.sprice}</span>
                <span style="width:80px"><a href="javascript:;" class="del" data-num="${item.sid}">删除</a></span> 
            </li>`
            }
            $(".head-right>div>ul").append(html)
        })
    };
    car();
    setTimeout(function(){
        // 判断是否登录
        if(sessionStorage.getItem("name")!=""){
            console.log(sessionStorage.getItem("name"),$(".larea"),$(".rarea"));
            $(".larea").html(sessionStorage.getItem("name"));
            $(".rarea").html("注销")
        }
        // 注册和注销
        $(".rarea").click(function(){
            if($(".rarea").html()=="注销"){
                sessionStorage.setItem("name","");
                location.href="http://127.0.0.1:8080/index.html"
            }else if($(".rarea").html()=="注册"){
                window.open("http://127.0.0.1:8080/mi_login.html")
            }
        })
 
      function subtotal(){
          console.log("加载小计")
          var obj=$(".subtotal");
          var total=0;
          for(var i=0;i<obj.length;i++){
              $(obj[i]).html($(obj[i]).prev().prev().html()*$(obj[i]).prev().children(".count").val());
          }
      }
      function total(){
          var obj=$(".check:checked");
          console.log("加载总计")
          var sum=0;
          for(var i=0;i<obj.length;i++){
              sum+= parseInt($(obj[i]).parent().next().next().next().next().next().html());
          } 
          $("#subtotal").html(sum+"元");
      }
      function carnumber(){
          console.log("加载加载购物车总数")
          var obj=$(".count");
          console.log(obj);
          var number=0;
          for(var i=0;i<obj.length;i++){
              number+=parseInt($(obj[i]).val())
          }
          $("#number").html(number);
      }
   // 小计
       subtotal();
       carnumber();
   // 总计
       $(".check").click(function(){
           console.log($(".check"));
           var obj=$(".check");
           var a=0;
           for(var i=0;i<obj.length;i++){
               if($(obj[i]).prop("checked")==true){
                   a++;
               }
           }
           if(a==obj.length){
               $(".allcheck").prop("checked",true);
           }else{
               $(".allcheck").prop("checked",false);
           }
           total();
           }
       )
      // 添加到购物车
      $(".shop").on("click",function(){
          $.ajax({
              url:"http://localhost:8080/pro/shopcar",
              type:"get",
              data:{
                  pid:location.search.split("=")[1],
                  jname:`${$(".jname").html()}`,
                  jprice:`${$(".total-price").html().split(":")[1].split("元")[0]}`,
                  jpic:$(".jpicture").attr("src")
              }
          }).then(result=>{
              //添加商品到购物车
              if(result==1||result==2){
                  // 加载并动态添加购物车
                  car()
                  console.log(111);
              };
      
          })
      })
      // 购物车显示隐藏
     $(".carshow").click(function(){
         var name=sessionStorage.getItem("name");
         console.log(name);
         if(name){
             $(".head-right>div").toggleClass("show");
         }else{
             alert("请登录！");
             location.href="http://127.0.0.1:8080/mi_login.html";
         }
     })     
      //  关闭购物车
     $("#close").click(function(){
              $(".head-right>div").addClass("show");
      // $("").hide();
      }) 
         
         
      // 删除
          $(".del").on("click",function(e){
              $(e.target).parent().parent().remove();
              $.ajax({
                  url:"http://localhost:8080/pro/cardelete",
                  type:"get",
                  data:{sid:$(e.target).attr("data-num")}
              }).then(result=>{
                  car();
                  total();
                  carnumber();
                  console.log(result)
              })
          })
      //购物车数量加一减一
          $(".count").prev().on("click",function(e){
              // console.log(111);
              if($(e.target).next().val()>1){
                  $(e.target).next().val(parseInt($(e.target).next().val())-1);
                  subtotal();
                  total();
                  carnumber();
              }else{
                  $(e.target).prop("disabled",true);
              }
          });
          $(".count").next().on("click",function(e){
              if($(e.target).prev().val()<10){
                  $(e.target).prev().val( parseInt($(e.target).prev().val())+1);
                  subtotal();
                  total();
                  carnumber();
              }else{
                  $(e.target).prop("disabled",true);
              }
          });
      //全选
          $(".allcheck").click(function(){
              $(".check").prop("checked",true);
              total();
          })

      // 删除选中
          $("#del").click(function(){
              var obj=$(".check:checked");
              for(var i=0;i<obj.length;i++){
                  $(obj[i]).parent().parent().remove();
                  var sid= parseInt($(obj[i]).attr("data-num"));
                  $.ajax({
                  url:"http://localhost:8080/pro/cardelete",
                  type:"get",
                  data:{sid}
                  }).then(result=>{
                      if(result==1){
                          setTimeout(function(){
                              car()
                              total();
                              carnumber();   
                          },500)
                      }
                      console.log(result);
                  })
              };
          })
      },500)
})