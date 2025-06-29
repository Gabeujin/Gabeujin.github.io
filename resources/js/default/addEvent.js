//footer randering
let fnReady = function(){
    let issueLink = document.querySelector("#issueLink");
    if(issueLink){
        issueLink.addEventListener("click", (e)=>{
            e.stopPropagation();
            goHref("https://github.com/Gabeujin/Gabeujin.github.io/issues/new");
        });
    }

    let lhTest = document.querySelector("#lhTest");
    if(lhTest){
        lhTest.addEventListener("click", (e)=>{
            e.stopPropagation();
            goHref("https://developers.google.com/speed/pagespeed/insights/?hl=ko&url=https://gabeujin.github.io");
        });
    }

    let charsets = document.querySelector("#charsets");
    if(charsets){
        charsets.addEventListener("click", (e)=>{
            e.stopPropagation();
            goHref("https://www.w3schools.com/charsets/");
        });
    }

    const titleSpan = document.querySelector(".pageTitle span");
    if(titleSpan){
        titleSpan.addEventListener("click", (e)=>{
            e.stopPropagation();
            if(typeof showMain === 'function') showMain();
        });
    }

    const titleEl = document.querySelector('.pageTitle');
    if(titleEl){
        titleEl.addEventListener('click', (e)=>{
            e.stopPropagation();
            if(typeof showMain === 'function') showMain();
        });
    }

    //footer clock setting
    let clock = document.querySelector("#clockTag");
    clock.innerText = setClock();

    setInterval( function(){
        clock.innerText = setClock();
    },1000);

    includeSection();
};