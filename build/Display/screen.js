"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Screen = void 0;
var Screen = /** @class */ (function () {
    function Screen(game, options) {
        if (options) {
            this.options = options;
        }
    }
    Screen.prototype.enter = function () {
    };
    Screen.prototype.exit = function () {
    };
    Screen.prototype.render = function (display) {
    };
    Screen.prototype.handleInput = function (inputType, inputData) {
    };
    return Screen;
}());
exports.Screen = Screen;
