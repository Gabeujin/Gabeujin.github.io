(function(){
  window.AppManager = {
    current: null,
    apps: {},
    register: function(name, element, opt){
      if(!this.apps[name]) this.apps[name] = {element:null, intervals:[], lsKeys:[]};
      if(element) this.apps[name].element = element;
      if(opt && Array.isArray(opt.lsKeys)) this.apps[name].lsKeys = opt.lsKeys;
      this.current = name;
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
    minimize: function(){
      var controls = document.querySelector('.window-controls');
      if(controls) controls.remove();
      ContentClear();
      includeSection();
      this.current = null;
    },
    close: function(){
      var name = this.current;
      if(!name) return;
      this.clearIntervals(name);
      this.clearStorage(name);
      var controls = document.querySelector('.window-controls');
      if(controls) controls.remove();
      ContentClear();
      includeSection();
      this.current = null;
    }
  };
})();
