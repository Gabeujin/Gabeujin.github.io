//footer randering
let fnReady = function(){
    document.querySelector("#issueLink").addEventListener("click", (e)=>{
        e.stopPropagation();
        goHref("https://github.com/Gabeujin/Gabeujin.github.io/issues/new");
    });

    document.querySelector("#lhTest").addEventListener("click", (e)=>{
        e.stopPropagation();
        goHref("https://developers.google.com/speed/pagespeed/insights/?hl=ko&url=https://gabeujin.github.io");
    });

    document.querySelector("#charsets").addEventListener("click", (e)=>{
        e.stopPropagation();
        goHref("https://www.w3schools.com/charsets/");
    });

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
        includeSection(1,true);
    });

    //footer clock setting
    let clock = document.querySelector("#clockTag");
    clock.innerText = setClock();
    clock.style.backgroundColor = setColor( Number(clock.innerText.split("일 ")[1].split("시")[0]), "bgColor" );
    clock.style.color = setColor( Number(clock.innerText.split("일 ")[1].split("시")[0]), "font" );

    setInterval( function(){
        clock.innerText = setClock();
        clock.style.backgroundColor = setColor( Number(clock.innerText.split("일 ")[1].split("시")[0]), "bgColor" );
        clock.style.color = setColor( Number(clock.innerText.split("일 ")[1].split("시")[0]), "font" );
    },1000);

    includeSection(1,true);
};