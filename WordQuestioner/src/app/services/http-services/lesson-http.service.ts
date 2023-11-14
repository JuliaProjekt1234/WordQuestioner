import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "src/app/constants/app-constants";
import { Lesson } from "src/app/models/lesson.model";


@Injectable({
    providedIn: 'root',
})
export class LessonHttpService {

    constructor(private http: HttpClient) {
    }

    addCategory(categoryName: string): Observable<string> {
        return this.http.post(`${AppConstants.BaseUrl}addCategory`, { categoryName: categoryName }, { withCredentials: true }) as Observable<string>;
    }

    getCategories(): Observable<string[]> {
        return this.http.get(`${AppConstants.BaseUrl}getCategories`, { withCredentials: true }) as Observable<string[]>;
    }

    addNewLesson(lesson: Lesson): Observable<Object> {
        return this.http.post(`${AppConstants.BaseUrl}addLesson`, lesson, { withCredentials: true });
    }

    getLessons(): Observable<Lesson[]> {
        return this.http.get(`${AppConstants.BaseUrl}getLessons`, { withCredentials: true }) as Observable<Lesson[]>;
    }
}