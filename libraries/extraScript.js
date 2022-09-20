window.functionEx = {
    getDeviceType: () => {
        let e = navigator.userAgent, b;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e))
        {
            b = 'tablet';
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e)) 
        {
            b = 'mobile';
        }
        b = 'desktop';
        return {
            detectDevice: b,
            currentDevice: window.screen.availWidth < 768
        }
    },
    getInternetData: (url) => {
        let xhr = new XMLHttpRequest (), returnData;
        xhr.open (
            'GET', url, false
        )
        xhr.onreadystatechange = () =>{
            returnData = xhr.responseText
        }
        xhr.send (null)
        return returnData;
    }
}