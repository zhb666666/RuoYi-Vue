# 快速开始

本文档将帮助你快速启动若依uni-app项目。

## 前置条件

确保已安装:
- Node.js 8.9+ 和 npm
- 微信开发者工具 (用于微信小程序开发)
- HBuilderX (推荐) 或 uni-app CLI

## 5分钟快速开始

### 1. 启动后端服务

确保若依后端服务已启动，默认端口为8080。

如果还未启动后端，请先启动：

```bash
# 在项目根目录
cd ruoyi-admin
mvn spring-boot:run

# 或直接运行
java -jar ruoyi-admin/target/ruoyi-admin.jar
```

后端服务启动后，访问 http://localhost:8080 确认服务正常。

### 2. 配置后端地址

编辑 `ruoyi-uniapp/config.js`:

```javascript
module.exports = {
  baseUrl: 'http://localhost:8080',  // 确认后端地址正确
  timeout: 10000
}
```

### 3. 安装依赖 (可选)

如果使用uni-app CLI方式开发:

```bash
cd ruoyi-uniapp
npm install
```

如果使用HBuilderX，可以跳过此步骤。

### 4. 启动项目

#### 方式A: 使用HBuilderX (推荐新手)

1. 打开HBuilderX
2. 文件 -> 打开目录 -> 选择 `ruoyi-uniapp` 目录
3. 运行 -> 运行到小程序模拟器 -> 微信开发者工具
4. 等待编译完成，微信开发者工具会自动打开

首次运行时，HBuilderX会提示设置微信开发者工具的路径，按提示设置即可。

#### 方式B: 使用命令行

```bash
cd ruoyi-uniapp

# 微信小程序
npm run dev:mp-weixin

# H5 (浏览器)
npm run dev:h5
```

然后:
- 微信小程序: 用微信开发者工具打开 `dist/dev/mp-weixin` 目录
- H5: 浏览器访问 http://localhost:8080

### 5. 关闭域名校验 (开发阶段)

在微信开发者工具中:
1. 点击右上角"详情"
2. 本地设置 -> 勾选"不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书"

### 6. 登录测试

默认测试账号:
- 用户名: `admin`
- 密码: `admin123`

## 开发调试技巧

### 1. 热重载

使用HBuilderX或命令行启动后，修改代码会自动编译刷新。

### 2. 调试工具

- **微信小程序**: 使用微信开发者工具的调试器
- **H5**: 使用浏览器开发者工具(F12)
- **App**: 使用HBuilderX的真机调试功能

### 3. 查看日志

在代码中使用 `console.log()` 输出日志，日志会显示在对应的调试工具中。

### 4. 网络请求调试

在微信开发者工具中:
- 调试器 -> Network 查看网络请求
- 可以查看请求URL、参数、响应等

## 常见问题

### Q1: 编译后微信开发者工具打开白屏?

A: 检查以下几点:
1. 后端服务是否已启动
2. `config.js` 中的 `baseUrl` 是否正确
3. 是否关闭了域名校验
4. 查看控制台是否有错误信息

### Q2: 提示"不是合法的微信小程序项目"?

A: 
1. 确认已完成编译 (`npm run dev:mp-weixin`)
2. 用微信开发者工具打开 `dist/dev/mp-weixin` 目录
3. 不要打开项目根目录或其他目录

### Q3: 登录失败?

A: 检查:
1. 后端服务是否正常运行
2. 网络请求是否成功(查看Network)
3. 账号密码是否正确
4. 验证码是否正确

### Q4: 图片不显示?

A: 
1. 确认图片路径是否正确
2. 本地图片使用 `/static/xxx.png` 格式
3. 网络图片必须是HTTPS协议(生产环境)
4. 确认图片文件存在

### Q5: HBuilderX运行报错?

A: 
1. 检查是否安装了必要的插件
2. 重启HBuilderX
3. 清除缓存: 运行 -> 停止运行，然后重新运行

## 下一步

- 查看 [README.md](./README.md) 了解项目详细信息
- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 了解部署流程
- 阅读 [uni-app官方文档](https://uniapp.dcloud.io)
- 阅读 [若依官方文档](http://doc.ruoyi.vip)

## 开发建议

1. **先熟悉原若依项目**: 了解后端API和业务逻辑
2. **从简单页面开始**: 先熟悉登录、列表等基础页面
3. **参考现有代码**: 参考已实现的用户管理页面开发其他功能
4. **善用插件**: 使用uni-app插件市场的成熟组件
5. **注意平台差异**: 不同平台可能有不同的API和限制

## 获取帮助

遇到问题时:
1. 查看本项目的文档
2. 查看控制台错误信息
3. 查看uni-app官方文档
4. 搜索相关问题或提Issue

祝你开发愉快! 🎉
