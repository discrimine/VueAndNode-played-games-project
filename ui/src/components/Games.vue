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

export type TIGamesResponseItem = {
  id: number,
  name: string,
  genre: string,
  status: (0 | 1 | 2)
};
export type TIGamesResponseReturn = TIGamesResponseItem[];

export type TICortegeGames = {
  0: {
    title: 'not yet',
    genres: {

    }
  }
  1: {
    title: 'completed',
    genres: {

    }
  }
  2: {
    title: 'in process',
    genres: {

    }
  }
}

const games: TIGamesResponseReturn = [
    {
      id: 1,
      name: 'Kingdom Come: Deliverance',
      genre: 'RPG',
      status: 2
    },
    {
      id: 2,
      name: 'Metro',
      genre: 'shooter',
      status: 0
    },
    {
      id: 3,
      name: 'Dying Light',
      genre: 'shooter',
      status: 0
    },
    {
      id: 4,
      name: 'Deus Ex',
      genre: 'shooter',
      status: 0
    },
    {
      id: 5,
      name: 'fallout 3',
      genre: 'RPG',
      status: 0
    },
    {
      id: 6,
      name: 'titan quest',
      genre: 'RPG',
      status: 0
    },
    {
      id: 7,
      name: 'darksouls3',
      genre: 'RPG',
      status: 1
    },
    {
      id: 8,
      name: 'wither1',
      genre: 'RPG',
      status: 1
    },
    {
      id: 9,
      name: 'Skyrim',
      genre: 'RPG',
      status: 1
    },
    {
      id: 10,
      name: 'GTA 5',
      genre: 'shooter',
      status: 1
    },
    {
      id: 11,
      name: 'GTA 4',
      genre: 'shooter',
      status: 1
    },
    {
      id: 12,
      name: 'Far Cry 5',
      genre: 'shooter',
      status: 1
    },
    {
      id: 13,
      name: 'Time shift',
      genre: 'shooter',
      status: 1
    },
  ];
//TODO complete data method
  function returnUniqueFromObj(arr: TIGamesResponseReturn) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      let status: string = arr[i].status;
      let genre: string = arr[i].genre;
      obj[String(genre) + String(status)] = true;
    }

    return obj;
  }
  const uniqStatuses = returnUniqueFromObj(games)
  const gamesLength = games.length;
  console.log('1', uniqStatuses);
  let cortegeGames: TICortegeGames = {
    0: {
      title: 'not yet',
      genres: [

      ]
    },
    1: {
      title: 'completed',
      genres: [

      ]
    },
    2: {
      title: 'in process',
      genres: [

      ]
    }
  }

  for (let i: number = 0; i < uniqStatusesLength; i++) {
  }

console.log(cortegeGames);


export default class Games extends Vue {

  

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
