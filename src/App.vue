<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': darkModeOn }">
    <div class="column is-one-quarter">
      <BarraLateralComponent @onAlterTheme="alterTheme"/>
    </div>
    <div class="column is-three-quarters conteudo">
      <FormularioComponent @onCreateTask="createTask" />
      <div class="lista">
        <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" />
        <BoxComponent v-if="emptyList">
          You`ve being procastinating today!
        </BoxComponent>
      </div>
    </div>
  </main>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import BarraLateralComponent from './components/BarraLateralComponent.vue';
import BoxComponent from './components/BoxComponent.vue';
import FormularioComponent from './components/FormularioComponent.vue';
import TaskComponent from './components/TaskComponent.vue';
import ITask from './Interfaces/ITask';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateralComponent,
    FormularioComponent,
    TaskComponent,
    BoxComponent
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkModeOn: false
    }
  },
  computed: {
    emptyList(): boolean {
      return this.tasks.length == 0
    }
  },
  methods: {
    createTask(task: ITask) {
      this.tasks.push(task)
    },
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
