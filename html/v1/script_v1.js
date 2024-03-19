Pokemon.import_pokemon();

function padId(id) { //pour avoir la chaine de 3 caracteres pour id pour importer les photos
    const paddedId = String(id).padStart(3, '0');
    return paddedId;
}
document.addEventListener("DOMContentLoaded", function() { //creer la ligne de tableau
    // on attend que le document HTML soit complètement chargé avant d'exécuter le code 
    function createPokemonRow(pokemon) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pokemon.pokemon_id}</td>
            <td>${pokemon.pokemon_name}</td>
            <td>${pokemon.generation}</td>
            <td>${pokemon.types.join(", ")}</td>
            <td>${pokemon.base_stamina}</td>
            <td>${pokemon.base_attack}</td>
            <td>${pokemon.base_defense}</td>
            <td><img src="/webp/thumbnails/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" ></td>
        `;
        return row;
    }

    if (typeof Pokemon.all_pokemons === 'object' && Pokemon.all_pokemons !== null) { // si le pokemon est defini 
        const tableBody = document.getElementById("pokemonTableBody");

        for (const pokemonId in Pokemon.all_pokemons) {
            const pokemon = Pokemon.all_pokemons[pokemonId];
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        }
    } else {
        console.error("Pokemon data not found or not in the correct format.");
    }
});
