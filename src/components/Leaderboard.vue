<template>
  <div class="leaderboard-container">
    <div class="leaderboard-row title">
      <div class="place">Place</div>
      <div>Name</div>
      <div>PRs approved</div>
    </div>
    <div
      class="leaderboard-row"
      v-for="(user, index) in users"
      :key="user.id"
    >
      <div class="place">{{ index + 1 }}</div>
      <div>{{ user.displayName }}</div>
      <div>{{ user.score }}</div>
    </div>
  </div>
</template>

<script>
import prService from '../services/prService';

export default {
  data: () => ({
    users: []
  }),
  async mounted() {
    const leaderboard = await prService.getLeaderboard();

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

.leaderboard-row > div {
  display: flex;
  justify-content: center;
  width: 100%;
}

.leaderboard-row > .place {
  flex-grow: 0;
  width: 100px !important;
}

.leaderboard-row:nth-of-type(2) {
  background-color: #f4f43f;
}

.leaderboard-row:nth-of-type(3) {
  background-color: #eee;
}

.leaderboard-row:nth-of-type(4) {
  background-color: #c77c30;
}

.leaderboard-row:hover:not(.title) {
  background-color: #cae6ff;
}
</style>