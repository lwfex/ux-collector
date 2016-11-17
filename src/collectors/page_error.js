/**
 * 页面错误收集器
 * Created by laiyq@txtws.com on 2016/11/17.
 */
module.exports = function (UXCollector) {
    var collector = "pageError";
    UXCollector.addCollector(collector, function (send) {
        var oldErrorHandle = window.onerror;
        //全局异常捕获
        window.onerror = function () {
            var data = {
                //收集器名称
                "collector": collector,
                //错误信息
                "message": arguments[0],
                //错误文件
                "errorUrl": arguments[1],
                //错误行号
                "errorLine": arguments[2],
                //错误列号
                "errorColumn": arguments[3] || 0
            };

            send(data);

            if (oldErrorHandle instanceof Function) {
                oldErrorHandle.apply(this, arguments);
            }
        }
    });
};
