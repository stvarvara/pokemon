// La troisième version de l'affichage dynamique des Pokémons
// Affichage d'un tableau des Pokémons par page de 25
// Une zone de détails des Pokémons qui est masquée par défaut et s’affiche, en mode “popup”
// sur un événement "clic sur la ligne d’un Pokémon

//Un survol de la miniature du Pokémon affiche l’image du Pokémon en grande taille, en mode “popup”

document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById("pokemonTableBody");
    const closeButton = document.getElementById("closeButton");
    const pokemonDetails = document.getElementById("pokemonDetails");

    Pokemon.import_pokemon();
    const pokemonsPerPage = 25;
    const generationFilter = document.getElementById("generationFilter");
    const typeFilter = document.getElementById("typeFilter");
    const nameFilter = document.getElementById("nameFilter");
    let currentPage = 1;
    let totalPages = Math.ceil(Object.keys(Pokemon.all_pokemons).length / pokemonsPerPage);

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
            <td><img src="../webp/thumbnails/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" class="pokemon-thumbnail"></td>
        `;
        row.addEventListener("click", function() {
            showPokemonDetails(pokemon);
        });
        const thumbnail = row.querySelector(".pokemon-thumbnail");
        thumbnail.addEventListener("mouseover", function() {
            showPokemonImage(pokemon);
        });
        thumbnail.addEventListener("mouseout", function() {
            hidePokemonImage();
        });

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

    closeButton.addEventListener("click", function() {
        pokemonDetails.style.display = "none";
    });

    function generateFilterOptions() {
        const generations = [...new Set(Object.values(Pokemon.all_pokemons).map(pokemon => pokemon.generation))];
        generations.forEach(generation => {
            const generationNumber = Number(generation);
            // on vérifie que c'est un nombre entier et que ce n'est pas 0
            if (Number.isInteger(generationNumber) && generationNumber > 0) { 
                const option = document.createElement("option");
                option.value = generation;
                option.innerText = generation;
                generationFilter.appendChild(option);
            }
        });

        const types = [...new Set(Object.values(Pokemon.all_pokemons).flatMap(pokemon => pokemon.types))];
        types.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.innerText = type;
            typeFilter.appendChild(option);
        });
    }

    function applyFilters() {
        const generation = generationFilter.value;
        const type = typeFilter.value;
        const name = nameFilter.value.toLowerCase();

        return Object.values(Pokemon.all_pokemons).filter(pokemon => {
            return (generation ? pokemon.generation === generation : true)
                && (type ? pokemon.types.includes(type) : true)
                && (name ? pokemon.pokemon_name.toLowerCase().includes(name) : true);
        });
    }

    function renderPokemonPage(page) {
        tableBody.innerHTML = "";
        const filteredPokemons = applyFilters();
        totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
        const startIdx = (page - 1) * pokemonsPerPage;
        const endIdx = startIdx + pokemonsPerPage;
        const pokemons = filteredPokemons.slice(startIdx, endIdx);
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        });
        document.getElementById("currentPage").innerText = page;
        document.getElementById("totalPages").innerText = totalPages;
    }

    generationFilter.addEventListener("change", function() {
        currentPage = 1;
        renderPokemonPage(currentPage);
    });

    typeFilter.addEventListener("change", function() {
        currentPage = 1;
        renderPokemonPage(currentPage);
    });

    nameFilter.addEventListener("input", function() {
        currentPage = 1;
        renderPokemonPage(currentPage);
    });

    generateFilterOptions();
    renderPokemonPage(currentPage);
});

function padId(id) { 
    const paddedId = String(id).padStart(3, '0');
    return paddedId;
} 

function showPokemonImage(pokemon) {
    const popup = document.createElement("div");
    popup.innerHTML = `<img src="../webp/images/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" class="popup-image">`;
    popup.classList.add("popup");
    document.body.appendChild(popup);
}

function hidePokemonImage() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}

function showPokemonDetails(pokemon) { // afficher les details
    const pokemonAttacks = pokemon.moves; // toutes les attaques
    const chargedAttacks = pokemonAttacks.filter(attackName => Attack.all_attacks[attackName].is_charged);// les attaques chargées
    const fastAttacks = pokemonAttacks.filter(attackName => !Attack.all_attacks[attackName].is_charged);// les attaques rapides

    let detailsHTML = `
        <p><b>№</b> ${pokemon.pokemon_id} ${pokemon.pokemon_name}</p>
        <p><b>Attaques Chargées :</b></p>
        <table>
        <tr>
        <th>Attaque</th>
        <th>Type</th>
        <th>Delta d'énergie</th>
        <th>Puissance</th>
        <th>Durée</th>
        </tr>
    `;

    chargedAttacks.forEach(attackName => {
        const attack = Attack.all_attacks[attackName];
        detailsHTML += `
        <tr>
            <td class="att"><i>${attack.name} </i></td>
            <td>${attack.type}</td>
            <td>${attack.energy_delta}</td>
            <td>${attack.power}</td>
            <td>${attack.duration}</td>
        </tr>`;
    });

    detailsHTML += `
        </table>
        <p><b>Attaques Rapides :</b></p>
        <table>
        <tr>
            <th>Attaque</th>
            <th>Type</th>
            <th>Delta d'énergie</th>
            <th>Puissance</th>
            <th>Durée</th>
        </tr>
    `;

    fastAttacks.forEach(attackName => {
        const attack = Attack.all_attacks[attackName];
        detailsHTML += `
        <tr>
            <td class="att"><i>${attack.name} </i></td>
            <td>${attack.type}</td>
            <td>${attack.energy_delta}</td>
            <td>${attack.power}</td>
            <td>${attack.duration}</td>
        </tr>`;
    });
    detailsHTML += `</table>`;

    detailsContent.innerHTML = detailsHTML;
    pokemonDetails.style.display = "block";
}

