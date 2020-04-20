/**
 * 2020.03.08
 *
*/

document.addEventListener("DOMContentLoaded", function(){

    // null check
    const fIsNull = (strA)=>{ return strA == null || strA == undefined ? "" : String(strA).trim() == "" ? "" : strA };

    // 컨텐츠 박스 활성화.비활성화
    const contentBoxes = document.querySelectorAll("div.kgj-category");

    Array.prototype.slice.call(contentBoxes).forEach(element => {
        element.addEventListener("click",(e)=>{
            fIsNull( element.dataset.index != "" )
                element.dataset.index = element.innerText;
                
            Array.prototype.slice.call(contentBoxes).forEach(element2 => {
                if( element2.dataset.index != element.dataset.index ){
                    element2.classList.toggle("showOff");
                }
            });

            element.classList.toggle("showYou");

        })
    });

});



