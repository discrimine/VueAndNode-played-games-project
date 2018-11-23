<template>
<Games
  v-on:getData="getData()"
  v-on:addGame="addGame()"
  :gamesView="gamesView"
  :newGameEntity="newGameEntity"
  >
  </Games>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Games from '@/components/Games.vue'; // @ is an alias to /src
import axios from 'axios';

@Component({
  components: {
    Games,
  },
  data() {
    return {
      
    }
  },
  methods: {
   
  },
  
})
export default class Home extends Vue {

  public gamesView: any = {
    0: {
      title: 'not yet',
      genres: {},
    },
    1: {
      title: 'completed',
      genres: {},
    },
    2: {
      title: 'in process',
      genres: {},
    },
  }

  public getData() {
  axios.get('http://localhost:3000/games/')
    .then((json) => {
      const response = json.data;
      const games_length = response.length;
      for (let i = 0; i < games_length; i++) {
        const status: number = response[i].status;
        const genre: string = response[i].genre;
        Vue.set(this.gamesView[status].genres, genre, []);
      }

      for (const game of json.data) {
        this.gamesView[game.status].genres[game.genre].push({
          name: game.name,
        });
      }
    });
  }

  public newGameEntity: any = {
    name: undefined,
    genre: undefined,
    status: undefined,
  };

  public addGame() {
    const newGame = this.newGameEntity;
    let newGameResponse: any = [];
    let validation = true;

    for (const gameAttribute in newGame) {
      if (newGame[gameAttribute] === undefined) {
        validation = false;
      } else {
        newGameResponse.push({
          propName: gameAttribute,
          value: newGame[gameAttribute],
        });
      }
    }

    newGameResponse = JSON.stringify(newGameResponse);

    if (!validation) {
      alert('choose game attributes');
    } else {
      fetch('http://localhost:3000/games/', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: newGameResponse,
      })
      .then((response) => {
        this.getData();
        
        return response.json();
      });
    }
  }

  created() {
    this.getData();
  }
}
</script>