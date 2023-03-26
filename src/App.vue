<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': darkModeOn }">
    <div class="column is-one-quarter">
      <BarraLateralComponent @onAlterTheme="alterTheme"/>
    </div>
    <div class="column is-three-quarters conteudo">
     <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import BarraLateralComponent from './components/BarraLateralComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateralComponent
  },
  data() {
    return {
      darkModeOn: false
    }
  },
  methods: {
    alterTheme(darkModeOn: boolean){
      this.darkModeOn = darkModeOn
    }
  }
});
</script>

<style>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}

.lista {
  padding: 1.25rem;
}

main  {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro{
  --bg-primario: #2d2d42;
  --texto-primario: #ddd;
}
.conteudo{
  background-color: var(--bg-primario);
}
</style>
