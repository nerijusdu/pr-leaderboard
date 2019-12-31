export default {
  isLoading: state => state.activeLoaders > 0,
  hasAzureSettings: state => !!state.settings
    && !!state.settings.organization
    && !!state.settings.project,
  hasMessage: state => !!state.message.content
};
