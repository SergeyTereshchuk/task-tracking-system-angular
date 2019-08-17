import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let TokenInterceptor = class TokenInterceptor {
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    intercept(request, next) {
        // add authorization header with token if available
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`,
                }
            });
        }
        return next.handle(request);
    }
};
TokenInterceptor = tslib_1.__decorate([
    Injectable()
], TokenInterceptor);
export { TokenInterceptor };
//# sourceMappingURL=token.interceptor.js.map