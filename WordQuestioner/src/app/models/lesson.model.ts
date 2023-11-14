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

    public static CreateDefault() {
        return new Lesson("", "", "", 0, 0, [], QuestionerType.Write, QuestionerLanguageMode.LeftWord)
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

export class LessonFilter {
    constructor(
        public name: string,
        public category: string,
        public colorTag: string,
        public questionerType: QuestionerType,
        public questionerLanguageMode: QuestionerLanguageMode,
    ) { }

    public static FilterLessons(lessonFilter: LessonFilter, lessons: Lesson[]): Lesson[] {
        return lessons.filter(lesson => {
            return (lessonFilter.name === '' || lesson.name.toUpperCase().includes(lessonFilter.name.toUpperCase()))
                && (lessonFilter.category === '' || lesson.category === lessonFilter.category)
                && (lessonFilter.colorTag === '' || lesson.colorTag === lessonFilter.colorTag)
                && (lessonFilter.questionerType.toString() === '' || lesson.questionerType === lessonFilter.questionerType)
                && (lessonFilter.questionerLanguageMode.toString() === '' || lesson.questionerLanguageMode === lessonFilter.questionerLanguageMode)
        })
    }
}