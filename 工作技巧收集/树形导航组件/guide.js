/*
	使用directive cmsGuide说明
	在页面引入 <cms-guide></cms-guide>
	可传入属性：guide-data,guide-showid,guide-selectleaf,guide-selectlevel
	响应函数： guide-click
	说明：
		guide-data: 导航菜单列表,每个菜单必须包含 menuId,menuName,type(可选,目前支持 'maid','caid','trid','acid'),如果含有子菜单,则以属性 children:[]的形式构造
		      示例：menuList = [{menuId:'1',menuName:'测试',type:'maid',children:[{menuId:'1.1',menuName:'测试1.1'}]}] 注意：如果菜单不是叶子菜单，就算没有子菜单，也需要给出children : [] 属性
		  页面赋值：<cms-guide guide-data = "{{menuList}}"></cms-guide>
		guide-showid: 是否显示菜单id,值为 true(显示) 或 false(不显示)，如果不设置，默认为false
		  页面赋值：<cms-guide guide-showid = "true"></cms-guide>
		guide-selectleaf: 是否只能选择叶子菜单，值为 true 或 false ，如果不设置，默认为false
  		  页面赋值：<cms-guide guide-selectleaf = "true"></cms-guide>
		guide-selectlevel: 可选择到的最小层级,默认第一层,如果设置了guide-selectleaf == true,改参数无效
		guide-click: 点击菜单的响应 带出参数为menu,在响应函数中，形参必须给定menu，否则无法带出参数
		  页面赋值：<cms-guide guide-click = "myFunc(menu)"></cms-guide>
		guide-setmenu: 在父controller中设置菜单选中项，传入参数为层级id并用/分割,如 "1/10001/100010001"
		  页面赋值：<cms-guide guide-setmenu = "setMenu"></cms-guide>     注：setMenu 无需在父controller中额外定义
*/
angular.module('cmsDirective').directive('cmsGuide',function() {
	return {
		restrict: 'E',
 		templateUrl: '../js/directives/directive/cms-guide.html',
 	 	replace: false,
		scope : {
			guideData:'@',
			guideShowid: '@',
			guideSelectleaf: '@',
			guideSelectlevel: '@',
			guideSetmenu:'=',
			guideClick:'&',
			guideRefresh:'&'
		},
		link : function (scope, elem, attrs) {
			scope.guideList = [];
			scope.srcList = [];
			scope.showId = attrs.guideShowid == "true" ? true : false;
			scope.selectLeaf = attrs.guideSelectleaf == "true" ? true : false;
			scope.selectLevel = 1;
			scope.currentMenu = null;
			scope.currentMenuId = "";
			if(typeof attrs.guideSelectlevel != "undefined") {
				if(parseInt(attrs.guideSelectlevel,10) != NaN) {
					scope.selectLevel = parseInt(attrs.guideSelectlevel,10) >= 1 ? parseInt(attrs.guideSelectlevel,10) : 1;
				}
			}
			scope.filterContent = "";
			scope.watch = scope.$watch(function() {
				return attrs.guideData;
			},function(value) {
				scope.srcList = JSON.parse(value);
				var newGuide = [];
				scope.makeTree(scope.srcList,newGuide,null,1);
				scope.addTree(scope.guideList,newGuide);
				scope.guideChangeFoldState(scope.srcList,false,true);
				scope.guideList = newGuide;
				scope.guideFilterList();
			},true);
			scope.$on("$destroy", function() {
				scope.watch();
		    });
			scope.makeTree = function(srcArray,destArray,parent,level) {
				for(var i = 0; i < srcArray.length ; i ++) {
					var temp = srcArray[i];
					if(parent) {
						temp.parent = parent;
					}
					else {
						temp.parent = srcArray[i].menuId;
					}
					temp.level = level;
					temp.fold = false;
					if(level >= 2) {
						temp.fold = true;
					}
					temp.show = true;
					if(level > 2) {
						temp.show = false;
					}
					temp.filter = true;
					temp.select = false;
					if(scope.currentMenuId != "" && scope.currentMenuId == temp.menuId) {
						temp.select = true;
					}

					if(typeof srcArray[i].children != "undefined") {
						temp.leaf = false;
						temp.hasChild = srcArray[i].children.length == 0 ? false : true;
						destArray.push(temp);
						scope.makeTree(srcArray[i].children,destArray,srcArray[i].menuId,level + 1);
					}
					else {
						temp.leaf = true;
						temp.hasChild = false;
						destArray.push(temp);
					}
				}
			}

			scope.addTree = function(src,dest) {
				var key = 0;
				var j = 0;
				for(var i = 0; i < dest.length; i ++) {
					for(j = key ; j < src.length; ) {
						if(dest[i].menuId == src[j].menuId && dest[i].type == src[j].type) {
							dest[i].select = src[j].select;
							dest[i].fold = src[j].fold;
							key = j + 1;
							break;
						}
						else {
							j ++;
						}
					}
				}
			}

			scope.guideFoldTree = function(obj,event) {
				event.stopPropagation();
				obj.fold = !obj.fold;
				scope.guideChangeFoldState(obj.children,obj.fold,!obj.fold);
			}
			scope.guideChangeFoldState = function(array,fold,show) {
				for(var i = 0; i < array.length ; i ++) {
					array[i].show = show == false ? false : !fold;
					if(typeof array[i].children != "undefined") {
						scope.guideChangeFoldState(array[i].children,array[i].fold,show);
					}
				}
			}
			scope.guideClickMenu = function(obj) {
				if(scope.selectLeaf == true) {
					if(obj.leaf == true) {
						if(scope.currentMenu) {
							scope.currentMenu.select = false;
						}
						obj.select = true;
						scope.currentMenu = obj;
						scope.currentMenuId = obj.menuId;
						scope.guideClick({menu:obj});
					}
				}
				else {
					if(obj.level >= scope.selectLevel) {
						if(scope.currentMenu) {
							scope.currentMenu.select = false;
						}
						obj.select = true;
						scope.currentMenu = obj;
						scope.currentMenuId = obj.menuId;
						scope.guideClick({menu:obj});
					}
				}
			}

			scope.guideFilterList = function() {
				if(scope.filterContent == "") {
					angular.forEach(scope.guideList,function(guide) {
						guide.filter = true;
					})
				}
				else {
					angular.forEach(scope.guideList,function(guide) {
						guide.filter = false;
					})
					scope.makeFilter(scope.srcList,null,false);
				}
			}

			scope.makeFilter = function(array,parent,filter) {
				for(var i = 0; i < array.length ; i ++) {
					if(parent != null && filter == true) {
						array[i].filter = true;
						if(typeof array[i].children != "undefined") {
							scope.makeFilter(array[i].children,array[i],true);
						}
					}
					else {
						if(scope.showId == true && (String(array[i].menuName).indexOf(scope.filterContent) != -1 || String(array[i].menuId).indexOf(scope.filterContent) != -1)) {
							array[i].filter = true;
						}
						else if(String(array[i].menuName).indexOf(scope.filterContent) != -1) {
							array[i].filter = true;
						}
						else {}
						if(typeof array[i].children != "undefined") {
							scope.makeFilter(array[i].children,array[i],array[i].filter);
						}
						if(array[i].filter == true && parent != null) {
							parent.filter = true;
						}
					}
				}
			}

			scope.guideRefreshList = function() {
				scope.guideRefresh();
			}

			scope.guideSetmenu = function(menuPath) {
				var paths = String(menuPath).split('/');
				if(scope.currentMenu) {
					scope.currentMenu.select = false;
				}
				scope.setMenu(scope.srcList,paths);
			}
			scope.setMenu = function(menulist,paths) {

				if(paths.length <= 0) {
					return ;
				}
				var menuId = paths[0];
				paths.splice(0,1);
				for(var i = 0; i < menulist.length; i ++) {
					if(menulist[i].menuId == menuId) {
						if(paths.length  == 0) {
							menulist[i].select = true;
							scope.currentMenu = menulist[i];
							return ;
						}
						if(menulist[i].hasChild == true) {
							menulist[i].fold = false;
							scope.guideChangeFoldState(menulist[i].children,menulist[i].fold,!menulist[i].fold);
							scope.setMenu(menulist[i].children,paths);
						}
						return ;
					}
				}
			}

		}
	};
})
