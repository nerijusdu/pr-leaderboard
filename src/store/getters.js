export default {
  isLoading: state => state.activeLoaders > 0,
  hasAzureSettings: state => !!state.settings
    && !!state.settings.organization
    && !!state.settings.project
    && !!state.settings.repository,
  hasMessage: state => !!state.message.content
};
