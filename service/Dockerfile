
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY *.sln ./
COPY service/ApiGateway/*.csproj ./service/ApiGateway/
COPY UserService/*.csproj ./UserService/


RUN dotnet restore

COPY . .


RUN dotnet build -c Release --no-restore

RUN dotnet publish service/ApiGateway/*.csproj -c Release -o /app/publish/ApiGateway --no-restore

RUN dotnet publish UserService/*.csproj -c Release -o /app/publish/UserService --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS apigateway
WORKDIR /app
COPY --from=build /app/publish/ApiGateway .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80
ENTRYPOINT ["dotnet", "ApiGateway.dll"]

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS userservice
WORKDIR /app
COPY --from=build /app/publish/UserService .

ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:80

EXPOSE 80
ENTRYPOINT ["dotnet", "UserService.dll"]