import { Views } from "./views-enum.medel"

export class SideBarButton {
    constructor(
        public buttonTitle: string,
        public iconName: string,
        public view: Views,
        public urlToView?: string
    ) { }
}