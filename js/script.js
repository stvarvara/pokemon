class Pokemon {
    static all_pokemons = {};
    constructor(id, nom, form, attack, defense, stamina) {
        this._pokemonId = id;
        this._pokemonName = nom;
        this._form = form;
        this._baseAttack = attack;
        this._baseDefense = defense;
        this._baseStamina = stamina;
    }
    get pokemonId() {
        return this._pokemonId;
    }
    get pokemonName() {
        return this._pokemonName;
    }
    get form() {
        return this._form;
    }
    get baseAttack() {
        return this._baseAttack;
    }
    get baseDefense() {
        return this._baseDefense;
    }
    get baseStamina() {
        return this._baseStamina;
    }

    toString() {
        return `Pokemon ID: ${this.pokemonId}, Name: ${this.pokemonName}, Form: ${this.form}, Attack: ${this.baseAttack}, Defense: ${this.baseDefense}, Stamina: ${this.baseStamina}\n`;
    }
}

function import_pokemon(pokemon) {
    // Parcourir les données et créer des objets Pokemon
    for (let data of pokemon) {
        // la forme du Pokemon est "Normal"
        if (data.form === "Normal") {
            const pokemonObj = new Pokemon(
                data.pokemon_id,
                data.pokemon_name,
                data.form,
                data.base_attack,
                data.base_defense,
                data.base_stamina
            );
            Pokemon.all_pokemons[data.pokemon_id] = pokemonObj;
        }
    }

    return Pokemon.all_pokemons;
}

const all_pokemons = import_pokemon(pokemon);

console.log(Pokemon.all_pokemons);
