const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      gameEvent: [],
      isGameRunning: false,
      winner: "",
    };
  },
  computed: {
    logEventOnScreen() {
      return [
        { "log--player": this.gameEvent.isPlayer },
        { "log--monster": this.gameEvent.isPlayer },
      ];
    },
    healthBarMonster() {
      if (this.monsterHealth <= 0) {
        return {
          width: 0 + "%",
        };
      } else {
        return {
          width: this.monsterHealth + "%",
        };
      }
    },
    healthBarPlayer() {
      if (this.playerHealth <= 0) {
        return {
          width: 0 + "%",
        };
      } else {
        return {
          width: this.playerHealth + "%",
        };
      }
    },
  },
  methods: {
    giveUp() {
      this.isGameRunning = false;
      this.winner = "You Forfeit , Monster Won already! ";
    },
    Attack() {
      this.playerAttack(5, 10);
      if (this.checkGameOver()) return;
      this.monsterAttack();
      console.log(this.gameEvent);
      console.log(this.gameEvent.length);
    },
    specialAttack() {
      this.playerAttack(10, 20);
      if (this.checkGameOver()) return;
      this.monsterAttack();
      console.log(this.gameEvent);
      console.log(this.gameEvent.length);
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    playerAttack(min, max) {
      this.checkGameOver();
      let playerDamage = this.calculateDamage(min, max);
      this.monsterHealth -= playerDamage;
      this.gameEvent.unshift({
        text: `the Player hits the Monster for >> `,
        isPlayer: true,
        damage: playerDamage,
      });
    },
    monsterAttack() {
      let monsterDamage = this.calculateDamage(7, 15);
      this.playerHealth -= monsterDamage;
      this.checkGameOver();
      this.gameEvent.unshift({
        text: `the monster hits the player for >> `,
        isPlayer: false,
        damage: monsterDamage,
      });
    },
    healPlayer() {
      if (this.playerHealth >= 90) {
        this.monsterAttack();
        return;
      } else {
        this.playerHealth += 10;
        this.monsterAttack();
      }
      this.gameEvent.unshift({
        text: `player heals for 10 hp`,
        isHeal: true,
      });
    },
    checkGameOver() {
      if (this.playerHealth <= 0) {
        if (confirm("Monster Won ! , Start new Game?")) {
          console.log("monster Wins");
          this.startNewGame();
        } else {
          this.isGameRunning = false;
          this.winner = "Monster Won !, You will get him Next time";
        }
        return true;
      } else if (this.monsterHealth <= 0) {
        if (confirm("Player Won ! , Start new Game?")) {
          console.log("monster Wins");
          this.startNewGame();
        } else {
          this.isGameRunning = false;
          this.winner = "You Destroyed the Monster,Well Done!";
        }
        return true;
      }
      return false;
    },
    startNewGame() {
      this.isGameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.gameEvent = [];
    },
  },
});
app.mount("#game");
