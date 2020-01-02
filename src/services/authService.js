import qs from 'querystring';
import api from './api';
import config from '../config';
import dateHelper from '../helpers/dateHelper';
import store from '../store';

export class AuthService {
  static callbackUrl = `${config.url}/callback.html`;

  static get authUrl() {
    const params = {
      client_id: config.clientId,
      response_type: 'Assertion',
      state: 'none',
      scope: config.scope,
      redirect_uri: AuthService.callbackUrl,
    };
    return `https://app.vssps.visualstudio.com/oauth2/authorize?${qs.stringify(params)}`;
  }

  static clearUserSession() {
    window.localStorage.removeItem('appAuthorized');
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('expiresIn');
    document.location.href = '/';
  }

  constructor(storeObj) {
    this.code = '';
    this.accessToken = '';
    this.refreshToken = '';
    this.expiresIn = dateHelper.now();
    this.onAuthorized = () => storeObj.dispatch('authorizeApp');
    this.startLoad = () => storeObj.dispatch('addLoader');
    this.endLoad = () => storeObj.dispatch('removeLoader');
  }

  async initData() {
    const callbackData = window.localStorage.getItem('callbackData');
    if (callbackData) {
      window.localStorage.removeItem('callbackData');
      await this.handleCallback(callbackData);
      return;
    }

    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      this.accessToken = accessToken;
      this.refreshToken = window.localStorage.getItem('refreshToken');
      this.expiresIn = new Date(window.localStorage.getItem('expiresIn'));

      await this.checkTokenExpiration();
    }
  }

  async checkTokenExpiration() {
    if (dateHelper.isBefore(this.expiresIn, dateHelper.now())) {
      await this.refreshAccessToken();
    }
  }

  get authHeader() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  async refreshAccessToken() {
    this.startLoad();
    const result = await api.post({
      url: `${config.authUrl}/RefreshAccessToken`,
      data: {
        refreshToken: this.refreshToken,
        callbackUrl: AuthService.callbackUrl
      }
    });
    this.endLoad();

    if (!result || !result.data.success) {
      return;
    }

    this.saveTokenResponse(result.data);
  }

  async handleCallback(data) {
    const urlParams = new URLSearchParams(data);
    if (urlParams.has('code')) {
      this.code = urlParams.get('code');
      this.onAuthorized();
    }

    await this.getAccessToken();
  }

  async getAccessToken() {
    this.startLoad();
    const result = await api.post({
      url: `${config.authUrl}/GetAccessToken`,
      data: {
        code: this.code,
        callbackUrl: AuthService.callbackUrl
      }
    });
    this.endLoad();

    if (!result || !result.data.success) {
      return;
    }

    this.code = '';
    this.saveTokenResponse(result.data);
  }

  saveTokenResponse(result) {
    this.accessToken = result.data.access_token;
    this.refreshToken = result.data.refresh_token;
    this.expiresIn = dateHelper.addSeconds(
      dateHelper.now(),
      parseInt(result.data.expires_in, 10)
    );

    window.localStorage.setItem('accessToken', this.accessToken);
    window.localStorage.setItem('refreshToken', this.refreshToken);
    window.localStorage.setItem('expiresIn', this.expiresIn.toISOString());
  }
}

const instance = new AuthService(store);

export default instance;