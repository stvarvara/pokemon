Pokemon.import_pokemon();

///Q1 la liste des Pokémons par type
function getPokemonsByType(typeName) {
    
    const pokemonsWithType = [];
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.types.includes(typeName)) {
            pokemonsWithType.push(pokemon);
        }
    }

    return pokemonsWithType;
}

console.log("Type : Grass")
console.log(getPokemonsByType("Grass"));

///Q2 la liste des Pokémons par attaque
function getPokemonsByAttack(attackName) {
    const pokemonsWithAttack = [];
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.moves.includes(attackName)) {
            pokemonsWithAttack.push(pokemon);
        }
    }
    return pokemonsWithAttack;
}

console.log("Attack : Fire Blast")
console.log(getPokemonsByAttack("Fire Blast"));

///Q3 la liste des attaques par type
function getAttacksByType(typeName) {
    const attacksWithType = [];
    for (const attackName in Attack.all_attacks) {
        const attack = Attack.all_attacks[attackName];
        if (attack.type === typeName) {
            attacksWithType.push(attack);
        }
    }
    return attacksWithType;
}

console.log("AttackType : Electric")
console.log(getAttacksByType("Electric"));

///Q4 a liste des Pokémons triés par nom dans l’ordre alphabétique
function sortPokemonByName() {
    const sortedPokemons = Object.values(Pokemon.all_pokemons).sort((a, b) => {
        return a.pokemon_name.localeCompare(b.pokemon_name);
    });
    return sortedPokemons;
}

console.log(sortPokemonByName());

///Q5 la liste des Pokémons triés dans l’ordre décroissant d’endurance (stamina)
function sortPokemonByStamina() {
    const sortedPokemons = Object.values(Pokemon.all_pokemons).sort((a, b) => {
        return b.base_stamina - a.base_stamina;
    });
    return sortedPokemons;
}

console.log(sortPokemonByStamina());

///Q6 la liste des Pokémons sur lesquels l’attaque choisie est la plus efficace
function getWeakestEnemies(attackName) {
    let maxEffectiveness = 0;
    let weakestEnemies = [];

    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        let totalEffectiveness = 1; // Initialisation de l'efficacité totale de l'attaque sur le Pokémon

        // Calcule de l'efficacité de l'attaque pour chaque type du Pokémon
        for (const typeName of pokemon.types) {
            const pokemon_type = Type.all_types[typeName];
            const attack = Attack.all_attacks[attackName];  
            const attack_type = Type.all_types[attack.type];

            if (pokemon_type.name in attack_type.effectiveness) {
                // Si le type est sensible à l'attaque, on multiplie l'efficacité totale par le multiplicateur
                totalEffectiveness *= attack_type.effectiveness[pokemon_type.name];
            }  
        }

        // Mise à jour de la liste des Pokémon les plus faibles si l'efficacité totale est la plus élevée
        if (totalEffectiveness > maxEffectiveness) {
            maxEffectiveness = totalEffectiveness;
            weakestEnemies = [pokemon];
        } else if (totalEffectiveness === maxEffectiveness) {
            weakestEnemies.push(pokemon);
        }
    }

    return weakestEnemies;
}

console.log("Attack : Thunderbolt")
console.log(getWeakestEnemies("Thunderbolt"));

///Q7 la liste des types d’attaque les plus efficaces contre un Pokémon donné
function getBestAttackTypesForEnemy(pokemonName) {
    let pokemonID = null;

    // On commence par chercher l'ID du Pokémon en fonction de son nom
    for (const pokemonId in Pokemon.all_pokemons) {
        const pokemon = Pokemon.all_pokemons[pokemonId];
        if (pokemon.pokemon_name.toLowerCase() === pokemonName.toLowerCase()) {
            pokemonID = pokemon.pokemon_id;
        }
    }


    const pokemon = Pokemon.all_pokemons[pokemonID];
    if (!pokemon) {
        console.error("Pokémon non trouvé ! Vérifiez l'écriture que vous avez utilisé et ré-essayez.");
        return [];
    }

    const effectivenessMap = {};

    // Calculer l'efficacité de chaque type d'attaque contre le Pokémon spécifié
    for (const attackName in Attack.all_attacks) {
        const attack = Attack.all_attacks[attackName];
        let effectiveness = 1;

        for (const typeName of pokemon.types) {
            const type = Type.all_types[typeName];
            if (type.effectiveness[attack.type]) {
                effectiveness *= type.effectiveness[attack.type];
            }
        }

        if (effectiveness > 1) {
            effectivenessMap[attack.type] = effectiveness;
        }
    }

    // Trier les types d'attaque par efficacité décroissante
    const bestAttackTypes = Object.keys(effectivenessMap).sort((a, b) => {
        return effectivenessMap[b] - effectivenessMap[a];
    });

    return bestAttackTypes;
}
console.log("Bulbasaur")
console.log(getBestAttackTypesForEnemy("Bulbasaur"));
