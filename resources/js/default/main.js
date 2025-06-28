/**
 * 2020.08.16
 *
*/
////////////////////// ⭐⭐⭐⭐⭐ ///////////////////

/**
 * @name UseYn
 * @param {*} a 
 * @description 파라미터 사용가능 여부 체크(파라미터가 안넘어오면 undefined이므로 undefined체크와 같다)
 */
const _useYn = function(a){
    return typeof a === "undefined" ? false : true;
  };
  
  /**
   * @name gTag
   * @param {string} selector 
   * @param {boolean} isAll 
   * @description querySelector 기능 정의
   */
  const _gTag = function(selector, isAll){
    if(_useYn(selector)){
      const tag = !_useYn(isAll) ? document.querySelector(selector) : ( isAll === true ? document.querySelectorAll(selector) : document.querySelector(selector) );
      return tag !== null ? tag : null;
    }else{
      return null;
    }
  };
  
  /**
   * @name ls
   * @param {string} nm
   * @description get/set localStroage. 로컬스토리지에서 데이터 input / output
   * @default getItem
   */
  const _ls = function(nm,stream,item){
    if(_useYn(nm)){
      return  _useYn(stream) ? ( stream === "set" ? localStorage.setItem(nm,item) : localStorage.getItem(nm) ) : localStorage.getItem(nm);
    }
  }
  
  
  /**
   * @name stopAllInterval
   * @description delete all interval. (전역)interval 전부 삭제
   */
  const _stopAllInterval = function(){
    for ( let i = 0; i < INTERVAL_ARR.length; i++ )
      clearInterval(INTERVAL_ARR[i]);
  };
  
  
  
  ////////////////////// ⭐⭐⭐⭐⭐ ///////////////////
/**
 * delveloper Management Section
 */

// application list is defined in APP_LIST (see config/appList.js)
}

let INTERVAL_ARR = [];
/**
 * END delveloper Management Section
 */

/**
 * @description null check
 * @param {any} a 
 */
const isNull = (a)=>{
    return a == null || a == undefined ? "" : String(a).trim() == "" ? "" : a 
};

/**
 * @description location page event
 * @param {path,url|string} a 
 * @param {window.open|[args target]|string} b 
 * @param {window.open|[args feature(width,height..)]|string} c 
 */
const goHref = (a,b,c)=>{
    let basePath    = location.href.indexOf(":8081") > -1 ? "http://localhost:8081/" : "https://gabeujin.github.io/"
        ,url        = isNull(a) != "" ? "views/" + a : ""
        ,target     = isNull(b) != "" ? b : ""
        ;feature    = isNull(c) != "" ? c : "";

    if(target == "gSearch"){
        url = url.replace(/views\//g,'');
        url = "https://www.google.com/search?q=" + url;
    }

    if(url.indexOf("github.com") > -1 || url.indexOf("developers.google") > -1 || url.indexOf("w3schools") > -1 ){
        window.open(a);
        return;
    }else if( url.indexOf("www.google.com/search") > -1 ){
        window.open(url);
        return;
    }

    if(target == "" && feature == ""){
        var pageTitle = document.querySelector("body>header>h1>span");
        pageTitle.innerHTML = "&#127968;";
        pageTitle.classList.add("goHome");
        ContentClear();
        includePage(url);
        //check app availability
        if(!APP_LIST.some(ap => ap.name === url.replace(/views\/app\/|.html/g,''))){
            getFeature.getToast("준비중입니다.");
        }
    }else{
        if(url.indexOf("youtube.com") > -1)
            window.open(a,target,feature);
        else
            window.open(basePath + url,target,feature);
    }
    return;
};

/**
 * @description set timeStamp fotter's clock
 */
const setClock = ()=>{
    const nowDate = new Date();
    const y = nowDate.getFullYear();
    const m = String(nowDate.getMonth() + 1).padStart(2,'0');
    const d = String(nowDate.getDate()).padStart(2,'0');
    const h = String(nowDate.getHours()).padStart(2,'0');
    const min = String(nowDate.getMinutes()).padStart(2,'0');
    const s = String(nowDate.getSeconds()).padStart(2,'0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

/**
 * @description get Color by hours
 * @param {hours|number} level 
 * @param {returnType[backgroundColor,fontColor]|string} type 
 */
const setColor = (level, type)=>{
    let colorLv = level
        ,color  = [210,80,0] //2시 컬러 : 제일 높은 온도색
        ,rtnColor;
    //0.7    
    //bright
    if(type == "bgColor"){
        if(colorLv > 6 && colorLv < 16){
            //시간이 흐를수록 높은 온도색
            rtnColor = color.map(item => Math.round(item/10) * (colorLv-5));
        }else if(level > 15 || level < 3){
            if(level < 24 && level > 15){
                //시간이 흐를수록 낮은 온도색
                rtnColor = color.map(item => Math.round(item/10) * (23-colorLv));
            }else{
                //24시부터 0이므로 연산방식 변경
                rtnColor = color.map(item => Math.round(item/10) * (2-colorLv));
            }
        }else{
            rtnColor = [0,0,0];
        }
        rtnColor.push(0.7);
        rtnColor = rtnColor.toString();
        return "rgb(" + rtnColor + ")"//명암비 설정;
    }else if(type == "font"){
        if(colorLv > 11 && colorLv < 21){
            rtnColor = "rgb(0,0,0)"
        }else{
            rtnColor = "rgb(255,255,255)"
        }
    return rtnColor;
    }
}

/**
 * @description get Dom element
 * @param {type|string} tagNm
 * @param {attribute|object} op
 */
const getTag = (tagNm, op)=>{
    if( isNull(op) != "" ){
        let tag = document.createElement(tagNm);

        tag.id          = isNull(op.id) != "" ? op.id : "";
        tag.className   = isNull(op.class) != "" ? op.class : "";
        tag.title       = isNull(op.title) != "" ? op.title : "";

        return tag;
    }else{
        return document.createElement(tagNm);
    }
}

//2020.08.16
const ContentClear = ()=>{
    const masterEl = document.querySelector("body>section>contents");
    masterEl.innerHTML = "";
}

/**
 * @description get feature / structure
 */
const getFeature = {
    /**
     * @description get default Dom section
     * @param {Dom Object|element} xmlDomTree
     */
    thumbnail : (xmlDomTree, xmlLink, num)=>{
        let dom = isNull(xmlDomTree) != "" ? xmlDomTree : "";
        if(dom == "") return dom;

        let title       = getTag("summary", {class : "thumbTitle" , title : isNull(dom.querySelector("metaInfo>title").textContent) != "" ? dom.querySelector("metaInfo>title").textContent : "" })
            ,hashTag    = getTag("p", {class : "thumbTag" , title : "hashTag"})
            ,detailTag  = getTag("details", typeof num != "undefined" ? {id : num, class : "thumbnail"} : {class : "thumbnail"} );
        
        let docFrag     = document.createDocumentFragment();
        let hashTags    = dom.querySelector("hashTag").textContent.split(",").map(item => "#" + item);
        
        let aTag = getTag("a"),
            tempTag;

        aTag.className = "hashTag";

        hashTags.forEach(el => {
            tempTag             = aTag.cloneNode();
            tempTag.textContent = el;
            tempTag.title       = el.replace(/#/g,"");
            hashTag.appendChild( tempTag );
        });
        //hashTag click event(google search)
        hashTag.addEventListener("click", e => e.target.title != "hashTag" ? goHref(e.target.textContent.replace(/#/g,''), "gSearch") : false );

        title.textContent = title.title;
        
        detailTag.appendChild(title);
        detailTag.appendChild(hashTag);
        detailTag.appendChild(getFeature.detailBtn(xmlLink));

        docFrag.appendChild(detailTag);
       
        return docFrag;
    },

    /**
     * @description create card style for app list
     */
    appCard : (xmlDomTree, xmlLink) => {
        const dom = isNull(xmlDomTree) !== "" ? xmlDomTree : "";
        if(dom === "") return dom;

        const card = getTag("div", {class : "app-card"});
        const title = getTag("h3");
        title.textContent = dom.querySelector("metaInfo>title").textContent;

        const tagWrap = getTag("p", {class : "thumbTag", title : "hashTag"});
        const hashTags = dom.querySelector("hashTag").textContent.split(',').map(t => "#"+t);
        const aTemp = getTag("a");
        aTemp.className = "hashTag";
        let t;
        hashTags.forEach(el => {
            t = aTemp.cloneNode();
            t.textContent = el;
            t.title = el.replace(/#/g,'');
            tagWrap.appendChild(t);
        });
        tagWrap.addEventListener("click", e => e.target.title != "hashTag" ? goHref(e.target.textContent.replace(/#/g,''), "gSearch") : false );

        const btn = getFeature.detailBtn(xmlLink);

        card.appendChild(title);
        card.appendChild(tagWrap);
        card.appendChild(btn);

        return card;
    },
    /**
     * @description get default detail button
     * @param none
     */
    detailBtn : (link)=>{
        let btn         = getTag("button",{ class : "thumbBtn", title : "" });
        btn.textContent = "S T A R T";
        btn.type        = "button";
        btn.addEventListener("click", e => {
            e.stopPropagation(); 
            if( link.textContent.indexOf("www") > -1 )
                goHref("https://"+link.textContent.trim(),"_blank");
            else
                goHref(link.textContent.trim() + ".html");
            //getFeature.getToast("준비중입니다.");
            
        });
        //addevent
        return btn;
    },
     /**
     * @description toast alert
     * @param {alert text|String} textContents
     */
    getToast : (str)=>{
        let toastAlert  = getTag("div",{ class : "toastAlert" , title : "toast" })
            ,printStr   = isNull(str) != "" ? str : "";
            
        if( document.querySelectorAll(".toastAlert").length > 5 ){
            return false;
        }

        toastAlert.textContent = printStr;
        document.body.appendChild(toastAlert);
        
         setTimeout((e)=>{
             toastAlert.className = "toastAlert on";
            setTimeout((e)=>{
                toastAlert.className = "toastAlert off";
                setTimeout((e)=>{document.body.removeChild(toastAlert);
                },400);
            },3000);
         },100);
    }


}