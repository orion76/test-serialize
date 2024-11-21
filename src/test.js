import { Report } from './report.js';
import { serialize, unserialize } from './serialize.js';

export function test(name, data, debug = false) {
    const report = new Report(name, data, debug);

    const serialized = serialize(data, report);
    report.addSerialized(serialized);

    const reverted = unserialize(serialized, report);
    report.addReverted(reverted);

    return report;
}