import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators } from '@angular/forms';
let AdminComponent = class AdminComponent {
    constructor(formBuilder, authenticationService, userService) {
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.users = [];
        this.loading = false;
        this.currentUser = this.authenticationService.currentUserValue;
    }
    ngOnInit() {
        this.loadAllUsers();
        this.rolesForm = this.formBuilder.group({
            userId: ['', Validators.required],
            roles: ['',]
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.rolesForm.controls; }
    onSubmit() {
        // stop here if form is invalid
        if (this.rolesForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.assignRoles(this.f.userId.value, this.f.roles.value)
            .pipe(first())
            .subscribe(data => { this.loading = false; }, error => {
            this.error = error;
            this.loading = false;
        });
    }
    deleteUser(id) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }
    loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }
};
AdminComponent = tslib_1.__decorate([
    Component({
        selector: 'app-admin',
        templateUrl: './admin.component.html',
        styleUrls: ['./admin.component.css']
    })
], AdminComponent);
export { AdminComponent };
//# sourceMappingURL=admin.component.js.map