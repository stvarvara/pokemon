# Projet Pokémon

## Choix de conception pour les statistiques des Pokémon

Dans la classe `Pokemon`, les statistiques des Pokémon sont gérées de manière dynamique en utilisant des méthodes et des propriétés calculées. Voici les principaux choix de conception :

1. Utilisation de méthodes `get` pour les statistiques : Les statistiques telles que l'attaque, la défense et l'endurance sont calculées en utilisant la méthode `getCpMultiplier` et les propriétés de base du Pokémon. Cela permet d'obtenir les statistiques actualisées en fonction du niveau du Pokémon.

2. Utilisation d'une méthode `set` pour le niveau : La propriété `level` du Pokémon peut être modifiée en utilisant la méthode `set`. Cela permet de mettre à jour automatiquement les statistiques du Pokémon lorsque le niveau est modifié.

Ces choix de conception permettent une gestion flexible et modulaire des statistiques des Pokémon, en facilitant l'ajout de nouveaux Pokémon, types et attaques, ainsi que la mise à jour des statistiques en fonction du niveau du Pokémon.
