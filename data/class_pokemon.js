// class Pokemon
class Pokemon {
    static all_pokemons = {};

    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, types) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._types = types;
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

    get types() {
        return this._types;
    }

    static import_pokemon() {
        for (let entry of pokemon) {
            if (entry.form === "Normal") {
                let types = Pokemon.get_types(entry.pokemon_name);
    
                types.forEach((type) => {
                    if (!Type.all_types[type]) {
                        Type.all_types[type] = new Type(type);
                    }
                });
    
                let pokemonInstance = new Pokemon(
                    entry.pokemon_id,
                    entry.pokemon_name,
                    entry.form,
                    entry.base_stamina,
                    entry.base_defense,
                    entry.base_attack,
                    types
                );
    
                Pokemon.all_pokemons[entry.pokemon_id] = pokemonInstance;
            }
        }
    }
    
    static get_types(pokemonName) {
        let types = [];
        for (let entry of pokemon_type) {
            if (entry.form === "Normal" && entry.pokemon_name === pokemonName) {
                types.push(entry.type);
            }
        }
        return types.flat(); 
    }
}

Pokemon.import_pokemon();

console.log(Pokemon.all_pokemons[1].toString());
console.log(Pokemon.all_pokemons[2].toString());
console.log(Type.all_types["Grass"].effectiveness);
console.log(Type.all_types["Fire"].effectiveness); 