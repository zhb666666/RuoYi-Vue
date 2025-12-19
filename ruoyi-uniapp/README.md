# 若依管理系统 - uni-app 版本

基于若依(RuoYi-Vue)管理系统的uni-app微信小程序版本。

## 项目简介

本项目是若依管理系统的uni-app改造版本，支持编译为微信小程序、H5、App等多个平台。主要用于移动端的系统管理功能。

## 技术栈

- **框架**: uni-app
- **前端框架**: Vue 2.x
- **状态管理**: Vuex
- **UI组件**: 原生组件 + 自定义组件
- **网络请求**: uni.request (封装)
- **后端**: Spring Boot (复用原若依后端API)

## 目录结构

```
ruoyi-uniapp/
├── api/                    # API接口目录
│   ├── login.js           # 登录相关API
│   └── system/            # 系统管理API
│       └── user.js        # 用户管理API
├── pages/                 # 页面目录
│   ├── index/            # 首页
│   ├── login/            # 登录页
│   ├── mine/             # 个人中心
│   ├── system/           # 系统管理页面
│   │   ├── user/        # 用户管理
│   │   ├── role/        # 角色管理
│   │   ├── menu/        # 菜单管理
│   │   ├── dept/        # 部门管理
│   │   ├── post/        # 岗位管理
│   │   ├── dict/        # 字典管理
│   │   ├── config/      # 参数设置
│   │   └── notice/      # 通知公告
│   └── monitor/          # 系统监控页面
│       ├── online/      # 在线用户
│       ├── job/         # 定时任务
│       ├── logininfor/  # 登录日志
│       └── operlog/     # 操作日志
├── static/               # 静态资源
│   ├── tabbar/          # tabbar图标
│   └── images/          # 图片资源
├── store/                # Vuex状态管理
│   ├── modules/         # 模块
│   │   └── user.js     # 用户模块
│   ├── getters.js      # getters
│   └── index.js        # store入口
├── utils/                # 工具函数
│   ├── auth.js          # 认证工具
│   ├── errorCode.js     # 错误码
│   ├── request.js       # 请求封装
│   └── ruoyi.js         # 若依工具函数
├── App.vue              # 应用配置
├── main.js              # 入口文件
├── manifest.json        # 应用配置文件
├── pages.json           # 页面配置
├── config.js            # 全局配置
└── package.json         # 依赖配置
```

## 功能特性

### 已实现功能
- ✅ 用户登录/退出
- ✅ 验证码登录
- ✅ Token认证
- ✅ 用户信息获取
- ✅ 首页概览
- ✅ 用户管理列表
- ✅ 个人中心
- ✅ 下拉刷新、分页加载

### 待开发功能
- ⏳ 角色管理
- ⏳ 菜单管理
- ⏳ 部门管理
- ⏳ 岗位管理
- ⏳ 字典管理
- ⏳ 参数设置
- ⏳ 通知公告
- ⏳ 在线用户
- ⏳ 定时任务
- ⏳ 登录日志
- ⏳ 操作日志
- ⏳ 个人信息修改
- ⏳ 密码修改

## 快速开始

### 环境要求

- Node.js 8.9+
- HBuilderX 或 uni-app CLI
- 微信开发者工具 (用于微信小程序开发)

### 安装依赖

```bash
cd ruoyi-uniapp
npm install
```

### 配置后端接口地址

修改 `config.js` 文件中的 `baseUrl`:

```javascript
module.exports = {
  baseUrl: 'http://localhost:8080',  // 修改为你的后端地址
  timeout: 10000
}
```

### 开发调试

#### 微信小程序

1. 使用 HBuilderX 打开项目
2. 运行 -> 运行到小程序模拟器 -> 微信开发者工具
3. 或使用命令行:
```bash
npm run dev:mp-weixin
```

#### H5

```bash
npm run dev:h5
```

#### App

```bash
npm run dev:app-plus
```

### 编译发布

#### 微信小程序

```bash
npm run build:mp-weixin
```
编译后的文件在 `dist/dev/mp-weixin` 或 `dist/build/mp-weixin` 目录

#### H5

```bash
npm run build:h5
```

## 微信小程序配置

在微信小程序管理后台配置以下内容:

### 1. 服务器域名配置

在 "开发 -> 开发管理 -> 开发设置 -> 服务器域名" 中添加:
- request合法域名: 添加你的后端API域名

### 2. 关闭开发环境不校验合法域名

开发阶段可以在微信开发者工具中:
- 详情 -> 本地设置 -> 不校验合法域名、web-view、TLS版本及HTTPS证书

### 3. 配置AppID

在 `manifest.json` 文件的 `mp-weixin` 节点下配置你的AppID:

```json
"mp-weixin": {
  "appid": "你的微信小程序AppID",
  ...
}
```

## API接口说明

本项目复用若依后端的API接口，主要接口包括:

- `POST /login` - 用户登录
- `GET /getInfo` - 获取用户信息
- `POST /logout` - 退出登录
- `GET /captchaImage` - 获取验证码
- `GET /system/user/list` - 获取用户列表
- `GET /system/user/{userId}` - 获取用户详情
- `POST /system/user` - 新增用户
- `PUT /system/user` - 修改用户
- `DELETE /system/user/{userId}` - 删除用户

更多接口请参考若依后端API文档。

## 注意事项

1. **跨域问题**: 微信小程序不存在跨域问题，但H5需要配置代理或后端允许跨域
2. **Token存储**: 使用 `uni.setStorageSync` 存储在本地
3. **图片资源**: tabbar图标等静态资源需要使用本地路径或网络绝对路径
4. **分包加载**: 如果页面较多，建议配置分包以优化小程序体积
5. **权限管理**: 需要结合后端返回的权限标识进行页面和按钮权限控制

## 常见问题

### 1. 如何调试?

- 微信小程序: 使用微信开发者工具的调试功能
- H5: 使用浏览器开发者工具
- 真机调试: 使用HBuilderX的真机运行功能

### 2. 如何添加新页面?

1. 在 `pages` 目录下创建页面文件夹和vue文件
2. 在 `pages.json` 中注册新页面
3. 创建对应的API接口文件

### 3. 如何自定义主题?

修改 `App.vue` 中的全局样式，或在各页面的style中修改。

## 版本历史

- v3.9.1 (2024-xx-xx)
  - 初始化uni-app版本
  - 完成基础框架搭建
  - 实现登录、首页、用户管理等核心功能

## 相关链接

- [若依官网](http://ruoyi.vip)
- [uni-app官网](https://uniapp.dcloud.io)
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

## 开源协议

本项目遵循若依的 MIT 开源协议。

## 联系方式

如有问题或建议，请提交Issue或PR。
