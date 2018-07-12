/**
 * 封装基本dom操作
 */

/**
 * 查找元素
 * @param {string} el 选择器
 * @return {element | element array}
 */
export const queryElement = el => {
    let els = document.querySelectorAll(el);
    if (els.length === 1) {
        return els[0];
    }
    return els;
};

/**
 * 查询是否包含或本身就是某元素
 * @param {element} parent
 * @param {element} child
 * @return {boolean} 是否包含
 */
export const has = (parent, child) => {
    while (child.parentElement) {
        if (parent === child) {
            return true;
        }
        child = child.parentElement;
    }
    return false;
};

/**
 * 阻止事件冒泡
 * @param {event} e
 */
export const cancelBubble = e => {
    if (e.cancelBubble) {
        e.cancelBubble();
        return;
    }
    e.stopPropagation();
};

export const getOffset = dom => {
    let _dom = dom;
    let offset = {
        left: 0,
        top: 0,
    };
    while (_dom.offsetParent && _dom.offsetParent != document.body) {
        offset.left += _dom.offsetLeft;
        offset.top += _dom.offsetTop;
        _dom = _dom.offsetParent;
    }
    return offset;
};

/*
 * 实现jQuery的closest功能
 * @author liyincheng
 * 现在只支持一个class的功能
 * closest('.parent')
 *
 */
export const closest = (dom, selector) => {
    if (!(dom instanceof HTMLElement)) {
        throw new Error('utils dom.closest need to be an HTMLElement');
    }
    if (typeof selector !== 'string') {
        throw new Error('selector should be a string');
    }
    const typeCheck = {
        class: /^\./,
        tag: /^[a-z]/
    };
    const matchCheck = {
        class(dom) {
            let className = selector.replace(/^\./, '');
            return dom.classList && dom.classList.contains(className);
        },
        tag(dom) {
            let reg = new RegExp(selector, 'i');
            return reg.test(dom.nodeName);
        }
    };
    let type = ''
    for (let key in typeCheck) {
        if (typeCheck[key].test(selector)) {
            type = key;
            break;
        }
    }
    if (!type) {
        console.warn('closest: unsupport selector type');
        return null;
    }
    while (dom !== document) {
        // TextNode没有classList
        if (matchCheck[type](dom)) {
            return dom;
        }
        dom = dom.parentNode;
    }
    return null;
};
