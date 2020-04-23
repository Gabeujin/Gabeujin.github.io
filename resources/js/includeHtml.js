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

let i = 1;
let isFind = true;
let includeSection = ()=>{
  let z, file, xhttp, docXml, docFrag;
  z = document.querySelector("body>section>contents");
    do{
      file = i;
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              docXml = this.responseXML;
              docFrag = document.createDocumentFragment();
              docFrag.appendChild(getFeature.thumbnail( docXml.querySelector("metaInfo") ));
              z.appendChild(docFrag);
              z.appendChild(document.createElement("hr"));
            }
            if (this.status == 403) {
              return;
            }
            if (this.status == 404) {
              docFrag = document.createDocumentFragment();
              docFrag.innerHTML = "Page not found.";
              z.appendChild(docFrag);
              return;
            }
            if (this.status == 405) {
              return;
            }
            if (this.status == 500) {
              return;
            }
            includeSection();
          }
        }
        file += ".xml";
        
        try {
          xhttp.open("GET", "/views/contents/" + file, true);
          xhttp.send();
        } catch (e) {
          console.log(e);
        }
        
        i++;
        return;
      }
    }while(isFind);
}