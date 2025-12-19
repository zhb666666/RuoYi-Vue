# 静态资源说明

## 目录结构

```
static/
├── tabbar/           # tabbar图标
│   ├── home.png           # 首页图标（未选中）
│   ├── home-active.png    # 首页图标（选中）
│   ├── mine.png           # 我的图标（未选中）
│   └── mine-active.png    # 我的图标（选中）
├── images/           # 图片资源
│   ├── logo.png           # 应用Logo
│   └── profile.jpg        # 默认头像
└── README.md         # 本说明文件
```

## 图标要求

### tabbar图标
- 尺寸: 81px * 81px (推荐)
- 格式: PNG (支持透明背景)
- 大小: 建议40KB以内

### 应用Logo
- 尺寸: 建议 200px * 200px 以上
- 格式: PNG
- 大小: 建议100KB以内

### 用户头像
- 尺寸: 建议 200px * 200px
- 格式: JPG/PNG
- 大小: 建议50KB以内

## 图标生成工具

可以使用以下在线工具生成图标:
- [iconfont](https://www.iconfont.cn/) - 阿里图标库
- [IconPark](https://iconpark.oceanengine.com/) - 字节跳动图标库
- [Material Icons](https://material.io/icons/) - Google Material图标

## 注意事项

1. 图标命名规范: 使用小写字母和连字符，避免使用中文
2. 图标格式: 优先使用PNG格式，支持透明背景
3. 图标大小: 控制图标文件大小，避免影响小程序包体积
4. 路径引用: 在代码中使用绝对路径引用静态资源，如: `/static/images/logo.png`
