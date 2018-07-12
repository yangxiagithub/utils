/**
 * 公用函数
 * created by 张林均
 */
/**
 * json转为url query
 * @param {object} json
 */
export const json2query = json => {
    if (typeof json !== 'object') {
        throw new TypeError('json must be object!');
    }
    let str = '';
    Object.keys(json).map(key => {
        str += key + '=' + (typeof json[key] === 'object' ? JSON.stringify(json[key]) : json[key]);
        str += '&';
    });
    if (!str) {
        return '';
    }
    return '?' + str.slice(0, -1);
};

/**
 * url query 转为 json
 * @param {string} query
 */
export const query2json = query => {
    if (typeof query !== 'string') {
        throw new TypeError('query must be string!');
    }
    let obj = {};
    query.replace(/(\?|&)([^=]+)=([^&]+)/g, ($0, $1, $2) => {
        obj[$1] = $2;
    });
    return obj;
};

/**
 * 函数节流
 * @param {function} fn 业务函数
 * @param {number} wait 延迟时间
 * @param {object} options { leading => 一开始是否触发, trailing => 结束时是否出发 }
 *
 * @return {function} throttled
 */
export const throttle = function (fn, wait, options) {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) {
        options = {};
    }

    let later = () => {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        fn.apply(context, args);
        if (!timeout) {
            context = args = null;
        }
    };

    let throttled = function () {
        let now = new Date().getTime();
        if (!previous && options.leading === false) {
            previous = now;
        }
        let remaining = wait - (now - previous);
        let args = arguments;
        context = this;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            fn.apply(context, args);
            if (!timeout) {
                context = null;
                args = null;
            }
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
};

/**
 * 防抖函数
 * @param {function} fn 业务函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 是否首次执行
 *
 * @return {function} debounced
 *
 * 特殊说明，本函数支持取消防抖操作
 * @example
 *
 * let deb = debounce(handleScroll)
 * a.addEventListener('click', () => {deb.cancel()}) //点击a可以取消本次的防抖
 *
 */
export const debounce = (fn, wait, immediate) => {
    let timeout, result;

    let debounced = (...args) => {
        let context = this;

        if (timeout) {
            clearTimeout(timeout);
        }
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) {
                result = fn.apply(context, args);
            }
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

/**
 * 只允许函数触发一次
 *
 * @param {function} fn
 */
export function once(fn) {
    let called = false;
    return function () {
        if (!called) {
            called = true;
            fn.apply(this, arguments);
        }
    };
}
