import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserService, AuthService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    users = [];
    userInfo: any;
    rolesForm: FormGroup;
    error: string;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private authenticationService: AuthService
    ) { this.authenticationService.userInfo.subscribe(x => this.userInfo = x); }

    ngOnInit() {
        this.loadAllUsers();

        this.rolesForm = this.formBuilder.group({
          userId: ['', Validators.required],
          roles: ['', Validators.required]
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.rolesForm.controls; }

    onSubmit() {
        this.submitted = true;

      // stop here if form is invalid
        if (this.rolesForm.invalid) {
          return;
        }

        this.loading = true;
        this.userService.assignRoles(this.f.userId.value, this.f.roles.value)
          .pipe(first())
          .subscribe(
              data => {
                    this.loading = false;
                    this.loadAllUsers();
                    this.submitted = false;
            },
              error => {
                  this.error = error;
                  this.loading = false;
              });
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

}
