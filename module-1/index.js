const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split("");
/**
 * 
 * @param {number} decNumber  要转换的10进制数
 * @param {number} base 进制, 默认值为64
 * @param {precision} base 精度
 * 10 进制转换为64进制
 */
function baseConver(decNumber, base = 64, precision = 4) {
    /* 提供进制的转换 */
    if (!(base >= 2 && base <= 64)) {
        return null;
    }
    let abDecNumber = Math.abs(decNumber);
    let targetInterPart = "";
    let targetDecimalPart = '';

    let intergerPart = parseInt(abDecNumber);
    let decimalPart = abDecNumber - intergerPart;

    while(intergerPart > 0){
        let modNum = intergerPart % base;
        intergerPart = parseInt(intergerPart / base );
        targetInterPart = digits[modNum] + targetInterPart;
    }

    for (let i = precision; i--;) {
        decimalPart = decimalPart * base;
        let intererTemp = parseInt(decimalPart);
        decimalPart -= intererTemp;
        targetDecimalPart = targetDecimalPart + digits[intererTemp];
    }
    return decNumber > 0 ? 
         targetInterPart + "." + targetDecimalPart :
         "-" + targetInterPart + "." + targetDecimalPart 
}

/**
 * 
 * @param {string} decodeNum  将要转换的数
 * @param {number} base 进制，默认64
 * @param {precision} base 精度，默认4
 * @returns number 返回10进制
 */
function baseDecode(decodeNum, base = 64, precision = 4) {
    /* 提供进制的转换 */
    if (!(base >= 2 && base <= 64)) {
        return null;
    }

    decodeNum = decodeNum.toString();
    const plus =  decodeNum.indexOf("-") >= 0;
    const abDecodeNum = plus ? decodeNum.slice(1) : decodeNum;

    const [intergerStr, decimalStr] = abDecodeNum.split(".");
    let target = 0;

    // 计算整数部分
    if (intergerStr) {
        let length = intergerStr.length;
        let power = 0;
        while(length--) {
            let num = digits.indexOf(intergerStr.charAt(length));
            target = target + num *  Math.pow(base, power++);
        }
    }

    // 计算小数部分
    if (decimalStr) {
        let length = decimalStr.length;
        while(length--) {
            let num = digits.indexOf(decimalStr.charAt(length));
            if (num > 0) {
                target = target + num *  Math.pow(base, -(length + 1));
            }
        }
    }
    target = target.toFixed(precision);
    return  plus ? -1 * target:  target ;
}

// 测试进制转换
(()=> {
    const str = baseConver(129.1200);
    console.log("129.12 对应的64进制",str);
    console.log(str, "对应的10进制数为：", baseDecode(str));
})();


