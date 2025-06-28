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

    document.querySelector(".pageTitle span").addEventListener("click", (e)=>{
        e.stopPropagation();
        let pageTitle = document.querySelector("body>header>h1>span");
        if(pageTitle.textContent === "Memory Repo") return false;
        pageTitle.classList.remove("goHome");
        pageTitle.innerHTML = "Memory Repo";

        const section = document.querySelector("body>section");
        section.style.background = "none";

        let mainSection = pageTitle.parentNode.parentNode.parentNode.querySelector("section");
        mainSection.classList.remove("setFadeIn");
        mainSection.classList.add("setDpNone");
        if(mainSection.classList.contains("setDpNone")){
            setTimeout(function(){
                mainSection.classList.add("setFadeIn");
                mainSection.classList.remove("setDpNone");
            },100);
            
        }

        for ( let i = 0; i < INTERVAL_ARR.length; i++ )
            clearInterval(INTERVAL_ARR[i]);
            
        ContentClear();
        includeSection();
    });

    //footer clock setting
    let clock = document.querySelector("#clockTag");
    clock.innerText = setClock();

    setInterval( function(){
        clock.innerText = setClock();
    },1000);

    includeSection();
};