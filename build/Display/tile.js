"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glyph = exports.Tile = void 0;
class Glyph {
    constructor(properties) {
        this._map = null;
        this._character = properties['character'] || ' ';
        this._foreground = properties['foreground'] || 'white';
        this._background = properties['background'] || 'black';
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
            let colors = ['#29231c', '#332d25', '#25211d', '#292018'];
            return new Tile({
                character: ' ',
                background: this.pickColor(colors),
                walkable: true,
                traversable: false,
                opaque: false,
            });
        }
        static wallTile() {
            let colors = ['#9a7e61', '#a78a6d', '#a08467', '#ad9173'];
            return new Tile({
                character: ' ',
                background: this.pickColor(colors),
                diggable: true,
                traversable: false,
                opaque: true
            });
        }
        static stairsUpTile() {
            return new Tile({
                character: '<',
                foreground: 'white',
                walkable: true,
                traversable: true,
                opaque: false
            });
        }
        static stairsDownTile() {
            return new Tile({
                character: '>',
                foreground: 'gray',
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
