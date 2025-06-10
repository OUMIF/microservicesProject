FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copier le fichier projet
COPY *.csproj ./
RUN dotnet restore

# Copier tout le code source
COPY . .

# Publier l'application
RUN dotnet publish *.csproj -c Release -o /app/publish

# Image runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Installer netcat pour tester la connectivité
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/publish .

# Script d'attente de la base de données - APRÈS la copie du build
COPY wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh && \
    sed -i 's/\r$//' /wait-for-db.sh

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80

# Utiliser le script d'attente avant de démarrer l'application
ENTRYPOINT ["/wait-for-db.sh", "dotnet", "UserService.dll"]