# 若依前端uni-app改造说明文档

## 改造概述

本次改造将若依管理系统的前端从Vue 2 + Element UI的Web版本，改造为基于uni-app的多端版本，支持微信小程序、H5、App等多个平台。

改造遵循以下原则：
1. **保持后端不变**: 完全复用原有Spring Boot后端API
2. **保留核心功能**: 移植管理系统的核心功能到移动端
3. **适配移动场景**: 针对小屏幕优化UI和交互
4. **易于扩展**: 保持清晰的代码结构，便于后续开发

## 项目结构对比

### 原版本 (ruoyi-ui)

```
ruoyi-ui/
├── src/
│   ├── api/              # API接口
│   ├── assets/           # 静态资源
│   ├── components/       # 组件
│   ├── directive/        # 指令
│   ├── layout/           # 布局
│   ├── router/           # 路由
│   ├── store/            # Vuex
│   ├── utils/            # 工具
│   ├── views/            # 页面
│   └── main.js           # 入口
├── public/               # 公共资源
├── package.json
└── vue.config.js
```

### uni-app版本 (ruoyi-uniapp)

```
ruoyi-uniapp/
├── pages/                # 页面 (对应views)
├── static/               # 静态资源 (对应assets+public)
├── components/           # 组件
├── store/                # Vuex (保持一致)
├── utils/                # 工具 (保持一致)
├── api/                  # API接口 (保持一致)
├── uni_modules/          # uni-app插件
├── App.vue               # 应用配置
├── main.js               # 入口
├── pages.json            # 页面配置 (代替router)
├── manifest.json         # 应用配置
├── config.js             # 全局配置
└── package.json
```

## 主要改造内容

### 1. 项目配置

| 文件 | 原版本 | uni-app版本 | 说明 |
|------|--------|------------|------|
| 入口配置 | main.js + router/index.js | main.js + pages.json | uni-app使用pages.json配置路由 |
| 应用配置 | vue.config.js | manifest.json + vue.config.js | 增加manifest.json配置多端 |
| 环境变量 | .env.* | config.js | 简化配置方式 |

### 2. 路由系统

#### 原版本 (Vue Router)

```javascript
// router/index.js
const routes = [
  {
    path: '/system/user',
    component: () => import('@/views/system/user/index')
  }
]
```

#### uni-app版本

```json
// pages.json
{
  "pages": [
    {
      "path": "pages/system/user/index",
      "style": {
        "navigationBarTitleText": "用户管理"
      }
    }
  ]
}
```

路由跳转方式对比:

```javascript
// 原版本
this.$router.push('/system/user')

// uni-app版本
uni.navigateTo({
  url: '/pages/system/user/index'
})
```

### 3. UI组件替换

| 原版本 (Element UI) | uni-app版本 | 说明 |
|-------------------|------------|------|
| el-button | button | 原生button组件 |
| el-input | input | 原生input组件 |
| el-table | scroll-view + 自定义 | 列表展示 |
| el-form | form + 自定义验证 | 表单处理 |
| el-dialog | uni.showModal | 原生弹窗 |
| el-message | uni.showToast | 原生提示 |
| el-pagination | 自定义分页 | 自定义实现 |
| el-select | picker | 选择器 |
| el-date-picker | picker (mode="date") | 日期选择 |

### 4. 网络请求

#### 原版本 (axios)

```javascript
// utils/request.js
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(config => {
  // 请求拦截
})

service.interceptors.response.use(res => {
  // 响应拦截
})
```

#### uni-app版本

```javascript
// utils/request.js
const request = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: config.baseUrl + options.url,
      method: options.method,
      data: options.data,
      header: options.header,
      success: (res) => {
        // 响应处理
      },
      fail: (error) => {
        // 错误处理
      }
    })
  })
}
```

### 5. 状态管理 (Vuex)

Vuex部分基本保持一致，主要改动:

```javascript
// 原版本
import router from '@/router'
router.push('/login')

// uni-app版本
uni.reLaunch({
  url: '/pages/login/login'
})
```

### 6. 存储方式

| 功能 | 原版本 | uni-app版本 |
|------|--------|------------|
| Token存储 | js-cookie | uni.setStorageSync |
| 本地存储 | localStorage | uni.setStorageSync |
| 会话存储 | sessionStorage | uni.setStorageSync |

```javascript
// 原版本
import Cookies from 'js-cookie'
Cookies.set('token', token)

// uni-app版本
uni.setStorageSync('token', token)
```

### 7. 页面生命周期

| 原版本 (Vue) | uni-app版本 | 说明 |
|-------------|------------|------|
| created | onLoad | 页面加载 |
| mounted | onReady | 页面渲染完成 |
| - | onShow | 页面显示 |
| - | onHide | 页面隐藏 |
| beforeDestroy | onUnload | 页面卸载 |
| - | onPullDownRefresh | 下拉刷新 |
| - | onReachBottom | 上拉加载 |

### 8. 样式适配

#### 原版本
- 使用px、rem等单位
- 使用Element UI主题变量
- 支持完整CSS特性

#### uni-app版本
- 使用rpx响应式单位 (750rpx = 屏幕宽度)
- 自定义CSS样式
- 部分CSS特性受限

```css
/* 原版本 */
.container {
  width: 1200px;
  padding: 20px;
}

/* uni-app版本 */
.container {
  width: 100%;
  padding: 20rpx;  /* 使用rpx */
}
```

## 已实现功能

### ✅ 核心功能

1. **用户认证**
   - 登录 (用户名密码 + 验证码)
   - Token认证
   - 自动刷新Token
   - 登出

2. **首页**
   - 欢迎信息
   - 快捷菜单
   - 系统统计
   - 常用功能入口

3. **用户管理**
   - 用户列表查询
   - 分页加载
   - 用户搜索
   - 用户详情查看
   - 用户新增/编辑/删除

4. **个人中心**
   - 个人信息展示
   - 功能菜单
   - 退出登录

### 🔄 基础设施

1. **网络请求**
   - 请求/响应拦截
   - Token自动注入
   - 错误统一处理
   - 超时控制

2. **状态管理**
   - 用户信息管理
   - Token管理
   - 权限管理

3. **工具函数**
   - 日期格式化
   - 数据处理
   - 树形结构处理
   - 字典回显

4. **样式系统**
   - 全局通用样式
   - 响应式布局
   - 主题色彩

## 待开发功能

以下功能已创建页面占位，待后续开发:

### 系统管理
- [ ] 角色管理
- [ ] 菜单管理
- [ ] 部门管理
- [ ] 岗位管理
- [ ] 字典管理
- [ ] 参数设置
- [ ] 通知公告

### 系统监控
- [ ] 在线用户
- [ ] 定时任务
- [ ] 登录日志
- [ ] 操作日志

### 个人中心
- [ ] 个人信息编辑
- [ ] 修改密码
- [ ] 系统设置
- [ ] 关于我们

## 开发指南

### 添加新页面

1. **创建页面文件**

```bash
mkdir -p pages/system/newpage
touch pages/system/newpage/index.vue
```

2. **编写页面代码**

```vue
<template>
  <view class="container">
    <!-- 页面内容 -->
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {
    // 页面加载
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
}
</style>
```

3. **注册页面路由**

在 `pages.json` 中添加:

```json
{
  "path": "pages/system/newpage/index",
  "style": {
    "navigationBarTitleText": "新页面"
  }
}
```

4. **创建API接口**

```javascript
// api/system/newpage.js
import request from '@/utils/request'

export function listData(query) {
  return request({
    url: '/system/newpage/list',
    method: 'get',
    params: query
  })
}
```

### 样式开发建议

1. 使用rpx响应式单位
2. 遵循移动端设计规范
3. 参考已有页面的样式
4. 注意不同平台的差异

### 调试技巧

1. 使用console.log输出日志
2. 微信开发者工具的调试器
3. 真机调试
4. 网络请求监控

## 兼容性说明

### 支持平台

- ✅ 微信小程序
- ✅ H5
- ✅ App (需单独打包)
- ⚠️ 其他小程序 (需测试调整)

### 平台差异处理

使用条件编译:

```vue
<!-- #ifdef MP-WEIXIN -->
微信小程序专用代码
<!-- #endif -->

<!-- #ifdef H5 -->
H5专用代码
<!-- #endif -->

<!-- #ifdef APP-PLUS -->
App专用代码
<!-- #endif -->
```

## 性能优化

### 已实施

1. 按需加载页面
2. 图片懒加载
3. 列表分页加载
4. Token本地缓存

### 建议

1. 使用分包加载 (超过2MB时)
2. 优化图片资源
3. 减少请求次数
4. 使用缓存机制

## 注意事项

### 1. 小程序限制

- 包大小限制: 主包2MB，总包20MB
- 请求域名必须配置并使用HTTPS
- 不支持某些HTML5特性
- 存在层级限制

### 2. 开发规范

- 遵循uni-app开发规范
- 注意平台差异
- 编写注释和文档
- 保持代码整洁

### 3. 安全建议

- Token安全存储
- 接口权限验证
- 敏感信息加密
- 防止XSS攻击

## 相关资源

- [uni-app官方文档](https://uniapp.dcloud.io)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Vue 2.x官方文档](https://v2.cn.vuejs.org/)
- [若依官方文档](http://doc.ruoyi.vip)

## 更新日志

### v3.9.1 (2024-xx-xx)

**新增**
- ✨ 初始化uni-app项目结构
- ✨ 实现登录认证功能
- ✨ 实现首页功能
- ✨ 实现用户管理功能
- ✨ 实现个人中心功能
- ✨ 封装网络请求
- ✨ 集成Vuex状态管理
- ✨ 添加全局工具函数

**文档**
- 📚 添加README说明文档
- 📚 添加快速开始指南
- 📚 添加部署指南
- 📚 添加改造说明文档

**待开发**
- 🔜 其他系统管理功能
- 🔜 系统监控功能
- 🔜 个人中心详细功能

## 贡献指南

欢迎提交Issue和Pull Request！

### 提交Issue

请提供:
1. 问题描述
2. 复现步骤
3. 期望结果
4. 实际结果
5. 环境信息

### 提交PR

1. Fork项目
2. 创建特性分支
3. 提交代码
4. 发起Pull Request
5. 等待Review

## 联系方式

如有疑问，请通过以下方式联系:

- 提交Issue
- 查看若依官方文档
- 查看uni-app官方文档

---

感谢使用若依管理系统！
