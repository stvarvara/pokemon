/** La troisième version de l'affichage dynamique des Pokémons
* Affichage d'un tableau des Pokémons par page de 25
* Une zone de détails des Pokémons qui est masquée par défaut et s’affiche, en mode “popup”
* sur un événement "clic sur la ligne d’un Pokémon
* Un survol de la miniature du Pokémon affiche l’image du Pokémon en grande taille, en mode “popup”
* @version 3
*/

// Écouteur d'événement DOMContentLoaded pour exécuter le code une fois le DOM chargé

document.addEventListener("DOMContentLoaded", function() {
    // Sélection des éléments HTML importants
    const tableBody = document.getElementById("pokemonTableBody");
    const closeButton = document.getElementById("closeButton");
    const pokemonDetails = document.getElementById("pokemonDetails");
    // Importation des données des Pokémons
    Pokemon.import_pokemon();
    const pokemonsPerPage = 25;
    let currentPage = 1;
    let totalPages = Math.ceil(Object.keys(Pokemon.all_pokemons).length / pokemonsPerPage);
    // Fonction pour créer une ligne de Pokémon dans le tableau
    function createPokemonRow(pokemon) {
        const row = document.createElement("tr");
        // Remplissage de la ligne avec les données du Pokémon
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
        // Ajout d'un écouteur d'événement pour afficher les détails du Pokémon lorsqu'on clique sur sa ligne
        row.addEventListener("click", function() {
            showPokemonDetails(pokemon);
        });
        // Gestion du survol de la miniature du Pokémon pour afficher son image en grand
        const thumbnail = row.querySelector(".pokemon-thumbnail");
        thumbnail.addEventListener("mouseover", function() {
            showPokemonImage(pokemon);
        });
        thumbnail.addEventListener("mouseout", function() {
            hidePokemonImage();
        });

        return row;
    }
    // Fonction pour afficher une page de Pokémons
    function renderPokemonPage(page) {
        tableBody.innerHTML = "";
        const startIdx = (page - 1) * pokemonsPerPage;
        const endIdx = startIdx + pokemonsPerPage;
        const pokemons = Object.values(Pokemon.all_pokemons).slice(startIdx, endIdx);
        // Création des lignes de Pokémons pour la page courante
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon);
            tableBody.appendChild(row);
        });

         // Mise à jour du numéro de page affiché
        document.getElementById("currentPage").innerText = page;
    }

    // Vérification de la présence des données des Pokémons
    if (!Pokemon.all_pokemons) {
        console.error("Pokemon data not found or not in the correct format.");
        return;
    }
     // Affichage de la première page de Pokémons
    renderPokemonPage(currentPage);

    // Ajout des écouteurs d'événement pour la pagination
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

     // Mise à jour du nombre total de pages affiché
    document.getElementById("totalPages").innerText = totalPages;

    closeButton.addEventListener("click", function() {
        pokemonDetails.style.display = "none";
    });
});
// Fonction pour ajouter des zéros à gauche d'un ID jusqu'à ce qu'il ait une longueur de 3 caractères
function padId(id) { 
    const paddedId = String(id).padStart(3, '0');
    return paddedId;
}
// Fonction pour afficher l'image d'un Pokémon en popup lors du survol de sa miniature

function showPokemonImage(pokemon) {
    const popup = document.createElement("div");
    popup.innerHTML = `<img src="../webp/images/${padId(pokemon.pokemon_id)}.webp" alt="${pokemon.pokemon_name}" class="popup-image">`;
    popup.classList.add("popup");
    document.body.appendChild(popup);
}
// Fonction pour masquer l'image d'un Pokémon en popup

function hidePokemonImage() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}
// Fonction pour afficher les détails d'un Pokémon

function showPokemonDetails(pokemon) { // afficher les details
    const pokemonAttacks = pokemon.moves; // toutes les attaques
    const chargedAttacks = pokemonAttacks.filter(attackName => Attack.all_attacks[attackName].is_charged);// les attaques chargées
    const fastAttacks = pokemonAttacks.filter(attackName => !Attack.all_attacks[attackName].is_charged);// les attaques rapides
    
    // Construction du contenu des détails du Pokémon
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

    // Ajout des détails des attaques chargées
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
     // Ajout des détails des attaques rapides
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

     // Affichage des détails du Pokémon
    detailsContent.innerHTML = detailsHTML;
    pokemonDetails.style.display = "block";
}

