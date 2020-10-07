const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameEvent: [],
      isGameRunning: false,
    };
  },
  methods: {
    Attack(min, max) {
      let monsterDamage = this.calculateDamage(min, max);
      this.playerHealth -= monsterDamage;
      if (this.checkGameOver()) return;
      let playerDamage = this.calculateDamage(min, max);
      this.monsterHealth -= playerDamage;
    },
    specialAttack(min, max) {
      this.playerHealth -= this.calculateDamage(min, max);
      if (this.checkGameOver()) return;
      this.monsterHealth -= this.calculateDamage(min, max);
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    monsterAttack() {
      return Math.max(Math.floor(Math.random() * 15) + 1, 12);
    },
    checkGameOver() {
      if (this.playerHealth <= 0) {
        console.log("monster Wins");
        this.playerHealth = 100;
        this.monsterHealth = 100;
        return true;
      } else if (this.monsterHealth <= 0) {
        console.log("player wins ");
        this.playerHealth = 100;
        this.monsterHealth = 100;
        return true;
      }
    },
  },
});
app.mount("#game");
