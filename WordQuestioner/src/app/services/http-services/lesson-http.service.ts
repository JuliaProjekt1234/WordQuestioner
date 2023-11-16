import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "src/app/constants/app-constants";
import { BaseLesson, Lesson } from "src/app/models/lesson.model";


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

    addNewLesson(lesson: BaseLesson): Observable<Object> {
        return this.http.post(`${AppConstants.BaseUrl}addLesson`, lesson, { withCredentials: true });
    }

    getLessons(): Observable<Lesson[]> {
        return this.http.get(`${AppConstants.BaseUrl}getLessons`, { withCredentials: true }) as Observable<Lesson[]>;
    }

    deleteLesson(id: number): Observable<object> {
        return this.http.delete(`${AppConstants.BaseUrl}deleteLesson/${id}`, { withCredentials: true })
    }

    startLesson(id: number): Observable<object> {
        return this.http.put(`${AppConstants.BaseUrl}startLesson/${id}`, "", { withCredentials: true })
    }

    finishLesson(id: number): Observable<object> {
        return this.http.put(`${AppConstants.BaseUrl}finishLesson/${id}`, "", { withCredentials: true })
    }
}