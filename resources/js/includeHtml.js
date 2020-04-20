
    var includeHTML = ()=>{
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = document.querySelectorAll("body>*");
        for (i = 0; i < z.length; i++) {
          elmnt = z[i];
          /*search for elements with a certain atrribute:*/
          file = elmnt.getAttribute("include-html");
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
               
                elmnt.removeAttribute("include-html");
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