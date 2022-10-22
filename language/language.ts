// 思路重新构思，增加维护性
// ../config.yaml 文件也在这里处理~
{
    listenerExtra.add (window, 'load', () => {
        console.log(WebsiteConfig);
        let elementArr, languageJson: object;
            elementArr = document.getElementsByClassName ('mTranslation');
            languageJson = JSON.parse (interface.url ('GET', `./language/${WebsiteConfig['websiteInfo']['isCustom']? 'custom':navigator.language}.json`));

        for (let i = 0; i < elementArr.length; i++) {
            let element = elementArr [i];
            let oriText: string = element.getAttribute('oriText');
            {
                let prefixWords = oriText.split ('$')[1].split ('-');
                switch (prefixWords[0]) {
                    case 'pf':
                        element.innerHTML = oriText.replace(`$${oriText.split ('$')[1]}$`,languageJson['prefix'][prefixWords[1]]).replace(`$~data$`,WebsiteConfig['personalInfo'][prefixWords[1]]);
                        break;
                    default:
                        element.innerHTML = languageJson[prefixWords[0]];
                        break;
                }
            }
        }
    })
}