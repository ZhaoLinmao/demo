

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
            var _parentId = treeData[i].parentId;
            var _id = treeData[i].id;
            if(_parentId==0){
                if(checkChildTree(_id,treeData)){
                    treeHtml += getChildTreeData(_id,treeData,treeData[i]);
                }else{
                    treeHtml += "<li><a  href='#' class='am-cf' onclick='postRedirect(\""+treeData[i].url+"\")'><span class='am-icon-table'></span>"+treeData[i].name+"</a></li>";
                }
            }
        }
        $(this).append(treeHtml);
    };

    /**
     * 判断节点中是否包含子节点
     * @param parentId  父节点的id
     * @param treeData  传入列表数据
     * @returns {boolean}  存在子节点返回 true 不存在子节点返回 false
     */
    function checkChildTree(parentId,treeData){
        for(var i in treeData){
            var _parentId = treeData[i].parentId;
            if(_parentId==parentId){
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
    function getChildTreeData(parentId,treeData,treeJson){
        var tempHtml = "<li class='admin-parent'><a class='am-cf' data-am-collapse='{target: \"#collapse-nav\"}'><span class='am-icon-file'></span>"+treeJson.name+"<span class='am-icon-star admin-icon-yellow am-margin-right am-fr'></span></a><ul class='am-list am-collapse admin-sidebar-sub am-in' id='collapse-nav'>";
        for(var i in treeData){
            var _parentId = treeData[i].parentId,
                _id = treeData[i].id;
            if(_parentId==parentId){
                if(checkChildTree(_id,treeData)){
                    tempHtml += getChildTreeData(_id,treeData,treeData[i]);
                }else{
                    tempHtml += "<li><a href='#' class='am-cf' onclick='postRedirect(\""+treeData[i].url+"\")'><span class='am-icon-check'></span>"+treeData[i].name+"</a></li>";

                }
            }
        }
        tempHtml += "</ul></li>";
        return tempHtml;
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
