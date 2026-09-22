欢迎来到 **信奥爱好者** **OIer Fans** ！本站内容基于 [**CC BY-SA 4.0**](https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-hans) 协议发布。

<div style="position: relative; text-align: center; width: fit-content; max-width: 100%; margin: 0 auto;">
  <img id="rainImage" src="/OI.jpeg" alt="oier.fans" style="display: block; width: 100%; height: auto; border-radius: 8px;" />
  <canvas id="rainCanvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; border-radius: 8px;"></canvas>
</div>

<script>
  (function() {
    const img = document.getElementById('rainImage');
    const canvas = document.getElementById('rainCanvas');
    const ctx = canvas.getContext('2d');
    const chars = ['0','1','O','I','A','C','+','#','<','>','{','}','(',')','[',']','!','@','&','%','$','√','π','∑','∫','λ','μ','ω','Δ','Θ','α','β','γ'];
    let width, height, columns, drops, animFrame;

    function init() {
      const rect = img.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      const fontSize = Math.max(14, Math.floor(width / 40));
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill().map(() => Math.floor(Math.random() * -height / fontSize));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const fontSize = Math.max(14, Math.floor(width / 40));
      ctx.font = `${fontSize}px 'Fira Code', monospace`;
      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const green = 120 + Math.random() * 135;
        ctx.fillStyle = `rgba(50, ${green}, 80, 0.6)`;
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);
        drops[i] += 0.5 + Math.random() * 1.2;
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
      }
      animFrame = requestAnimationFrame(draw);
    }

    img.onload = () => { init(); draw(); };
    if (img.complete && img.naturalWidth) { init(); draw(); }
    window.addEventListener('resize', () => { if (width) { init(); } });
  })();
</script>