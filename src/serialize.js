import { Report } from './report.js';
import { splitLineToArray, arrToStringOfBinary } from './util.js'


const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.:'
const charsMap = chars.split('').reduce((acc, char, index) => {
    acc[char] = index;
    return acc;
}, {})

function isLastIndex(arr, index) {
    return arr.length - index === 1;
}

/**
 * 
 * @param {string} str 
 * @returns {string[]}
 */
function decode(str) {
    const chars = str.split('')
    const lastLenght = chars.pop();

    const decoded = chars.map((char, index, arr) => {
        const num = charsMap[char];
        const padLength = isLastIndex(arr, index) ? lastLenght : 6;
        return num.toString(2).padStart(padLength, 0);
    })
    return decoded;
}

/**
 * 
 * @param {string[]} binArr 
 * @returns {string}
 */
function encode(binArr) {
    let lastLenght;
    const charsArr = binArr.map((bin6, index, arr) => {
        if (isLastIndex(arr, index)) {
            lastLenght = bin6.length;
        }
        const charCode = parseInt(bin6, 2);
        return chars[charCode];
    });
    charsArr.push(lastLenght);

    return charsArr.join('');
}

/**
 * 
 * @param {number[]} arr 
 * @param {Report} report 
 * @returns 
 */
export function serialize(arr, report) {
    const bin = arrToStringOfBinary(arr);
    const binArr = splitLineToArray(bin, 6)
    report.addBinary('serialize', binArr);

    return encode(binArr)
}

/**
 * 
 * @param {string} str 
 * @param {Report} report 
 * @returns 
 */
export function unserialize(str, report) {
    debugger;
    const bin = decode(str);
    report.addBinary('unserialize', bin);
    const bin9 = splitLineToArray(bin.join(''), 9);

    return bin9.map(b => parseInt(b, 2));
}