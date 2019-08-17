import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://localhost:44332/api';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${apiUrl}/account/users`);
    }

    register(user) {
        return this.http.post(`${apiUrl}/account/register`, user);
    }

    delete(id) {
        return this.http.delete(`${apiUrl}/account/users/${id}`);
    }

    assignRoles(id, role) {
        return this.http.put(`${apiUrl}/users/${id}/roles`, {newRoles : [role]},
        {headers: { 'Content-Type': 'application/json' }});
    }
}
