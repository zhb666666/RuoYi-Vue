# 组件说明

此目录用于存放自定义组件。

## 组件开发规范

### 1. 命名规范

- 组件文件夹使用小写字母加连字符: `my-component`
- 组件文件命名: `my-component.vue`
- 使用时: `<my-component></my-component>`

### 2. 目录结构

```
components/
├── my-component/
│   ├── my-component.vue
│   └── README.md
└── README.md
```

### 3. 组件模板

```vue
<template>
  <view class="my-component">
    <!-- 组件内容 -->
  </view>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    // 属性定义
  },
  data() {
    return {
      // 数据
    }
  },
  methods: {
    // 方法
  }
}
</script>

<style lang="scss" scoped>
.my-component {
  /* 样式 */
}
</style>
```

### 4. 使用方式

#### 页面中引入

```vue
<template>
  <view>
    <my-component :title="title"></my-component>
  </view>
</template>

<script>
import MyComponent from '@/components/my-component/my-component.vue'

export default {
  components: {
    MyComponent
  },
  data() {
    return {
      title: 'Hello'
    }
  }
}
</script>
```

#### 全局注册 (在main.js中)

```javascript
import MyComponent from '@/components/my-component/my-component.vue'
Vue.component('my-component', MyComponent)
```

## 推荐组件库

如需使用成熟的UI组件库，推荐:

### 1. uni-ui
- 官方组件库
- 安装: 插件市场导入
- 文档: https://uniapp.dcloud.io/component/uniui/uni-ui

### 2. uView UI
- 功能强大的第三方组件库
- 安装: npm或插件市场
- 文档: https://www.uviewui.com/

### 3. ColorUI
- 高颜值的UI组件库
- 适合快速开发
- 文档: https://github.com/weilanwl/ColorUI

## 自定义组件示例

### 常用组件

1. **列表项组件**: 统一的列表项样式
2. **加载组件**: loading、empty、error状态
3. **表单组件**: 统一的表单输入项
4. **卡片组件**: 通用卡片容器
5. **弹窗组件**: 自定义弹窗

### 开发建议

1. 组件应该职责单一，可复用
2. 使用props传递数据，使用events通信
3. 添加必要的注释和文档
4. 考虑多端兼容性
5. 注意性能优化

## 注意事项

1. uni-app中不支持所有Vue特性，需查阅文档
2. 小程序中有组件层级限制
3. 某些CSS特性可能不支持
4. 注意不同平台的条件编译

## 参考资源

- [uni-app组件开发](https://uniapp.dcloud.io/component/)
- [Vue组件基础](https://v2.cn.vuejs.org/v2/guide/components.html)
- [微信小程序自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
