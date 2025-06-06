-- Script d'initialisation de la base de données
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'UserServiceDB')
BEGIN
    CREATE DATABASE UserServiceDB;
    PRINT 'Base de données UserServiceDB créée avec succès';
END
ELSE
BEGIN
    PRINT 'Base de données UserServiceDB existe déjà';
END

-- Utiliser la base de données
USE UserServiceDB;

-- Ajouter ici d'autres scripts d'initialisation si nécessaire
-- Par exemple : création d'utilisateurs, de rôles, de données de base, etc.