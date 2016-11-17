/**
 * Created by laiyq@txtws.com on 2016/11/17.
 */
module.exports = {
    //获取完整的url
    getUrl: function (url, data) {
        data = data || {};
        var p = '';
        for (var i in data) {
            p += i + "=" + encodeURIComponent(data[i]) + "&";
        }
        if (p.length > 0) {
            p = (url.indexOf('?') > 0 ? "&" : "?") + p.substr(0, p.length - 1);
        }
        return url + p;
    },
    //DOM树已经加载完毕
    documentReady: function (callback) {
        ///兼容FF,Google
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function () {
                document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                callback();
            }, false)
        }
        //兼容IE
        else if (document.attachEvent) {
            document.attachEvent('onreadytstatechange', function () {
                if (document.readyState == "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    callback();
                }
            })
        }
        else if (document.lastChild == document.body) {
            callback();
        }
    }
};