/** La quatrième version de l'affichage dynamique des Pokémons
* Affichage d'un tableau des Pokémons par page de 25
* Une zone filtrage dans laquelle on pourra filtrer la liste des Pokémons
* Filtrage sur la Génération, le Type et le Nom
* @version 4
*/

// Écouteur d'événement DOMContentLoaded pour exécuter le code une fois le DOM chargé

document.addEventListener("DOMContentLoaded", function() {
    // Sélection des éléments HTML importants
    const tableBody = document.getElementById("pokemonTableBody"); // Corps du tableau des Pokémons
    const closeButton = document.getElementById("closeButton"); // Bouton pour fermer la fenêtre de détails
    const pokemonDetails = document.getElementById("pokemonDetails"); // Fenêtre de détails des Pokémons

    // Importation des données des Pokémons
    Pokemon.import_pokemon();
    // Définition des constantes pour la pagination et les filtres
    const pokemonsPerPage = 25; // Nombre de Pokémons affichés par page
    const generationFilter = document.getElementById("generationFilter"); // Filtre par génération
    const typeFilter = document.getElementById("typeFilter"); // Filtre par type
    const nameFilter = document.getElementById("nameFilter"); // Filtre par nom
    let currentPage = 1; // Page actuelle
    let totalPages = Math.ceil(Object.keys(Pokemon.all_pokemons).length / pokemonsPerPage);// Nombre total de pages

    function createPokemonRow(pokemon) {
        const row = document.createElement("tr");// Création d'une nouvelle ligne de tableau
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
        // Ajout d'un événement pour afficher les détails du Pokémon au clic
        row.addEventListener("click", function() {
            showPokemonDetails(pokemon);
        });
        // Gestion de l'affichage de l'image du Pokémon au survol
        const thumbnail = row.querySelector(".pokemon-thumbnail");
        thumbnail.addEventListener("mouseover", function() {
            showPokemonImage(pokemon);
        });
        thumbnail.addEventListener("mouseout", function() {
            hidePokemonImage();
        });

        return row; // Retour de la ligne de tableau créée
    }
    // Fonction pour afficher une page de Pokémons
    function renderPokemonPage(page) {
        tableBody.innerHTML = ""; // Réinitialisation du contenu du tableau
        const startIdx = (page - 1) * pokemonsPerPage; // Indice de début des Pokémons sur la page
        const endIdx = startIdx + pokemonsPerPage; // Indice de fin des Pokémons sur la page
        const pokemons = Object.values(Pokemon.all_pokemons).slice(startIdx, endIdx); // Sélection des Pokémons pour la page
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon); // Création de la ligne de Pokémon
            tableBody.appendChild(row); // Ajout de la ligne au tableau
        });
        document.getElementById("currentPage").innerText = page; // Mise à jour du numéro de page affiché

    }
    // Vérification des données des Pokémons et affichage de la première page
    if (!Pokemon.all_pokemons) {
        console.error("Pokemon data not found or not in the correct format.");
        return;
    }

    renderPokemonPage(currentPage); // Affichage de la première page de Pokémons
    // Pagination
    document.getElementById("prevButton").addEventListener("click", function() {
        if (currentPage > 1) { 
            currentPage--; // Décrémentation de la page actuelle
            renderPokemonPage(currentPage); // Affichage de la nouvelle page
        }
    });

    document.getElementById("nextButton").addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++; // Incrémentation de la page actuelle
            renderPokemonPage(currentPage); // Affichage de la nouvelle page
        }
    });

    document.getElementById("totalPages").innerText = totalPages; // Affichage du nombre total de pages
    // La fermeture de la fenêtre des détails
    closeButton.addEventListener("click", function() {
        pokemonDetails.style.display = "none"; // Masquage de la fenêtre de détails
    });
    // Fonction pour générer les options de filtre
    function generateFilterOptions() {
        // Obtention des valeurs uniques de génération et de type
        const generations = [...new Set(Object.values(Pokemon.all_pokemons).map(pokemon => pokemon.generation))]; // Génération
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

        const types = [...new Set(Object.values(Pokemon.all_pokemons).flatMap(pokemon => pokemon.types))]; // Type
        types.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.innerText = type;
            typeFilter.appendChild(option);
        });
    }

    function applyFilters() {  // Filtrage des Pokémons en fonction des critères sélectionnés ou saisis
        const generation = generationFilter.value;
        const type = typeFilter.value;
        const name = nameFilter.value.toLowerCase();

        return Object.values(Pokemon.all_pokemons).filter(pokemon => {
            return (generation ? pokemon.generation === generation : true)
                && (type ? pokemon.types.includes(type) : true)
                && (name ? pokemon.pokemon_name.toLowerCase().includes(name) : true);
        });
    }
    // Fonction pour afficher une page de Pokémons filtrée
    function renderPokemonPage(page) {
        tableBody.innerHTML = ""; // Réinitialisation du contenu du tableau
        const filteredPokemons = applyFilters(); // Application des filtres
        totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage); // Recalcul du nombre total de pages
        const startIdx = (page - 1) * pokemonsPerPage; // Indice de début des Pokémons sur la page
        const endIdx = startIdx + pokemonsPerPage; // Indice de fin des Pokémons sur la page
        const pokemons = filteredPokemons.slice(startIdx, endIdx); // Sélection des Pokémons pour la page
        pokemons.forEach(pokemon => {
            const row = createPokemonRow(pokemon); // Création de la ligne de Pokémon
            tableBody.appendChild(row); // Ajout de la ligne au tableau
        });
        
        document.getElementById("currentPage").innerText = page; // Mise à jour du numéro de page affiché
        document.getElementById("totalPages").innerText = totalPages; // Mise à jour du nombre total de pages
    }

    // Gestion des événements pour les filtres
    generationFilter.addEventListener("change", function() {
        currentPage = 1; // Réinitialisation de la page actuelle
        renderPokemonPage(currentPage); // Affichage de la première page filtrée
    });

    typeFilter.addEventListener("change", function() {
        currentPage = 1; // Réinitialisation de la page actuelle
        renderPokemonPage(currentPage); // Affichage de la première page filtrée
    });

    nameFilter.addEventListener("input", function() {
        currentPage = 1; // Réinitialisation de la page actuelle
        renderPokemonPage(currentPage); // Affichage de la première page filtrée
    });

    // Génération des options de filtre et affichage de la première page
    generateFilterOptions();
    renderPokemonPage(currentPage);
    });

    // Fonction pour ajouter des zéros à gauche d'un ID jusqu'à ce qu'il ait une longueur de 3 caractères
    function padId(id) { 
    const paddedId = String(id).padStart(3, '0');
    return paddedId;
    } 

    // Fonction pour afficher l'image d'un Pokémon en popup
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
    function showPokemonDetails(pokemon) {
    const pokemonAttacks = pokemon.moves; // Attaques du Pokémon
    const chargedAttacks = pokemonAttacks.filter(attackName => Attack.all_attacks[attackName].is_charged); // Attaques chargées
    const fastAttacks = pokemonAttacks.filter(attackName => !Attack.all_attacks[attackName].is_charged); // Attaques rapides

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
