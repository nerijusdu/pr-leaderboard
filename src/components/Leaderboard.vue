<template>
  <div class="leaderboard-container">
    <div
      class="leaderboard-row"
      v-for="user in users"
      :key="user.id"
    >
      {{ user.displayName }} ({{ user.score }})
    </div>
  </div>
</template>

<script>
import PrService from '../services/prService';

export default {
  data: () => ({
    users: []
  }),
  async mounted() {
    const service = new PrService(this.$store);
    await service.initData();
    const leaderboard = await service.getLeaderboard({
      startDate: new Date('2019-12-01'),
      endDate: new Date('2020-01-31')
    });

    this.users = Object.values(leaderboard).sort((a, b) => b.score - a.score);
  }
}
</script>

<style scoped>
.leaderboard-row {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leaderboard-row:nth-of-type(1) {
  background-color: #f4f43f;
}

.leaderboard-row:nth-of-type(2) {
  background-color: #eee;
}

.leaderboard-row:nth-of-type(3) {
  background-color: #c77c30;
}

.leaderboard-row:hover {
  background-color: #cae6ff;
}
</style>