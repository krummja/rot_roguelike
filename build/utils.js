"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleCoordArray = void 0;
function shuffleCoordArray(array) {
    var _a;
    var shuffled;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        shuffled = (_a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1], _a);
    }
    return shuffled;
}
exports.shuffleCoordArray = shuffleCoordArray;
