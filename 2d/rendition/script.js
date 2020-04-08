// {
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const width = canvas.width = 2000;
  const height = canvas.height = 200 + 2000 * canvas.offsetHeight / canvas.offsetWidth;
  canvas.onclick = init;
  const nps = width / 5 | 0;
  const points = [];
  let img = null;
  let running = false;
  function init() {
    for (let i = 0, y = height * 0.25; i <= nps; ++i) points[i] = y += 20 * (Math.random() - Math.random());
    ctx.clearRect(0, 0, width, height);
    ctx.font = "bold 340px arial";
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.fillText("哈哈", 60, height * 0.5 + 180);
    img = ctx.getImageData(0, 0, width, height);
    if (!running) {
      running = true;
      run();
    }
  }
  function run() {
    if (points[0] < height * 0.8 || points[nps] < height * 0.8) {
      points[0] += 6;
      points[nps] += 6;
      for (let i = 1; i < nps; ++i) {
        points[i] = 3 + (points[i - 1] + points[i + 1]) / 2 + 2 * (Math.random() - Math.random());
        if (img.data[(Math.round(points[i]) * width + i * 5) * 4]) {
          points[i] += 10;
        }
      }
      requestAnimationFrame(run);
    } else running = false;
    ctx.beginPath();
    for (let i = 1; i < nps; ++i) {
      ctx.lineTo(i * 5, points[i]);
    }
    ctx.stroke();
  }
  init();
// }