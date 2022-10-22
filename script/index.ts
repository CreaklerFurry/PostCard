// readme
// 对于 avatar element 的处理：
// 当 viewWidth >= viewHeight*2 时，支持悬浮操作
// 当 viewWidth < viewHeight*2 时，支持单击变换操作
// 对于移动端：
// 则采用 单击变换 操作。
// 对于 Desktop Table 类端：
// 则采用 悬浮操作；若viewWidth < viewHeight*2 时，支持单击变换
var OCavatarImage, viewAccountRect, viewAccount, viewInfomation;
var WebsiteConfig: object;
var interface = {//写个方法类集合
    isMobile: () => { // 包括 ios android 等
        return /Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    setElementStyle: (element: any, styleName: string, styleData: any, beImportant?: boolean | true) => {
        element.style.setProperty(styleName, styleData, beImportant ? 'important': null);
    },
    getElementStyle: (element: any, styleName) => {
        return element.style.getProperty(styleName)
    },
    url: (method:string, url:string) => {
        let XHR = new XMLHttpRequest(), returnJson;
        XHR.open (method, url, false);
        XHR.onreadystatechange = () =>{
            if (XHR.readyState == 4 && (XHR.status == 200 || (XHR.status == 304))) {
                returnJson = XHR.responseText;
            } else {
                console.warn('WARN: 资源未找到!');
            };
        };
        XHR.send ();
        return returnJson;
    }
};

listenerExtra.add (window, 'load', () => {
    WebsiteConfig = JSON.parse(interface.url('GET', 'config.json'))
    {
        let applyTheme = document.createElement('link');
        applyTheme.rel = 'stylesheet';
        applyTheme.href = WebsiteConfig['websiteInfo']['theme'];
        document.getElementsByTagName('html')[0].appendChild (applyTheme);
    };
    {
        document.getElementById('originalCharacterAvatarImage')?.setAttribute('src', WebsiteConfig['websiteInfo']['oc-avater-rescoure-image']);
    };

    OCavatarImage = document.getElementById ('originalCharacterAvatarImage'); // 基础元素申明
    viewAccountRect = document.getElementById ('viewAccountRect');
    viewAccount = document.getElementById ('viewAccount');
    viewInfomation = document.getElementById ('viewInfomation');
    // ↓ avatarElement
    {
        if (interface.isMobile ()){
            viewAccountRect?.remove()
            listenerExtra.add (OCavatarImage, 'click', program.listener.avatarElement.mobileFeedback.click)
        }else{
            listenerExtra.add (viewAccountRect, 'mouseover', program.listener.avatarElement.desktopFeedback.over)
            listenerExtra.add (viewAccountRect, 'mouseout', program.listener.avatarElement.desktopFeedback.out)
        }
    }
})
let program = {
    listener: {
        avatarElement: {
            mobileFeedback: {
                click: () => {
                    console.log('clicked');
                    program.view.AccountAndInfoChange ();
                    interface.setElementStyle(OCavatarImage, 'left',
                    OCavatarImage.style.left == '-25%'? '50%': '-25%', true);
                }
            },
            desktopFeedback: {
                over: () => {
                    program.view.AccountAndInfoChange ();
                    interface.setElementStyle (OCavatarImage, 'left', '0', true)
                },
                out: () => {
                    program.view.AccountAndInfoChange ();
                    interface.setElementStyle (OCavatarImage, 'left', '50%', true)
                }
            },
        }
    },
    view: {
        AccountAndInfoChange: () => {
            let lastStatus = viewAccount.style.opacity;
            viewAccount.style.opacity = lastStatus == 0? 1: 0;
            viewInfomation.style.opacity = lastStatus == 0? 0: 1;
        }
    }
}