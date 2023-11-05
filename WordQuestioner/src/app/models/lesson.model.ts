export class Lesson {
    constructor(
        public name: string,
        public category: string,
        public colorTag: string,
        public finishedCount: number,
        public startedCount: number,
        public translations: Translation[],
        public questionerType: QuestionerType,
        public questionerLanguageMode: QuestionerLanguageMode,
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