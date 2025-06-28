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
    const ids = Object.keys(SHOW_APP);
    const responses = await Promise.all(
      ids.map(id => fetch(`/views/contents/${id}.xml`))
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

let includePage = (file)=>{
  let z, elmnt, xhttp;
  z = document.querySelector("body>section>contents");
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        z.innerHTML = this.responseText;
        includeJsInit(z.querySelector("article").id);
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

const includeJsInit = (appId)=>{
  if(typeof appId !== "undefined"){
    //it used app
    const app = appId.replace(/app/g,'').replace(/^./g,(a)=>a.toLowerCase());
    if(Object.values(SHOW_APP).includes(app)){
      if(app === "momontom"){
        momontomInit();
      }else if(app === "calculator"){
        calculatorInit();
      }
    }
  }
}