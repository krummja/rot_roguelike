"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = exports.Tile = void 0;
class Glyph {
    constructor(properties) {
        this._map = null;
        this._character = properties['character'] || ' ';
        this._foreground = properties['foreground'] || [255, 255, 255];
        this._background = properties['background'] || [255, 255, 255];
        this._darkBackground = properties['darkBackground'] || [255, 255, 255];
        this._walkable = properties['walkable'] || false;
        this._diggable = properties['diggable'] || false;
        this._traversable = properties['traversable'] || false;
        this._opaque = (properties['opaque'] !== undefined) ? properties['opaque'] : true;
    }
    get char() { return this._character; }
    set char(v) { this._character = v; }
    get fg() { return this._foreground; }
    set fg(v) { this._foreground = v; }
    get bg() { return this._background; }
    set bg(v) { this._background = v; }
    get dbg() { return this._darkBackground; }
    set dbg(v) { this._darkBackground = v; }
    get walkable() { return this._walkable; }
    set walkable(v) { this._walkable = v; }
    get diggable() { return this._diggable; }
    set diggable(v) { this._diggable = v; }
    get traversable() { return this._traversable; }
    set traversable(v) { this._traversable = v; }
    get opaque() { return this._opaque; }
    set opaque(value) { this._opaque = value; }
    get map() { return this._map; }
    set map(value) { this._map = value; }
}
exports.Glyph = Glyph;
let Tile = /** @class */ (() => {
    class Tile extends Glyph {
        constructor(properties) {
            super(properties);
        }
        static nullTile() {
            return new Tile({});
        }
        static floorTile() {
            // let colors = ['#29231c', '#332d25', '#25211d', '#292018']
            let colors = [[41, 35, 28], [51, 45, 37], [37, 33, 29], [41, 32, 24]];
            return new Tile({
                character: ' ',
                background: this.pickColor(colors),
                walkable: true,
                traversable: false,
                opaque: false,
            });
        }
        static wallTile() {
            // let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];
            let colors = [[154, 126, 97], [167, 138, 109], [160, 132, 103], [173, 145, 115]];
            return new Tile({
                character: ' ',
                background: this.pickColor(colors),
                diggable: true,
                traversable: false,
                opaque: true
            });
        }
        static stairsUpTile() {
            let colors = [[173, 145, 115], [51, 45, 37], [37, 33, 29], [41, 32, 24]];
            return new Tile({
                character: '<',
                foreground: [255, 255, 255],
                background: this.pickColor(colors),
                walkable: true,
                traversable: true,
                opaque: false
            });
        }
        static stairsDownTile() {
            let colors = [[173, 145, 115], [51, 45, 37], [37, 33, 29], [41, 32, 24]];
            return new Tile({
                character: '>',
                foreground: [200, 200, 200],
                background: this.pickColor(colors),
                walkable: true,
                traversable: true,
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
