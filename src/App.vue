<template>
  <div id="app">
    <navigation />
    <router-view />
    <loader />
    <message />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loader from './components/Loader.vue';
import Navigation from './components/Navigation.vue';
import Message from './components/Message.vue';
import PrService from './services/prService';


export default {
  name: 'app',
  components: {
    Message,
    Loader,
    Navigation
  },
  methods: mapActions(['init']),
  async mounted() {
    await this.init();
    const service = new PrService(this.$store);
    await service.initData();
    const leaderboard = await service.getLeaderboard({
      startDate: new Date('2019-12-01'),
      endDate: new Date('2020-01-31')
    });
    // eslint-disable-next-line no-console
    console.log(leaderboard);
  }
}
</script>

<style>
body, html {
  margin: 0px;
  padding: 0px;
  background-color: #f9fbfc;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
