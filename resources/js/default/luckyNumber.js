const luckyNum = (isRtn)=>{
  let number = new Array();
  let temp;
  for(let i=0;i<6;i++){
    temp = Math.floor(Math.random()*45)+1;
    if(i>0){
      while(number.includes(temp)){
        temp = Math.floor(Math.random()*45)+1;
      }
    }
    number.push(temp);
  }
  console.log('%c오늘도 좋은 하루:D\t\t\t\t\t'+'\nlucky Number : '+number.toString()+'\t\t','font-size:20px;color:#80c475;background-color:black;');
  
  if(isNull(isRtn) != "" && typeof isRtn == "boolean" ){
    return alert("행운번호\n" + number.toString());
  }
}