"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tile = void 0;
const Glyph_1 = require("./Glyph");
let Tile = /** @class */ (() => {
    class Tile {
        constructor(properties, glyphProps) {
            // Mutables: Physics and Position
            this._walkable = properties['walkable'];
            this._diggable = properties['diggable'];
            this._opaque = properties['opaque'];
            this._x = properties['x'];
            this._y = properties['y'];
            // Immutables: Renderables
            this._glyphProps = glyphProps;
            this._glyph = new Glyph_1.Glyph(this._glyphProps);
        }
        static nullTile() {
            return new Tile({}, {});
        }
        static floorTile() {
            let colors = ['#29231c', '#332d25', '#25211d', '#292018'];
            return new Tile({
                walkable: true,
                opaque: false
            }, {
                character: ' ',
                background: this.pickColor(colors)
            });
        }
        static wallTile() {
            let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];
            return new Tile({
                walkable: false,
                opaque: true
            }, {
                character: ' ',
                background: this.pickColor(colors)
            });
        }
    }
    Tile.pickColor = (colors) => {
        let index = Math.floor(Tile.random(0, 4));
        return colors[index];
    };
    Tile.random = (mn, mx) => {
        return Math.random() * (mx - mn) + mn;
    };
    return Tile;
})();
exports.Tile = Tile;
