//footer randering
let fnReady = function(){
    document.querySelector("#issueLink").addEventListener("click", (e)=>{
        e.stopPropagation();
        goHref("https://github.com/Gabeujin/Gabeujin.github.io/issues/new");
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

    includeSection();
};