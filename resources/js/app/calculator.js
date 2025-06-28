const calArr = [];

const PREV_LS = "PREVNUM"
      ,OPER_LS = "OPER"
      ,NEXT_LS = "NEXTNUM"
      ,TEMP_LS = "TEMP";

const calEvtHdlr = {
  reset : function(isShow){
    while(calArr.length > 0){
      calArr.pop();
    }
    if(typeof isShow !== "boolean" ){
      calEvtHdlr.allLsClear();
      localStorage.removeItem(TEMP_LS);
      calArr.push(0);
      showDp();
    }
  }
  ,result : function(){
    const prev = localStorage.getItem(PREV_LS) === null ? 0 : localStorage.getItem(PREV_LS)
          ,oper = localStorage.getItem(OPER_LS)
          ,next = getRplcNum(calArr);

    const isMinus = (calArr.toString().replace(/[,]/g,'')).charAt() === "-" ? "-" : "";
    
      if(prev === "0" && oper === null){
        calEvtHdlr.reset();
        return;
      }else if( localStorage.getItem(TEMP_LS) != null && oper != null ){
        const reCntNum = localStorage.getItem(TEMP_LS);
        const reAddNum = localStorage.getItem(NEXT_LS);
        excepReCnt(reCntNum,oper,reAddNum);
      }else{
        excepReCnt(prev,oper, isMinus + next);
    }
  }

  ,setNum : function(e){
    if(typeof e !== "object"){
      calArr.push(e);
    }else{
      calArr.push(e.target.innerText);
    }
    showDp();
  }

  ,setLsNum : function(lsNm, lsVal){
    return localStorage.setItem(lsNm,lsVal);
  }

  ,getOper : function(){
    const prev    = localStorage.getItem(PREV_LS)
          , oper  = localStorage.getItem(OPER_LS)
          , next  = localStorage.getItem(NEXT_LS) === null ? 0 : localStorage.getItem(NEXT_LS);
    switch(oper){
      case "+": return Number(prev) + Number(next);
      case "-": return Number(prev) - Number(next);
      case "*": return Number(prev) * Number(next);
      case "/": return Number(prev) / Number(next);
      default : return Number(prev);
    }
  }

  ,allLsClear : function(){
    localStorage.removeItem(PREV_LS);
    localStorage.removeItem(OPER_LS);
    localStorage.removeItem(NEXT_LS);
  }
}

function excepReCnt(num1,oper,num2){
  const hdlr = calEvtHdlr;
  hdlr.setLsNum(PREV_LS,num1);
  hdlr.setLsNum(OPER_LS,oper);
  hdlr.setLsNum(NEXT_LS,num2);
  hdlr.setLsNum(TEMP_LS,calEvtHdlr.getOper());

  hdlr.allLsClear();
  hdlr.reset(false);
  hdlr.setNum(localStorage.getItem(TEMP_LS));
  hdlr.setLsNum(OPER_LS,oper);
  hdlr.setLsNum(NEXT_LS,num2);
}
//- 두번 누르면 문제발생.

function getRplcNum(arr){
  const str = arr.toString().replace(/[,]/g,'').replace(/[^0-9.]/g,'');
  return str === "" ? "0" : str;
}

function showDp(){
  const resultDp  = _gTag("#result")
        ,hdlr     = calEvtHdlr;

  if("+-*/".indexOf(String(calArr[calArr.length-1])) < 0){
    let nowNum = calArr.toString().replace(/[,]/g,'');
    if(nowNum.length > 15) {
      resultDp.classList.add("smallText");
    }

    if(Number(nowNum) === 0){
      resultDp.value = 0;
    }else{
      resultDp.value = Number(nowNum);
    }
    console.log(Number(nowNum));
  }else{
    localStorage.removeItem(NEXT_LS);
    const isMinus = (calArr.toString().replace(/[,]/g,'')).charAt() === "-" ? "-" : "";
    if(localStorage.getItem(PREV_LS) === null){
      //이전값이 없는 경우(초기연산)
      hdlr.setLsNum(PREV_LS, isMinus + getRplcNum(calArr));
      hdlr.setLsNum(OPER_LS,calArr[calArr.length-1]);
      hdlr.reset(false);
      localStorage.removeItem(TEMP_LS);
    }else if(localStorage.getItem(PREV_LS) != null && localStorage.getItem(OPER_LS) != null && localStorage.getItem(NEXT_LS) === null){
      //이전값은 있고 다음값이 없는경우(초기 이후 연산)
      hdlr.setLsNum(NEXT_LS, isMinus + getRplcNum(calArr));
      const getOperNum = hdlr.getOper();
      hdlr.setLsNum(TEMP_LS,getOperNum);//temp에 담기(초기값설정)
      hdlr.setLsNum(OPER_LS,calArr[calArr.length-1]);
      localStorage.removeItem(PREV_LS);
      localStorage.removeItem(NEXT_LS);
      hdlr.reset(false);
      hdlr.setNum(localStorage.getItem(TEMP_LS));
      hdlr.setNum(localStorage.getItem(OPER_LS));
      
    }
  }
}

function calculatorInit() {

  _gTag("body>section").style.backgroundColor = "rgb(44, 42, 42)";

  const resetBtn      = _gTag("button.reset")
        ,resultBtn    = _gTag("button.result")
        ,numberBtns   = _gTag("button.number",true)
        ,numberOpers  = _gTag("button.oper",true);

  calEvtHdlr.reset();
  localStorage.removeItem(TEMP_LS);
  resetBtn.addEventListener("click",calEvtHdlr.reset);
  resultBtn.addEventListener("click",calEvtHdlr.result);
  numberBtns.forEach((item)=>{
    item.addEventListener("click",calEvtHdlr.setNum);
  });

  numberOpers.forEach((item)=>{
    item.addEventListener("click",calEvtHdlr.setNum);
  });
}
