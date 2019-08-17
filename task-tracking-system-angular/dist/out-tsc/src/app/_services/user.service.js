import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
const apiUrl = 'https://localhost:44332/api';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`${apiUrl}/account/users`);
    }
    register(user) {
        return this.http.post(`${apiUrl}/account/register`, user);
    }
    delete(id) {
        return this.http.delete(`${apiUrl}/account/users/${id}`);
    }
    assignRoles(id, role) {
        return this.http.put(`${apiUrl}/users/${id}/roles`, role);
    }
};
UserService = tslib_1.__decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map