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
              <div class="header_controls__buttons___new-game">
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
                </b-form-select>
                  <b-form-input
                    v-model="newGameEntity.name"
                    type="text"
                    placeholder="game title"
                  >
                </b-form-input>
                <b-button v-on:click="gameAdd()" :variant="'primary'"> add new </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="games-blocks col-12">
        <div class="games-block col-5" v-for="gameStatus in gamesView" :key="gameStatus.title">
          <div class="games-block-container">
            <div class="games-block_title"> {{ gameStatus.title }} </div>
            <div class="games-block_genres" v-for="(genre, title) in gameStatus.genres" :key="genre.id">
              <div class="games-block_genre">
                <div class="games-block_genre__title">
                  {{ title }}
                </div>
                <div class="games-block_genre__body">
                  <div class="games-block_genre__body___game" v-for="game in genre" :key="game.id">
                    <div  v-on:click="gameEdit(game.id)"  class="title"> {{ game.name }} </div>
                    <div v-if="visibleGameOptionId === game.id" class="edit">
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

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from 'axios';

Vue.use(axios);

export default {
  name: 'games',
  data: function() {
    return {
      apiUrl: 'https://peridot-pastry.glitch.me/games/',
      visibleGameOptionId: undefined,
      gamesView: {
        0: {
          title: 'not yet',
          genres: {},
        },
        1: {
          title: 'completed',
          genres: {},
        },
      },
      newGameEntity: {
        name: undefined,
        genre: undefined,
        status: undefined
      }
    }
  },
  methods: {
    getData() {
      axios.get(this.apiUrl)
        .then((json) => {
          for (const gameStatus in this.gamesView) {
            this.gamesView[gameStatus].genres = {};
          }
          const response = json.data;
          const games_length = response.length;
          response.map((el) => {
            if (el.genre === undefined) {
              el.genre = 'without genre';
            }
            if (el.name === undefined) {
              el.name = 'without name';
            }
            if (el.status === undefined) {
              el.status = 0;
            }
          })

          // uniq genres
          for (let i = 0; i < games_length; i++) {
            const status = response[i].status;
            const genre = response[i].genre;
            Vue.set(this.gamesView[status].genres, genre, []);
          }
          // push games to genres
          for (let i = 0; i < games_length; i++) {
            this.gamesView[response[i].status].genres[response[i].genre].push({
              id: response[i]._id,
              name: response[i].name,
            });
          }
        });
    },
    gameEdit(id) {
      this.visibleGameOptionId = id;
    },
    gameDelete(id) {
      const validation = confirm('are u sure?');
      if (validation) {
        axios.delete(this.apiUrl + id)
        .then(() => {
          this.getData();
        });
      }
    },
    gameAdd() {
      const newGame = this.newGameEntity;
      let newGameRequest = [];
      let validation = true;

      for (const gameAttribute in newGame) {
        if (newGame[gameAttribute] === undefined) {
          validation = false;
        } else {
          newGameRequest.push({
            propName: gameAttribute,
            value: newGame[gameAttribute],
          });
        }
      }

      if (!validation) {
        alert('choose game attributes');
      } else {
        axios.post(this.apiUrl, newGameRequest)
        .then(() => {
          this.getData();
        });
      }
    },
  },
  created: function() {
    this.getData();
    document.onclick = e => {
      if(e.target.parentNode.classList[0] !== 'games-block_genre__body___game') {
        this.visibleGameOptionId = undefined;
      }
    }
  }

};
</script>

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
      padding: 20px;
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
              font-size: 14px;
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
                margin: 5px;
              }
              .edit {
                display: block;
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 0;
                border: 1px solid $darkBlue;
                background-color: white;
                z-index: 1;
                border-radius: 5px;
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