/** 求数组中的第K大元素*/
/**
 *
 * @param arr 无序数组
 * @param k 第K大的编号
 */
export function getMaxKNum(arr, k) {
    if (!(arr && arr.length >= k)) {
        return null;
    }
    return kthNum(arr, arr.length - k , 0, arr.length - 1);
}

function kthNum(arr, k, startIndex, endIndex) {
    var pivotIndex = partion(arr, startIndex, endIndex);
    if (pivotIndex === k) {
        return arr[pivotIndex];
    }
    else if (pivotIndex > k) {
        return kthNum(arr, k, startIndex, pivotIndex - 1);
    }
    else {
        return kthNum(arr, k, pivotIndex + 1, endIndex);
    }
}

function partion(arr, startIndex, endIndex) {
    var randomIndx = Math.floor(Math.random() * (endIndex - startIndex)) + startIndex;
    swap(arr, startIndex, randomIndx);
    var pivot = arr[startIndex];
    var mark = startIndex;
    for (var index = startIndex + 1; index <= endIndex; index++) {
        if (pivot > arr[index]) {
            mark++;
            swap(arr, mark, index);
        }
    }
    if (mark !== startIndex) {
        swap(arr, startIndex, mark);
    }
    return mark;
}
function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
