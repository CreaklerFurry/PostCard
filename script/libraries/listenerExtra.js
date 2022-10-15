'use strict';
var listenerExtra = {
    add: function (element, detectEvent, listenerFunc, useCapture) {
        if (!!element.addEventListener) { // 兼容 IE8 before
            element.addEventListener(detectEvent, listenerFunc, useCapture);
        }
        else if (!!element.attachEvent) // here 报错了，错就错了，开摆
         {
            element.attachEvent("on".concat(detectEvent), listenerFunc);
        }
        else {
            return false;
        }
        return true;
    },
    remove: function (element, detectEvent, listenerFunc) {
        if (!!element.removeEventListener) { // 兼容 IE8 before
            element.removeEventListener(detectEvent, listenerFunc);
        }
        else if (!!element.detachEvent) // here 报错了，错就错了，开摆
         {
            element.detachEvent("on".concat(detectEvent), listenerFunc);
        }
        else {
            return false;
        }
        return true;
    }
};
