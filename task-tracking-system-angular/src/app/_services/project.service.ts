import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://localhost:44332/api';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    constructor(private http: HttpClient) { }

    getCurrent() {
        return this.http.get<any[]>(`${apiUrl}/user/projects`);
    }

    getAll() {
        return this.http.get<any[]>(`${apiUrl}/projects`);
    }

    create(project) {
        return this.http.post(`${apiUrl}/projects`, project,
        {headers: { 'Content-Type': 'application/json' }});
    }

    update(project) {
        return this.http.put(`${apiUrl}/projects`, project,
        {headers: { 'Content-Type': 'application/json' }});
    }

    delete(id) {
        return this.http.delete(`${apiUrl}/projects/${id}`);
    }


}
