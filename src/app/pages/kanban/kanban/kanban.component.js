"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.KanbanComponent = void 0;
var core_1 = require("@angular/core");
var KanbanComponent = /** @class */ (function () {
    function KanbanComponent(taskService) {
        this.taskService = taskService;
        this.inProgressTasks = [
            {
                id: "3",
                title: 'Do Something',
                description: 'This is the description'
            },
            {
                id: "4",
                title: 'Create a Task',
                description: 'yay!'
            }
        ];
        this.doneTasks = [
            {
                id: "1",
                title: 'Running',
                description: 'go fast :D'
            },
            {
                id: "2",
                title: 'finish homework',
                description: 'lots to do...'
            }
        ];
        this.displayDialog = false;
    }
    ;
    KanbanComponent.prototype.ngOnInit = function () { };
    //   this.taskService.getInProgressList().then(tasks => this.inProgressTasks = tasks);
    //   this.taskService.getDoneList().then(tasks => this.doneTasks = tasks);
    //   console.log(this.doneTasks);
    // }
    KanbanComponent.prototype.dragStart = function (event, task) {
        this.draggedTask = task;
    };
    // allow inProgressTasks to be dropped into doneTasks
    KanbanComponent.prototype.dropToDone = function (event, dropped) {
        if (this.draggedTask) {
            var draggedTaskIndex_1 = this.findIndexInProgress(this.draggedTask);
            this.doneTasks = __spreadArray(__spreadArray([], this.doneTasks, true), [this.draggedTask], false);
            this.inProgressTasks = this.inProgressTasks.filter(function (val, i) { return i != draggedTaskIndex_1; });
            this.draggedTask = null;
        }
    };
    //TODO: implement with array
    // allow doneTasks to be dropped into inProgressTasks
    KanbanComponent.prototype.dropToInProgress = function (event, dropped) {
        if (this.draggedTask) {
            var draggedTaskIndex_2 = this.findIndexDone(this.draggedTask);
            this.inProgressTasks = __spreadArray(__spreadArray([], this.inProgressTasks, true), [this.draggedTask], false);
            this.doneTasks = this.doneTasks.filter(function (val, i) { return i != draggedTaskIndex_2; });
            this.draggedTask = null;
        }
    };
    KanbanComponent.prototype.dragEnd = function (event) {
        this.draggedTask = null;
    };
    KanbanComponent.prototype.findIndexInProgress = function (task) {
        var index = -1;
        for (var i = 0; i < this.inProgressTasks.length; i++) {
            if (task.id === this.inProgressTasks[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    KanbanComponent.prototype.findIndexDone = function (task) {
        var index = -1;
        for (var i = 0; i < this.doneTasks.length; i++) {
            if (task.id === this.doneTasks[i].id) {
                index = i;
                break;
            }
        }
        return index;
    };
    KanbanComponent.prototype.newTask = function () {
        this.displayDialog = true;
        //TODO: add saving and taking inputs for the new taks
    };
    KanbanComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-kanban',
            templateUrl: './kanban.component.html',
            styleUrls: ['./kanban.component.scss']
        })
    ], KanbanComponent);
    return KanbanComponent;
}());
exports.KanbanComponent = KanbanComponent;
//assign tasks
// in the todo users can select an item and they can request to contribute to it 
// if time: manager can assign people to tasks
