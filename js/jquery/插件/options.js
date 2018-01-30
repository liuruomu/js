(function($){
  $.fn.tool=function(options){
    var settings={
      'location':'left',
      'background-color':'red'
    }

    return this.each(function(){
      if(options){
      $(this).css($.extend({},settings,options))//这样做不会破坏settings的结构
      }

  //$.extend(settings,options)
  //$(this).css(settings)这样setting就改变了


    })

  }
})(jQuery)
