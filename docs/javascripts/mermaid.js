// Mermaid 初始化配置
function initMermaid() {
  if (typeof mermaid === "undefined") {
    return;
  }
  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose"
  });

  // 渲染所有 class="mermaid" 的代码块
  var nodes = document.querySelectorAll(".mermaid");
  if (nodes.length > 0) {
    mermaid.run({ nodes: nodes }).catch(function (err) {
      console.error("Mermaid render error:", err);
    });
  }
}

// 兼容 Material 主题的即时导航
if (typeof document$ !== "undefined") {
  document$.subscribe(function () {
    initMermaid();
  });
} else {
  document.addEventListener("DOMContentLoaded", initMermaid);
  window.addEventListener("load", initMermaid);
}