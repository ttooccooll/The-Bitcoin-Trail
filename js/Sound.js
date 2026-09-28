var BitcoinH = BitcoinH || {};

BitcoinH.Sound = {
  current: null,
  ctx: null,
  muted: false,

  init: function() {
    try {
      this.muted = localStorage.getItem('bt-muted') === '1';
    } catch (e) {}
    this.refreshButton();
  },

  //play one of the music tracks, stopping whatever was playing
  music: function(soundId) {
    var sound = document.getElementById(soundId);
    if(this.current === sound && !sound.paused) return;
    this.stop();
    if(!sound) return;
    this.current = sound;
    if(this.muted) return;
    var played = sound.play();
    if(played && played.catch) played.catch(function(){});
  },

  stop: function() {
    if(this.current) {
      this.current.pause();
      this.current.currentTime = 0;
    }
  },

  toggleMute: function() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('bt-muted', this.muted ? '1' : '0');
    } catch (e) {}
    if(this.current) {
      if(this.muted) this.current.pause();
      else {
        var played = this.current.play();
        if(played && played.catch) played.catch(function(){});
      }
    }
    this.refreshButton();
  },

  refreshButton: function() {
    var btn = document.getElementById('mute-btn');
    if(btn) btn.textContent = this.muted ? 'Sound: off' : 'Sound: on';
  },

  //the one-bit speaker of an old school computer
  tone: function(freq, duration, when) {
    if(this.muted) return;
    try {
      if(!this.ctx) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        if(!AudioCtx) return;
        this.ctx = new AudioCtx();
      }
      var ctx = this.ctx;
      var start = ctx.currentTime + (when || 0);
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.04, start);
      gain.gain.setValueAtTime(0, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.01);
    } catch (e) {}
  },

  click: function() {
    this.tone(1200, 0.015);
  },

  beep: function() {
    this.tone(1000, 0.1);
  },

  buzz: function() {
    this.tone(150, 0.2);
  },

  shot: function() {
    this.tone(90, 0.06);
    this.tone(60, 0.06, 0.06);
  },

  //a little dirge for the fallen
  dirge: function() {
    [392, 392, 392, 311, 349, 294].forEach(function(f, i) {
      this.tone(f, 0.28, i * 0.35);
    }, this);
  },

  fanfare: function() {
    [523, 659, 784, 1047, 784, 1047].forEach(function(f, i) {
      this.tone(f, 0.15, i * 0.17);
    }, this);
  }
};
