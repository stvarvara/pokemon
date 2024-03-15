// class Pokemon
class Pokemon {
    static all_pokemons = {}; //  l’ensemble des pokémons

    constructor(pokemon_id, pokemon_name, form, base_attack, base_defense, base_stamina, types) {
        this._pokemon_id = pokemon_id;
        this._pokemon_name = pokemon_name;
        this._form = form;
        this._base_attack = base_attack;
        this._base_defense = base_defense;
        this._base_stamina = base_stamina;
        this._types = types;
        this._fast_moves = fast_moves;
        this._charged_moves = charged_moves;
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
        let attacks = this.getAttacks().map(attack => attack.toString()).join(", ");
        return `${this.pokemon_name} (${this.form}) - ID: ${this.pokemon_id}, Attack: ${this.base_attack}, Defense: ${this.base_defense}, Stamina: ${this.base_stamina}, Attacks: ${attacks}`;
    }

    get types() {
        return this._types;
    }

    get attacks() {
        let attacks = [];
        for (let move_id of this._fast_moves.concat(this._charged_moves)) {
            if (Attack.all_attacks[move_id]) {
                attacks.push(Attack.all_attacks[move_id]);
            }
        }
        return attacks;
    } 

    static import_pokemon() { // lit la source de données et crée des objets Pokemon 
    for (let entry of pokemon_moves) {  // liste des attaques
        if (entry.form === "Normal") {
            let types = Pokemon.get_types(entry.pokemon_name);
            let fast_moves = entry.fast_moves.map(move => move.move_id);
            let charged_moves = entry.charged_moves.map(move => move.move_id);

            // Ajouter des attaques si elles n'existent pas déjà dans Attack.all_attacks
            for (let move_id of fast_moves.concat(charged_moves)) {
                if (!Attack.all_attacks[move_id]) {
                    let moveData = [...fast_moves, ...charged_moves].find(move => move.move_id === move_id);
                    Attack.all_attacks[move_id] = new Attack(
                        moveData.move_id,
                        moveData.name,
                        moveData.type,
                        moveData.power,
                        moveData.duration,
                        moveData.energy_delta,
                        moveData.stamina_loss_scaler
                    );
                }
            }

            types.forEach((type) => { // liste des types
                if (!Type.all_types[type]) {
                    Type.all_types[type] = new Type(type);
                }
            });

            let pokemonInstance = new Pokemon( // création de Pokémon
                entry.pokemon_id,
                entry.pokemon_name,
                entry.form,
                entry.base_stamina,
                entry.base_defense,
                entry.base_attack,
                types,
                fast_moves,
                charged_moves,
                fast_moves,
                charged_moves
            );

            Pokemon.all_pokemons[entry.pokemon_id] = pokemonInstance; // l'ajout de nouveau pokémon dans la liste, la clé est son ID
        }
    }
}
    
    static get_types() { // retourne la liste des types pour le pokemon
        let types = [];
        for (let entry of pokemon_type) {
            if (entry.form === "Normal" && entry.pokemon_name === this.name) { // on ne prends que les types des formes dont la valeur est Normal
                types.push(entry.type);
            }
        }
        return types.flat(); 
    }

    static getAttacks() { // retourne la liste des attaques pour le pokemon
        let attacks = [];
        this._fast_moves.forEach(move_id => {
            attacks.push(Attack.getAttackById(move_id));
        });
        this._charged_moves.forEach(move_id => {
            attacks.push(Attack.getAttackById(move_id));
        });
        return attacks;
    }
}

Pokemon.import_pokemon(); // import des données pour les pokémons
