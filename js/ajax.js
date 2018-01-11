//事件代理
var box = document.getElementsById('className');
box.addEventListener('click',function(e){
  var ev = e||window.event;
  var target  = ev.target||ev.srcElement;
  if(target.tagName.toLowerCase()==='input'){
    //
  }
})
