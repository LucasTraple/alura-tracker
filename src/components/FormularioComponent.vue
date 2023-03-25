<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?"
                v-model="description">
            </div>
          <div class="column">
           <TemporizadorComponent @onTimerFinished="FinisheTask"/>
          </div>     
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import TemporizadorComponent from './TemporizadorComponent.vue';
    
    export default defineComponent({
        name: 'FormularioComponent',
        emits: ['onCreateTask'],  
        components: {
            TemporizadorComponent
        },
        data(){
            return{
                description: ''
            }
        },
        methods: {
            FinisheTask(totalTime: number) : void {
                this.$emit('onCreateTask', {
                    //time: new Date(totalTime * 1000).toISOString().substring(11, 19),
                    time: totalTime,
                    description: this.description,
                    //data: Date.now()
                })
                this.description = ''
            }
        }
    }); 
</script>
<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>