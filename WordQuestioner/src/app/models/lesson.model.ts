export class Lesson {
    constructor(
        public name: string,
        public colorTag: string,
        public finishedCount: number,
        public startedCount: number,
        public questionerLanguageMode: QuestionerLanguageMode,
        public questionerType: QuestionerType,
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

export enum QuestionerLanguageMode {
    LeftWord = "LeftWord",
    RightWord = "RightWord",
    Mixed = "Mixed"
}

export enum QuestionerType {
    Write = "Write",
    Speak = "Speak",
    Mixed = "Mixed"
}