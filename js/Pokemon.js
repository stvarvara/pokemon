
// Classe Pokemon
class Pokemon {
    static all_pokemons = {};
    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
    }

    get pokemon_id() {
        return this._pokemon_id;
    }

    get pokemon_name() {
        return this._pokemon_name;
    }

    get form() {
        return this._form;
    }

    get base_attack() {
        return this._base_attack;
    }

    get base_defense() {
        return this._base_defense;
    }

    get base_stamina() {
        return this._base_stamina;
    }

    toString() {
        return `${this.pokemon_name} (${this.form}) - ID: ${this.pokemon_id}, Attack: ${this.base_attack}, Defense: ${this.base_defense}, Stamina: ${this.base_stamina}`;
    }
    static import_pokemon() {
        for (let entry of pokemon) {
            if (entry.form === "Normal") {
                let pokemon_instance = new Pokemon(
                    entry.pokemon_id,
                    entry.pokemon_name,
                    entry.form,
                    entry.base_attack,
                    entry.base_defense,
                    entry.base_stamina
                );
                Pokemon.all_pokemons[entry.pokemon_id] = pokemon_instance;
            }
        }
    }
}

Pokemon.import_pokemon();
