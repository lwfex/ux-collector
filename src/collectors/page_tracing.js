/**
 * 页面追踪收集器
 * Created by laiyq@txtws.com on 2016/11/17.
 */
module.exports = function (UXCollector) {
    UXCollector.addCollector("pageTracing", function (send) {
        UXCollector.utils.documentReady(function () {
            setTimeout(function () {
                collect(send);
            }, 300)
        })
    });
    function collect(send) {
        //页面加载时间
        var pageLoadTime = 0;
        if (performance && performance.timing) {
            pageLoadTime = performance.timing.domainLookupStart - performance.timing.domLoading;
        }

        var data = {
            //收集器名称
            "collector": "pageTracing",
            //当前页面地址：通过请求的referrer获取
            // "url":"",
            //页面来源地址
            "referrer": document.referrer,
            //页面加载时间,单位毫秒
            "pageLoadTime": pageLoadTime
            //用户标识，若需要请在beforeSend中添加，规范命名：userId
        };
        send(data);
    };
};