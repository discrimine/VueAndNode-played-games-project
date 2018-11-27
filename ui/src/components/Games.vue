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
                <b-form-select v-model="newGameEntity.genre">
                    <option value="Action">Action</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Arcade">Arcade</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Platformer">Platformer</option>
                </b-form-select>
                <b-form-select v-model="newGameEntity.status">
                    <option value="0">not yet</option>
                    <option value="1">completed</option>
                    <option value="2">in process</option>
                </b-form-select>
                  <b-form-input
                    v-model="newGameEntity.name"
                    type="text"
                    placeholder="game title"
                  >
                </b-form-input>
              <b-button v-on:click="$emit('addGame')" :variant="'primary'"> add new </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="games-blocks col-12">
        <div class="games-block col-3" v-for="gameStatus in gamesView" :key="gameStatus.title">
          <div class="games-block-container">
            <div class="games-block_title"> {{ gameStatus.title }} </div>
            <div class="games-block_genres" v-for="(genre, title) in gameStatus.genres" :key="genre.id">
              <div class="games-block_genre">
                <div class="games-block_genre__title">
                  {{ title }}
                </div>
                <div class="games-block_genre__body">
                  <div class="games-block_genre__body___game" v-for="game in genre" :key="game.id">
                    <div v-on:click="gameEdit(game.id, $event)" class="title"> {{ game.name }} </div>
                    <div v-if="configVisibility.id === game.id" class="edit" :game-id="game.id">
                      <b-button v-on:click="gameDelete(game.id)" :variant="'danger'"></b-button>
                    </div>
                  </div>
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
@Prop() private currentGame;

public games: TIGamesResponseReturn = [];

public configVisibility = {}

public gameEdit(id: number, ev: any): void {
  this.configVisibility = {}
  this.configVisibility = {
    id: id
  };
}

public gameDelete(id: number): void {
  this.currentGame.id = id;
  this.$emit('deleteGame');
}

created() {
  document.onclick = (e) => {
    if(e.target.parentNode.classList[0] !== 'games-block_genre__body___game') {
      this.configVisibility = {}
    }
  }
}

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//fonts
@import url('https://fonts.googleapis.com/css?family=Rubik');

//colors
$darkBlue: #004466;
$blue: #99CCCC;

* {
  font-family: 'rubik'
}
//games-component
.header {
  display: flex;
  margin: 25px 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .header_title {
    color: $darkBlue;
    font-size: 42px;
  }
  .header_controls {
    height: 100px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid $blue;
    display: flex;
    justify-content: space-between;
    .header_controls-container {
      height: 55px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 25px;
      .header_controls__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        select {
          width: 100px;
          font-size: 12px;
          margin-right: 15px;
          border-color: $darkBlue;
        }
        input {
          width: 180px;
          margin-right: 15px;
          font-size: 12px;
          border-color: $darkBlue;
        }
        button {
          width: 70px;
          font-size: 12px;
          background-color: $darkBlue;
          color: white;
          border-color: $darkBlue;
        }
      }
    }
  }
}
.games-blocks {
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  .games-block {
    border: 2px solid $blue;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    max-height: 800px;
    overflow: auto;
    .games-block-container{
      margin: 15px 0;
      .games-block_title {
        font-weight: 400;
        font-size: 28px;
        width: 100%;
      }
      .games-block_genres:not(:first-child) {
        margin-top: 25px;
      }
      .games-block_genres {
        .games-block_genre{
          .games-block_genre__title {
            font-weight: 600;
            text-align: left;
            color: $blue;
          }
          .games-block_genre__body {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 15px;
            flex-flow: row wrap;
            .games-block_genre__body___game:nth-child(3n+2) {
              margin: 0 12.5%;
            }
            .games-block_genre__body___game:nth-child(n+4) {
              margin-top: 15px;
            }
            .games-block_genre__body___game {
              padding-top: 25%;
              width: 25%;
              position: relative;
              border: 1px solid $blue;
              font-size: 8px;
              word-wrap: break-word;
              .title {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .edit {
                display: block;
                position: absolute;
                width: 100%;
                bottom: -50px;
                left: 0;
                height: 50px;
                border: 1px solid $darkBlue;
              }
            }
          }
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
