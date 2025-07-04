let includeHTML = ()=>{
    let z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.querySelectorAll("body>*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("in-ht");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
              if(this.responseURL.toString().indexOf("footer") > -1) {
                fnReady();
              }
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
              if(this.responseURL.toString().indexOf("footer") > -1) {
                fnReady();
              }
            }
            /* Remove the attribute, and call this function once more: */
            
            elmnt.removeAttribute("in-ht");
            includeHTML();
          }
        }
        file += ".html";
        xhttp.open("GET", "/views/" + file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
}

const includeSection = async () => {
  const container = document.querySelector("body>section>contents");
  container.innerHTML = "";
  container.classList.add("app-grid");

  try {
    const responses = await Promise.all(
      APP_LIST.map(app => fetch(`/views/contents/${app.id}.xml`))
    );

    for (const res of responses) {
      if(!res.ok) continue;
      const text = await res.text();
      const xml = new DOMParser().parseFromString(text, "application/xml");
      container.appendChild(
        getFeature.appCard(xml.querySelector("metaInfo"), xml.querySelector("link"))
      );
    }
  } catch(e) {
    console.log(e);
  }
};

const showMain = () => {
  const title = document.querySelector('body>header>h1>span');
  if(title){
    title.classList.remove('goHome');
    title.textContent = 'Memory Repo';
  }

  const section = document.querySelector('body>section');
  if(section) section.style.background = 'none';

  if(section){
    section.classList.remove('setFadeIn');
    section.classList.add('setDpNone');
    setTimeout(() => {
      section.classList.add('setFadeIn');
      section.classList.remove('setDpNone');
    }, 100);
  }

  if(typeof _stopAllInterval === 'function') _stopAllInterval();
  ContentClear();
  includeSection();

  const close = document.querySelector('.app-close-btn');
  if(close) close.remove();
};

let includePage = (file)=>{
  let z, elmnt, xhttp;
  z = document.querySelector("body>section>contents");
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        z.innerHTML = this.responseText;
        const article = z.querySelector("article");
        if(article) includeJsInit(article.id);

        if(!document.querySelector('.app-close-btn')){
          const closeBtn = document.createElement('button');
          closeBtn.className = 'app-close-btn';
          closeBtn.innerHTML = '&times;';
          closeBtn.addEventListener('click', showMain);
          document.querySelector('body>section').appendChild(closeBtn);
        }
      }
      else if (this.status == 403) {
        return false;
      }
      else if (this.status == 404) {
        return false;
      }
      else if (this.status == 405) {
        return false;
      }
      else if (this.status == 500) {
        return false;
      }
    }
  }
xhttp.open("GET", "/" + file, true);
xhttp.send();
/* Exit the function: */
return;
}

const includeJsInit = async (appId) => {
  if(!appId) return;
  const appName = appId.replace(/app/g,'').replace(/^./, a => a.toLowerCase());
  const info = APP_LIST.find(a => a.name === appName);
  if(!info) return;

  if(info.css && !document.querySelector(`link[data-app="${appName}"]`)){
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = info.css;
    link.dataset.app = appName;
    document.head.appendChild(link);
  }

  if(info.script && !document.querySelector(`script[data-app="${appName}"]`)){
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = info.script;
      s.defer = true;
      s.dataset.app = appName;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  if(typeof window[info.init] === 'function'){
    window[info.init]();
  }
}