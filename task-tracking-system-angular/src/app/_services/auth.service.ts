import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

const apiUrl = 'https://localhost:44332/api';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    private userInfoSubject: BehaviorSubject<any>;
    public userInfo: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.userInfoSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userInfo')));
        this.userInfo = this.userInfoSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public get userInfoValue() {
        return this.userInfoSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${apiUrl}/account/login`,
            'userName=' + encodeURIComponent(username) +
            '&password=' + encodeURIComponent(password) +
            '&grant_type=password',
            {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
            .pipe(map(user => {
                // store user details and token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    SetUserInfo() {
        return this.http.get<any>(`${apiUrl}/account/user`)
            .pipe(map(user => {
                localStorage.setItem('userInfo', JSON.stringify(user));
                this.userInfoSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        localStorage.removeItem('userInfo');
        this.userInfoSubject.next(null);
    }
}
