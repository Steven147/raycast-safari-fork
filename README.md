# Raycast Safari 扩展

从 [Raycast/extensions](https://github.com/raycast/extensions) 的 Safari 扩展 fork 而来。

通过 Raycast 管理 Safari 标签页、历史记录、书签和阅读列表。

## 功能

### 命令

| 命令 | 说明 |
|------|------|
| **搜索标签页** | 浏览和搜索打开的 Safari 标签页，支持跨设备的 iCloud 标签页 |
| **搜索历史** | 搜索 Safari 浏览历史，支持模糊搜索 |
| **搜索书签** | 搜索和浏览 Safari 书签 |
| **搜索阅读列表** | 浏览 Safari 阅读列表，支持按已读/未读状态分组 |
| **添加到阅读列表** | 将当前 Safari 标签页添加到阅读列表 |
| **复制链接到剪贴板** | 复制当前 Safari 标签页的 URL |
| **复制标题链接到剪贴板** | 复制当前标签页标题为 Markdown 链接格式 |
| **关闭其他标签页** | 关闭除当前标签外的所有 Safari 标签页 |

### AI 能力

Raycast Pro 支持的 AI 工具：

- 总结当前标签页内容
- 搜索并打开阅读列表项
- 查找和检索书签
- 搜索浏览历史
- 获取所有打开标签页的信息
- 获取标签页内容（文本或 HTML 源码）
- 关闭指定标签页

### 设置

| 设置 | 说明 |
|------|------|
| **本地 Safari 浏览器** | 选择 Safari 或 Safari 技术预览版 |
| **拼音搜索** | 为中文字符启用拼音搜索 |
| **模糊搜索** | 启用更灵活的模糊搜索 |
| **iCloud 标签页** | 包含跨设备的 iCloud 标签页 |

## 本地开发

### 编译

```bash
cd extensions/safari
npm install
npm run build
```

### 导入 Raycast (开发模式)

1. 在 Raycast 中按 `Cmd + ,` 打开设置
2. 进入 **Extensions** 页面
3. 点击 **+** 按钮，选择 **Import Extension**
4. 选择 `extensions/safari` 文件夹
5. 启用导入的扩展

### 开发调试

```bash
# 实时开发模式
npm run dev

# 代码检查
npm run lint

# 自动修复问题
npm run fix-lint
```

## 发布自定义扩展

修改扩展名称后发布：

1. 修改 `package.json` 中的 `name` 字段为自己的扩展名
2. 运行发布：
   ```bash
   npm run publish
   ```

## 权限要求

扩展需要 **完全磁盘访问权限** 才能正常工作：

1. 打开「系统设置」>「隐私与安全性」
2. 找到 Raycast 并启用「完全磁盘访问」
3. 重启 Raycast

## 项目结构

```
extensions/safari/
├── src/
│   ├── components/     # React 组件
│   ├── hooks/          # 自定义 Hook
│   ├── lang-adaptor/   # 语言适配器（拼音支持）
│   └── tools/          # Safari 工具函数
├── swift/              # Safari 交互的 Swift 库
└── assets/             # 图片和图标
```

## 许可证

MIT

## 致谢

原始项目由 Raycast 团队和贡献者开发。

- Fork 来源: https://github.com/raycast/extensions/tree/main/extensions/safari
