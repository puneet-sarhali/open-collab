"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var card_1 = require("primeng/card");
var button_1 = require("primeng/button");
var inputtext_1 = require("primeng/inputtext");
var dialog_1 = require("primeng/dialog");
var menu_1 = require("primeng/menu");
var divider_1 = require("primeng/divider");
var overlaypanel_1 = require("primeng/overlaypanel");
var tag_1 = require("primeng/tag");
var inputtextarea_1 = require("primeng/inputtextarea");
var forms_1 = require("@angular/forms");
var post_component_1 = require("./post/post.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [
                post_component_1.PostComponent
            ],
            imports: [
                common_1.CommonModule,
                card_1.CardModule,
                button_1.ButtonModule
            ],
            exports: [
                card_1.CardModule,
                button_1.ButtonModule,
                inputtext_1.InputTextModule,
                dialog_1.DialogModule,
                menu_1.MenuModule,
                divider_1.DividerModule,
                overlaypanel_1.OverlayPanelModule,
                tag_1.TagModule,
                post_component_1.PostComponent,
                forms_1.ReactiveFormsModule,
                inputtextarea_1.InputTextareaModule
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
