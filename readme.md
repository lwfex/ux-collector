# 用户体验信息收集

### 内置收集器能收集的信息
* 浏览器及版本
* 设备分辨率
* 页面加载时间
* 页面错误信息
* 访问URL及其Referrer

这些信息通过几个收集器发送到指定的服务端。

## 内置的收集器

### 页面追踪
当页面加载完成，默认将下面定义的信息发送到服务端。

```javascript
var data = {
    //收集器名称
    "collector":"pageTracing",
    //当前页面地址
    "url":"http://example.com/exmple-uri.html",
    //页面来源地址
    "referrer":"http://example.com/exmple-uri-1.html",
    //页面加载时间,单位毫秒
    "pageLoadTime":200
    //用户标识，若需要请在beforeSend中添加，规范命名：userId
}
```

### 页面错误
使用window.onerror捕获错误信息发送到服务端。

```javascript
var data = {
    //收集器名称
    "collector":"pageError",
    //当前页面地址
    "url":"http://example.com/exmple-uri.html",
    //浏览器
    "browser":"chrome",
    //浏览器版本
    "browserVersion":"54.0.14.123",
    //错误信息
    "message":"error-message",
    //错误文件
    "errorUrl":"string",
    //错误行号
    "errorLine":123,
    //错误列号
    "errorColumn":10
}
```

### 设备信息
当页面完成加载并还未发送（发送标记写在cookie）时，会将设备的信息发送到服务端。

```javascript
var data = {
    //收集器名称
    "collector":"deviceInfo",
    //操作系统
    "OS":"Windows NT 10.0",
    //浏览器
    "browser":"chrome",
    //浏览器版本
    "browserVersion":"54.0.14.123",
    //分辨率的宽
    "width":1920,
    //分辨率的高
    "height":1080,
    //色深
    "pixelDepth":24
}
```

### 用法

html方式引入
```html
<script src="../dist/ux-collector.js"></script>
```

npm方式引入
```javascript
var UXCollector = require('ux-collector');
```
#### 自定义收集器

```javascript
UXCollector.addCollector("your-collector-name",function(send){
    send(data);
});
```

收集器配置及启动
```javascript
UXCollector.setConfig({
    server:'http://your-collector-server.com/c.gif'
}).start();
```

#### 配置说明
| 参数 | 类型 | 默认值 | 说明 |
| ---- |:----:|:------:| ---- |
| server | string | - | 收集器的服务端地址 |
| collectors | array | - | 启用的收集器，默认启用所有 |
| beforeSend | callback | - | function(collector,data){...} 收集器发送信息前会调用，如果返回的是false表示不发送这一次收集 |
