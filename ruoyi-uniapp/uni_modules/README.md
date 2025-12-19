# uni_modules 目录说明

此目录用于存放uni-app插件。

## 推荐插件

### 1. uView UI (可选)

一个全面且高质量的uni-app UI框架。

**安装方法**:

方式一: 通过HBuilderX插件市场安装
1. 打开HBuilderX
2. 工具 -> 插件安装 -> uni-app插件市场
3. 搜索"uview-ui"并导入

方式二: 通过npm安装 (uni-app CLI项目)
```bash
npm install uview-ui
```

然后在 `main.js` 中引入:
```javascript
import uView from 'uview-ui'
Vue.use(uView)
```

在 `App.vue` 中引入样式:
```vue
<style lang="scss">
@import 'uview-ui/index.scss';
</style>
```

**官方文档**: https://www.uviewui.com/

### 2. 其他推荐插件

- **uni-ui**: uni-app官方UI组件库
- **uni-simple-router**: 路由管理插件
- **luch-request**: 更强大的请求库
- **uni-read-pages**: 页面路径自动读取

## 注意事项

1. 插件安装后会自动存放在此目录
2. 建议使用插件市场的成熟插件，避免重复造轮子
3. 注意插件的兼容性和维护状态
4. 大型插件会增加包体积，按需引入

## 自定义组件

如需开发自定义插件，可参考uni-app插件开发规范:
https://uniapp.dcloud.net.cn/plugin/publish.html
