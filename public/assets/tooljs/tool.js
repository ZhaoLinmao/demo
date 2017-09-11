/**
 * Created by zlm on 2017/9/11.
 * 这是基于jQuery拓展的插件
 * 多用于框架的拓展
 */

$.extend({
    postRedirect : function(table){
        var thisTable = $("#" + table);

        $(thisTable).find("tr").bind("mouseover", function () {
            $(this).css({ color: "#ff0011", background: "blue" });
        });
        $(thisTable).find("tr").bind("mouseout", function () {
            $(this).css({ color: "#000000", background: "white" });
        });
    }
});

(function ($) {
    $.fn.menuNav = function(options){
        var defaults = {
            evenRowClass:"evenRow",
            oddRowClass:"oddRow",
            activeRowClass:"activeRow"
        }
        var options = $.extend(defaults, options);
        this.each(function(){
            var thisTable=$(this);
            $(thisTable).find("tr").bind("mouseover", function () {
                $(this).css({ color: "#ff0011", background: "blue" });
            });
            $(thisTable).find("tr").bind("mouseout", function () {
                $(this).css({ color: "#000000", background: "white" });
            });
        });
    };
})(jQuery);
