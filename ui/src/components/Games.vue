<template>
<div class="container">
  <div class="row">
      <div class="header">
        <div class="header_title">
          Played Games
        </div>
        <div class="header_controls">
          <div class="header_controls-container">
            <div class="header_controls__design"></div>
            <div class="header_controls__buttons"></div>
          </div>
        </div>
      </div>
      <div class="games-blocks col-12">
        <div class="games-block col-3">
          <div class="games-block_title"> in process </div>
          <div class="games-block_games">
            <div class="games-block_game" v-for="game in games" :key="game.id">
              {{ game.name }}
            </div>
          </div> 
        </div>
        <div class="games-block col-3">
          <div class="games-block_title"> completed </div>
        </div>
        <div class="games-block col-3">
        <div class="games-block_title"> not yet </div>
        </div>
      </div>
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
  .games-block {
    border: 1px solid #696968;
    display: flex;
    flex-direction: column;
    min-height: 600px;
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
        margin: 0px 15px;
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
