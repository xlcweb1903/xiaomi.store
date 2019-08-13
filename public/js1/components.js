$(function(){
$(function(){
  $.ajax({
    url:"header.html",
    type:"get",
    success:function(result){
      // console.log(result);
      $(result).replaceAll("header");
    }
  })
});
$(function(){
  $.ajax({
    url:"footer.html",
    type:"get",
    success:function(result){
      // console.log(result);
      $(result).replaceAll("footer");
    }
  })
})
})