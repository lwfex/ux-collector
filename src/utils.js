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
    }
};