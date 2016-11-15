# 用户体验信息收集

### 内置可搜集的信息
* 浏览器及版本
* 设备分辨率
* 页面性能
* 页面错误信息
* 访问URL及其Referrer

### 用法

直接引入
```html
<script src="../dist/ux-collector.js" data-collector-url="http://your-collector-server.com/c.gif"></script>
```

webpack项目中使用
```javascript
var UXCollector = require('ux-collector');
```