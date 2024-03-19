// class Pokemon
class Pokemon {
    static all_pokemons = {};

    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, types, moves, generation) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._types = types;
        this._moves=moves;
        this._generation=generation;
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
    get moves(){
        return this._moves;
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
    get generation() { 
        return this._generation;
    }

    toString() {
        return `${this.pokemon_name} (${this.form}) - ID: ${this.pokemon_id}, Attack: ${this.base_attack}, Defense: ${this.base_defense}, Stamina: ${this.base_stamina}`;
    }

    get types() {
        return this._types;
    }

    static import_pokemon() {
        for (const p of pokemon) {
            if (p.form !== "Normal") {
                continue; 
            }
            
            const { pokemon_name, pokemon_id, base_stamina, base_defense, base_attack } = p;
            const generation = Pokemon.import_generation(pokemon_name);
    
            const types = [];
            for (const ptype of pokemon_type) {
                if (ptype.pokemon_name === pokemon_name) {
                    if (ptype.form==="Normal") {
                        const typeName = ptype.type;
                    if (!Type.all_types[typeName]) {
                        Type.all_types[typeName] = new Type(typeName);
                    }
                    types.push(typeName);
                    }
                    
                }
            }
    
            const moves = [];
            for (const pattack of pokemon_moves) {
                if (pattack.pokemon_name === pokemon_name) {
                    for (const move of [...pattack.charged_moves, ...pattack.fast_moves]) {
                        if (!Attack.all_attacks[move]) {
                            new Attack(move);
                        }
                        moves.push(move);
                    }
                }
            }
    
            const newPokemon = new Pokemon(
                pokemon_id, pokemon_name, p.form, base_stamina, base_defense, base_attack,
                types, moves, generation
            );
            Pokemon.all_pokemons[pokemon_id] = newPokemon;
        }
    }
    static import_generation(name) {
        for (const gen in generation) {
            for (const pokemon of generation[gen]) {
                if (pokemon.name === name) {
                    const generationNumber = gen.match(/\d+/)[0];
                    return generationNumber;
                }
            }
        }
        return "Inconnue";
    }
    
    
    getTypes() {
        return this._types.map(type => Type.all_types[type]);
    }
    
    getAttacks() {
        const attackInstances = this._moves.map(move => Attack.all_attacks[move]);
        return attackInstances;
    }

}    
