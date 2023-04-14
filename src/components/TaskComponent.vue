
import CronometroComponent from './CronometroComponent.vue';

<template>
    <BoxComponent>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-4">
               {{ tarefa.description || 'Tarefa without description'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column">
                <CronometroComponent :timeInSeconds="tarefa.time" />
            </div>
            <div class="column">
                {{ tarefa.data }}
            </div>
        </div>
    </BoxComponent>
</template>

<script lang="ts">
import ITarefa from '../Interfaces/ITarefa';
import { defineComponent, PropType } from 'vue';
import CronometroComponent from './CronometroComponent.vue';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
    name: 'TaskComponent',
    emits: ['aoTarefaClicada'],
    components: {
        CronometroComponent,
        BoxComponent
    },
    props:{
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true
        }
    },
    methods: {
        tarefaClicada():void{
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    }
})
</script>

<style scoped>
.clicavel{
    cursor: pointer;
}
</style>
