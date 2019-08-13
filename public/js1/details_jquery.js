$(function(){
    $.ajax({
        url:"http://localhost:8080/pro/list_uid",
        type:"get",
        data:{lid:location.search.split("=")[1]},
    })
    .then(res=>{
    
    //动态加载数据
        $(".floor2>img").attr("src",res.picture);
        $(".jname").html(res.pname);
        $(".jdetail0").html(res.pdetail.split("|")[0]);
        $(".jdetail1").html(res.pdetail.split("|")[1]);
        $(".jprice").html(`${((res.space.split("|"))[0].split("&nbsp;"))[1]}元`);
        // $(".total-price").html(`总计:${((res.space.split("|"))[0].split("&nbsp;"))[1]}元`);
    
    setTimeout(function(){
        //加载机型，颜色，和套餐
        var space=res.space.split("|");
        var html="";
        for(var sp of space){
            var space_price=sp.split("&nbsp;");
            // console.log(space_price);
            html+=`<a href="javascript:;"><span>${space_price[0]}</span><span class="space_price">${space_price[1]}元</span></a>`
        }
        $(".select-type1").append(html);
        var color=res.color.split("|");var html1="";
        for(var sc=0;sc<color.length;sc++){
            html1+=`<a href="javascript:;" data-src="detail.img/1${sc}.jpg">${color[sc]}</a>`
        }
        $(".select-type2").append(html1);
        var combo=res.combo.split("|");var html2="";
        for(var so of combo){
            html2+=`<a href="javascript:;" >${so}</a>`
        }
        $(".select-type3").append(html2);
    // 设置默认样式
        $(".select-type a:nth-child(2)").addClass("active");
    
    // 商品图片添加固定效果
        $(document).on("scroll",function(){
            if($(document).scrollTop()<1234){
                $(".floor2>img").css("margin-top",parseInt($(document).scrollTop())*1046/1234)
            }
        })
        //添加点击事件
        $(".select-type1").on("click","a",function(e){
            $(".select-type1 a").removeClass("active");
            var $check=$(e.target);
            if($check.is("span")){
                $check.parent().toggleClass("active");
            }else{
                $check.toggleClass("active");
            };
            // console.log($(".select-type1 .active").html());
            $(".jprice").html($(".select-type1 .active .space_price").html());
            $(".total-price").html(`总计:${$(".select-type1 .active .space_price").html()}`)
        });
        $(".select-type2").on("click","a",function(e){
            $(".select-type2 a").removeClass("active");
            var $check=$(e.target);
                $check.toggleClass("active");
                $(".jpicture").attr("src",$check.attr("data-src"));
        });
        $(".select-type3").on("click","a",function(e){
            $(".select-type3 a").removeClass("active");
            var $check=$(e.target);
                $check.toggleClass("active");
        });
    // 保障服务添加点击事件
        $(".mi-click").on("click","label",function(e){
            // e.preventDefault();
            if($(this).find("input").prop("checked")==false){
                $(this).addClass("active");
                $(this).find("input").prop("checked",true);
            }else{
                $(this).removeClass("active");
                $(this).find("input").prop("checked",false);
            }
            addprice();
            })
        // 计算总价
       function addprice(){
           var obj=$("label.active .bao-price");
           if(obj.length!=0){
               var baoall=0;
               console.log(typeof(obj));
               for(var i=0;i<obj.length;i++){
                baoall+=parseInt($(obj[i]).html().split("元")[0])
               }
               $(".total-price").html(`${baoall+parseInt($(".select-type1 a[class='active'] :last-child").html().split("元")[0])}元`)
           }else{
            $(".total-price").html(parseInt($(".select-type1 a[class='active'] :last-child").html().split("元")[0])+"元")
           }
           }
        addprice();   
    },500)
}) 
}) 