# Use the official .NET 8 SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore dependencies
COPY ["src/backend/MoviesChallenge.sln", "./"]
COPY ["src/backend/Movies.Api/Movies.Api.csproj", "Movies.Api/"]
COPY ["src/backend/Movies.Application/Movies.Application.csproj", "Movies.Application/"]
COPY ["src/backend/Movies.Core/Movies.Core.csproj", "Movies.Core/"]
COPY ["src/backend/Movies.Infrastructure/Movies.Infrastructure.csproj", "Movies.Infrastructure/"]
COPY ["src/backend/Movies.Tests/Movies.Tests.csproj", "Movies.Tests/"]

RUN dotnet restore "Movies.Api/Movies.Api.csproj"

# Copy everything else and build
COPY src/backend/ .
WORKDIR "/src/Movies.Api"
RUN dotnet build "Movies.Api.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "Movies.Api.csproj" -c Release -o /app/publish

# Use the official ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Expose port 8080
EXPOSE 8080

# Set the entry point
ENTRYPOINT ["dotnet", "Movies.Api.dll"]