# pr-leaderboard
Pull-request leaderboard for Azure DevOps

# Setup

## Local frontend
- Update hosts file with `127.0.0.1 pr-leaderboard.local`
- Setup IIS (or any other server) with `https` bindings for domain `pr-leaderboard.local`
- Run `npm i` and `npm run build`

## Auth API
- Setup [azure-devops-auth](https://github.com/nerijusdu/azure-devops-auth)

## Azure
- Register app in [Azure DevOps](https://app.vsaex.visualstudio.com/app/register)
  - For local testing app url should be `https://pr-leaderboard.local`
  - Callback must be `{your app url}/callback.html`
  - Minimum scopes required:
    - Work items (read)
    - Code (read)
    - Team Dashboards (manage) - currently not used, save for future

## Runing
- Open `https://pr-leaderboard.local`
- Open settings tab and enter needed values
- Authorize app