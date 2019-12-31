export default {
  async init({ dispatch }) {
    await dispatch('loadSettingsFromMemory');
  },
  addLoader({ commit }) {
    commit('updateLoading', 1);
  },
  removeLoader({ commit }) {
    commit('updateLoading', -1);
  },
  saveSettings({ commit, dispatch }, settings) {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    commit('updateSettings', settings);
    dispatch('showMessage', 'Settings saved successfuly.');
  },
  loadSettingsFromMemory({ commit }) {
    const settingsStr = window.localStorage.getItem('settings');
    if (settingsStr) {
      commit('updateSettings', JSON.parse(settingsStr));
    }
  },
  authorizeApp({ commit }) {
    window.localStorage.setItem('appAuthorized', 'true');
    commit('authorizeApp');
  },
  showError({ commit }, content) {
    commit('updateMessage', {
      content,
      isError: true
    });
  },
  showMessage({ commit }, content) {
    commit('updateMessage', {
      content,
      isError: false
    });
  }
};
