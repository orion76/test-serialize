function random() {
    return Math.round(Math.random() * 300);
}

function range(start, end) {

    if (start >= end) {
        throw new Error(`Start range more than end range. start:${start}, end:${end}`);
    }
    const result = [];
    let i = start;
    while (i <= end) {
        result.push(i)
        i++;
    }
    return result;
}

export function createArrayOfRandom(size = 100) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(random());
    }
    return arr;
}

export const dataGenerators = [
    //    { label: 'test', func: () => [135,17,124,91,190,95,211,55,121,10]},
    { label: '1-3', func: () => range(1, 3) },
    { label: 'random 50', func: () => createArrayOfRandom(50) },
    { label: 'random 100', func: () => createArrayOfRandom(100) },
    { label: 'random 500', func: () => createArrayOfRandom(500) },
    { label: 'random 1000', func: () => createArrayOfRandom(1000) },
    { label: '1-9', func: () => range(1, 9) },
    { label: '10-99', func: () => range(10, 99) },
    { label: '100-299', func: () => range(100, 299) },
    {
        label: '300 by 3', func: () => {
            const numbers = createArrayOfRandom(300);
            return numbers.reduce((acc, item) => ([item, ...acc, item, item]), [])
        }
    }
]