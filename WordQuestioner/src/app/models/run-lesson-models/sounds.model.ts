export class Sounds {
    private readonly correctAudioPath = './assets/sounds/correct_answer.mp3';
    private readonly wrongAudioPath = './assets/sounds/wrong_answer.mp3';
    private readonly winAudioPath = './assets/sounds/win.mp3';

    private readonly sounds = [
        new Sound(SoundMode.Correct, this.correctAudioPath),
        new Sound(SoundMode.Wrong, this.wrongAudioPath),
        new Sound(SoundMode.Win, this.winAudioPath)
    ]

    public async play(soundMode: SoundMode): Promise<void> {
        let audioPlayer = this.sounds.find(sound => sound.soundMode === soundMode)?.audioPlayer;
        await audioPlayer?.play();
    }
}

export enum SoundMode {
    Correct,
    Wrong,
    Win
}

export class Sound {

    public audioPlayer: HTMLAudioElement = new Audio();

    constructor(public soundMode: SoundMode, path: string) {
        this.setAudio(path)
    }

    private setAudio(path: string) {
        this.audioPlayer.src = path;
    }
}