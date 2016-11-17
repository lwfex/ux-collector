/**
 * Created by laiyq@txtws.com on 2016/11/17.
 */
var UXCollector = {};
//所有收集器
var _collectorsHub = {};
//所有收集器名称
var _collectorsAll = [];

//服务地址
var _server = null;
//启用哪些收集器
var _collectors = [];
//发送前调用
var _beforeSend = null;

/**
 * 工具集
 */
UXCollector.utils = require('./utils');

/**
 * 配置
 * @param config
 * @returns {UXCollector}
 */
UXCollector.setConfig = function (config) {
    _server = config['server'];
    _collectors = config['collectors'] || [];
    _beforeSend = config['beforeSend'] || null;
    return this;
};

/**
 * 收集器启动
 */
UXCollector.start = function () {
    if (!_collectors.length) {
        _collectors = _collectorsAll;
    }
    //执行收集器
    for (var i = 0; i < _collectors.length; i++) {
        var collector = _collectors[i];
        if (_collectorsHub[collector] instanceof Function) {
            _collectorsHub[collector](function (data) {
                _send(collector, data);
            })
        }
    }
};

/**
 * 收集器
 * @param name
 * @param collectorFn
 */
UXCollector.addCollector = function (name, collectorFn) {
    if (!_collectorsHub[name]) {
        _collectorsAll.push(name);
    }
    _collectorsHub[name] = collectorFn;
};

/**
 * 发送器
 * @param collector
 * @param data
 * @private
 */
function _send(collector, data) {
    //发送拦截
    if (_beforeSend instanceof Function) {
        if (_beforeSend(collector, data) === false) {
            return;
        }
    }
    //发送
    (new Image()).src = UXCollector.utils.getUrl(_server, data);
}

/*----- 注册收集器 ----*/
//页面追踪
require('./collectors/page_tracing')(UXCollector);
//页面错误
require('./collectors/page_error')(UXCollector);
//设备信息
require('./collectors/device_info')(UXCollector);
module.exports = UXCollector;
