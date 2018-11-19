<template>
<games></games>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Games from '@/components/Games.vue'; // @ is an alias to /src

@Component({
  components: {
    Games,
  },
})
export default class Home extends Vue {}
</script>
