

const Metadatable = (parentClass: any) =>
  class extends parentClass
  {
    public metadata: { [key: string]: any };

    // TODO: Refactor value typing
    public setMeta(key: string, value: any): void
    {
      if (!this.metadata) {
        throw new Error('Class does not have metadata property!');
      }

      let parts = key.split('.');
      const property = parts.pop();
      let base: { [key: string]: any } = this.metadata;

      while (parts.length) {
        let part: string = parts.shift();
        if (!(part in base)) {
          throw new RangeError(`Metadata path invalid: ${key}`);
        }
        base = base[part];
      }

      const oldValue = base[property];
      base[property] = value;

      this.emit('metadataUpdated', key, value, oldValue);
    }

    public getMeta(key: string): { [key: string]: any } {
      if (!this.metadata) {
        throw new Error('Class does not have metadata property!');
      }
      const base = this.metadata;

      return key.split('.').reduce((obj: { [p: string]: any }, index: string) => obj && obj[index], base);
    }
  }


  export { Metadatable }