const roundUP = (input) => {
    let number = input;
    if (typeof number === 'string') {
        let str = number;
        str = str.replace(',', '.');
        const numb = parseFloat(str);
        if (!isNaN(numb)) {
            number = numb;
        }
    }
    try {
        if (Number.isInteger(number)) {
            return number;
        } else {
            const decimalPlaces = (number.toString().split('.')[1] || '').length;
            const roundedNumber = decimalPlaces >= 4 ? number.toFixed(4).replace(/\.?0+$/, '') : number;
            const res = parseFloat(roundedNumber);
            if (!isNaN(res)) {
                number = res;
            }
            return number;
        }
    } catch (err) {
        return number;
    }
}

module.exports = { roundUP };