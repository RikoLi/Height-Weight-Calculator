//quad interpolation functions  二次插值函数
function quad(data, gender, mode, inMonAge, realVal){
    //变量声明
    var i;
    
    result.ideal = 0;   //用于存储插值得到的理论值结果
    result.bias = 0;    //用于存储标准差的插值结果
    result.pos = 0;     //用于存储实际值与理论值相差几个标准差
    
    //下面以男性身高插值模式为例书写注释，其他模式的实现方法同此模式
    //male height   男性身高插值模式
    if(gender == "male" && mode == "height"){
        if(Math.floor(inMonAge) >= 0 && Math.floor(inMonAge) <= 11){    //判断月龄是否在0~11个月区间
            for(i=0;i<=12;i++){
                if(inMonAge == 0){                                      //边际节点数据直接显示
                    result.ideal = data.male.height[0];
                    result.pos = (-result.ideal + realVal) / data.male.h_stdbias[0];
                    return result.ideal;
                }
                if(i == Math.floor(inMonAge)){                          //0~1个月月龄单独用前三个节点插值计算
                    if(i == 0){
                        result.ideal = data.male.height[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.male.height[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.male.height[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.bias = data.male.h_stdbias[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.male.h_stdbias[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.male.h_stdbias[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }                                                   //其余月龄时的插值计算
                    result.ideal = data.male.height[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.male.height[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/((i - (i-1))*(i - (i+1)))) + data.male.height[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.bias = data.male.h_stdbias[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.male.h_stdbias[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/(i - (i-1))*(i - (i+1))) + data.male.h_stdbias[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }

            }
        }

        else{                                                           //当月龄在12~81个月区间中
            for(i=12;i<=81;i=i+3){                                      //判断月龄在具体哪两个相邻节点中间
                if(Math.floor(inMonAge) >= i && Math.floor(inMonAge) < (i+3)){
                    if(i == 81){                                        //边际节点数据直接显示
                        result.ideal = data.male.height[35];
                        result.bias = data.male.h_stdbias[35];
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    inMonAge = find(inMonAge);                          //将月龄转化为符合插值点适用的数据，并进行插值计算
                    result.ideal = data.male.height[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.male.height[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.male.height[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.bias = data.male.h_stdbias[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.male.h_stdbias[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.male.h_stdbias[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }
            }
        }
    }
    //female height
    if(gender == "female" && mode == "height"){
        if(Math.floor(inMonAge) >= 0 && Math.floor(inMonAge) <= 11){
            for(i=0;i<=12;i++){
                if(inMonAge == 0){
                    result.ideal = data.female.height[0];
                    result.pos = (-result.ideal + realVal) / data.female.h_stdbias[0];
                    return result.ideal;
                }
                if(i == Math.floor(inMonAge)){
                    if(i == 0){
                        result.ideal = data.female.height[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.female.height[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.female.height[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.bias = data.female.h_stdbias[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.female.h_stdbias[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.female.h_stdbias[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    result.ideal = data.female.height[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.female.height[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/((i - (i-1))*(i - (i+1)))) + data.female.height[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.bias = data.female.h_stdbias[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.female.h_stdbias[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/(i - (i-1))*(i - (i+1))) + data.female.h_stdbias[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }

            }
        }

        else{
            for(i=12;i<=81;i=i+3){
                if(Math.floor(inMonAge) >= i && Math.floor(inMonAge) < (i+3)){
                    if(i == 81){
                        result.ideal = data.female.height[35];
                        result.bias = data.female.h_stdbias[35];
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    inMonAge = find(inMonAge);
                    result.ideal = data.female.height[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.female.height[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.female.height[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.bias = data.female.h_stdbias[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.female.h_stdbias[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.female.h_stdbias[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }
            }
        }
    }
    //male weight
    if(gender == "male" && mode == "weight"){
        if(Math.floor(inMonAge) >= 0 && Math.floor(inMonAge) <= 11){
            for(i=0;i<=12;i++){
                if(inMonAge == 0){
                    result.ideal = data.male.weight[0];
                    result.pos = (-result.ideal + realVal) / data.male.w_stdbias[0];
                    return result.ideal;
                }
                if(i == Math.floor(inMonAge)){
                    if(i == 0){
                        result.ideal = data.male.weight[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.male.weight[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.male.weight[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.bias = data.male.w_stdbias[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.male.w_stdbias[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.male.w_stdbias[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    result.ideal = data.male.weight[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.male.weight[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/((i - (i-1))*(i - (i+1)))) + data.male.weight[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.bias = data.male.w_stdbias[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.male.w_stdbias[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/(i - (i-1))*(i - (i+1))) + data.male.w_stdbias[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.pos =(-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }

            }
        }

        else{
            for(i=12;i<=81;i=i+3){
                if(Math.floor(inMonAge) >= i && Math.floor(inMonAge) < (i+3)){
                    if(i == 81){
                        result.ideal = data.male.weight[35];
                        result.bias = data.male.w_stdbias[35];
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    
                    inMonAge = find(inMonAge);
                    result.ideal = data.male.weight[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.male.weight[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.male.weight[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.bias = data.male.w_stdbias[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.male.w_stdbias[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.male.w_stdbias[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;


                }
            }
        }
    }
    //female weight
    if(gender == "female" && mode == "weight"){
        if(Math.floor(inMonAge) >= 0 && Math.floor(inMonAge) <= 11){
            for(i=0;i<=12;i++){
                if(inMonAge == 0){
                    result.ideal = data.female.weight[0];
                    result.ideal = data.female.weight[0];
                    result.pos = (-result.ideal + realVal) / data.female.w_stdbias[0];
                    return result.ideal;
                }
                if(i == Math.floor(inMonAge)){
                    if(i == 0){
                        result.ideal = data.female.weight[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.female.weight[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.female.weight[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.bias = data.female.w_stdbias[0] * ((inMonAge - 1)*(inMonAge - 2)/((0 - 1)*(0 - 2))) + data.female.w_stdbias[1] * ((inMonAge - 0)*(inMonAge - 2)/(1 - 0)*(1 - 2)) + data.female.w_stdbias[2] * ((inMonAge - 0)*(inMonAge - 1)/((2 - 0)*(2 - 1)));
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    result.ideal = data.female.weight[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.female.weight[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/((i - (i-1))*(i - (i+1)))) + data.female.weight[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.bias = data.female.w_stdbias[i-1] * ((inMonAge - i)*(inMonAge - (i+1))/((i-1 - i)*(i-1 - (i+1)))) + data.female.w_stdbias[i] * ((inMonAge - (i-1))*(inMonAge - (i+1))/(i - (i-1))*(i - (i+1))) + data.female.w_stdbias[i+1] * ((inMonAge - (i-1))*(inMonAge - i)/((i+1 - (i-1))*(i+1 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }

            }
        }

        else{
            for(i=12;i<=81;i=i+3){
                if(Math.floor(inMonAge) >= i && Math.floor(inMonAge) < (i+3)){
                    if(i == 81){
                        result.ideal = data.female.weight[35];
                        result.bias = data.female.w_stdbias[35];
                        result.pos = (-result.ideal + realVal) / result.bias;
                        return result.ideal;
                    }
                    inMonAge = find(inMonAge);
                    result.ideal = data.female.weight[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.female.weight[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.female.weight[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.bias = data.female.w_stdbias[(i+24)/3-1] * ((inMonAge - i)*(inMonAge - (i+3))/((i-3 - i)*(i-3 - (i+3)))) + data.female.w_stdbias[(i+24)/3] * ((inMonAge - (i-3))*(inMonAge - (i+3))/((i - (i-3))*(i - (i+3)))) + data.female.w_stdbias[(i+24)/3+1] *((inMonAge - (i-3))*(inMonAge - i)/((i+3 - (i-3))*(i+3 - i)));
                    result.pos = (-result.ideal + realVal) / result.bias;
                    return result.ideal;
                }
            }
        }
    }
}