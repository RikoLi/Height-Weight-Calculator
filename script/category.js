//distribute real datas into proper areas   根据标准差确定实际身高、体重值与理论值的偏差情况，用来反映发育情况
function cate(pos){
    if(pos >= 3)
        return "过高";
    if(pos >= 2 && pos < 3)
        return "高";
    if(pos >= 1 && pos < 2)
        return "偏高";
    if(pos > -1 && pos < 1)
        return "正常";
    if(pos > -2 && pos <= -1)
        return "偏低";
    if(pos > -3 && pos <= -2)
        return "低";
    if(pos <= -3)
        return "过低";
}