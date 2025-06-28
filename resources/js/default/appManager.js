(function(){
  window.AppManager = {
    current: null,
    launching: null,
    apps: {},
    register: function(name, element, opt){
      if(!this.apps[name]) this.apps[name] = {element:null, intervals:[], lsKeys:[]};
      if(element) this.apps[name].element = element;
      if(opt && Array.isArray(opt.lsKeys)) this.apps[name].lsKeys = opt.lsKeys;
      this.current = name;
      this.launching = null;
    },
    addInterval: function(id){
      if(this.current && this.apps[this.current]){
        this.apps[this.current].intervals.push(id);
      }
    },
    clearIntervals: function(name){
      var app = this.apps[name];
      if(app){
        app.intervals.forEach(function(i){ clearInterval(i); });
        app.intervals = [];
      }
    },
    clearStorage: function(name){
      var app = this.apps[name];
      if(app && app.lsKeys){
        app.lsKeys.forEach(function(k){ localStorage.removeItem(k); });
      }
    },
    minimize: async function(){
      var name = this.current;
      if(!name) return;
      var section = document.querySelector('body>section');
      if(!section) return;
      var overlay = document.createElement('div');
      overlay.className = 'app-launch-overlay expand';
      section.appendChild(overlay);
      var controls = document.querySelector('.window-controls');
      if(controls) controls.remove();
      ContentClear();
      await includeSection();
      var card = section.querySelector('.app-card[data-app="'+name+'"]');
      if(card){
        var rect = card.getBoundingClientRect();
        var secRect = section.getBoundingClientRect();
        requestAnimationFrame(function(){
          overlay.classList.remove('expand');
          overlay.style.top = (rect.top - secRect.top) + 'px';
          overlay.style.left = (rect.left - secRect.left) + 'px';
          overlay.style.width = rect.width + 'px';
          overlay.style.height = rect.height + 'px';
        });
        overlay.addEventListener('transitionend', function(){
          if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        },{once:true});
      } else if(overlay.parentNode){
        overlay.parentNode.removeChild(overlay);
      }
      this.current = null;
    },
    close: async function(){
        var name = this.current;
        if(!name) return;
        this.clearIntervals(name);
        this.clearStorage(name);
        var controls = document.querySelector('.window-controls');
        if(controls) controls.remove();
        var overlay = document.querySelector('.app-launch-overlay');
        if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        ContentClear();
        await includeSection();
        this.current = null;
      }
  };
})();
