# Projet Pokémon
## Affichage du projet
Pour afficher la version du projet, сollez le lien dans votre navigateur et modifiez les chiffres pour la version que vous souhaitez.

Exemple pour la version 5:
`https://stvarvara.github.io/pokemon/html/v5/pokemons_v5.html`

## Choix de conception pour les statistiques des Pokémons

Dans la classe `Pokemon`, les statistiques des Pokémons sont gérées de manière dynamique en utilisant des méthodes et des propriétés calculées. Voici les principaux choix de conception :

1. Utilisation de méthodes `get` pour les statistiques : Les statistiques telles que l'attaque, la défense et l'endurance sont calculées en utilisant la méthode `getCpMultiplier` et les propriétés de base du Pokémon. Cela permet d'obtenir les statistiques actualisées en fonction du niveau du Pokémon.

2. Utilisation d'une méthode `set` pour le niveau : La propriété `level` du Pokémon peut être modifiée en utilisant la méthode `set`. Cela permet de mettre à jour automatiquement les statistiques du Pokémon lorsque le niveau est modifié.

Ces choix de conception permettent une gestion flexible et modulaire des statistiques des Pokémons, en facilitant l'ajout de nouveaux Pokémons, types et attaques, ainsi que la mise à jour des statistiques en fonction du niveau du Pokémon.
