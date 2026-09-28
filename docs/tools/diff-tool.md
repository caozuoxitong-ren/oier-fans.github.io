---
title: 文本对比工具
---

# 文本对比工具

<div class="diff-container">
  <div class="diff-inputs">
    <textarea id="old-text" placeholder="在此粘贴原始文本..."></textarea>
    <textarea id="new-text" placeholder="在此粘贴修改后的文本..."></textarea>
  </div>
  <button id="compare-btn">对比</button>
  <div id="diff-output"></div>
</div>

<style>
.diff-container { max-width: 1200px; margin: 0 auto; }
.diff-inputs { display: flex; gap: 16px; margin-bottom: 16px; }
.diff-inputs textarea {
  flex: 1; height: 200px; padding: 8px;
  font-family: monospace; font-size: 14px;
  border: 1px solid #ccc; border-radius: 4px;
}
#compare-btn {
  padding: 8px 24px; background: #1976d2; color: #fff;
  border: none; border-radius: 4px; cursor: pointer; font-size: 16px;
}
#compare-btn:hover { background: #1565c0; }
#diff-output { margin-top: 16px; }
</style>

<script src="https://cdn.jsdelivr.net/npm/diff@5.1.0/dist/diff.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/diff2html@3.4.47/bundles/js/diff2html.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/diff2html@3.4.47/bundles/css/diff2html.min.css">

<script>
document.getElementById('compare-btn').addEventListener('click', function() {
  var oldText = document.getElementById('old-text').value;
  var newText = document.getElementById('new-text').value;

  // 使用 jsdiff 生成 unified diff 格式
  var diffText = Diff.createTwoFilesPatch(
    'old.txt', 'new.txt', oldText, newText, '', '', { context: 3 }
  );

  // 使用 diff2html 渲染为美观的 HTML
  var output = document.getElementById('diff-output');
  output.innerHTML = Diff2Html.html(diffText, {
    drawFileList: false,
    matching: 'lines',
    outputFormat: 'side-by-side'
  });
});
</script>