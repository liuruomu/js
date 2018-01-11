; (function (window, undefined) {
      //
      var dom ={
        on: function(node,eventName,handler){
          if(node.addEventListener){
            node.addEventListener(eventName,handler)
          }else if (node.attachListener) {
            node.attachListener("on"+eventName,handler)
          }
        },
        setCss:function(node,css){
          for(var key in css){
            node.style[key]=css[key]
          }
        },
        getStyle:function(){
          var style = null;
          if(window.getComputedStyle){
            style = window.getComputedStyle()
          }
        }

      }

      //

      function DragElemet(node){
        this.node = node;
        this.x =0;
        this.y = 0;

      }
      DragElemet.prototype = {
        constructor:DragElemet,
        init: function(){

        },
        setXY:function(x,y){
          this.x = parseInt(x)||0;
          this.y = parseInt(y)||0;
          return this;
        },
        setEleCss: function(css){
          dom.setCss(this.node, css);
          return this;
        }
      }

  })(window, undefined);
