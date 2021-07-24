import { getMaxKNum } from './index';

(() => {
    const arr = [77,63,39,65,59,31,17,40,65,75];
    // let count = 10;
    // while(count--) {
    //     arr.push(Math.floor(Math.random() * 100));
    // }
    console.log(arr.toString());
    console.log(getMaxKNum(arr, 2));
})();