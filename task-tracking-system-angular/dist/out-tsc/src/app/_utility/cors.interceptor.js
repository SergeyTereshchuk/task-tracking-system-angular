import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let CorsInterceptor = class CorsInterceptor {
    constructor() { }
    intercept(request, next) {
        request = request.clone({
            setHeaders: {
                'Access-Control-Allow-Origin': `*`,
            }
        });
        return next.handle(request);
    }
};
CorsInterceptor = tslib_1.__decorate([
    Injectable()
], CorsInterceptor);
export { CorsInterceptor };
//# sourceMappingURL=cors.interceptor.js.map