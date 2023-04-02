////////////////////// ⭐⭐⭐⭐⭐ ///////////////////

////////////////////// ⭐⭐⭐⭐⭐ ///////////////////

///🚫고정 상수 정의////

//////////////////////


/**
 * @name colorInit
 * @description momontomApp init function
 */
function colorInit() {
  const colors = [
    "#f3a683"
    ,"#f7d794"
    ,"#778beb"
    ,"#e77f67"
    ,"#cf6a87"
    ,"#786fa6"
    ,"#f8a5c2"
    ,"#63cdda"
    ,"#ea8685"
    ,"#596275"
  ]
  ,number = Math.floor(Math.random() * 9 )
  ,section = _gTag("body>section");

  section.style.backgroundColor = colors[number];
}