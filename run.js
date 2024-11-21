
import { test } from './src/test.js';
import { dataGenerators } from './src/data.js'

// 
// const arr = createArray(10);
// const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 300];
// // const arr = [0, 1, 300];

// const report = test('test', arr);
// report.print();

const errors = [];

dataGenerators.forEach(({ label, func }) => {
    const report = test(label, func());
    report.printShort();
    if (report.errors.hasErrors()) {
        errors.push(report.errors);
    }
})

if (errors.length > 0) {
    errors.forEach(err => err.print())
}