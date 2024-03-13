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
        return `ID: ${this.pokemonId}, N: ${this.pokemonName}, F: ${this.form}, A: ${this.baseAttack}, D: ${this.baseDefense}, S: ${this.baseStamina}\n`;
    }


    static importPokemon(pokemon) {
        for (let data of pokemon) {
            if (data.form === "Normal") {
                const pokemonObj = new Pokemon(
                    data.pokemon_id,
                    data.pokemon_name,
                    data.form,
                    data.base_attack,
                    data.base_defense,
                    data.base_stamina,
                );
                Pokemon.all_pokemons[data.pokemon_id] = pokemonObj;
            }
        }
        return Pokemon.all_pokemons;
    }
}

Pokemon.importPokemon(pokemon);

let bulbasaur = Pokemon.all_pokemons[1]; 
console.log(bulbasaur);
