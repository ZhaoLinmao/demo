/**
 * Created by zlm on 2017/9/4.
 */
;
/**
 * 日期处理工具
 */
var dateUtil = function(){

};

dateUtil.prototype = {
    /**
     * 获取两个 日期相差的天数
     * @param params  params.startDate 与 params.endDate 两个参数
     */
    getDays:function(params){
        if(!params instanceof Object){
            params = JSON.stringify(params);
        }
        /**
         *  入参格式 开始时间 2012-12-12或者2012/12/12
         */
        var startDate = params.startDate;

        /**
         *  入参格式 结束时间 2012-12-12或者2012/12/12
         */
        var endDate = params.endDate;

        /**
         * 把相差的毫秒数转换为天数
         */
        return Math.abs(new  Date(startDate) -  new  Date(endDate)) /1000 /60 /60 /24;
    }

};

module.exports = dateUtil;



