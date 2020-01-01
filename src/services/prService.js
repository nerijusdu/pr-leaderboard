/* eslint-disable no-console */
import api from './api';
import AuthService from './authService';

export default class PrService extends AuthService {
  constructor(storeObj) {
    super(storeObj);

    this.store = storeObj;
  }

  async getPRs() {
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
      headers: this.authHeader
    });

    if (!result) {
      return [];
    }

    return result.data.value;
  }

  async getLeaderboard({ startDate, endDate }) {
    const users = {};

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
      if (!approver) {
        return;
      }

      if (!users[approver.id]) {
        users[approver.id] = {
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