///🚫고정 상수 정의////
const USR_LS    = "USERNM"//사용자 이름 localStorage
      ,TODO_LS  = "TODOLIST"//할일 목록

let TODO_ARR = [];//할일 목록('할일'을 담을 배열)
//////////////////////

/**
 * @name getTime
 * @description 시간 설정
 */
function getTime() {
  const nowDate = new Date()
        ,months = nowDate.getMonth() + 1
        ,days   = nowDate.getDate()
        ,hours  = nowDate.getHours()
        ,mins   = nowDate.getMinutes()
        ,secs   = nowDate.getSeconds();

  const clock = _gTag(".clock h1");

  if(clock !== null){
    clock.innerText = `${`${months}/` + (days < 10 ? `0${days}` : days)} Days, ${hours < 10 ? `0${hours}` : hours}:${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  }
}

/**
 * @name deleteTodo
 * @description 할일 삭제
 */
function deleteTodo(e) {
  const targetBtn     = e.target //해당 삭제버튼
        ,targetLi     = targetBtn.parentNode //삭제 대상 li
        ,targetUl     = targetLi.parentNode // 삭제대상 ul
        ,targetValue  = targetLi.querySelector("span");//삭제할 할일
  
  targetUl.removeChild(targetLi);

  if(TODO_ARR.length > 0){
    const removeArr = TODO_ARR.filter(function(item){
      return item.id !== targetBtn.id;
    });

    TODO_ARR = removeArr;

    _ls(TODO_LS,"set",JSON.stringify(TODO_ARR));
  }
}

/**
 * @name setDpUser
 * @param {string} name
 * @description 사용자이름으로 환영 문구 출력
 */
function setDpUser(name){
  if(_useYn(name)){
    const dpUsr       = _gTag("form.momontomForm")
          ,inputTodo  = document.createElement("input");

    dpUsr.innerHTML     = `<h1>Hello! ${name} ^^</h1>`;//초기화(H1태그 내부 초기화) 및 이름 출력
    inputTodo.type      = "text";
    inputTodo.className = "txt underL";
    inputTodo.name      = "todo";
    inputTodo.maxlength = 255;
    dpUsr.appendChild(document.createElement("br"));
    dpUsr.appendChild(inputTodo);//할일 입력 input 자식태그로 추가
    dpUsr.removeEventListener("submit",setUser);//사용자 이름 입력 submit 이벤트 삭제
    dpUsr.addEventListener("submit",setTodoList);//todolist 입력 이벤트 등록
  }
}


/**
 * @name setDpTodo
 * @description 할일 추가
 */
function setDpTodo(){
  const dpTodo    = _gTag("div.momontomService")//할일 목록 표시할 div
        ,todoUl   = dpTodo.querySelector("ul")//할일 목록 리스트(ul 태그)
        ,todoLi   = document.createElement("li")//할일
        ,todoTxt  = document.createElement("span")//할일 텍스트
        ,delBtn   = document.createElement("button")//할일 삭제
        ,docFrag  = document.createDocumentFragment();//가상 메모리 DOM
  
  if(TODO_ARR.length > 0){//todolist 가 존재할 때

    todoUl.innerHTML = ""; //리스트 초기화

    delBtn.innerText = "❌";//삭제버튼 표시 문구
    delBtn.style.marginRight = "1rem";

    todoLi.appendChild(delBtn);//삭제버튼 
    todoLi.appendChild(todoTxt);//할일 텍스트

    let cloneLi;//상단의 할일 li 를 복제해서 계속 사용할 변수
    TODO_ARR.forEach(function(item){
      cloneLi = todoLi.cloneNode(true);//자식태그까지 전부 복사
      cloneLi.querySelector("span").innerText = item.value;//할일 텍스트에 할일문구 입력
      cloneLi.querySelector("button").id = item.id;//삭제버튼에 할일의 id를 입력
      cloneLi.querySelector("button").addEventListener("click", deleteTodo);
      // cloneLi.className = "setFadeIn";
      docFrag.appendChild(cloneLi);
    });

    todoUl.appendChild(docFrag);
  }
}


/**
 * @name setUser
 * @description 사용자정보 localStorage에 저장
 */
function setUser(e){
  //event 기존 정의된 기능 초기화(기존 기능 삭제)
  e.preventDefault();

  /*form태그는 객체에서 데이터를 가져오는 것처럼
  ex. 
  const object = {a : "1", b: "2"};
  console.log(object.a);
  ==> "1";

  form 안에 생성되어 있는 태그들의 name 속성으로 가져올 수 있다.
  아래의 경우, <input ... name="usrNm" ...  /> 으로 정의되어 있는 경우다.
  */
  const thisForm  = e.target
        ,usrNm    = thisForm.usrNm;
  
  //usrNm 변수에 사용가능한 값이 들어있는 경우.
  if(_useYn(usrNm)){
    _ls(USR_LS,"set",usrNm.value);
    setDpUser(usrNm.value);
  }
  usrNm.value = "";//input 초기화
  
}

/**
 * @name setTodoList
 * @description 할일 정보 localStorage에 저장
 */
function setTodoList(e){
  //event 기존 정의된 기능 초기화(기존 기능 삭제)
  e.preventDefault();

  /*form태그는 객체에서 데이터를 가져오는 것처럼
  ex. 
  const object = {a : "1", b: "2"};
  console.log(object.a);
  ==> "1";

  form 안에 생성되어 있는 태그들의 name 속성으로 가져올 수 있다.
  아래의 경우, <input ... name="usrNm" ...  /> 으로 정의되어 있는 경우다.
  */
  const thisForm  = e.target
        ,usrTodo  = thisForm.todo;

  //usrNm 변수에 사용가능한 값이 들어있는 경우.
  if(_useYn(usrTodo)){
    TODO_ARR.push({ id : String(new Date().getTime()) , value : usrTodo.value});//할일의 id지정 및 값 지정
    const dataToJson = JSON.stringify(TODO_ARR);
    _ls(TODO_LS,"set",dataToJson);
    setDpTodo();//할일 목록 표시
  }
  usrTodo.value = "";//input 초기화
  
}

/**
 * @name momontomInit
 * @description momontomApp init function
 */
function momontomInit() {
  //interval 초기화
  _stopAllInterval();
  
  const moForm      = _gTag("form.momontomForm") //form tag
        ,DpUsr      = moForm.querySelector("h1") //사용자 정보 표시 h1 tag
        ,inputNm    = document.createElement("input") //사용자 정보 입력 input tag
        ,usrNm      = _ls(USR_LS)  //localstorage.getItem(사용자이름)
        ,usrTodo    = JSON.parse(_ls(TODO_LS));  //localstorage.getItem(사용자 할일)

  //이름을 입력하는 input 설정
  inputNm.type      = "text";
  inputNm.className = "txt underL";
  inputNm.name      = "usrNm";
  inputNm.maxlength = 50;

  //init D-day setting. 시계 설정 및 1초마다 반복 실행 interval 설정.
  getTime();
  INTERVAL_ARR.push(setInterval(getTime, 1000));

  //할일(localStorage) 을 변수로 담기 = 초기화
  if(usrTodo !== null){
    usrTodo.forEach(function(item){
      TODO_ARR.push(item);
    });
  }

  //사용자이름을 localStorage에서 가지고 있다면
  if(usrNm !== null && usrNm.length > 0){
    //메인화면 welcome 문구 표시
    setDpUser(usrNm);
    //todoList Service 화면에 보여주기
    setDpTodo();
  }else{
    //메인화면 사용자 이름 입력받기
    DpUsr.innerText = "Your name is ";
    DpUsr.appendChild(inputNm);
    
    //사용자 정보 입력창 생겼을 때만 form에 이벤트 추가
    moForm.addEventListener("submit", setUser);
  }

  weatherInit();
  colorInit();
}