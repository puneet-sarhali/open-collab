"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.KanbanModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kanban_routing_module_1 = require("./kanban-routing.module");
var toolbar_1 = require("primeng/toolbar");
var card_1 = require("primeng/card");
var dragdrop_1 = require("primeng/dragdrop");
var panel_1 = require("primeng/panel");
//import { TableModule } from 'primeng/table';
var button_1 = require("primeng/button");
var dialog_1 = require("primeng/dialog");
var kanban_component_1 = require("./kanban/kanban.component");
var task_component_1 = require("./task/task.component");
var shared_module_1 = require("../../shared/shared.module");
var KanbanModule = /** @class */ (function () {
    function KanbanModule() {
    }
    KanbanModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [
                kanban_component_1.KanbanComponent,
                task_component_1.TaskComponent
            ],
            imports: [
                common_1.CommonModule,
                kanban_routing_module_1.KanbanRoutingModule,
                // primeng modules
                toolbar_1.ToolbarModule,
                card_1.CardModule,
                dragdrop_1.DragDropModule,
                panel_1.PanelModule,
                //TableModule,
                button_1.ButtonModule,
                dialog_1.DialogModule,
                shared_module_1.SharedModule
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], KanbanModule);
    return KanbanModule;
}());
exports.KanbanModule = KanbanModule;
