export const url = process.env.VUE_APP_URL || 'https://pr-leaderboard.local';
export const clientId = process.env.VUE_APP_CLIENT_ID || 'CLIENT_ID_GOES_HERE';
export const authUrl = process.env.VUE_APP_AUTH_URL || 'azure-devops-auth_URL_GOES_HERE';
export const scope = 'vso.code vso.dashboards_manage vso.work';

export default {
  url,
  clientId,
  authUrl,
  scope
}