/**
 * 设备信息收集器
 * Created by laiyq@txtws.com on 2016/11/17.
 */
module.exports = function (UXCollector) {
    var collector = "deviceInfo";
    var cookieName = "uxcDeviceInfo";
    UXCollector.addCollector(collector, function (send) {
        UXCollector.utils.documentReady(function () {
            //一台设备值收集一次
            if (UXCollector.utils.Cookies.get(cookieName)) {
                return;
            }
            setTimeout(function () {
                collect(send);
                UXCollector.utils.Cookies.set(cookieName, 1, {expires: 365});
            }, 300);
        })
    });
    function collect(send) {
        var screen = window.screen;
        var data = {
            //收集器名称
            "collector": collector,
            //浏览器版本：通过请求头的User-Agent获取
            // "userAgent":""
            //分辨率宽度
            "width": screen.width,
            //分辨率高度
            "height": screen.height,
            //可用宽度
            "availWidth": screen.availWidth,
            //可用高度
            "availHeight": screen.availHeight
        };
        send(data);
    }
};
