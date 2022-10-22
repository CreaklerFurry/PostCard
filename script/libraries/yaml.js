/**
 * yaml 解析简单实现
 */
var pos = 0;
/**
* token
* @returns
*/
function getNextToken() {
    if (pos == len) {
        return {
            type: "EOF"
        };
    }
    skipSpace();
    var c = yaml[pos];
    if (isString(c)) {
        return getString();
    }
    pos++;
    return {
        val: c,
        type: c
    };
}
/**
* next but do not changed
* @param n
* @returns
*/
function peek(n) {
    skipSpace();
    return yaml[pos];
}
function skipSpace() {
    var c = yaml[pos];
    while (isSpace(c) && pos < len) {
        pos++;
        c = yaml[pos];
    }
}
function isSpace(c) {
    return c == ' ' || c == '\t' || c == '\n';
}
function getString() {
    var c = yaml[pos];
    var str = "";
    //没有考虑转义字符
    while (isString(c) && pos < len) {
        str += yaml[pos];
        pos++;
        c = yaml[pos];
    }
    return {
        val: str,
        type: "str"
    };
}
function isString(c) {
    return !isSpace(c) && !isSpecial(c);
}
function isSpecial(c) {
    return c == ':' || c == '-';
}
//can be simple type kv array
function getYaml() {
    var currentToken = getNextToken();
    while (currentToken.type != "EOF") {
        if (peek() == ':') {
            return getkv(currentToken);
        }
        if (currentToken.type == '-') {
            return getArray();
        }
        //string
        return currentToken.val;
    }
}
//键值对  其后不能是序列符号 
function getkv(currentToken) {
    var yaml = {};
    getNextToken();
    yaml[currentToken.val] = getYaml();
    while (peek() != "-" && currentToken.type != "EOF") {
        currentToken = getNextToken();
        getNextToken(); //check : or thorw error
        yaml[currentToken.val] = getYaml();
    }
    return yaml;
}
function getArray() {
    var a = [];
    a.push(getYaml());
    while (peek() == "-") {
        getNextToken(); //check -
        a.push(getYaml());
    }
    return a;
}
