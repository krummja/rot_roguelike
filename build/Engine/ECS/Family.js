"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyBuilder = void 0;
/**
 * An abstract family is the base implementation of a family interface.
 * This class is private to this module.
 * @private
 */
class AbstractFamily {
    constructor(engine, include, exclude) {
        this.includesEntity = (entity) => {
            for (let include of this._include) {
                if (!entity.hasComponent(include)) {
                    return false;
                }
            }
            for (let exclude of this._exclude) {
                if (entity.hasComponent(exclude)) {
                    return false;
                }
            }
            return true;
        };
        this._engine = engine;
        this._include = Object.freeze(include.slice(0));
        this._exclude = Object.freeze(exclude.slice(0));
    }
    get engine() {
        return this._engine;
    }
}
/**
 * A CachedFamily is a family than caches it's results and alters it only
 * when an entity changes.
 *
 */
class CachedFamily extends AbstractFamily {
    constructor(engine, include, exclude) {
        super(engine, include, exclude);
        this.onEntityChanged = (entity) => {
            const index = this._entities.indexOf(entity);
            if (index === -1) {
                this._entities.push(entity);
                entity.addListener(this.onEntityChanged);
            }
            this._needEntityRefresh = true;
        };
        const allEntities = this.engine.entities;
        this._entities = allEntities.filter(this.includesEntity);
        this.engine.addEntityListener(this);
        for (let entity of allEntities) {
            entity.addListener(this.onEntityAdded);
        }
        this._needEntityRefresh = false;
    }
    get entities() {
        if (this._needEntityRefresh) {
            this._needEntityRefresh = false;
            this._entities = this._entities.filter(this.includesEntity);
        }
        return Object.freeze(this._entities.slice(0));
    }
    onEntityAdded(entity) {
        const index = this._entities.indexOf(entity);
        if (index === -1) {
            this._entities.push(entity);
            this._needEntityRefresh = true;
            entity.addListener(this.onEntityChanged);
        }
    }
    onEntityRemoved(entity) {
        const index = this._entities.indexOf(entity);
        if (index !== -1) {
            const entity = this._entities[index];
            this._entities.splice(index, 1);
            entity.removeListener(this.onEntityChanged);
        }
    }
}
/**
 * A NonCacheFamily always computes the members of it.
 * If you find than the performance from cached families is not decent.
 * You can use this instead.
 * @private
 */
class NonCachedFamily extends AbstractFamily {
    get entities() {
        return this.engine.entities.filter(this.includesEntity);
    }
}
/**
 * Utility class to build Families.
 * It's the only way to create the implementations of CachedFamily and NonCachedFamily.
 */
class FamilyBuilder {
    constructor(engine) {
        this._engine = engine || null;
        this._include = [];
        this._exclude = [];
        this._cached = true;
    }
    /**
     * Indicates than entities than are members of this class MUST
     * HAVE this components.
     * @param classes A list of component classes.
     */
    include(...classes) {
        this._include.push(...classes);
        return this;
    }
    /**
     * Indicates than entities than are members of this class MUST NOT
     * HAVE this components.
     * @param classes A list of component classes.
     */
    exclude(...classes) {
        this._exclude.push(...classes);
        return this;
    }
    /**
     * Changes the engine of the builder.
     * Useful to create multiple instances of the same family for different
     * engines.
     * @param engine
     */
    changeEngine(engine) {
        this._engine = engine;
        return this;
    }
    /**
     * Changes if the family should use cached values or not.
     * @param cached If the family must use or not a cache.
     */
    setCached(cached) {
        this._cached = cached;
    }
    /**
     * Builds the family, using the information provided.
     * @returns a new family to retrieve the entities.
     */
    build() {
        if (!this._engine) {
            throw new Error("Family should always belong to an engine.");
        }
        if (!this._cached) {
            return new NonCachedFamily(this._engine, this._include, this._exclude);
        }
        return new CachedFamily(this._engine, this._include, this._exclude);
    }
}
exports.FamilyBuilder = FamilyBuilder;
