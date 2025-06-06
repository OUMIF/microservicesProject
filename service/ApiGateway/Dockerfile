FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copier le fichier projet
COPY *.csproj ./
RUN dotnet restore

# Copier tout le code source
COPY . .

# Publier l'application (spécifier le projet .csproj)
RUN dotnet publish *.csproj -c Release -o /app/publish

# Image runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80
ENTRYPOINT ["dotnet", "ApiGateway.dll"]