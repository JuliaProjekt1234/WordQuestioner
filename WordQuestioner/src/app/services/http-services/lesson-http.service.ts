import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConstants } from "src/app/constants/app-constants";


@Injectable({
    providedIn: 'root',
})
export class LessonHttpService {

    constructor(private http: HttpClient) {
    }

    addCategory(categoryName: string): Observable<string> {
        return this.http.put(`${AppConstants.BaseUrl}addCategory`, { categoryName: categoryName }) as Observable<string>;
    }

    getCategories(): Observable<string[]>{
        return this.http.get(`${AppConstants.BaseUrl}getCategories`) as Observable<string[]>;
    }

    addNewLesson(): Observable<Object> {
        return this.http.get(`${AppConstants.BaseUrl}/addLesson`);
    }
}