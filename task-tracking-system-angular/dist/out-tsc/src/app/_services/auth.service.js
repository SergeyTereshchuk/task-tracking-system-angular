import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
const apiUrl = 'https://localhost:44332/api';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserInfoSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUserInfo')));
        this.currentUserInfo = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    get currentUserInfoValue() {
        return this.currentUserInfoSubject.value;
    }
    login(username, password) {
        const tokenResponse = this.http.post(`${apiUrl}/account/login`, 'userName=' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password) +
            '&grant_type=password', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .pipe(map(user => {
            // store user details and token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
        this.setCurrentUserInfo();
        return tokenResponse;
    }
    setCurrentUserInfo() {
        return this.http.get(`${apiUrl}/account/user`)
            .pipe(map(userInfo => {
            localStorage.setItem('currentUserInfo', JSON.stringify(userInfo));
            this.currentUserInfoSubject.next(userInfo);
            return userInfo;
        }));
    }
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
};
AuthService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map