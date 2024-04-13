// La dernière version de l'affichage dynamique des Pokémons
// Affichage d'un tableau de Pokémons par page de 25
// Ajout de filtres par génération, type et nom
// Ajout d'un tri par colonne

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
    let currentSortCriteria = 'id'; // Critère de tri par défaut
    let isAscending = true; // Par défaut, trier par ordre ascendant (alphabetique ou croissant)

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

    function applyFilters() { // Applique les filtres et le tri
        const generation = generationFilter.value;
        const type = typeFilter.value;
        const name = nameFilter.value.toLowerCase();

        let sortedPokemons = Object.values(Pokemon.all_pokemons);
        if (currentSortCriteria) { // <- S'assure qu'un critère de tri est défini (non null ou undefined)
            const sortFunction = getSortFunction(currentSortCriteria);
            sortedPokemons = sortedPokemons.sort(sortFunction);
        } else {
            throw new Error("Erreur : aucun critère de tri défini.");
        }

        return sortedPokemons.filter(pokemon => {
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

    // Déclaration des écouteurs d'événements pour le tri des colonnes

    function addSortEventListener(headerId, sortCriteria) {
        const headerButton = document.getElementById(headerId);
        headerButton.addEventListener("click", () => {
            if (currentSortCriteria === sortCriteria) {
                // Inverse la direction du tri
                isAscending = !isAscending;
            } else {
                // Réinitialise la direction du tri à true
                isAscending = true;
            }
            currentSortCriteria = sortCriteria;
            sortPokemons(sortCriteria);
            renderPokemonPage(currentPage);
    
            // Supprimer toute flèche existante sur les autres entêtes de colonne
            const headers = document.querySelectorAll('th button');
            headers.forEach(header => {
                if (header.id !== headerId) {
                    const existingArrow = header.querySelector('.sort-arrow');
                    if (existingArrow) {
                        existingArrow.remove();
                    }
                }
            });
    
            // Supprimer toute flèche existante sur cet entête de colonne
            const existingArrow = headerButton.querySelector('.sort-arrow');
            if (existingArrow) {
                existingArrow.remove();
            }
    
            // Ajouter la nouvelle flèche
            const arrow = isAscending ? '▼' : '▲';
            headerButton.innerHTML += `<span class="sort-arrow">${arrow}</span>`;
        });
    }
    
    
    addSortEventListener("idHeader", 'id');
    addSortEventListener("nameHeader", 'name');
    addSortEventListener("generationHeader", 'generation');
    addSortEventListener("typesHeader", 'types');
    addSortEventListener("staminaHeader", 'stamina');
    addSortEventListener("attackHeader", 'attack');
    addSortEventListener("defenseHeader", 'defense');

    function sortPokemons(sortCriteria) {
        const sortFunction = getSortFunction(sortCriteria);
        const sortedPokemons = Object.values(Pokemon.all_pokemons).sort(sortFunction);
        updatePokemonList(sortedPokemons);
        renderPokemonPage(currentPage);
    }

    function getSortFunction(sortCriteria) {
        switch (sortCriteria) {
            case 'id':
                return (a, b) => isAscending ? a.pokemon_id - b.pokemon_id : b.pokemon_id - a.pokemon_id;
            case 'name':
                return (a, b) => {
                    const nameA = a.pokemon_name.toLowerCase();
                    const nameB = b.pokemon_name.toLowerCase();
                    return isAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
                };
            case 'generation':
                return (a, b) => isAscending ? a.generation - b.generation : b.generation - a.generation;
            case 'types':
                return (a, b) => {
                    const typesA = a.types.join(', ');
                    const typesB = b.types.join(', ');
                    return isAscending ? typesA.localeCompare(typesB) : typesB.localeCompare(typesA);
                };
            case 'stamina':
                return (a, b) => isAscending ? a.base_stamina - b.base_stamina : b.base_stamina - a.base_stamina;
            case 'attack':
                return (a, b) => isAscending ? a.base_attack - b.base_attack : b.base_attack - a.base_attack;
            case 'defense':
                return (a, b) => isAscending ? a.base_defense - b.base_defense : b.base_defense - a.base_defense;
            default:
                return () => 0; // Par défaut, aucune modification d'ordre
        }
    }

    function updatePokemonList(sortedPokemons) {
        const updatedPokemons = sortedPokemons.reduce((acc, pokemon) => {
            acc[pokemon.pokemon_id] = pokemon;
            return acc;
        }, {});
        Pokemon.all_pokemons = updatedPokemons;
    }
    
    generateFilterOptions();
    sortPokemons(currentSortCriteria); 
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

