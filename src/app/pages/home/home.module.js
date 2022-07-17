"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var post_list_component_1 = require("./post-list/post-list.component");
var shared_module_1 = require("../../shared/shared.module");
var create_post_component_1 = require("./create-post/create-post.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [
                post_list_component_1.PostListComponent,
                create_post_component_1.CreatePostComponent
            ],
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule
            ]
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
