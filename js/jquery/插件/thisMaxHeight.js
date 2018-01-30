(function($){
  $.fn.maxHeight=function(){
    var max=0;
    this.each(function(){//this.each  应该是找到的jquery对象的[]的迭代
      max=Math.max(max,$(this).height())

    })

  return this.each(function(){
    $(this).height(max)
  })

  }
})(jQuery)
