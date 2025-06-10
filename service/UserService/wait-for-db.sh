#!/bin/bash

set -e

echo "Attente de la disponibilité de SQL Server..."

# Attendre que le port 1433 soit ouvert sur sqlserver
until nc -z sqlserver 1433; do
    echo "SQL Server n'est pas encore prêt - attente..."
    sleep 5
done

echo "SQL Server est prêt !"

# Attendre un peu plus pour s'assurer que la base de données est créée
echo "Attente supplémentaire pour la création de la base de données..."
sleep 15

echo "Démarrage de l'application..."

# Exécuter la commande passée en argument
exec "$@"



