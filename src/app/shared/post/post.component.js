"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostComponent = void 0;
var core_1 = require("@angular/core");
var VoteVal;
(function (VoteVal) {
    VoteVal[VoteVal["upVote"] = 0] = "upVote";
    VoteVal[VoteVal["downVote"] = 1] = "downVote";
    VoteVal[VoteVal["noVote"] = 2] = "noVote";
})(VoteVal || (VoteVal = {}));
var PostComponent = /** @class */ (function () {
    function PostComponent() {
        this.voteVal = new core_1.EventEmitter;
        this.voteValue = VoteVal.noVote;
    }
    PostComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.currentUserVotes.subscribe(function (votes) {
            votes.forEach(function (vote) {
                if (vote.projectid === _this.inputData[0].projectid) {
                    if (vote.votevalue) {
                        _this.voteValue = VoteVal.upVote;
                    }
                    else {
                        _this.voteValue = VoteVal.downVote;
                    }
                }
            });
        });
    };
    PostComponent.prototype.onUpvote = function (projectid) {
        if (this.voteValue === VoteVal.downVote) {
            this.inputData[0].score += 2;
            this.voteValue = VoteVal.upVote;
            var res = {
                "value": true,
                "method": "put",
                "projectid": projectid
            };
            return this.voteVal.emit(res);
        }
        else if (this.voteValue === VoteVal.upVote) {
            this.inputData[0].score--;
            this.voteValue = VoteVal.noVote;
            var res = {
                "value": true,
                "method": "delete",
                "projectid": projectid
            };
            return this.voteVal.emit(res);
        }
        else {
            this.inputData[0].score++;
            this.voteValue = VoteVal.upVote;
            var res = {
                "value": true,
                "method": "post",
                "projectid": projectid
            };
            return this.voteVal.emit(res);
        }
    };
    PostComponent.prototype.onDownvote = function (projectid) {
        if (this.voteValue === VoteVal.upVote) {
            this.inputData[0].score -= 2;
            this.voteValue = VoteVal.downVote;
            var res = {
                "value": false,
                "method": "put",
                "projectid": projectid
            };
            return this.voteVal.emit(res);
        }
        else if (this.voteValue === VoteVal.downVote) {
            this.inputData[0].score++;
            this.voteValue = VoteVal.noVote;
            var res = {
                "value": false,
                "method": "delete",
                "projectid": projectid
            };
            return this.voteVal.emit(res);
        }
        else {
            this.inputData[0].score--;
            this.voteValue = VoteVal.downVote;
            var res = {
                "value": false,
                "method": "post",
                "projectid": projectid
            };
            return this.voteVal.emit(res);
        }
    };
    __decorate([
        (0, core_1.Input)()
    ], PostComponent.prototype, "inputData");
    __decorate([
        (0, core_1.Input)()
    ], PostComponent.prototype, "currentUserVotes");
    __decorate([
        (0, core_1.Output)()
    ], PostComponent.prototype, "voteVal");
    PostComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-post',
            templateUrl: './post.component.html',
            styleUrls: ['./post.component.scss']
        })
    ], PostComponent);
    return PostComponent;
}());
exports.PostComponent = PostComponent;
