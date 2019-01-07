//designed to find the right place to interpolate   用来将月龄转化为符合插值点适用数据的函数
function find(monthAge){
    var monthAgeInt;

    if(monthAge % 3 == 0){
        return monthAge;
    }
    monthAgeInt = Math.floor(monthAge);
    if(monthAgeInt <= 12){
        return monthAge;
    }
    if(monthAgeInt > 12 && monthAgeInt <= 84){
        monthAge = (monthAge - monthAgeInt) / 3 + monthAgeInt;           
        return monthAge;
    }
}