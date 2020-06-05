"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = exports.Tile = void 0;
const Glyph_1 = require("./Glyph");
Object.defineProperty(exports, "Glyph", { enumerable: true, get: function () { return Glyph_1.Glyph; } });
let Tile = /** @class */ (() => {
    class Tile extends Glyph_1.Glyph {
        constructor(properties) {
            super(properties);
        }
        static nullTile() {
            return new Tile({});
        }
        static floorTile() {
            let colors = [
                [41, 35, 28],
                [51, 45, 37],
                [37, 33, 29],
                [41, 32, 24]
            ];
            return new Tile({
                character: ' ',
                background: this.pickColor(colors),
                walkable: true,
                traversable: {
                    open: false,
                    direction: undefined
                },
                opaque: false,
            });
        }
        static wallTile() {
            let colors = [
                [154, 126, 97],
                [167, 138, 109],
                [160, 132, 103],
                [173, 145, 115]
            ];
            return new Tile({
                character: ' ',
                background: this.pickColor(colors),
                diggable: true,
                traversable: {
                    open: false,
                    direction: undefined
                },
                opaque: true
            });
        }
        static stairsUpTile() {
            let colors = [
                [41, 35, 28],
                [51, 45, 37],
                [37, 33, 29],
                [41, 32, 24]
            ];
            return new Tile({
                character: '▲',
                foreground: [255, 255, 255],
                background: this.pickColor(colors),
                walkable: true,
                traversable: {
                    open: true,
                    direction: 'up'
                },
                opaque: false
            });
        }
        static stairsDownTile() {
            let colors = [
                [41, 35, 28],
                [51, 45, 37],
                [37, 33, 29],
                [41, 32, 24]
            ];
            return new Tile({
                character: '▼',
                foreground: [200, 200, 200],
                background: this.pickColor(colors),
                walkable: true,
                traversable: {
                    open: true,
                    direction: 'down'
                },
                opaque: false
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
