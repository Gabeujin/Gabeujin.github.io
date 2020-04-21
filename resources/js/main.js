/**
 * 2020.04.08
 *
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
    let basePath    = "https://gabeujin.github.io/"
        ,url        = isNull(a) != "" ? "view/".concat(a) : ""
        ,target     = isNull(b) != "" ? b : ""
        ;feature    = isNull(c) != "" ? c : "";

    if(url.indexOf( "https://github.com/") > -1 ){
        window.open(a);
        return;
    }
    if(target == "" && feature == ""){
        window.open(basePath + url);
    }else{
        window.open(basePath + url,target,feature);
    }
    return;
};

/**
 * @description set timeStamp fotter's clock
 */
const setClock = ()=>{
    let nowDate = new Date();
    return nowDate.getFullYear() + "년 " + nowDate.getMonth() + "월 " + nowDate.getDate() + "일 " + nowDate.getHours() + "시 " + nowDate.getMinutes() + "분 " + nowDate.getSeconds() + "초";
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
        if(colorLv > 5 && colorLv < 16){
            //시간이 흐를수록 높은 온도색
            rtnColor = color.map(item => Math.round(item/10) * (colorLv-5));
        }else if(level > 15 || level < 3){
            if(level < 24 && level > 15){
                //시간이 흐를수록 낮은 온도색
                rtnColor = color.map(item => Math.round(item/10) * (26-colorLv));
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