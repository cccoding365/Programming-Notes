/* 洗牌算法 */

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const FisherYates = (arr) => {
    for (i = arr.length - 1; i > 0; --i) {
        let rand = Math.floor((Math.random() * i));
        let temp = arr[i]
        arr[i] = arr[rand]
        arr[rand] = temp
    }
    return arr
}
console.log(FisherYates(arr))
