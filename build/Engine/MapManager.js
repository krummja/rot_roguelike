"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapManager = void 0;
const Generators_1 = require("./Generators");
class MapManager {
    constructor(core) {
        this._CORE = core;
        this._builder = new Generators_1.Builder(200, 200);
    }
    setupArea() {
        let tileArray = this._builder.generateTileArray();
        let mapArray = this._builder.generateArea(tileArray);
    }
}
exports.MapManager = MapManager;
