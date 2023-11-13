import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { SideBarButton } from "src/app/models/siede-bar-button";
import { Views } from "src/app/models/views-enum.medel";

@Injectable({
    providedIn: 'root',
})

export class ViewService {

    public readonly sideBarButtons = [
        new SideBarButton("my progress", "attachment", Views.Progress),
        new SideBarButton("my lessons", "class", Views.MyLessons, '/my_lessons'),
        new SideBarButton("add lesson", "note_add", Views.AddLesson, "/add_lesson"),
        new SideBarButton("settings", "settings", Views.Settings),
    ];

    private activeViewSubject = new BehaviorSubject<Views>(Views.Progress);
    activeView$ = this.activeViewSubject.asObservable();
    get activieView() { return this.activeViewSubject.value; }


    constructor(private router: Router) {
        this.activeView$.subscribe(view => {
            let viewRouter = this.getUrlToView(view);
            if (!viewRouter) return;
            this.router.navigateByUrl(viewRouter);
        });

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                let view = this.getViewFromUrl(event.url)
                if (!view) return;
                this.activeViewSubject.next(view)
            }
        });

    }
    public getUrlToView(view: Views): string | undefined {
        return this.sideBarButtons.find(button => button.view == view)?.urlToView;
    }

    public getViewFromUrl(url: string): Views | undefined {
        return this.sideBarButtons.find(button => button.urlToView == url)?.view;
    }

    public changeView(view: Views): void {
        this.activeViewSubject.next(view);
    }

    public chageToActivView(): void {
        this.activeViewSubject.next(this.activieView);
    }

    public changeViewByUrl(url: string): void {
        this.router.navigateByUrl(url)
    }
}