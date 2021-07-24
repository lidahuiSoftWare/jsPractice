import { getMaxKNum } from './index';

(() => {
    const arr = [];
    let count = 10;
    while(count--) {
        arr.push(Math.floor(Math.random() * 100));
    }
    console.log(arr.toString());
    console.log(getMaxKNum(arr, 3));
})();