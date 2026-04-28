FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["HygieneHub.API/HygieneHub.API.csproj", "HygieneHub.API/"]
RUN dotnet restore "HygieneHub.API/HygieneHub.API.csproj"
COPY HygieneHub.API/ HygieneHub.API/
WORKDIR "/src/HygieneHub.API"
RUN dotnet publish "HygieneHub.API.csproj" -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "HygieneHub.API.dll"]
