import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConstants } from "src/app/constants/app-constants";
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: 'root',
})
export class AuthentyficationHttpService {
    constructor(private http: HttpClient) { }


    login(username: string, password: string) {
        const body = { username, password };
        return this.http.post(`${AppConstants.BaseUrl}login`, body, { withCredentials: true });
    }

    registration(user: User) {
        return this.http.post(`${AppConstants.BaseUrl}registration`, user, { withCredentials: true });
    }

    logout() {
        return this.http.get(`${AppConstants.BaseUrl}logout`, { withCredentials: true });
    }
}