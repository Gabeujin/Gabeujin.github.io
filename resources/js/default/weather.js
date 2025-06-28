////////////////////// ⭐⭐⭐⭐⭐ ///////////////////

////////////////////// ⭐⭐⭐⭐⭐ ///////////////////

///🚫고정 상수 정의////
const GEO_LS      = "COORDS"; //사용자 이름 localStorage
// API key는 환경 변수 또는 config 파일(resources/js/config/weatherConfig.js)
// 에서 제공되는 WEATHER_API_KEY 전역 변수에서 읽어옵니다.
const GEO_APIKEY  =
  (typeof WEATHER_API_KEY !== "undefined" && WEATHER_API_KEY) ||
  (typeof process !== "undefined" && process.env && process.env.WEATHER_API_KEY);

if (!GEO_APIKEY) {
  console.error("Weather API key is not configured. Set WEATHER_API_KEY in weatherConfig.js or as an environment variable.");
}
//////////////////////

function setGeoTemp(obj){
  const geoTemp = _gTag("span.geoLocationTemp");
  if(_useYn(obj)){
    geoTemp.innerText = `${obj.current.temp}℃,  ${obj.timezone}`;

  }
}

function getWeather(obj){
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${obj.lat}&lon=${obj.long}&appid=${GEO_APIKEY}&units=metric`
    ).then(function(res){
        return res.json();
    }).then(function(json){
      setGeoTemp(json);
    });
}


function saveCoords(obj){
  _ls(GEO_LS,"set",JSON.stringify(obj));
}

function geoSucces(pos){
  if(_useYn(pos)){
    const posObj = {
      lat   : pos.coords.latitude
      ,long : pos.coords.longitude
    };

    saveCoords(posObj);
    getWeather(posObj);
  }
  
}

function geoError(){
  console.log(`Can't read`);
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(geoSucces, geoError);
}

function loadCoords(){
  const coords = _ls(GEO_LS);
  if(coords === null){
    askForCoords();
  }else{
    const getCoords = JSON.parse(coords);
    getWeather(getCoords);
  }
}


/**
 * @name weatherInit
 * @description momontomApp init function
 */
function weatherInit() {
  loadCoords();
}