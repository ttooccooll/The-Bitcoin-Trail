var BitcoinH = BitcoinH || {};

function escapeHtml(text) {
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

//everything is drawn on one green screen, like the computer lab in 1985
BitcoinH.Screen = {
  handler: null,

  init: function() {
    this.el = document.getElementById('screen');
    document.addEventListener('keydown', this.onKey.bind(this));
    this.el.addEventListener('click', this.onTap.bind(this));
  },

  show: function(html, handler) {
    this.el.innerHTML = html;
    this.handler = handler || null;
    var input = this.el.querySelector('input');
    if(input) input.focus({preventScroll: true});
  },

  onKey: function(e) {
    if(!this.handler || !this.handler.key) return;
    if(e.target.tagName === 'INPUT' && e.key !== 'Enter') return;
    if(e.key === ' ' || e.key === 'Enter' || e.key.indexOf('Arrow') === 0) e.preventDefault();
    this.handler.key(e);
  },

  onTap: function(e) {
    if(e.target.closest('a')) return;
    if(e.target.tagName === 'INPUT') return;
    if(this.handler && this.handler.tap) this.handler.tap(e);
  },

  //a page of text, then press space to go on
  page: function(html, next, prompt) {
    var done = false;
    var go = function() {
      if(done) return;
      done = true;
      BitcoinH.Sound.click();
      next();
    };
    this.show('<div class="page">' + html + '</div>' +
      '<div class="press">' + (prompt || 'Press SPACE BAR to continue') + '</div>', {
      key: function(e) { if(e.key === ' ' || e.key === 'Enter') go(); },
      tap: go
    });
  },

  //"You may: 1. ... What is your choice?"
  menu: function(opts) {
    var typed = '';
    var html = '<div class="page">' + (opts.header || '') +
      (opts.intro !== undefined ? opts.intro : '<p>You may:</p>') + '<div class="options">';
    opts.options.forEach(function(option, i) {
      html += '<div class="opt" data-i="' + i + '"><span class="num">' + (i + 1) + '.</span> ' + option.label + '</div>';
    });
    html += '</div>' + (opts.footer || '') + '</div>' +
      '<div class="ask">' + (opts.question || 'What is your choice?') + ' <span class="typed"></span><span class="cursor"></span></div>' +
      (opts.escape ? '<div class="press">' + opts.escape.label + '</div>' : '');
    var screen = this;
    var choose = function(i) {
      var option = opts.options[i];
      if(!option) return;
      BitcoinH.Sound.click();
      screen.handler = null;
      option.fn();
    };
    this.show(html, {
      key: function(e) {
        if(/^[0-9]$/.test(e.key)) {
          typed = e.key;
          screen.el.querySelector('.typed').textContent = typed;
          BitcoinH.Sound.click();
        } else if(e.key === 'Backspace') {
          typed = '';
          screen.el.querySelector('.typed').textContent = '';
        } else if(e.key === 'Enter') {
          if(typed) choose(+typed - 1);
        } else if(e.key === ' ' && opts.escape) {
          screen.handler = null;
          opts.escape.fn();
        }
      },
      tap: function(e) {
        var opt = e.target.closest('.opt');
        if(opt) choose(+opt.dataset.i);
        else if(e.target.closest('.press') && opts.escape) {
          screen.handler = null;
          opts.escape.fn();
        }
      }
    });
  },

  //type an answer and press ENTER
  ask: function(opts) {
    var html = '<div class="page">' + (opts.header || '') + '</div>' +
      '<div class="ask">' + opts.question + ' <input type="' + (opts.number ? 'text" inputmode="numeric' : 'text') +
      '" maxlength="' + (opts.maxLength || 20) + '" autocomplete="off" spellcheck="false" value="' + escapeHtml(opts.value || '') + '"/></div>' +
      '<div class="press">' + (opts.hint || 'Press ENTER when done') + '</div>';
    var screen = this;
    var submit = function() {
      var value = screen.el.querySelector('input').value.trim();
      if(opts.number) {
        if(value === '') value = '0';
        if(!/^\d+$/.test(value)) {
          BitcoinH.Sound.buzz();
          return;
        }
        value = parseInt(value, 10);
      }
      BitcoinH.Sound.click();
      screen.handler = null;
      opts.fn(value);
    };
    this.show(html, {
      key: function(e) { if(e.key === 'Enter') submit(); },
      tap: function(e) {
        if(e.target.closest('.press')) submit();
        else screen.el.querySelector('input').focus();
      }
    });
  },

  //Y or N
  yesNo: function(html, fn) {
    var screen = this;
    var answer = function(yes) {
      BitcoinH.Sound.click();
      screen.handler = null;
      fn(yes);
    };
    this.show('<div class="page">' + html + '</div>' +
      '<div class="ask yn"><span class="yes">Y</span>/<span class="no">N</span> <span class="cursor"></span></div>', {
      key: function(e) {
        var k = e.key.toLowerCase();
        if(k !== 'y' && k !== 'n') return;
        //don't let the letter land in whatever input comes next
        e.preventDefault();
        answer(k === 'y');
      },
      tap: function(e) {
        if(e.target.closest('.yes')) answer(true);
        else if(e.target.closest('.no')) answer(false);
      }
    });
  },

  //header used on most screens: a place and a date
  placeHeader: function(place) {
    var s = BitcoinH.Stackers;
    return '<div class="place"><span class="inverse">' + escapeHtml(place) + '</span><br>' + s.dateString() + '</div>';
  }
};

//the travel screen: ostriches on the trail and the status box
BitcoinH.Travel = {
  SCENE_W: 204,
  SCENE_H: 72,
  frame: 0,

  render: function() {
    var html = '<div class="travel">' +
      '<div class="scene"><canvas id="scene" width="' + this.SCENE_W + '" height="' + this.SCENE_H + '"></canvas></div>' +
      '<div class="bottom" id="travel-bottom"></div>' +
      '</div>';
    BitcoinH.Screen.show(html, null);
    this.shownMiles = BitcoinH.Stackers.miles;
    this.loadImages();
    this.update();
    if(!this.animating) {
      this.animating = true;
      this.lastFrame = 0;
      requestAnimationFrame(this.animate.bind(this));
    }
  },

  loadImages: function() {
    if(this.images) return;
    this.images = {};
    var travel = this;
    [['grey', 'images/Broadway3.png'], ['color', 'images/Broadway2.png'], ['wagon', 'images/Nostrich1.png']].forEach(function(pair) {
      var img = new Image();
      img.onload = function() { travel.draw(); };
      img.src = pair[1];
      travel.images[pair[0]] = img;
    });
  },

  //a few frames a second, like the old machines managed
  animate: function(time) {
    if(!document.getElementById('scene')) {
      this.animating = false;
      return;
    }
    if(time - this.lastFrame > 160) {
      this.lastFrame = time;
      var target = BitcoinH.Stackers.miles;
      if(this.moving && this.shownMiles < target) {
        this.shownMiles = Math.min(target, this.shownMiles + Math.max(0.5, (target - this.shownMiles) / 3));
      } else if(!this.moving) {
        this.shownMiles = target;
      }
      this.frame = (this.frame + 1) % 2;
      this.draw();
    }
    requestAnimationFrame(this.animate.bind(this));
  },

  draw: function() {
    var canvas = document.getElementById('scene');
    if(!canvas || !this.images) return;
    var ctx = canvas.getContext('2d');
    var W = this.SCENE_W, H = this.SCENE_H;
    var progress = Math.min(1, this.shownMiles / BitcoinH.TRAIL_LENGTH);
    var grey = this.images.grey, color = this.images.color, wagon = this.images.wagon;
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
    if(grey.complete && grey.naturalWidth) {
      //the panorama scrolls by as you head west, and the fiat world gets its color back
      var srcH = grey.naturalHeight;
      var srcW = srcH * W / H;
      var sx = (grey.naturalWidth - srcW) * (1 - progress);
      ctx.drawImage(grey, sx, 0, srcW, srcH, 0, 0, W, H);
      if(color.complete && color.naturalWidth && progress > 0) {
        ctx.globalAlpha = progress;
        ctx.drawImage(color, sx, 0, srcW, srcH, 0, 0, W, H);
        ctx.globalAlpha = 1;
      }
    }
    if(wagon.complete && wagon.naturalWidth) {
      var size = 44;
      var bob = this.moving && this.frame ? 1 : 0;
      ctx.drawImage(wagon, W * 0.42, H - size - 1 - bob, size, size);
    }
    //crush the colors down to a handful of levels, like an 8-bit machine
    try {
      var data = ctx.getImageData(0, 0, W, H);
      var d = data.data;
      for(var i = 0; i < d.length; i += 4) {
        for(var c = 0; c < 3; c++) {
          var v = Math.min(255, d[i + c] * 1.15 + 12);
          d[i + c] = Math.round(v / 36) * 36;
        }
      }
      ctx.putImageData(data, 0, 0);
    } catch (e) {}
  },

  status: function() {
    var s = BitcoinH.Stackers;
    var next = BitcoinH.Game.nextLandmark();
    var rows = [
      ['Date:', s.dateString()],
      ['Block:', s.blockHeight().toLocaleString()],
      ['Weather:', s.weather],
      ['Health:', s.healthLabel()],
      ['Food:', Math.floor(s.food).toLocaleString() + ' pounds'],
      ['Next landmark:', next ? Math.max(0, next.miles - s.miles) + ' miles' : ''],
      ['Miles traveled:', s.miles.toLocaleString()]
    ];
    return '<div class="size-up">Press ENTER to size up the situation</div>' +
      '<table class="status">' + rows.map(function(r) {
        return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td></tr>';
      }).join('') + '</table>';
  },

  update: function(moving) {
    var bottom = document.getElementById('travel-bottom');
    if(!bottom) return;
    this.moving = !!moving;
    if(!this.messageShowing) bottom.innerHTML = this.status();
  },

  //a message in the box, travel waits until you press ENTER
  message: function(text, next) {
    var bottom = document.getElementById('travel-bottom');
    var travel = this;
    this.messageShowing = true;
    this.update(false);
    bottom.innerHTML = '<div class="message"><div class="message-text">' + text + '</div>' +
      '<div class="press">Press ENTER to continue</div></div>';
    BitcoinH.Sound.beep();
    var done = false;
    var go = function() {
      if(done) return;
      done = true;
      travel.messageShowing = false;
      next();
    };
    BitcoinH.Screen.handler = {
      key: function(e) { if(e.key === 'Enter' || e.key === ' ') go(); },
      tap: go
    };
  }
};

//tombstones, for the fallen
BitcoinH.Tombstone = function(epitaphHtml, footer) {
  return '<div class="tomb"><div class="stone">' + epitaphHtml + '</div><div class="dirt"></div></div>' + (footer || '');
};
