/**
 * Created by zhaodesheng on 2019/06/27.
 */

 /**
  * 
  * @param {Number} n: 需要补齐两位数的数字
  * @return {String} String: 前面用0补齐的两位或多位数字，字符类型。如: 2->02 12->12
  */
 export function doubleNum(n) {
    const str = "" + n;
    // return str[1] ? str : `0${str}`;
　　 return str.padStart(2, "0");
}

/**
 * 
 * @param {*} timestamp 时间戳或者时间对象，以及可以转换成时间对象的字符串
 * @param {String} sep 分隔符，如："-"、"/"   默认是"-"
 * @return 日期格式的字符串 如：2018-09-04     2018/09/04
 */
export function date(timestamp, sep = "-") {
    const _date = new Date(timestamp);
    const year = _date.getFullYear();
    const month = _date.getMonth() + 1;
    const day = _date.getDate();
    return [year, month, day].map(doubleNum).join(sep);
}

/**
 * 
 * @param {String} timestamp 时间戳或者时间对象，以及可以转换成时间对象的字符串
 * @param {String} sep 分隔符，如：":"   默认是":"
 * @return 时间格式的字符串 如：10:52:08
 */
export function time(timestamp, sep = ":") {
    const _date = new Date(timestamp);
    const hours = _date.getHours();
    const minutes = _date.getMinutes();
    const seconds = _date.getSeconds();
    return [hours, minutes, seconds].map(doubleNum).join(sep);
}

/**
 * 
 * @param {*} timestamp 时间戳或者时间对象，以及可以转换成时间对象的字符串
 * @param {String} dateSep 日期分隔符，如："-"、"/"   默认是"-"
 * @param {String} timeSep 时间分隔符，如：":"   默认是":"
 * @return 时间格式的字符串 如：2018-09-04 10:52:08
 */
export function dateTime(timestamp, dateSep = "-", timeSep = ":") {
    return date(timestamp, dateSep) + " " + time(timestamp, timeSep);
}

/**
 * 
 * @param {*} timestamp 可以转换成日期的任何值
 */
export function getItems(timestamp){
    const _date = new Date(timestamp);
    return {
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDate(),
        hours: _date.getHours(),
        minutes: _date.getMinutes(),
        seconds: _date.getSeconds()
    }
}
/**
 * 
 * @param {*} timestamp 可以转换成日期的任何值
 * @param {String} formateStr 年月日用大写的字母，时分秒用小写的，年四个Y，其他的是两个
 * @param {Boolean} isDoubleNum 月和日是否补齐两位数
 */
export function format(timestamp, formateStr="YYYY年MM月DD日", isDoubleNum = false){
    let {year, month, day, hours, minutes, seconds} = getItems(timestamp);
    if(isDoubleNum){
        [year, month, day, hours, minutes, seconds] = [year, month, day, hours, minutes, seconds].map(doubleNum);
    }
    return formateStr.replace(/YYYY|MM|DD|hh|mm|ss/g, function ($) {
        switch($){
            case "YYYY": 
                return year; 
            case "MM": 
                return month; 
            case "DD": 
                return day; 

            case "hh": 
                return hours; 
            case "mm": 
                return minutes; 
            case "ss": 
                return seconds; 
            default: return $;
        }
    });
}

export default {
    doubleNum,
    date,
    time,
    dateTime,
    format,
    getItems
}