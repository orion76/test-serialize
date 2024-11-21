
export const step = {
    START: 0,
    BIN: 1,
    ARR6: 2,
    CHAR_CODE: 3,
    CHAR: 4,
}

const BLENGTH = 9;

const stepNames = Object.keys(step);

export function stepName(index) {
    return stepNames[index];
}



export function arrToStringOfBinary(arr) {
    return arr.reduce((acc, item) => {
        const bin = item.toString(2).padStart(BLENGTH, 0);
        return acc + bin;

    }, '');
}

export function splitLineToArray(line, length) {
    let chunks = [];
    for (let i = 0; i < line.length; i += length) {
        const chunk = line.slice(i, i + length);
        chunks.push(chunk);
    }
    return chunks;
}

