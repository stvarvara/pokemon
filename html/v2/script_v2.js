document.addEventListener("DOMContentLoaded", function() {
    const pokemonsPerPage = 25;
    let currentPage = 1;
    let totalPages = Math.ceil(Object.keys(Pokemon.all_pokemons).length / pokemonsPerPage);
    
    const tableBody = document.getElementById("pokemonTableBody");

    function padId(id) { 
        const paddedId = String(id).padStart(3, '0');
        return paddedId;
    }

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
            <td><img src="../webp/thumbnails/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" ></td>
        `;
        return row;
    }

    function renderPokemonPage(page) {
        tableBody.innerHTML = "";
        const startIdx = (page - 1) * pokemonsPerPage;
        const endIdx = startIdx + pokemonsPerPage;
        const pokemons = Object.values(Pokemon.all_pokemons).slice(startIdx, endIdx);
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        });
        document.getElementById("currentPage").innerText = page;
    }

    if (!Pokemon.all_pokemons) {
        console.error("Pokemon data not found or not in the correct format.");
        return;
    }

    renderPokemonPage(currentPage);

    document.getElementById("prevButton").addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            renderPokemonPage(currentPage);
        }
    });

    document.getElementById("nextButton").addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            renderPokemonPage(currentPage);
        }
    });

    document.getElementById("totalPages").innerText = totalPages;
});
