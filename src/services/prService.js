import api from './api';
import authService from './authService';
import store from '../store';

export class PrService {
  constructor(storeObj) {
    this.store = storeObj;
  }

  async getPRs() {
    if (!this.store.getters.hasAzureSettings || !this.store.state.isAccessGranted) {
      return [];
    }

    const organization = this.store.state.settings.organization;
    const project = this.store.state.settings.project;
    const repositoryId = this.store.state.settings.repository;

    const result = await api.get({
      url: `https://dev.azure.com/${organization}/${project}/_apis/git/repositories/${repositoryId}/pullrequests`,
      params: {
        'api-version': '5.1',
        'searchCriteria.status': 'completed',
        '$top': 100
      },
      headers: authService.authHeader
    });

    if (!result) {
      return [];
    }

    return result.data.value || [];
  }

  async getLeaderboard() {
    const users = {};
    const startDate = new Date(this.store.state.settings.startDate);
    const endDate = new Date(this.store.state.settings.endDate);

    const prs = await this.getPRs();
    prs.forEach((pr) => {
      const prDate = new Date(pr.closedDate);
      if (prDate > endDate || prDate < startDate) {
        return;
      }
      // vote types
      // 0 - no vote
      // 5 - approved with suggestions
      // 10 - approved
      const approver = pr.reviewers.find(x => x.vote >= 5);
      if (!approver || approver.isContainer) {
        return;
      }

      if (!users[approver.id]) {
        users[approver.id] = {
          id: approver.id,
          displayName: approver.displayName,
          uniqueName: approver.uniqueName,
          imageUrl: approver.imageUrl,
          score: 0,
        }
      }

      users[approver.id].score += 1;
    });

    return users;
  }
}

const instance = new PrService(store);

export default instance;