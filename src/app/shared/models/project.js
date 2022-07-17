"use strict";
exports.__esModule = true;
exports.ProjectState = void 0;
var ProjectState;
(function (ProjectState) {
    ProjectState[ProjectState["inDevelopment"] = 0] = "inDevelopment";
    ProjectState[ProjectState["proposed"] = 1] = "proposed";
    ProjectState[ProjectState["planning"] = 2] = "planning";
    ProjectState[ProjectState["maintenance"] = 3] = "maintenance";
})(ProjectState = exports.ProjectState || (exports.ProjectState = {}));
