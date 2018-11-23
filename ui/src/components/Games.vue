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
            <div class="header_controls__buttons">
                <b-form-select v-model="newGameEntity.genre" class="mb-3">
                    <option value="Action">Action</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Arcade">Arcade</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Platformer">Platformer</option>
                </b-form-select>
                <b-form-select v-model="newGameEntity.status" class="mb-3">
                    <option value="0">not yet</option>
                    <option value="1">completed</option>
                    <option value="2">in process</option>
                </b-form-select>
                 <b-form-input v-model="newGameEntity.name"
                  type="text"
                  placeholder="game title">
                </b-form-input>
              <b-button v-on:click="$emit('addGame')" :variant="'primary'"> add new </b-button>
            </div>
          </div>
        </div>
      </div>
      <b-button v-on:click="$emit('getData')"> get </b-button>
      <div class="games-blocks col-12">
        <div class="games-block col-3" v-for="gameStatus in gamesView" :key="gameStatus.title">
          <div class="games-block_title"> {{ gameStatus.title }} </div>
          <div class="games-block_genres" v-for="(genre, title) in gameStatus.genres" :key="genre.id">
            <div class="games-block_genre">
              <div class="games-block_genre__title">
                {{ title }}
              </div>
              <div class="games-block_genre__body" v-for="game in genre" :key="game.id">
                <div class="games-block_genre__body___game">
                  {{ game.name }}
                </div>
              </div>
            </div>  
          </div>
        </div> 
      </div> 
     </div>  
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';

export interface TIGamesResponseItem {
  id: number;
  name: string;
  genre: string;
  status: (0 | 1 | 2);
}

export interface TIGameAdd  {
  name: string | undefined;
  genre: string | undefined;
  status: ((0 | 1 | 2 | undefined));
}

export type TIGamesResponseReturn = TIGamesResponseItem[];

export interface TICortegeGames {
  0: {
    title: 'not yet',
    genres: {

    },
  };
  1: {
    title: 'completed',
    genres: {

    },
  };
  2: {
    title: 'in process',
    genres: {

    },
  };
}
@Component
export default class Games extends Vue {
@Prop() private gamesView;
@Prop() private newGameEntity;

public games: TIGamesResponseReturn = [];

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
    .games-block_genres{
      .games-block_genre{
        .games-block_genre__title {
          font-weight: 600
        }
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
