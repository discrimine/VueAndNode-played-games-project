<template>
  <div class="games-blocks">
    <div class="games-block">
      <div class="games-block_title"> in process </div>
      <div class="games-block_games">
        <div class="games-block_game" v-for="game in games" :key="game.id">
          {{ game.name }}
        </div>
      </div> 
    </div>
    <div class="games-block">
      <div class="games-block_title"> completed </div>
    </div>
    <div class="games-block">
     <div class="games-block_title"> not yet </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Games extends Vue {
  @Prop() private msg!: string;
  private games = [
    {
      id: 1,
      name: 'name',
    },
    {
      id: 2,
      name: 'name2',
    },
    {
      id: 3,
      name: 'name2',
    },
  ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.games-blocks {
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  max-width: 1440px;
  .games-block {
    border: 1px solid #696968;
    width: 32%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .games-block_title {
      margin-top: 15px;
      font-weight: 400;
      font-size: 28px;
      width: 100%;
    }
    .games-block_games {
      margin-top: 30px;
      display: flex;
      flex-direction: row;
      .games-block_game {
      width: 50px;
      height: 50px;
      margin: 0 25px;
      border: 1px solid #19530d;
      }
    }
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
