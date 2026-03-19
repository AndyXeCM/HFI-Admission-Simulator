# 静态考试查询演示页

这是一个纯前端演示项目，不需要后端。

## 已实现逻辑

- 首页输入：考生姓名、准考证号、验证码
- 固定验证码：`uhXu`
- 只校验验证码，姓名和准考证号不做后端校验
- 验证码输入正确后跳转结果页
- 结果页展示：
  - 考生名字：显示输入值
  - 准考证号：显示输入值
  - 考试日期：固定 `2026年3月15日`
  - 英语、数学：`0~100` 随机
  - 入围面试：`是/否` 随机
  - 面试成绩：入围时为 `0~100` 随机，未入围时显示 `-`
  - 录取结果：若未入围面试则固定为 `未录取`，否则在 `有条件录取 / 无条件录取` 之间随机
  - 备注老师：从名单中随机抽两个，并在老师名字后附带“点击查看面试指南”
- 结果页顶部按钮改为下载模拟录取通知书

## 文件说明

- `index.html` 登录页
- `result.html` 结果页
- `guide.html` 面试指南页
- `css/style.css` 样式
- `js/app.js` 逻辑
- `assets/admission-letter.txt` 模拟录取通知书下载文件
- `assets/interview-guide.txt` 旧的演示文本文件（可按需保留或删除）

## 本地运行

直接双击 `index.html` 就能打开。

## 部署到服务器

### 最简单的做法

把整个项目文件夹上传到网站目录，例如：

- Nginx: `/var/www/html/`
- 宝塔面板: 站点根目录
- Apache: `htdocs/`

然后访问：

- `https://你的域名/index.html`

### Nginx 简单配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/html/gdhfi_demo;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```
