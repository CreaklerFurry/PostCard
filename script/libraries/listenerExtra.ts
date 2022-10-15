'use strict'
var listenerExtra = {
    add: (element: any, detectEvent: string, listenerFunc: any, useCapture?: boolean | AddEventListenerOptions | undefined) => {
        if (!!element.addEventListener) { // 兼容 IE8 before
            element.addEventListener (detectEvent, listenerFunc, useCapture);
        }else if (!!element.attachEvent) // here 报错了，错就错了，开摆
        {
            element.attachEvent (`on${detectEvent}`, listenerFunc)
        }else{
            return false;
        }
        return true
    },
    remove: (element: any, detectEvent: string, listenerFunc: any) => {
        if (!!element.removeEventListener) { // 兼容 IE8 before
            element.removeEventListener (detectEvent, listenerFunc);
        }else if (!!element.detachEvent) // here 报错了，错就错了，开摆
        {
            element.detachEvent (`on${detectEvent}`, listenerFunc)
        }else{
            return false;
        }
        return true
    },
}