FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["PRL.Api/PRL.Api.csproj", "PRL.Api/"]
RUN dotnet restore "PRL.Api/PRL.Api.csproj"
COPY . .
WORKDIR "/src/PRL.Api"
RUN dotnet build "PRL.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PRL.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PRL.Api.dll"]