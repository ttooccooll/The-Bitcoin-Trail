var BitcoinH = BitcoinH || {};

//particle effects drawn on a full screen canvas
BitcoinH.FX = {
  particles: [],
  running: false,

  init: function() {
    this.canvas = document.getElementById('fx-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  },

  resize: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  reducedMotion: function() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  //shake the whole screen
  shake: function() {
    if(this.reducedMotion()) return;
    document.body.classList.remove('shake');
    void document.body.offsetWidth;
    document.body.classList.add('shake');
  },

  flash: function(color) {
    if(this.reducedMotion()) return;
    var el = document.createElement('div');
    el.className = 'flash';
    el.style.background = color;
    document.body.appendChild(el);
    setTimeout(function(){ el.remove(); }, 400);
  },

  //orange coins raining down
  confetti: function(count) {
    if(this.reducedMotion()) return;
    for(var i = 0; i < (count || 120); i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * this.canvas.height * 0.5,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 3,
        life: 400,
        char: Math.random() < 0.6 ? '₿' : '⚡',
        color: Math.random() < 0.5 ? '#f7931a' : '#fada5e',
        size: 14 + Math.random() * 14
      });
    }
    this.run();
  },

  //burst of sparks around an element
  burst: function(el, color, count) {
    if(this.reducedMotion() || !el) return;
    var rect = el.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    for(var i = 0; i < (count || 30); i++) {
      var angle = Math.random() * Math.PI * 2;
      var speed = 2 + Math.random() * 5;
      this.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 40 + Math.random() * 20,
        char: Math.random() < 0.5 ? '⚡' : '*',
        color: color || '#fada5e',
        size: 12 + Math.random() * 10
      });
    }
    this.run();
  },

  //jagged lightning bolt between two elements
  bolt: function(fromEl, toEl) {
    if(this.reducedMotion() || !fromEl || !toEl) return;
    var a = fromEl.getBoundingClientRect();
    var b = toEl.getBoundingClientRect();
    this.particles.push({
      bolt: true,
      x1: a.left + a.width / 2, y1: a.top + a.height / 2,
      x2: b.left + b.width / 2, y2: b.top + b.height / 2,
      life: 12
    });
    this.run();
  },

  run: function() {
    if(this.running) return;
    this.running = true;
    requestAnimationFrame(this.frame.bind(this));
  },

  frame: function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(function(p) { return p.life > 0; });
    this.particles.forEach(function(p) {
      p.life--;
      if(p.bolt) {
        ctx.strokeStyle = '#fada5e';
        ctx.shadowColor = '#fada5e';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(p.x1, p.y1);
        for(var i = 1; i < 8; i++) {
          var t = i / 8;
          ctx.lineTo(p.x1 + (p.x2 - p.x1) * t + (Math.random() - 0.5) * 40,
                     p.y1 + (p.y2 - p.y1) * t + (Math.random() - 0.5) * 40);
        }
        ctx.lineTo(p.x2, p.y2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        return;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      ctx.globalAlpha = Math.min(1, p.life / 30);
      ctx.fillStyle = p.color;
      ctx.font = p.size + 'px sans-serif';
      ctx.fillText(p.char, p.x, p.y);
      ctx.globalAlpha = 1;
    });
    if(this.particles.length) {
      requestAnimationFrame(this.frame.bind(this));
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.running = false;
    }
  }
};
