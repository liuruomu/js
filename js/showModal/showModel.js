(function(){
  if(typeof showModel=='undefined'||showModel==null){
    showModel={}
  }

//注意设置modalDiv与backDiv的height/width，确保能正确初始化位置

  var _showModel=function(options){

    this.backDiv = document.getElementById(options._back);
		this.modalDiv = document.getElementById(options._modal);
		this.titleDiv = document.getElementById(options._title);

    var me=this;

    var _init=function(){
      _centerModel();
    }
    var _centerModel = function(){
      if(me.backDiv&&me.modalDiv&&me.titleDiv){
        me.backDiv.style.display="block";
        var backWidth = me.backDiv.offsetWidth;
        var backHeight = me.backDiv.offsetHeight;
        //获取弹框大小
        var modalWidth = me.modalDiv.offsetWidth;
        var modalHeight = me.modalDiv.offsetHeight;
        //弹框位置
        var leftPos =  backWidth / 2  - modalWidth / 2;
        var topPos =  backHeight / 2 - modalHeight / 2;
        leftPos  = leftPos < 5 ? 5 : leftPos;
        topPos = topPos < 5 ? 5 : topPos;
        me.modalDiv.style.position="absolute"//初始化也要设置，否则left/top设置无效
        me.modalDiv.style.left = leftPos + "px";
        me.modalDiv.style.top = topPos + "px";
      }
    }
      _init();


  if(window.addEventListener){
     window.addEventListener('resize', _centerModel);
  }else{
    window.attachEvent('onresize',_centerModel);
  }

    var oDrag = new Drag(me.modalDiv, {handle:me.titleDiv, maxContainer:me.backDiv});
 }
 function Drag() {
   //初始化
   this.initialize.apply(this, arguments)
}
Drag.prototype = {
   //初始化
   initialize: function(drag, options) {
       this.drag = this.$(drag);
       this._x = this._y = 0;
       this._moveDrag = this.bind(this, this.moveDrag);
       this._stopDrag = this.bind(this, this.stopDrag);

       this.setOptions(options);

       this.handle = this.$(this.options.handle);
       this.maxContainer = this.$(this.options.maxContainer);

       this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
       this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;

       this.limit = this.options.limit;
       this.lockX = this.options.lockX;
       this.lockY = this.options.lockY;
       this.lock = this.options.lock;

       this.onStart = this.options.onStart;
       this.onMove = this.options.onMove;
       this.onStop = this.options.onStop;

       this.handle.style.cursor = "move";

       this.changeLayout();

       this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
   },
   changeLayout: function() {
       this.drag.style.top = this.drag.offsetTop + "px";
       this.drag.style.left = this.drag.offsetLeft + "px";
       this.drag.style.position = "absolute";//只有relative或者absolute才能拖动
       this.drag.style.margin = "0"
   },
   startDrag: function(event) {
       var event = event || window.event;

       this._x = event.clientX - this.drag.offsetLeft;
       this._y = event.clientY - this.drag.offsetTop;

       this.addHandler(document, "mousemove", this._moveDrag);
       this.addHandler(document, "mouseup", this._stopDrag);

       event.preventDefault && event.preventDefault();
       this.handle.setCapture && this.handle.setCapture();

       this.onStart()
   },
   moveDrag: function(event) {
       var event = event || window.event;

       var iTop = event.clientY - this._y;
       console.log('iTop',iTop);
       var iLeft = event.clientX - this._x;


       if (this.lock) return;
       console.log('maxTop',this.maxTop);
       console.log('maxLeft',this.maxLeft);

       this.limit && (iTop < 5 && (iTop = 5), iLeft < 5 && (iLeft = 5), iTop > this.maxTop - 5 && (iTop = this.maxTop - 5), iLeft > this.maxLeft - 5 && (iLeft = this.maxLeft - 5));


       console.log('iLeft',iLeft)
       this.lockY || (this.drag.style.top = iTop + "px");
       this.lockX || (this.drag.style.left = iLeft + "px");
       console.log('this.drag',this.drag.style.left);

       event.preventDefault && event.preventDefault();

       this.onMove()
   },
   stopDrag: function() {
       this.removeHandler(document, "mousemove", this._moveDrag);
       this.removeHandler(document, "mouseup", this._stopDrag);

       this.handle.releaseCapture && this.handle.releaseCapture();

       this.onStop()
   },
   //参数设置
   setOptions: function(options) {
       this.options = {
           handle: this.drag, //事件对象
           limit: true, //锁定范围
           lock: false, //锁定位置
           lockX: false, //锁定水平位置
           lockY: false, //锁定垂直位置
           maxContainer: document.documentElement || document.body, //指定限制容器
           onStart: function() {}, //开始时回调函数
           onMove: function() {}, //拖拽时回调函数
           onStop: function() {} //停止时回调函数
       };
       for (var p in options) this.options[p] = options[p]
   },
   //获取id
   $: function(id) {
       return typeof id === "string" ? document.getElementById(id) : id
   },
   //添加绑定事件
   addHandler: function(oElement, sEventType, fnHandler) {
       return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
   },
   //删除绑定事件
   removeHandler: function(oElement, sEventType, fnHandler) {
       return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
   },
   //绑定事件到对象
   bind: function(object, fnHandler) {
       return function() {
           return fnHandler.apply(object, arguments)
       }
   }
};

showModel.show = function(back,modal,title){
  var options={
    _back:back,
    _modal:modal,
    _title:title
  }
      _showModel(options)
 }
})()
