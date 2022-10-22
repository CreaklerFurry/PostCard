// readme
// 对于 avatar element 的处理：
// 当 viewWidth >= viewHeight*2 时，支持悬浮操作
// 当 viewWidth < viewHeight*2 时，支持单击变换操作
// 对于移动端：
// 则采用 单击变换 操作。
// 对于 Desktop Table 类端：
// 则采用 悬浮操作；若viewWidth < viewHeight*2 时，支持单击变换
var OCavatarImage, viewAccountRect, viewAccount, viewInfomation;
var WebsiteConfig;
var interface = {
    isMobile: function () {
        return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    setElementStyle: function (element, styleName, styleData, beImportant) {
        element.style.setProperty(styleName, styleData, beImportant ? 'important' : null);
    },
    getElementStyle: function (element, styleName) {
        return element.style.getProperty(styleName);
    },
    url: function (method, url) {
        var XHR = new XMLHttpRequest(), returnJson;
        XHR.open(method, url, false);
        XHR.onreadystatechange = function () {
            if (XHR.readyState == 4 && (XHR.status == 200 || (XHR.status == 304))) {
                returnJson = XHR.responseText;
            }
            else {
                console.warn('WARN: 资源未找到!');
            }
            ;
        };
        XHR.send();
        return returnJson;
    }
};
listenerExtra.add(window, 'load', function () {
    var _a;
    WebsiteConfig = JSON.parse(interface.url('GET', 'config.json'));
    {
        var applyTheme = document.createElement('link');
        applyTheme.rel = 'stylesheet';
        applyTheme.href = WebsiteConfig['websiteInfo']['theme'];
        document.getElementsByTagName('html')[0].appendChild(applyTheme);
    }
    ;
    {
        (_a = document.getElementById('originalCharacterAvatarImage')) === null || _a === void 0 ? void 0 : _a.setAttribute('src', WebsiteConfig['websiteInfo']['oc-avater-rescoure-image']);
    }
    ;
    OCavatarImage = document.getElementById('originalCharacterAvatarImage'); // 基础元素申明
    viewAccountRect = document.getElementById('viewAccountRect');
    viewAccount = document.getElementById('viewAccount');
    viewInfomation = document.getElementById('viewInfomation');
    // ↓ avatarElement
    {
        if (interface.isMobile()) {
            viewAccountRect === null || viewAccountRect === void 0 ? void 0 : viewAccountRect.remove();
            listenerExtra.add(OCavatarImage, 'click', program.listener.avatarElement.mobileFeedback.click);
        }
        else {
            listenerExtra.add(viewAccountRect, 'mouseover', program.listener.avatarElement.desktopFeedback.over);
            listenerExtra.add(viewAccountRect, 'mouseout', program.listener.avatarElement.desktopFeedback.out);
        }
    }
});
var program = {
    listener: {
        avatarElement: {
            mobileFeedback: {
                click: function () {
                    console.log('clicked');
                    program.view.AccountAndInfoChange();
                    interface.setElementStyle(OCavatarImage, 'left', OCavatarImage.style.left == '0px' ? '50%' : '0px', true);
                }
            },
            desktopFeedback: {
                over: function () {
                    program.view.AccountAndInfoChange();
                    interface.setElementStyle(OCavatarImage, 'left', '0', true);
                },
                out: function () {
                    program.view.AccountAndInfoChange();
                    interface.setElementStyle(OCavatarImage, 'left', '50%', true);
                }
            }
        }
    },
    view: {
        AccountAndInfoChange: function () {
            var lastStatus = viewAccount.style.opacity;
            viewAccount.style.opacity = lastStatus == 0 ? 1 : 0;
            viewInfomation.style.opacity = lastStatus == 0 ? 0 : 1;
        }
    }
};
