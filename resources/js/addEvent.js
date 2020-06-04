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
        var pageTitle = document.querySelector("body>header>h1>span");
        if(pageTitle.textContent == "Memory Repo") return false;
        pageTitle.innerHTML = "Memory Repo";
        document.querySelector("body>section>contents").innerHTML = "";
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