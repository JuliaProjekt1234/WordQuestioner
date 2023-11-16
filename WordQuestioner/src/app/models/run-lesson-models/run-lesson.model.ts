import { BehaviorSubject } from "rxjs";
import { Translation } from "../lesson.model";
import { SoundMode, Sounds } from "./sounds.model";

export class RunLessonModel {
    public totalCount: number = 0;
    public activeIndex: number = 0;
    public lastWrongTranslation = new Translation("", "");

    private lessonIsFinished = new BehaviorSubject<boolean>(false);
    lessonIsFinished$ = this.lessonIsFinished.asObservable();

    private sounds: Sounds = new Sounds();

    constructor(public translations: Translation[]) {
        this.totalCount = translations.length;
        this.roundIndex();
    }

    private roundIndex(): void {
        this.activeIndex = this.getRandomInt(0, this.translations.length - 1);
    }

    public getActiveWord() {
        return this.translations[this.activeIndex]?.value;
    }

    public getActiveTranslation() {
        return this.translations[this.activeIndex].translation;
    }

    public async checkCorrectness(value: string): Promise<boolean> {
        let result = true;
        if (this.getActiveTranslation() === value)
           await this.setWordAsCorrect();

        else {
            await this.setWordAsWrong();
            result = false;
        }

        this.roundIndex();
        return result;
    }

    private async setWordAsCorrect() {
        this.totalCount--;
        if (this.totalCount === 0) {
            this.lessonIsFinished.next(true);
            await this.sounds.play(SoundMode.Win);
            return;
        }
        await this.sounds.play(SoundMode.Correct);
        const indexToRemove = this.translations
            .findIndex(translation =>
                translation.translation === this.getActiveTranslation() && translation.value === this.getActiveWord()
            );
        this.translations.splice(indexToRemove, 1);
    }

    private async setWordAsWrong() {
        await this.sounds.play(SoundMode.Wrong);
        let translation = new Translation(this.getActiveWord(), this.getActiveTranslation())
        this.translations.push(translation);
        this.lastWrongTranslation = translation;
        this.totalCount++;
    }

    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}