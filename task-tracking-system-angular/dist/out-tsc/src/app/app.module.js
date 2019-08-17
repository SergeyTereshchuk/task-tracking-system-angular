import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AppComponent } from './app';
import { TokenInterceptor, ErrorInterceptor } from './_utility';
import { TasksComponent } from './tasks';
import { ProjectsComponent } from './projects';
import { AdminComponent } from './admin';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            LoginComponent,
            RegisterComponent,
            AppComponent,
            TasksComponent,
            ProjectsComponent,
            AdminComponent
        ],
        imports: [
            BrowserModule,
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule,
        ],
        providers: [
            { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map