# 若依管理系统 - uni-app 微信小程序版本

## 📱 项目简介

本项目是若依(RuoYi-Vue)管理系统的uni-app改造版本，专为移动端场景设计，支持编译为：
- 🔹 微信小程序
- 🔹 H5网页
- 🔹 App应用

## 📂 项目位置

uni-app版本代码位于项目根目录的 `ruoyi-uniapp/` 文件夹中。

## ✨ 特性

- ✅ **多端支持**: 一套代码，多端运行
- ✅ **完整功能**: 继承若依核心管理功能
- ✅ **原生体验**: 基于uni-app原生组件开发
- ✅ **轻量高效**: 体积小，性能优
- ✅ **易于扩展**: 清晰的代码结构，便于二次开发

## 🚀 快速开始

### 1. 目录说明

```
ruoyi-uniapp/          # uni-app版本前端
├── pages/            # 页面文件
├── static/           # 静态资源
├── store/            # 状态管理
├── utils/            # 工具函数
├── api/              # API接口
├── main.js           # 入口文件
├── App.vue           # 应用配置
├── pages.json        # 页面配置
├── manifest.json     # 应用配置
└── config.js         # 全局配置
```

### 2. 启动项目

**方式一: 使用HBuilderX (推荐)**

1. 下载并安装 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 用HBuilderX打开 `ruoyi-uniapp` 目录
3. 运行 -> 运行到小程序模拟器 -> 微信开发者工具

**方式二: 使用命令行**

```bash
cd ruoyi-uniapp
npm install
npm run dev:mp-weixin  # 微信小程序
npm run dev:h5         # H5
```

### 3. 配置后端地址

编辑 `ruoyi-uniapp/config.js`:

```javascript
module.exports = {
  baseUrl: 'http://localhost:8080',  // 后端API地址
  timeout: 10000
}
```

### 4. 测试账号

```
管理员: admin / admin123
普通用户: ry / admin123
```

## 📚 详细文档

进入 `ruoyi-uniapp/` 目录查看更多文档:

- [README.md](./ruoyi-uniapp/README.md) - 完整项目说明
- [QUICKSTART.md](./ruoyi-uniapp/QUICKSTART.md) - 5分钟快速开始
- [DEPLOYMENT.md](./ruoyi-uniapp/DEPLOYMENT.md) - 部署和发布指南

## 🎯 功能模块

### 已实现
- ✅ 用户登录/退出
- ✅ 首页概览
- ✅ 用户管理
- ✅ 个人中心
- ✅ Token认证
- ✅ 数据分页

### 开发中
- ⏳ 角色管理
- ⏳ 菜单管理
- ⏳ 部门管理
- ⏳ 岗位管理
- ⏳ 字典管理
- ⏳ 系统监控
- ⏳ 日志管理

## 🖼️ 页面预览

### 登录页
- 用户名密码登录
- 验证码验证
- 自动Token管理

### 首页
- 快捷菜单入口
- 系统统计概览
- 常用功能导航

### 用户管理
- 用户列表查询
- 用户增删改查
- 状态管理
- 分页加载

### 个人中心
- 个人信息展示
- 密码修改
- 退出登录

## 🛠️ 技术栈

- **框架**: uni-app
- **前端**: Vue 2.x + Vuex
- **UI**: 原生组件 + 自定义样式
- **后端**: Spring Boot (复用若依后端)
- **认证**: JWT Token

## 📦 编译发布

### 微信小程序

```bash
cd ruoyi-uniapp
npm run build:mp-weixin
```

将 `dist/build/mp-weixin` 目录通过微信开发者工具上传

### H5

```bash
npm run build:h5
```

将 `dist/build/h5` 目录部署到Web服务器

### App

使用HBuilderX进行云打包或本地打包

## ⚙️ 微信小程序配置

### 1. 申请小程序

访问 [微信公众平台](https://mp.weixin.qq.com/) 注册小程序账号

### 2. 配置AppID

在 `manifest.json` 中配置你的小程序AppID:

```json
{
  "mp-weixin": {
    "appid": "你的AppID",
    ...
  }
}
```

### 3. 配置服务器域名

在微信公众平台配置request合法域名（必须HTTPS）:
- 开发 -> 开发管理 -> 开发设置 -> 服务器域名

### 4. 开发调试

开发阶段可在微信开发者工具中关闭域名校验:
- 详情 -> 本地设置 -> 不校验合法域名

## 🤝 与原版本的关系

| 模块 | 原版本 (ruoyi-ui) | uni-app版本 (ruoyi-uniapp) |
|------|------------------|---------------------------|
| 后端 | 共用 | 共用 |
| 前端框架 | Vue 2 + Element UI | Vue 2 + uni-app |
| 运行环境 | Web浏览器 | 微信小程序/H5/App |
| 功能范围 | 完整管理后台 | 精简移动端功能 |
| UI组件 | Element UI | 原生组件 |
| 路由方式 | Vue Router | uni-app导航 |

两个版本可以同时使用：
- Web端使用 `ruoyi-ui` (管理后台)
- 移动端使用 `ruoyi-uniapp` (小程序/App)
- 共享同一个后端API

## ❓ 常见问题

### Q: uni-app版本和Web版本有什么区别?

A: 
- uni-app版本专为移动端设计，支持小程序、H5、App
- Web版本(ruoyi-ui)是完整的管理后台，功能更丰富
- 两者可以共存，共用同一个后端

### Q: 可以只使用uni-app版本吗?

A: 可以，但建议：
- 管理员使用Web版本进行复杂操作
- 移动场景使用uni-app版本进行查看和简单操作

### Q: 如何同时运行两个前端?

A:
```bash
# Web版本 (默认端口8080)
cd ruoyi-ui
npm run dev

# uni-app版本
cd ruoyi-uniapp
npm run dev:h5  # H5版本会使用不同的端口
```

### Q: 后端需要修改吗?

A: 不需要，uni-app版本完全复用原有的后端API。

## 📖 相关资源

- [若依官网](http://ruoyi.vip)
- [uni-app官网](https://uniapp.dcloud.io)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [HBuilderX下载](https://www.dcloud.io/hbuilderx.html)

## 📄 开源协议

本项目遵循若依的 MIT 开源协议。

## 💬 技术支持

如有问题或建议，请提交Issue。

---

⭐ 如果这个项目对你有帮助，欢迎Star支持！
