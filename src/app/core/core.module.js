"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CoreModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var shared_module_1 = require("../shared/shared.module");
var sign_up_component_1 = require("./navbar/sign-up/sign-up.component");
var profile_component_1 = require("./navbar/profile/profile.component");
var sign_in_component_1 = require("./navbar/sign-in/sign-in.component");
var navbar_component_1 = require("./navbar/navbar.component");
var app_1 = require("@angular/fire/app");
var environment_1 = require("../../environments/environment");
var auth_1 = require("@angular/fire/auth");
var password_1 = require("primeng/password");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [
                navbar_component_1.NavbarComponent,
                sign_up_component_1.SignUpComponent,
                profile_component_1.ProfileComponent,
                sign_in_component_1.SignInComponent,
            ],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                (0, app_1.provideFirebaseApp)(function () { return (0, app_1.initializeApp)(environment_1.environment.firebase); }),
                (0, auth_1.provideAuth)(function () { return (0, auth_1.getAuth)(); }),
                password_1.PasswordModule
            ],
            exports: [
                navbar_component_1.NavbarComponent
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
