/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by laiyq@txtws.com on 2016/11/3.
	 */
	var UXCollector = __webpack_require__(/*! ./src/main */ 1);
	window.UXCollector = UXCollector;
	module.exports = UXCollector;

/***/ },
/* 1 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

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
	UXCollector.utils = __webpack_require__(/*! ./utils */ 3);
	
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
	__webpack_require__(/*! ./collectors/page_tracing */ 2)(UXCollector);
	module.exports = UXCollector;


/***/ },
/* 2 */
/*!****************************************!*\
  !*** ./src/collectors/page_tracing.js ***!
  \****************************************/
/***/ function(module, exports) {

	/**
	 * Created by laiyq@txtws.com on 2016/11/17.
	 */
	module.exports = function (UXCollector) {
	    UXCollector.addCollector("pageTracing", function (send) {
	        window.onload=function () {
	            
	        }
	        var data = {
	            //收集器名称
	            "collector":"pageTracing",
	            //当前页面地址：通过请求的referrer获取
	            // "url":"",
	            //页面来源地址
	            "referrer":"http://example.com/exmple-uri-1.html",
	            //页面加载时间,单位毫秒
	            "pageLoadTime":200
	            //用户标识，若需要请在beforeSend中添加，规范命名：userId
	        };
	        send(data);
	    })
	};

/***/ },
/* 3 */
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=ux-collector.js.map