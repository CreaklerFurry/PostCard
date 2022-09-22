console.log ('Current Device Is Desktop')
const curDeviceObj = functionEx.getDeviceType ()
if (curDeviceObj.currentDevice || curDeviceObj.detectDevice == 'Mobile')
{
    let isGoOn = confirm (`
    目前使用的是 Mobile 进行浏览 Desktop 版本
    会出现一些显示错位或溢出问题
    是否继续浏览?
    `)
    if (!isGoOn){
        location.pathname = '/device/mobile/mobileDevice.html'
    }
}
document.getElementById('avatar').onclick = () => {
    confirm (`
    QQ: 2937396379
    WeChat: None
    Blog: https://qianshi-oristudio.github.io/
    twitter: https://twiiter.com/@creakler1
    BiliBili: None
    `)
}