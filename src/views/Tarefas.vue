<template>
  <FormularioComponent @onCreateTask="createTask" />
  <div class="lista">
    <TaskComponent v-for="(task, index) in tasks" :key="index" :task="task" />
    <BoxComponent v-if="emptyList">
      You`ve being procastinating today!
    </BoxComponent>
  </div>
</template>
  
<script lang="ts">

import { defineComponent } from 'vue';
import BoxComponent from '../components/BoxComponent.vue';
import FormularioComponent from '../components/FormularioComponent.vue';
import TaskComponent from '../components/TaskComponent.vue';
import ITask from '../Interfaces/ITask';

export default defineComponent({
  name: 'App',
  components: {
    FormularioComponent,
    TaskComponent,
    BoxComponent
  },
  data() {
    return {
      tasks: [] as ITask[]
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
    }
  }
});
</script>