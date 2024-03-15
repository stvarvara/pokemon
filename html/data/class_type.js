// class Type
class Type {
    static all_types = {};

    constructor(name) {
        this._name = name;
        this._effectiveness = type_effectiveness[name] || {};
    }

    toString() {
        return this._name;
    }

    get name() {
        return this._name;
    }

    get effectiveness() {
        return this._effectiveness;
    }

    getEffectivenessByType(type) {
        return this._effectiveness[type];
    }
}
