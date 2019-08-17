import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor(router, authenticationService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
};
AppComponent = tslib_1.__decorate([
    Component({ selector: 'app-nav', templateUrl: 'app.component.html' })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map