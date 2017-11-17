/**
 * Created by zlm on 2017/9/4.
 */
;
/**
 * 日期处理工具
 */
var DateUtil = function(){
    if (!(this instanceof DateUtil)) {
        return new DateUtil();
    }
};

/**
 * 获取日期时间 年月日
 * @returns {{}}
 */
DateUtil.prototype.getYYMMDD = function(){
        var date,
            year,
            month,
            day,
        year = new Date().getFullYear();
        month = new Date().getMonth();
        day = new Date().getDay();
        date = year+"-"+month+"-"+day;
        return date;
};

/**
 * 获取日期时间 时分秒
 * @returns {{}}
 */
DateUtil.prototype.getHHMISS=function(){
    var date,
        hour,
        minutes,
        second;
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    second = new Date().getSeconds();
    date = hour+":"+minutes+":"+second;
    return date;
};

/**
 * 获取日期时间 年月日 时分秒
 * @returns {{}}
 */
DateUtil.prototype.getYYMMDDHHMISS=function(){
    var date,
        year,
        month,
        day,
        hour,
        minutes,
        second;
    year = new Date().getFullYear();
    month = new Date().getMonth();
    day = new Date().getDay();
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    second = new Date().getSeconds();
    date = year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+second;
    return date;
};

/**
 * 获取两个 日期相差的天数
 * @param params  params.startDate 与 params.endDate 两个参数
 */
DateUtil.prototype.getDays=function(params){
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
};


module.exports = DateUtil;



