



interface Properties {
  // Glyph Properties
  character   ?: string,
  foreground  ?: string,
  background  ?: string,

  // Tile Properties
  walkable    ?: boolean,
  diggable    ?: boolean,
  traversable ?: boolean,
  opaque      ?: boolean,

  // Entity Properties
  name        ?: string,
  x           ?: number,
  y           ?: number,
  z           ?: number,
  vision      ?: number,
  multiplier  ?: number,
}


export { Properties };