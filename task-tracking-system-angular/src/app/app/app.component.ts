import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../_services';

@Component({ selector: 'app-nav', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;
    userInfo: any;

    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.authenticationService.userInfo.subscribe(x => this.userInfo = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
