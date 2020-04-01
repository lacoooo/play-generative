'use strict';
    (() => {

      var colors =
      ['#929383',
          '#bec0bf',
          '#b4b4b4',
          '#ececec',
          '#47499e',
          '#ef8ed2',
          '#ffffff',
          '#ee3f0b',
          '#ddf2f3',
          '#0a0f11',
          '#5dbfc0',
          '#4eb0b1',
          '#b99314',
          '#fbc303',
          '#fba3dc',
          '#ec370d',
          '#195e98',
          '#ffd63c',
          '#bf3f11',
          '#44467f']
      const length = colors.length
      const c = document.getElementById('c');
      const ctx = c.getContext('2d');
      const w = c.width = window.innerWidth;
      const h = c.height = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const randomRange = (min, max) => {
        return Math.random() * (max - min) + min;
      };
      ctx.fillStyle = colors[Math.floor(Math.random() * length)];
      ctx.rect(0,0,w,h)
      ctx.fill();
      const draw = (ctx, x, y, s, d) => {
        let ar = randomRange(70, 120);
        let a = ar / 10;

        if (d === 0) {
          ctx.beginPath();
          ctx.strokeStyle = 'black';
          ctx.fillStyle = colors[Math.floor(Math.random() * length)];
          ctx.moveTo(x + Math.cos(a) * s, y + Math.sin(a) * s);
          const scale = randomRange(20, 200)
          a += randomRange(0, 360) * Math.PI / 180;
          ctx.bezierCurveTo(x + Math.cos(a) * s + randomRange(0, scale), 
                       y + Math.sin(a) * s + randomRange(0, scale),
                       x + Math.cos(a) * s + randomRange(0, scale), 
                       y + Math.sin(a) * s + randomRange(0, scale),
                       x + Math.cos(a) * s + randomRange(0, scale), 
                       y + Math.sin(a) * s + randomRange(0, scale))
          a += randomRange(0, 360) * Math.PI / 180;
          ctx.bezierCurveTo(x + Math.cos(a) * s + randomRange(0, scale), 
                       y + Math.sin(a) * s + randomRange(0, scale),
                       x + Math.cos(a) * s + randomRange(0, scale), 
                       y + Math.sin(a) * s + randomRange(0, scale),
                       x + Math.cos(a) * s + randomRange(0, scale), 
                       y + Math.sin(a) * s + randomRange(0, scale))
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
        } else {
          const sm = randomRange(0.3, 1);
          draw(
            ctx,
            x + Math.cos(a) * (s * sm),
            y + Math.sin(a) * (s * sm),
            s * sm,
            d - 1,
          );
          a += randomRange(90, 120) * Math.PI / 180;
          draw(
            ctx,
            x + Math.cos(a) * (s * sm),
            y + Math.sin(a) * (s * sm),
            s * sm,
            d - 1,
          );
          a += randomRange(90, 120) * Math.PI / 180;
          draw(
            ctx,
            x + Math.cos(a) * (s * sm),
            y + Math.sin(a) * (s * sm),
            s * sm,
            d - 1,
          );
        }
      };

      
      draw(ctx, cx, cy + (h * 0.1), h * 0.4, 6);
    })();