// 思路重新构思，增加维护性
// ../config.yaml 文件也在这里处理~
{
    listenerExtra.add(window, 'load', function () {
        console.log(WebsiteConfig);
        var elementArr, languageJson;
        elementArr = document.getElementsByClassName('mTranslation');
        languageJson = JSON.parse(interface.url('GET', "./language/".concat(WebsiteConfig['websiteInfo']['isCustom'] ? 'custom' : navigator.language, ".json")));
        for (var i = 0; i < elementArr.length; i++) {
            var element = elementArr[i];
            var oriText = element.getAttribute('oriText');
            {
                var prefixWords = oriText.split('$')[1].split('-');
                switch (prefixWords[0]) {
                    case 'pf':
                        element.innerHTML = oriText.replace("$".concat(oriText.split('$')[1], "$"), languageJson['prefix'][prefixWords[1]]).replace("$~data$", WebsiteConfig['personalInfo'][prefixWords[1]]);
                        break;
                    default:
                        element.innerHTML = languageJson[prefixWords[0]];
                        break;
                }
            }
        }
    });
}
