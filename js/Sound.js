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
    if(this.current) {
      this.current.pause();
      this.current.currentTime = 0;
    }
    var sound = document.getElementById(soundId);
    if(!sound) return;
    this.current = sound;
    if(this.muted) return;
    var played = sound.play();
    if(played && played.catch) played.catch(function(){});
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
    if(btn) btn.textContent = this.muted ? 'SND:OFF' : 'SND:ON';
  },

  //tiny chiptune synth for sound effects, no files needed
  tone: function(freq, duration, type, when, volume, slideTo) {
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
      osc.type = type || 'square';
      osc.frequency.setValueAtTime(freq, start);
      if(slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, start + duration);
      gain.gain.setValueAtTime(volume || 0.06, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + duration);
    } catch (e) {}
  },

  sfx: function(name) {
    switch(name) {
      case 'blip':
        this.tone(660, 0.05, 'square');
        break;
      case 'coin':
        this.tone(988, 0.08, 'square');
        this.tone(1319, 0.2, 'square', 0.08);
        break;
      case 'good':
        this.tone(523, 0.08, 'square');
        this.tone(659, 0.08, 'square', 0.08);
        this.tone(784, 0.15, 'square', 0.16);
        break;
      case 'bad':
        this.tone(220, 0.25, 'sawtooth', 0, 0.05, 90);
        break;
      case 'zap':
        this.tone(1800, 0.25, 'sawtooth', 0, 0.05, 80);
        this.tone(1200, 0.2, 'square', 0.05, 0.04, 60);
        break;
      case 'alert':
        this.tone(880, 0.1, 'square');
        this.tone(880, 0.1, 'square', 0.15);
        break;
      case 'halving':
        [523, 659, 784, 1047].forEach(function(f, i) {
          this.tone(f, 0.12, 'triangle', i * 0.1, 0.08);
        }, this);
        break;
      case 'win':
        [523, 523, 523, 659, 784, 659, 784, 1047].forEach(function(f, i) {
          this.tone(f, 0.18, 'square', i * 0.14, 0.06);
        }, this);
        break;
      case 'lose':
        [392, 370, 349, 330].forEach(function(f, i) {
          this.tone(f, 0.35, 'triangle', i * 0.3, 0.08);
        }, this);
        break;
    }
  }
};
