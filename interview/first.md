第一套面试题答案
===

	```
	var z= 10;
	function foo(){
	  console.log(z);
	}
	(function(funArg){
	  var z = 20;
	  funArg();
	  })(foo);
	```
  该代码的输出结果。

  答案：输出为10.
  原因：函数的作用域在它定义的时候就决定了。foo函数定义时，它只能访问外部的z。即使之后在自执行函数里面被调用，也无法访问自执行函数里面的z了.
  注意点：函数声明/函数表达式/匿名函数（也属于函数表达式）;/词法作用域。给个链接：
  函数声明：function fnName () {…};使用function关键字声明一个函数，再指定一个函数名，叫函数声明。

函数表达式 var fnName = function () {…};使用function关键字声明一个函数，但未给函数命名，最后将匿名函数赋予一个变量，叫函数表达式，这是最常见的函数表达式语法形式。

匿名函数：function () {}; 使用function关键字声明一个函数，但未给函数命名，所以叫匿名函数，匿名函数属于函数表达式，匿名函数有很多作用，赋予一个变量则创建函数，赋予一个事件则成为事件处理程序或创建闭包等等。

函数声明和函数表达式不同之处在于: 一、Javascript引擎在解析javascript代码时会‘函数声明提升'（Function declaration Hoisting）当前执行环境（作用域）上的函数声明，而函数表达式必须等到Javascirtp引擎执行到它所在行时，才会从上而下一行一行地解析函数表达式，二、函数表达式后面可以加括号立即调用该函数，函数声明不可以，只能以fnName()形式调用 。 

=== 

	```
	var data = [];
	for(var k=0;k<3;k++){
	  data[k]=function(){
	    console.log(k);
	  };
	}
	data[0]();
	data[1]();
	data[2]();
	```  
答案：3/3/3;
解析：执行循环的结果为data[0]/data[1]/data[2]=function();而function是个闭包，其中用的k是对k的引用。外部k变换时，k会变换，因此，最后所有的k都变为3;
注意点：循环函数中的闭包。  

===  
假设现有一篇文章，var content = "...大量文字"，
文章中触及到一些敏感词汇,如 ["习近平","周永康","中共","6.4"] 等内容。
如何在文章中发现这些敏感词，并将背景设置为红色或者改变字体颜色并标示出来。  
```
		<textarea id="inputContent" > </textarea>
	  <input type="button" value="转换" onclick="filter()"/>
	  <textarea id="showInput"></textarea>
		function filter() {

	  var inputContent = input.value;

	  var arrMg = ["习近平","周永康","中共","6.4"];

	  var showContent = inputContent;
	  for (var i = 0; i < arrMg.length; i++) {
	    var r = new RegExp(arrMg[i], "ig");
	    var newC='<span>'+arrMg[i]+'</span>'
	    showContent = showContent.replace(r, newC);
	  }

	  showInput.html(showContent);
	}


```
===  
JQuery 中 $fn.extend 函数的实现
```
	(function (win) {
	     var _$ = function (selector, context) {
	       return new _$.prototype.Init(selector, context);
	     }
	     _$.prototype = {
	       Init: function (selector, context) {

	       },
	       each: function (callback) {

	       }
	     }
	     _$.prototype.Init.prototype = _$.prototype;
	     _$.fn = _$.prototype;
	     var isObj = function (o) {
	       return Object.prototype.toString.call(o) === "[object Object]";
	     }
	     _$.fn.extend = function (obj) {
	       if (isObj(obj)) {
	         for (var i in obj) {
	           this[i] = obj[i];
	         }
	       }
	     }
	     _$.extend = function (obj) {
	       if (isObj(obj)) {
	         for (var i in obj) {
	           this[i] = obj[i];
	         }
	       }
	     }
	     window.$ = window.JQuery = _$;
	   })(window);

```
使用方法：
```
	$.fn.extend(
	     {

	         method:function(){
	     }

	})

	$.extend(
	     {
	        method:function(){
	     }
	})

```
解析：$.fn.extend是为查询的节点对象扩展方法，是基于$的原型扩展的方法。它作用的对象是$查询出的对象，$.extend是扩展常规方法，是$的静态方法。也就是对普通的对象进行操作。
