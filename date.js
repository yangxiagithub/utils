/**
 * 日期的扩展方法
 */
/**
 * 格式化
 * @param {RegExp} reg
 * @param {Date} date
 */
export const dateformat = (fmt, date) => {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)); }
    }
    return fmt;
};

/**
 * 时间戳转为时间
 */
export const time2date = (time, fmt) => {
    let date;
    if (!fmt) {
        date = ' ';
        let days = Math.floor(time / (1000 * 60 * 60 * 24)),
            hours = Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes = Math.floor(time % (1000 * 60 * 60) / (1000 * 60));
        if (days) {
            date += days + '天 ';
        }
        if (hours) {
            date += hours + '小时 ';
        }
        if (minutes) {
            date += minutes + '分';
        }
    }
    if (fmt === 'hh:mm:ss') {
        date = '';
        let hours = Math.floor(time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes = Math.floor(time % (1000 * 60 * 60) / (1000 * 60)),
            seconds = Math.floor(time % (1000 * 60) / 1000);
        if ((hours + '').length < 2) {
            hours = '0' + hours;
        }
        if ((minutes + '').length < 2) {
            minutes = '0' + minutes;
        }
        if ((seconds + '').length < 2) {
            seconds = '0' + seconds;
        }
        date = `${hours}:${minutes}:${seconds}`;
    }
    return date;
};
