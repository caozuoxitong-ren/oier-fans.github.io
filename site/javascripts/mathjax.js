window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

function typesetMathJax() {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise().catch((err) => console.error("MathJax error:", err));
  }
}

// Material for MkDocs 主题会提供 document$
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    if (window.MathJax && MathJax.startup) {
      MathJax.startup.output.clearCache();
      MathJax.typesetClear();
      MathJax.texReset();
    }
    typesetMathJax();
  });
} else {
  // 普通 MkDocs 主题
  document.addEventListener("DOMContentLoaded", typesetMathJax);
  window.addEventListener("load", typesetMathJax);
}