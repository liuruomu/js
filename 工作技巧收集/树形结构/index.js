//从后台获取数据
$scope.unitlistGetUnit = function() {
  //获取资产管理人
  unitlistService.getTamgr({body:{}},function(maidres) {
    maidres=maidres.data;
    if(maidres.msret.msgcode == "00") {
      $scope.maidList.splice(0,$scope.maidList.length);
      $scope.maidList = maidres.body;
      // 开始 -- 获取产品
      unitlistService.getTacap({body:{}},function(caidres) {
        caidres=caidres.data;
        if(caidres.msret.msgcode == "00") {
          // 开始 -- 获取策略组合
          $scope.caidList.splice(0,$scope.caidList.length);
          $scope.caidList = caidres.body;
          unitlistService.getTatrdDetail({body:{}},function(tridres) {
            tridres=tridres.data;
            if(tridres.msret.msgcode == "00") {
              $scope.tridList.splice(0,$scope.tridList.length);
              $scope.tridList = tridres.body;
              //构造树形结构
              $scope.unitList.splice(0,$scope.unitList.length);
              $scope.basicUnitList.splice(0,$scope.basicUnitList.length);
              $scope.unitlistMakeTreeFromList();

            }
            else {
              $scope.unitList.splice(0,$scope.unitList.length);
              $scope.basicUnitList.splice(0,$scope.basicUnitList.length);

              cms.message.error("获取策略组合失败."+tridres.msret.msg);
            }
          })
          //结束 -- 获取策略组合
        }
        else {
          //unitList是页面显示依赖的[]
          $scope.unitList.splice(0,$scope.unitList.length);
          //获取的maid/caid/trid的原始数据，作为一个备份，copy一份进行修改。
          $scope.basicUnitList.splice(0,$scope.basicUnitList.length);

          cms.message.error("获取产品失败."+caidres.msret.msg);
        }
      })
      // 结束 -- 获取产品
    }
    else {
      $scope.unitList.splice(0,$scope.unitList.length);
      $scope.basicUnitList.splice(0,$scope.basicUnitList.length);

      cms.message.error("获取资产管理人失败."+maidres.msret.msg);
    }
  })
  // 结束 -- 获取资产管理人
}

//将单元列表构造成树
//按照maid一个一个递归添加一个叶子节点（点击可实现增加xx）
$scope.unitlistMakeTreeFromList = function() {
  if($scope.maidList.length == 0) {
    var maidAdd = {};
    maidAdd.leaf = 0;
    maidAdd.show = true;
    maidAdd.fold = false;
    maidAdd.add = true;
    $scope.unitList.push(maidAdd);
    angular.forEach($scope.unitList,function(obj) {
      $scope.basicUnitList.push(obj);
    });
    if($scope.searchContent != "") {
      $scope.unitlistFilterUnit();
    }
    return ;
  }
  var temp = $scope.maidList[0];//从第一个开始
  temp.leaf = 0;
  temp.show = true;
  temp.fold = false;
  temp.add = false;
  $scope.unitList.push(temp);
  $scope.maidList.splice(0,1);
  for(var i = 0; i < $scope.caidList.length;) {
    if($scope.caidList[i].maid == temp.maid) {
      var temp1 = $scope.caidList[i];
      $scope.caidList.splice(i,1);
      temp1.leaf = 1;
      temp1.show = true;
      temp1.fold = false;
      temp1.add = false;
      $scope.unitList.push(temp1);
      for(var j = 0; j < $scope.tridList.length;) {
        if($scope.tridList[j].caid == temp1.caid) {
          var temp2 = $scope.tridList[j];
          $scope.tridList.splice(j,1);
          temp2.leaf = 2;
          temp2.show = true;
          temp2.fold = false;
          temp2.add = false;
          $scope.unitList.push(temp2);
        }
        else {
          j ++ ;
        }
      }
      var tatrdAdd = {};
      tatrdAdd.maid = temp.maid;
      tatrdAdd.caid = temp1.caid;
      tatrdAdd.currencyid = temp1.currencyid;
      tatrdAdd.briefcode = temp1.briefcode;
      tatrdAdd.curencychname = temp1.curencychname;
      tatrdAdd.curencyenname = temp1.curencyenname;
      tatrdAdd.leaf = 2;
      tatrdAdd.show = true;
      tatrdAdd.fold = false;
      tatrdAdd.add = true;
      $scope.unitList.push(tatrdAdd);
    }
    else {
      i ++;
    }
  }
  var caidAdd = {};
  caidAdd.maid = temp.maid;
  caidAdd.leaf = 1;
  caidAdd.show = true;
  caidAdd.fold = false;
  caidAdd.add = true;
  $scope.unitList.push(caidAdd);
  $scope.unitlistMakeTreeFromList();
}

//展开
$scope.unitlistUnfoldTable = function(index) {
  //如果是maid层
  if($scope.unitList[index].leaf == 0) {
    //资产管理人
    angular.forEach($scope.unitList,function(unit) {
      if(unit.leaf == 0 && unit.maid == $scope.unitList[index].maid) {
        unit.fold = false;//不折叠
      }
      else  if(unit.leaf == 1 && unit.maid == $scope.unitList[index].maid) {
        unit.show = true;//显示但不改变折叠属性
      }
      else if(unit.leaf == 2 && unit.maid == $scope.unitList[index].maid) {
        unit.show = !unit.fold;//根据自身折叠属性决定是否显示
      }
      else {}
    })
  }
  else if($scope.unitList[index].leaf == 1) {
    //产品
    angular.forEach($scope.unitList,function(unit) {
      if(unit.leaf == 1 && unit.caid == $scope.unitList[index].caid) {
        unit.fold = false;//改变折叠属性
      }
      else  if(unit.leaf == 2 && unit.caid == $scope.unitList[index].caid) {
        unit.fold = false;
        unit.show = true;
      }
      else {}
    })
  }
  else {}
}

//收起
$scope.unitlistFoldTable = function(index) {
  if($scope.unitList[index].leaf == 0) {
    //资产管理人
    angular.forEach($scope.unitList,function(unit) {
      if(unit.leaf == 0 && unit.maid == $scope.unitList[index].maid) {
        unit.fold = true;
      }
      else  if(unit.leaf != 0 && unit.maid == $scope.unitList[index].maid) {
        unit.show = false;//不需要改变caid/trid的折叠属性
      }
      else {}
    })
  }
  else if($scope.unitList[index].leaf == 1) {
    //产品
    angular.forEach($scope.unitList,function(unit) {
      if(unit.leaf == 1 && unit.caid == $scope.unitList[index].caid) {
        unit.fold = true;
      }
      else  if(unit.leaf == 2 && unit.caid == $scope.unitList[index].caid) {
        unit.fold = true;
        unit.show = false;
      }
      else {}
    })
  }
  else {}
}

//过滤单元
$scope.unitlistFilterUnit = function() {
  if($scope.searchContent == "") {
    $scope.unitList.splice(0,$scope.unitList.length);
    angular.forEach($scope.basicUnitList,function(obj) {
      obj.show = true;
      obj.fold = false;
      $scope.unitList.push(obj);
    })
  }
  else {
    $scope.unitList.splice(0,$scope.unitList.length);
    var temp = [];
    angular.forEach($scope.basicUnitList,function(unit) {
      temp.push(unit);
    })
    $scope.unitlistUnitFilter(temp);
  }
}

//构造过滤器
//先将找到的obj设置为show，然后根据maid/caid/trid不同的层，设置。maid层找到则显示整个maid/
//caid找到则显示该caid树和maid.trid找到，则显示对应的maid/caid
$scope.unitlistUnitFilter = function(arr) {
  angular.forEach(arr,function(obj) {
    if(obj.add == false) {
      if(obj.leaf == 0 && (obj.maid.indexOf($scope.searchContent) >= 0 || obj.maname.indexOf($scope.searchContent) >= 0)) {
        obj.show = true;
      }
      else if(obj.leaf == 1 && (obj.caid.indexOf($scope.searchContent) >= 0 || obj.caname.indexOf($scope.searchContent) >= 0)) {
        obj.show = true;
      }
      else if(obj.leaf == 2 && (obj.trid.indexOf($scope.searchContent) >=0  || obj.trname.indexOf($scope.searchContent) >= 0)) {
        obj.show = true;
      }
      else {
        obj.show = false;
      }
    }
    else {
      obj.show = true;
    }
  });
  angular.forEach(arr,function(maid) {
    if(maid.leaf == 0 && maid.add == false) {
      if(maid.show == true) {
        angular.forEach(arr,function(maidChild) {
          if(maidChild.maid == maid.maid) {
            maidChild.show = true;
          }
        })
      }
      else {
        angular.forEach(arr,function(caid) {
          if(caid.leaf == 1 && caid.add == false && caid.maid == maid.maid) {
            if(caid.show == true) {
              maid.show = true;
              angular.forEach(arr,function(caidChild) {
                if(caidChild.caid == caid.caid) {
                  caidChild.show = true;
                }
              })
            }
            else {
              angular.forEach(arr,function(tatrd) {
                if(tatrd.leaf == 2 && tatrd.add == false && tatrd.caid == caid.caid) {
                  if(tatrd.show == true) {
                    caid.show = true;
                    maid.show = true;
                  }
                }
              })
            }
          }
        })
      }
    }
  })
  for(var i = 0; i < arr.length;) {
    if(arr[i].add == false && arr[i].show == false) {
      arr.splice(i,1);
    }
    else {
      i ++;
    }
  }
  for(var j = 0; j < arr.length;) {
    if(arr[j].add == true) {
      if(arr[j].leaf == 1 && (j == 0 || arr[j-1].maid != arr[j].maid)) {
        arr.splice(j,1);
      }
      else if(arr[j].leaf == 2 && (j == 0 || arr[j-1].caid != arr[j].caid)) {
        arr.splice(j,1);
      }
      else {
        j ++;
      }
    }
    else {
      j ++;
    }
  }
  angular.forEach(arr,function(obj1) {
    obj1.fold = false;
    $scope.unitList.push(obj1);
  })
}

//刷新页面
$scope.unitlistRefresh = function() {
  $scope.unitlistGetUnit();
}
