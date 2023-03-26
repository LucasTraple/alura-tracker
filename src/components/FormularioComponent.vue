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
                const doneDate = new Date()
                this.$emit('onCreateTask', {
                    time: totalTime,
                    description: this.description,
                    //data: new Date().toLocaleDateString() //25/03/2023
                    //data: new Date().toDateString() //Sat Mar 25 2023
                    //data: new Date().toISOString() //2023-03-26T00:43:17.929Z
                    data: doneDate.toISOString().substring(11,19) + ' || ' +  doneDate.toLocaleDateString()
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