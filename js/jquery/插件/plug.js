(function($){
  $.fn.myPlug=function(){
    this.fadeIn('normal',function(){
      var $this=$(this);
      console.log('this dom', this);//this dom <div id="ele">
      console.log('this ', $this);//this Object[div#ele]
      
    })
  }
})(jQuery)
