const SPACE = ' '
const TAB_SPACES_COUNT = 2

const log = (str, level = 0) => {
    const pad = level ? ' '.padEnd(level * TAB_SPACES_COUNT, SPACE) : '';
    const msg = `${pad}${str}`;
    console.log(msg)
};

export class Report {
    titleLength = 20
    dataExampleLength = 20
    serializedExampleLength = 40

    binary = {
        serialize: null,
        unserialize: null,
    }
    constructor(name, sourceArray, debug = false) {
        this.name = name;
        this.source = sourceArray;
        this.debug = debug;
        this.errors = new ReportError(name);
    }

    addSerialized(serialized) {
        this.serialized = serialized;
    }

    addReverted(reverted) {
        this.reverted = reverted;
    }

    addBinary(op, value) {
        this.binary[op] = value;
    }

    _printLine(title, value) {
        const padLength = this.titleLength - title.length
        const pad = ''.padEnd(padLength, ' ');

        log(`${title}:${pad} ${value}`, 2)
    }

    _formatArray(arr) {
        const suffix = this.dataExampleLength < arr.length ? ' ...' : ''
        return arr.slice(0, this.dataExampleLength).toString() + suffix;
    }
    /**
     * 
     * @param {string} str 
     * @returns 
     */
    _formatSerialised(str) {
        const suffix = this.serializedExampleLength < str.length ? ' ...' : ''
        return str.substring(0, this.serializedExampleLength) + suffix;
    }
    _emptyLine() {
        log('');
    }
    _isArrayEqual(a1, a2) {
        if (!Array.isArray(a1) || !Array.isArray(a1)) {
            return false;
        }

        if (a1.length !== a2.length) {
            return false;
        }

        return a1.every((n1, index) => n1 === a2[index])
    }
    validate(arr1, arr2) {
        if (!this._isArrayEqual(arr1, arr2)) {
            this.errors.addError(`The source and the result are different`,)
        }
    }

    getEffectiveness() {
        const sourceLength = this.source.toString().length;
        const serialisedLength = this.serialized.length;

        return Math.round(serialisedLength / (sourceLength / 100));
    }
    printShort() {
        log(`/////// TEST ${this.name} //////////`);
        this._printLine('source', this.source.toString());
        this._printLine('serialized', this.serialized);
        this._printLine('Compression ratio', this.getEffectiveness() + '%');
        this._emptyLine();
    }
    printLong() {
        log(`/////// TEST ${this.name} //////////`);
        log('--- SOURCE', 1)
        this._printLine('Data', this._formatArray(this.source));
        this._printLine('Length', this.source.toString().length);
        this._emptyLine();

        log('--- SERIALISED', 1)
        this._printLine('Data', this._formatSerialised(this.serialized));
        this._printLine('Length', this.serialized.length);
        this._emptyLine();

        log('--- REVERTED', 1)
        this._printLine('Data', this._formatArray(this.reverted));
        this._printLine('Length', this.reverted.toString().length);
        this._emptyLine();

        log('//////// CONCLUSION', 1)
        this._printLine('It was/Has become', this.source.toString().length + '/' + this.serialized.length);
        this._printLine('Effectiveness', this.getEffectiveness() + '%');
        this._emptyLine();

        if (this.debug) {
            log('////////////////////  DEBUG  /////////////////////////////')
            log('--- BINARY', 1)
            this._printLine('serialize', this.binary.serialize);
            this._printLine('unserialize', this.binary.unserialize);
        }
        this.validate(this.source, this.reverted);
    }
}


export class ReportError {
    _errors = [];

    constructor(title) {
        this.title = title;
    }

    addError(title, data) {
        this._errors.push({ title, data })
    }

    hasErrors() {
        return this._errors.length > 0;
    }

    print() {
        log(`/////////////// ERRORS: ${this.title}`);
        this._errors.forEach(({ title, data }) => {
            log(`Error: ${title}`);
            log(data);
        })
    }
}