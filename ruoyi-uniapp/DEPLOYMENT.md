# 部署指南

## 一、开发环境搭建

### 1. 安装Node.js

下载并安装 Node.js (版本 >= 8.9):
- 官网: https://nodejs.org/

验证安装:
```bash
node -v
npm -v
```

### 2. 安装HBuilderX (推荐)

下载地址: https://www.dcloud.io/hbuilderx.html

选择"标准版"或"App开发版"，下载解压即可使用。

### 3. 安装微信开发者工具

下载地址: https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

## 二、项目配置

### 1. 安装依赖

```bash
cd ruoyi-uniapp
npm install
```

### 2. 配置后端接口

修改 `config.js`:

```javascript
module.exports = {
  baseUrl: 'http://your-backend-api.com',  // 改为你的后端地址
  timeout: 10000
}
```

### 3. 配置微信小程序AppID

修改 `manifest.json`:

```json
{
  "mp-weixin": {
    "appid": "wx1234567890abcdef",  // 改为你的小程序AppID
    ...
  }
}
```

## 三、开发调试

### 方式一: 使用HBuilderX (推荐)

1. 打开HBuilderX
2. 文件 -> 打开目录 -> 选择 ruoyi-uniapp 目录
3. 运行 -> 运行到小程序模拟器 -> 微信开发者工具
4. 首次运行会自动打开微信开发者工具

### 方式二: 使用命令行

```bash
# 微信小程序
npm run dev:mp-weixin

# H5
npm run dev:h5

# App
npm run dev:app-plus
```

编译完成后:
- 微信小程序: 使用微信开发者工具打开 dist/dev/mp-weixin 目录
- H5: 浏览器访问 http://localhost:8080
- App: 使用HBuilderX真机调试

## 四、编译发布

### 1. 微信小程序发布

#### 编译
```bash
npm run build:mp-weixin
```

#### 上传发布
1. 使用微信开发者工具打开 `dist/build/mp-weixin` 目录
2. 点击右上角"上传"按钮
3. 填写版本号和项目备注
4. 上传成功后，登录微信公众平台提交审核

### 2. H5发布

#### 编译
```bash
npm run build:h5
```

#### 部署
将 `dist/build/h5` 目录下的文件上传到Web服务器即可。

推荐使用Nginx配置:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /path/to/dist/build/h5;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 代理后端API
    location /api/ {
        proxy_pass http://backend-server:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. App发布

#### 编译
```bash
npm run build:app-plus
```

#### 云打包
1. 使用HBuilderX打开项目
2. 发行 -> 原生App-云打包
3. 选择Android或iOS
4. 配置证书和应用信息
5. 打包完成后下载安装包

## 五、后端配置

### 1. 跨域配置

如果前端H5需要直连后端API，需要在后端配置CORS:

Spring Boot配置示例:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*");
        config.setAllowCredentials(true);
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
```

### 2. 微信小程序域名配置

在微信公众平台配置服务器域名:
1. 登录微信公众平台
2. 开发 -> 开发管理 -> 开发设置 -> 服务器域名
3. 添加request合法域名: `https://your-api-domain.com`

注意: 必须是HTTPS协议

### 3. 文件上传配置

如果有文件上传功能，需要配置uploadFile合法域名。

## 六、性能优化

### 1. 分包配置

当小程序代码包大于2MB时，建议配置分包。

在 `pages.json` 中配置:

```json
{
  "pages": [
    // 主包页面
  ],
  "subPackages": [
    {
      "root": "pages/system",
      "pages": [
        {
          "path": "user/index"
        }
      ]
    },
    {
      "root": "pages/monitor",
      "pages": [
        {
          "path": "online/index"
        }
      ]
    }
  ]
}
```

### 2. 图片优化

- 使用压缩工具压缩图片
- 优先使用webp格式
- 大图使用CDN存储，通过网络加载
- tabbar图标使用本地小图

### 3. 代码优化

- 按需引入组件和工具函数
- 使用异步组件
- 避免在onLoad中执行耗时操作
- 列表使用虚拟滚动

## 七、常见问题

### 1. 编译报错

**问题**: `Cannot find module 'xxx'`

**解决**: 
```bash
rm -rf node_modules
npm install
```

### 2. 微信开发者工具无法打开项目

**问题**: 提示"不是合法的微信小程序项目"

**解决**: 
1. 确认已编译: `npm run dev:mp-weixin`
2. 用微信开发者工具打开 `dist/dev/mp-weixin` 目录
3. 不要打开项目根目录

### 3. 请求后端接口失败

**问题**: 小程序提示"不在以下request合法域名列表中"

**解决**:
- 开发阶段: 微信开发者工具 -> 详情 -> 不校验合法域名
- 生产环境: 在微信公众平台配置合法域名

### 4. 真机调试白屏

**问题**: 模拟器正常，真机白屏

**解决**:
1. 检查后端接口是否可访问
2. 检查是否开启调试模式
3. 查看真机控制台错误信息
4. 检查微信基础库版本

### 5. 图片不显示

**问题**: 图片路径正确但不显示

**解决**:
- 本地图片使用绝对路径: `/static/xxx.png`
- 网络图片必须是HTTPS
- 检查图片文件是否存在
- 检查图片格式是否支持

## 八、测试账号

为方便测试，可以使用若依默认测试账号:

```
管理员账号: admin / admin123
普通用户: ry / admin123
```

## 九、技术支持

- 若依官方文档: http://doc.ruoyi.vip
- uni-app官方文档: https://uniapp.dcloud.io
- 微信小程序开发文档: https://developers.weixin.qq.com/miniprogram/dev/framework/

## 十、更新日志

### v3.9.1 (2024-xx-xx)
- 初始化项目
- 完成基础框架
- 实现核心功能模块

---

如有其他问题，请提交Issue或联系技术支持。
