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

let includeSection = (i,j)=>{
  let z, file, xhttp, docXml, docFrag, fileNum;
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
              fileNum = docXml.baseURI.split("contents/")[1].replace(".xml","").replace("html","");
              docFrag.appendChild( getFeature.thumbnail( docXml.querySelector("metaInfo"), docXml.querySelector("link") , fileNum ) );
              z.appendChild(docFrag);
              z.appendChild(document.createElement("hr"));
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
            if(i == 3) return false;
            includeSection(i+1, j);
          }
        }
        if(i == 4) return false;
        file += ".xml";
        
        try {
          xhttp.open("GET", "/views/contents/" + file, true);
          xhttp.send();
        } catch (e) {
          console.log(e);
        }
        
        // i++;
        return false;
      }
    }while(true);
}

let includePage = (file)=>{
  let z, elmnt, xhttp;
  z = document.querySelector("body>section>contents");
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.readyState == 4) {
        if (this.status == 200) {
          z.innerHTML = this.responseText;
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
  }
xhttp.open("GET", "/" + file, true);
xhttp.send();
/* Exit the function: */
return;
}