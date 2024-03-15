// class Type pour connaître l’efficacité d’un type d’attaque contre
// un type de défenseur
class Type {
    static all_types = {};

    constructor(name) {
        this._name = name;
        this._effectiveness = type_effectiveness[name] || {}; // l’efficacité de type ou la liste vide s'il n'existe pas dans le fichier
    }

    get name() {
        return this._name;
    }

    get effectiveness() {
        return this._effectiveness;
    }

    toString() {
        return this.name;
    }
}
