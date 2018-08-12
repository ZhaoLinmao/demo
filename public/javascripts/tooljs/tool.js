

/**
 * 获取菜单树插件编写
 * $("#treeView").mewNav(treeData);
 * treeView 展示菜单树的 ul id
 * treeData 数据的 List 数据
 */
(function ($) {
    $.fn.menuNav = function(treeData){
        var treeHtml = "";
        for(var i in treeData){
            var _pid = treeData[i].pid;
            var _id = treeData[i].id;
            if(_pid==0){
                if(checkChildTree(_id,treeData)){
                    treeHtml += getChildTreeData(_id,treeData,treeData[i]);
                }else{
                    treeHtml += "<li><a  href='#' class='am-cf' onclick='postRedirect(\""+treeData[i].url+"\")'><span class='"+treeData[i].icon+"'></span> "+treeData[i].name+"</a></li>";
                }
            }
        }
        $(this).append(treeHtml);
    };

    /**
     * 判断节点中是否包含子节点
     * @param pid  父节点的id
     * @param treeData  传入列表数据
     * @returns {boolean}  存在子节点返回 true 不存在子节点返回 false
     */
    function checkChildTree(pid,treeData){
        for(var i in treeData){
            var _pid = treeData[i].pid;
            if(_pid==pid){
                return true;
            }
        }
        return false;
    }

    /**
     * 获取子节点的树形结构
     * @type {string}  树形html代码
     */
    var treeHtml = "";
    function getChildTreeData(pid,treeData,treeJson){
        var tempHtml = "<li class='admin-parent'><a class='am-cf' data-am-collapse='{target: \"#collapse-nav"+treeJson.id+"\"}'><span class='"+treeJson.icon+"'></span> "+treeJson.name+"<span class='am-icon-star admin-icon-yellow am-margin-right am-fr'></span></a><ul class='am-list am-collapse admin-sidebar-sub am-in' id='collapse-nav"+treeJson.id+"'>";
        for(var i in treeData){
            var _pid = treeData[i].pid,
                _id = treeData[i].id;
            if(_pid==pid){
                if(checkChildTree(_id,treeData)){
                    tempHtml += getChildTreeData(_id,treeData,treeData[i]);
                }else{
                    tempHtml += "<li><a href='#' class='am-cf' onclick='postRedirect(\""+treeData[i].url+"\")'><span class='"+treeData[i].icon+"'></span> "+treeData[i].name+"</a></li>";

                }
            }
        }
        tempHtml += "</ul></li>";
        return tempHtml;
    }
})(jQuery);

/**
 * 获取树形数据
 * $.getTreeData(data);
 * treeData 展示bootstrap-tree树的数据
 * data 数据的 List 数据
 */
(function ($) {
    $.getTreeData = function (data){
        var treeData = [];
        for(var i in data){
            var _pid = data[i].pid;
            var _id = data[i].id;
            if(_pid==0){
                if(checkChildTree(_id,data)){
                    data[i].nodes = [];
                    data[i].nodes = getChildTreeData(_id,data);
                }
                data[i].text = data[i].name;
                treeData.push(data[i]);
            }
        }
        return treeData;
    };


    /**
     * 判断节点中是否包含子节点
     * @param pid  父节点的id
     * @param treeData  传入列表数据
     * @returns {boolean}  存在子节点返回 true 不存在子节点返回 false
     */
    function checkChildTree(pid,data){
        for(var i in data){
            var _pid = data[i].pid;
            if(_pid==pid){
                return true;
            }
        }
        return false;
    }

    /**
     * 获取子节点的树形结构
     * @type object {}  树形html代码
     */
    function getChildTreeData(pid,data){
        var treeData = [];
        for(var i in data){
            var _pid = data[i].pid,
                _id = data[i].id;
            if(_pid==pid){
                if(checkChildTree(_id,data)){
                    data[i].nodes = [];
                    data[i].nodes.push(getChildTreeData(_id,data));
                }
                data[i].text = data[i].name;
                treeData.push(data[i]);
            }
        }
        return treeData;
    }

})(jQuery);


/**
 * 获取zTree树形数据
 * $.getTreeData(data);
 * treeData 展示bootstrap-tree树的数据
 * data 数据的 List 数据
 */
(function ($) {
    $.getTreeData = function (data){
        var treeData = [];
        for(var i in data){
            var _pid = data[i].pid;
            var _id = data[i].id;
            if(_pid==0){
                if(checkChildTree(_id,data)){
                    data[i].nodes = [];
                    data[i].nodes = getChildTreeData(_id,data);
                }
                data[i].text = data[i].name;
                treeData.push(data[i]);
            }
        }
        return treeData;
    };


    /**
     * 判断节点中是否包含子节点
     * @param pid  父节点的id
     * @param treeData  传入列表数据
     * @returns {boolean}  存在子节点返回 true 不存在子节点返回 false
     */
    function checkChildTree(pid,data){
        for(var i in data){
            var _pid = data[i].pid;
            if(_pid==pid){
                return true;
            }
        }
        return false;
    }

    /**
     * 获取子节点的树形结构
     * @type object {}  树形html代码
     */
    function getChildTreeData(pid,data){
        var treeData = [];
        for(var i in data){
            var _pid = data[i].pid,
                _id = data[i].id;
            if(_pid==pid){
                if(checkChildTree(_id,data)){
                    data[i].nodes = [];
                    data[i].nodes.push(getChildTreeData(_id,data));
                }
                data[i].text = data[i].name;
                treeData.push(data[i]);
            }
        }
        return treeData;
    }

})(jQuery);

/**
 * Created by zlm on 2017/9/11.
 * 这是基于jQuery拓展的插件
 * 多用于框架的拓展
 */
function postRedirect(url,bodyDiv,param){
    var url = url||"/",
        bodyDiv = bodyDiv||"#admin-content-body",
        param = param||{};

    $.post(url,param,function(data){
        $(bodyDiv).empty().append(data);
    });
}

/**
 * 列表bootstap-table 生成
 * @param  url:获取列表数据 {"total":"128","rows":[{"field0":"行0","field1":"行1"},{"field0":"行0","field1":"行1"}]}
 * @param  tableName table 的位置   #talbe <table id="table"></table>
 * @param  toolbar   toolbar的位置  #toolbar <div id="toolbar"></div>
 * @param  columns
 *[{
 *   field: 'field15',//数据的column name
 *   title: 'Item ID',//数据的备注 name
 *   checkbox: true,//是否有checkbox框
 *   align: 'center',
 *   valign: 'middle',
 *   rowspan: 1,
 *   colspan: 1
 *   formatter:function(value,row,index){//数据信息处理
 *      return value;
 *   }
 *}]
 */
function initBootstrapTable(tableName,toolbar,url,columns){
    $(tableName).bootstrapTable('destroy').bootstrapTable({
        method:"post",
        url: url,
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true, //设置为 true 会有隔行变色效果
        pagination: true, //启动分页
        pageSize: 10, //每页显示的记录数
        pageNumber:1, //当前第几页
        pageList: [5, 10, 15, 20, 25,"ALL"], //记录数可选列表
        search: false, //是否启用查询
        showColumns: true, //显示下拉框勾选要显示的列
        minimumCountColumns:2,//过滤列时做少可以省下多少列
        showRefresh: true,//显示刷新按钮
        sidePagination:"server",//服务器端分页
        height: 500,//table高度
        clickToSelect:true,//点击行内数据 进行checkbox选中
        sortable: true,
        toolbar:toolbar,//查询工具 自定义空间
        paginationPreText: "上一页",//上一页下一页图标 可自定义
        paginationNextText: "下一页",//上一页下一页图标 可自定义
        maintainSelected:true,
        sortable:true,
        queryParams:function(params){//查询参数
            $(toolbar+" :input").each(function(i,e){
                if($(e).attr("name")!=undefined){
                    params[$(e).attr("name")] = $(e).val();
                }
            });
            return params;
        },
        showPaginationSwitch:false,//显示分页标签控制按钮
        showToggle:true,//选择性显示列 如果不想看到的列可以在此过滤掉
        cardView:false,//已卡片样式展示列表
        detailView:true,//详细列表显示 前面添加一个“ + ”点击可以看到详细列表
        detailFormatter:function(index,row){//详细信息拦截处理
            var result = "";
            for(var obj in row){
                if(row[obj]!=undefined) {
                    result += "<div class='col-md-3'>"+obj + ":" + row[obj] + "\n</div>";
                }else{
                    result += "<div class='col-md-3'>"+obj + ":\n</div>"
                }
            }
            return JSON.stringify(row);
        },

        showExport:true,//table导出   server 服务器分页只能导出当前页  client分页 可以按规则导出
        exportDataType: "selected",//导出文件 basic 是本页信息、all是所有信息、selected被选中信息
        columns: columns
    });
}

//改变radio的选择重新给隐藏属性赋值
function changeRadio($this,_id){
    $("#"+_id).val($($this).val());
}