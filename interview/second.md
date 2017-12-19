
===
## 列出 display 的值，并说明他们的作用.
答案：display的值有很多种，这里只列出常用的。
none:不显示，仍然占位；
block: 块级元素显示,可设置高度/行高/底边距；
inline: 默认内联元素，元素前后没有换行符，不可设置高度/行高，与行内其他元素的行高相同;
inline-block:  显示为行内，但内容为块级可设置行高等。
table: 元素作为块级表格来显示

## position 中，relative 和 absolute 的区别，包括使用时的注意事项和定位原点
答案：
http://blog.csdn.net/qq_17767355/article/details/51056809
讲得比较详细了。

## CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？CSS 3 新增的伪类有哪些？  
答案：
http://www.cnblogs.com/SHERO-Vae/p/5795729.html


##  new 操作符具体做了什么？
答案：  
```
      var obj = new Base();
      var obj = {};
      obj.__proto__ = Base.prototype;
      Base.call(obj);
```  

注意：
1. 对象有属性__proto__,指向该对象的构造函数的原型对象
2. 方法除了有属性__proto__,还有属性prototype,prototype指向该方法的原型对象。

##  请问三行 a，b，c 输出分别是什么？

```
   function fun(n,o){
             console.log(o)
             return{
                 fun:function(m){
                     return fun(m,n);
                 }
             };
     }
     var a = fun(0); a.fun(1); a.fun(2); a.fun(3);
     var b = fun(0).fun(1).fun(2).fun(3);
     var c = fun(0).fun(1); c.fun(2); c.fun(3);
```
答案：
刚看这题的时候有点蒙。然后反应过来之后发现真是。。。
首先a不会打印值，返回一个对象{fun:function(m){}}.a.fun(1)返回的是新函数fun(m,n),此时m=1,n=0.
相当于执行fun(1,0);自然是打印出0,并return 一个对象；
下面的以此类推。

##  输出分别为什么？

```
    var a = 100;
    function testResult(){
            var b = 2 * a;
            var a = 200;
            var c = a / 2;
            alert(b);
            alert(c);
    }
    testResult();
```

答案：nan, 100;

##  问输出结果为什么？

```
  var tt = "Mx x";
     function test(){
             alert(tt);
             var tt = "d d";
             alert(tt);
     }
     test();
```
答案：undefined, dd
