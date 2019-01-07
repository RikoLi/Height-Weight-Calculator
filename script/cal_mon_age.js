//calculate month age   计算生日与当前时间相差几个月的函数
function calAge(startdate, enddate){
    var  aDate,  oDate1,  oDate2,  iDays, d_month;



    aDate  =  startdate.split("-");
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);   //startdate
    aDate  =  enddate.split("-");
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);   //enddate
    
    if(oDate1.getDate() == oDate2.getDate()){
        d_month = Math.abs(oDate1.getFullYear() - oDate2.getFullYear()) * 12 + Math.abs(oDate1.getMonth() - oDate2.getMonth());
        return d_month;
    }

    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  / 24);  
    return  iDays/30;      
    
}