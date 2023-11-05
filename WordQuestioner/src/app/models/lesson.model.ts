export class Lesson {
    constructor(
        public name: string,
        public colorTag: string,
        public finishedCount: number,
        public startedCount: number,
        public translations: Translation[],
    ) {

    }
}

export class Translation {

    constructor(
        public value: string,
        public translation: string
    ) {

    }
}