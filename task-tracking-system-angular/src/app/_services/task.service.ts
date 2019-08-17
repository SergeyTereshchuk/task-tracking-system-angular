import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'https://localhost:44332/api';

@Injectable({ providedIn: 'root' })
export class TaskService {
    constructor(private http: HttpClient) { }

    getCurrent() {
        return this.http.get<any[]>(`${apiUrl}/user/tasks`);
    }

    getManagedCurrent() {
        return this.http.get<any[]>(`${apiUrl}/user/projects/tasks`);
    }

    getPositions() {
        return this.http.get<any[]>(`${apiUrl}/positions`);
    }

    getAll() {
        return this.http.get<any[]>(`${apiUrl}/tasks`);
    }

    create(task, userId) {
        return this.http.post(`${apiUrl}/users/${userId}/tasks`, task,
        {headers: { 'Content-Type': 'application/json' }});
    }

    update(task) {
        return this.http.put(`${apiUrl}/tasks`, task,
        {headers: { 'Content-Type': 'application/json' }});
    }

    notifyOnNewTask(userId) {
        return this.http.get(`${apiUrl}/mail/users/${userId}/tasks`);
    }

    delete(id) {
        return this.http.delete(`${apiUrl}/tasks/${id}`);
    }


}
