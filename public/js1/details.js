new Vue({
    el:"#app",
    data:{
        pname:"",
        pdetail:"",
        price:"",
        picture:"",
        color:"",
        space:"",
        space_price:"",
        combo:""
    },
    created(){
        axios.get(
          "http://localhost:8080/pro/list_uid",
          {
            params:{
              lid:location.search.split("=")[1]
            }
          }
        ).then(result=>{
          // console.log(result.data);
          this.pname=result.data.pname;
          this.pdetail=result.data.pdetail.split("|");
          this.price=result.data.price;
          //每次获得图片列表后，都重新计算ul的宽
          //宽=每个li的宽*图片张数
          this.picture=result.data.picture;
          this.color=result.data.color.split("|");
          this.space=result.data.space.split("|");
          this.space_price=result.data.space_price.split("|");
          this.combo=result.data.combo.split("|");
          // console.log(this.space);
          // console.log(this.space_price);
          // console.log(this.color);
          // console.log(this.combo);
          setTimeout(function(){
          $(".select-type1 a:lt(1)").addClass("active");
          $(".select-type2 a:lt(1)").addClass("active");
          $(".select-type3 a:lt(1)").addClass("active");
            $(".select-type3").on("click","a",function(e){
               $(".select-type3 a").removeClass("active");
               $check=$(e.target);
               $check.toggleClass("active");
           });
           $(".select-type2").on("click","a",function(e){
               $(".select-type2 .color").removeClass("active");
               $check=$(e.target);
               $check.toggleClass("active");
               console.log(this.picture);
           });
           $(".select-type1").on("click","a",function(e){
               console.log(111)
               $(".select-type1 .space").removeClass("active");
               $check=$(e.target);
               if($check.is("a")){
                   $check.toggleClass("active");
               }else{
                   $check.parent().toggleClass("active");
               }
           });
          },500)
        })
      },
})