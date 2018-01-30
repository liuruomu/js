(function($){
  var methods = {
  init : function( options ) {console.log('options',options);},
  show : function(x ) {console.log('show',x);},
  hide : function( ) { console.log('hide'); },
  update : function( content ) {console.log('update');  }
};

$.fn.tooltip = function( method ) {

  // Method calling logic
  if ( methods[method] ) {
    console.log('arguments',arguments);
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    //理解methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ))
    //出现了误差。还是对aplly的理解不够。将methods[method]方法应用到this的实例对象上。
    //Array.prototype.slice.call( arguments, 1 )是应用到该方法上的参数
    //如上show中的x.
    //$('div').tooltip('show',1); 中的[1]是通过上述方法得到的，将之作为show的参数传入
  } else if ( typeof method === 'object' || ! method ) {
    console.log('ar',arguments);
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
  }

};
})(jQuery)
