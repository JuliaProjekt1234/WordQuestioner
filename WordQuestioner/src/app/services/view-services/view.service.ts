import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Views } from "src/app/models/views-enum.medel";

@Injectable({
    providedIn: 'root',
})
export class ViewService {
    activeViewSubject = new BehaviorSubject<Views>(Views.Progress);
    activeView$ = this.activeViewSubject.asObservable();
    get activieView() { return this.activeViewSubject.value; }
}