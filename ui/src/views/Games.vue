<template>
  <b-container class="games">
    <b-row>
      <div class="header">
        <b-col class="header_title" cols="8" md="6" lg="4">
          Played Games
        </b-col>
        <b-col class="header_title" cols="2">
          <img src="../assets/settings.png" alt="show controls" width="50px" height="50px" v-on:click="controlsIsVisible = true">
        </b-col>
        <transition name="fade">
          <div class="header_controls" v-if="controlsIsVisible">
            <b-container>
              <b-row class="header_controls-container">
                <b-col class="header_controls__buttons___new-game" cols="5" lg="3">
                  <div class="new-game_block">
                    <b-form-select v-model="currentGameEntity.genre">
                        <option :value="undefined" disabled>genre</option>
                        <option v-for="genre in gameGenres" v-bind:key="genre" :value="genre">{{ genre }}</option>
                    </b-form-select>
                  </div>
                  <div class="new-game_block">
                    <div>
                      <b-form-select v-model="currentGameEntity.status">
                          <option :value="undefined" disabled> status </option>
                          <option value="0"> not yet </option>
                          <option value="1"> completed </option>
                      </b-form-select>
                    </div>
                    <div>
                      <b-form-input v-model="currentGameEntity.year" type="text" placeholder="year"></b-form-input>
                    </div> 
                  </div>
                  <div class="new-game_block">
                    <b-form-input
                      v-model="currentGameEntity.name"
                      type="text"
                      placeholder="game title"
                    >
                  </b-form-input>
                  </div>
                  <div class="new-game_block">
                    <b-button v-on:click="gameAdd()" variant="primary"> add new </b-button>
                    <b-button v-on:click="gameSave()" variant="success"> save </b-button>
                  </div>
                </b-col>
                <b-col class="header_controls__buttons___filter" cols="5" lg="3">
                   <div class="filter_block">
                    <b-form-input v-on:change="viewFilter()" v-model="viewConfigEntity.filter.name" type="text" placeholder="name"></b-form-input>
                  </div>
                  <div class="filter_block">
                    <b-form-select v-on:change="viewFilter()" v-model="viewConfigEntity.filter.genre">
                        <option :value="undefined" disabled> genre </option>
                        <option v-for="genre in gameGenres" v-bind:key="genre" :value="genre">{{ genre }}</option>
                    </b-form-select>
                  </div>
                  <div class="filter_block">
                    <b-form-input v-on:change="viewFilter()" v-model="viewConfigEntity.filter.year" type="text" placeholder="year"></b-form-input>
                  </div>
                  <div class="filter_block">
                    <b-button v-on:click="clearFilter()" variant="danger"> clear filter </b-button>
                  </div>
                </b-col>
                <b-col cols="col-2">
                  <img class="cr-point" src="../assets/exit.png" alt="hide controls" width="50px" height="50px" v-on:click="controlsIsVisible = false">
                </b-col>
              </b-row>
            </b-container>
          </div>
        </transition>  
      </div>
      <b-container class="games">
        <b-row class="games-blocks">
          <b-col
            class="games-block"
            cols=10
            sm=10
            md=5
            lg=5
            xl=5
            v-for="(gameStatus) in gamesView"
            :key="gameStatus.title"
          >
            <div class="games-block-container">
              <div class="games-block_title"> {{ gameStatus.title }} </div>
              <div class="games-block_title"> {{ gameStatus.count }} </div>
              <div class="games-block_genres" v-for="(genre, title) in gameStatus.genres" :key="genre.id">
                <div class="games-block_genre">
                  <div class="games-block_genre__title">
                    {{ title  }}
                  </div>
                  <div class="games-block_genre__body">
                    <div class="games-block_genre__body___game" v-for="game in genre" :key="game.id">
                      <div v-on:click="gameEdit(game)"  class="title"> {{ game.name }} </div>
                      <div v-if="visibleGameOptionId === game.id" class="edit">
                        <b-button v-on:click="gameDelete(game.id)" :variant="'danger'"></b-button>
                      </div>
                    </div>
                  </div>
                </div>  
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
      <div id="service">
        <transition name="fade">    
          <div
            class="action-msg"
            :class="notificationServiceEntity.class"
            v-if="notificationServiceEntity.checking"
          >
          {{ notificationServiceEntity.message }}
          </div>
        </transition>
      </div>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import axios from "axios";

Vue.use(axios);

export default {
  name: "games",
  data: function() {
    return {
      apiUrl: "https://peridot-pastry.glitch.me/games/",
      visibleGameOptionId: undefined,
      gamesView: {
        0: {
          title: "not yet",
          genres: {},
          count: 0
        },
        1: {
          title: "completed",
          genres: {},
          count: 0
        }
      },
      currentGameEntity: {
        name: undefined,
        genre: undefined,
        status: undefined,
        year: undefined
      },
      controlsIsVisible: false,
      notificationServiceEntity: {
        checking: false,
        class: "",
        message: ""
      },
      viewConfigEntity: {
        sort: {},
        filter: {
          name: undefined,
          genre: undefined,
          year: undefined
        }
      },
      gameGenres: [
        "Action",
        "Shooter",
        "Arcade",
        "RPG",
        "Strategy",
        "Platformer",
        "Survival",
        "Racing"
      ]
    };
  },
  methods: {
    notificationService(type, msg) {
      this.notificationServiceEntity.class = type;
      this.notificationServiceEntity.message = msg;
      this.notificationServiceEntity.checking = true;
      setTimeout(() => {
        this.notificationServiceEntity = {
          checking: false,
          class: "",
          message: ""
        };
      }, 3000);
    },
    getData() {
      axios.get(this.apiUrl).then(json => {
        let response = json.data;
        // FILTER
        for (const filter in this.viewConfigEntity.filter) {
          if (
            this.viewConfigEntity.filter[filter] !== undefined &&
            this.viewConfigEntity.filter[filter].length > 0
          ) {
            response = response.filter(game => {
              return (
                String(game[filter]).indexOf(
                  this.viewConfigEntity.filter[filter]
                ) !== -1
              );
            });
          }
        }
        // undefined fields
        for (const gameStatus in this.gamesView) {
          this.gamesView[gameStatus].genres = {};
        }
        const games_length = response.length;
        response.map(el => {
          if (el.genre === undefined) {
            el.genre = "without genre";
          }
          if (el.name === undefined) {
            el.name = "without name";
          }
          if (el.status === undefined) {
            el.status = 0;
          }
        });
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
            genre: response[i].genre,
            year: response[i].year,
            status: response[i].status
          });
        }
        // games count
        for (const status in this.gamesView) {
          let count = 0;
          for (const genre in this.gamesView[status].genres) {
            count += Object.keys(this.gamesView[status].genres[genre]).length;
          }
          this.gamesView[status].count = count;
        }
      });
    },
    gameEdit(game) {
      this.visibleGameOptionId = game.id;
      this.currentGameEntity = game;
    },
    gameDelete(id) {
      const validation = confirm("are u sure?");
      if (validation) {
        axios.delete(this.apiUrl + id).then(() => {
          this.getData();
          this.notificationService("msg-danger", "game deleted");
        });
      }
    },
    gameAdd() {
      const newGame = this.currentGameEntity;
      let newGameRequest = [];
      let validation = true;

      for (const gameAttribute in newGame) {
        if (newGame[gameAttribute] === undefined) {
          validation = false;
        } else {
          newGameRequest.push({
            propName: gameAttribute,
            value: newGame[gameAttribute]
          });
        }
      }
      if (!validation) {
        alert("choose game attributes");
      } else {
        axios.post(this.apiUrl, newGameRequest).then(() => {
          this.getData();
          this.notificationService("msg-success", "game added");
        });
      }
    },
    gameSave() {
      for (const gameAttribute in this.currentGameEntity) {
        if (this.currentGameEntity[gameAttribute] === undefined) {
          this.notificationService("msg-danger", "some fields are empty");
          return;
        }
      }

      let newGameRequest = [];
      const newGame = this.currentGameEntity;

      for (const gameAttribute in newGame) {
        if (newGame[gameAttribute] === undefined) {
          this.notificationService("msg-danger", "some fields are empty");
        } else {
          newGameRequest.push({
            propName: gameAttribute,
            value: newGame[gameAttribute]
          });
        }
      }

      axios
        .patch(
          "https://peridot-pastry.glitch.me/games/" + this.currentGameEntity.id,
          newGameRequest
        )
        .then(() => {
          this.getData();
          this.notificationService("msg-success", "game changed");
        });
    },
    viewFilter() {
      this.getData();
    },
    clearFilter() {
      for (const configs in this.viewConfigEntity) {
        for (const config in this.viewConfigEntity[configs]) {
          this.viewConfigEntity[configs][config] = undefined;
        }
      }
      this.getData();
    },
    cleanCurrentGame() {
      this.currentGameEntity = {
        name: undefined,
        genre: undefined,
        status: undefined,
        year: undefined
      };
    }
  },
  created: function() {
    this.getData();
    document.onclick = e => {
      // TODO: bad temporary solution, need to refactor
      if (
        e.target.parentNode.classList[0] !== "games-block_genre__body___game" &&
        e.target.parentNode.classList[0] !== "new-game_block" &&
        e.target.parentNode.parentNode.classList[0] !== "new-game_block" &&
        e.target.parentNode.classList[0] !== "header_title"
      ) {
        this.visibleGameOptionId = undefined;
        this.cleanCurrentGame();
      }
    };
  }
};
</script>

<style scoped lang="scss">
//fonts
@import url("https://fonts.googleapis.com/css?family=Rubik");

//colors
$darkBlue: #004466;
$medBlue: #016699;
$lightBlue: #99cccc;
$red: #ff2105;
$success: #26991e;

* {
  font-family: "rubik";
}

.cr-point:hover {
  cursor: pointer;
}
//games-component
.header {
  display: flex;
  margin: 25px 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  .header_title {
    &:hover {
      cursor: pointer;
    }
    color: $darkBlue;
    font-size: 42px;
  }
  .header_controls {
    z-index: 1;
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    border-color: $lightBlue;
    border-radius: 5px;
    display: flex;
    align-items: center;
    border: 1px solid $lightBlue;
    display: flex;
    justify-content: space-between;
    .header_controls-container {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      margin: 25px;
      .header_controls__buttons___new-game {
        height: 100%;
        .new-game_block {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          div:first-child {
            margin-right: 10px;
            width: 100%;
          }
        }
      }
      .header_controls__buttons___filter {
        height: 100%;
        .filter_block {
          margin-top: 10px;
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
  @media (max-width: 767px) {
    justify-content: center;
  }
  .games-block {
    border: 2px solid $lightBlue;
    border-radius: 5px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    max-height: 800px;
    overflow: auto;
    margin-bottom: 50px;
    .games-block-container {
      padding: 20px;
      .games-block_title {
        font-weight: 400;
        font-size: 28px;
        width: 100%;
      }
      .games-block_genres:not(:first-child) {
        margin-top: 25px;
      }
      .games-block_genres:last-child {
        margin-bottom: 25px;
      }
      .games-block_genres {
        .games-block_genre {
          &:hover {
            cursor: pointer;
          }
          .games-block_genre__title {
            font-weight: 600;
            text-align: left;
            color: $lightBlue;
          }
          .games-block_genre__body {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            margin-top: 15px;
            flex-flow: row wrap;
            .games-block_genre__body___game:nth-child(3n + 2) {
              margin: 0 12.5%;
            }
            .games-block_genre__body___game:nth-child(n + 4) {
              margin-top: 15px;
            }
            .games-block_genre__body___game {
              padding-top: 25%;
              width: 25%;
              position: relative;
              border: 1px solid $lightBlue;
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
.action-msg {
  position: fixed;
  z-index: 2;
  background-color: white;
  bottom: 10%;
  width: 200px;
  left: 50%;
  margin-left: -100px;
  font-size: 16px;
  height: 50px;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.msg-danger {
  border: 1px solid $red;
  color: $red;
}
.msg-success {
  border: 1px solid $success;
  color: $success;
}
.msg-info {
  border: 1px solid $medBlue;
  color: $medBlue;
}
</style>
