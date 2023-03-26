<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TemporizadorComponent @onTimerFinished="FinisheTask" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import TemporizadorComponent from './TemporizadorComponent.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export default defineComponent({
    name: 'FormularioComponent',
    emits: ['onCreateTask'],
    components: {
        TemporizadorComponent
    },
    data() {
        return {
            description: '',
            idProjeto: ''
        }
    },
    methods: {
        FinisheTask(totalTime: number): void {
            const doneDate = new Date()
            this.$emit('onCreateTask', {
                time: totalTime,
                description: this.description,
                
                data: doneDate.toISOString().substring(11, 19) + ' || ' + doneDate.toLocaleDateString(),
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.description = ''
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projetos: computed(() => store.state.projetos)
        }
    }
}); 
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>