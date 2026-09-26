// 推荐用 \(...\) 和 \[...\]，不容易和 Markdown 冲突。
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    processHtmlClass: "arithmatex"
  },
  startup: {
    pageReady: () => {
      return MathJax.startup.defaultPageReady();
    }
  }
};

if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.startup.output.clearCache();
      MathJax.typesetClear();
      MathJax.texReset();
      MathJax.typesetPromise().catch((err) => console.error("MathJax error:", err));
    }
  });
}