# 让GitHub Page支持Latex公式

## 问题描述：Markdown不支持LateX

使用 MkDocs 构建文档站点并部署到 GitHub Pages 时，Markdown 文件中的 LaTeX 数学公式无法正确渲染，页面仅显示原始的 LaTeX 源代码。这一问题的根源在于标准 Markdown 规范本身不包含对数学公式的支持，MkDocs 默认的解析器亦未对其进行处理。

## 解决方案：修改主题模板全局注入 MathJax

本站点基于 MkDocs 生成，通过 mkdocs build 将 docs/ 目录下的 .md 文件编译为静态 HTML 页面。生成的 site/ 目录内容被同步到 GitHub 仓库，并通过 GitHub Pages 托管。

该方案的核心思路是一次性在 MkDocs 的主题模板中注入 MathJax 脚本，使所有生成的 HTML 页面自动获得 LaTeX 公式渲染能力，避免在每个 .md 文件中重复插入代码。

**步骤一：创建自定义主题目录**

在项目根目录（即 mkdocs.yml 所在目录）下新建一个文件夹，例如 custom_theme：

```bash
mkdir custom_theme
```

**步骤二：创建模板文件 main.html**

在 custom_theme/ 文件夹中创建 main.html，内容如下：

```html
{% extends "base.html" %}

{% block extrahead %}
    {{ super() }}
    <script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            tex2jax: {
                skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                inlineMath: [['$','$']]
            }
        });
    </script>
{% endblock %}
```

代码说明：

- {% extends "base.html" %}：继承原主题的基础模板，保留所有原有结构和样式。
- {% block extrahead %}：覆盖主题预留的 extrahead 区块，用于向 HTML 的 <head> 中添加额外内容。
- {{ super() }}：保留原主题在该区块中的已有内容，防止覆盖。
- 后续两段脚本分别引入 MathJax 2.x 库并配置行内公式分隔符为 $\$ ...\$ $。
  
**步骤三：修改 mkdocs.yml 配置文件**

在 mkdocs.yml 中，将 theme 配置指向自定义目录：

```bash
theme:
    name: mkdocs  # 请替换为您实际使用的主题名称，如 material、readthedocs 等
    custom_dir: custom_theme/
```

注意：name 必须填写您原本使用的主题名称，不能删除或留空。custom_dir 的路径相对于 mkdocs.yml 所在目录。

**步骤四：重新构建并部署**

执行构建命令生成新的静态页面：

```bash
bash
mkdocs build
```

将生成的 site/ 目录中的所有内容同步到 GitHub 仓库，推送后即可通过 GitHub Pages 访问。