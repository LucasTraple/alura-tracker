<template>
  <FormularioComponent @onCreateTask="createTask" />
  <div class="lista">
    <BoxComponent v-if="emptyList">
      You`ve being procastinating today!
    </BoxComponent>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="email" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fa-brands fa-searchengin"></i>
        </span>
      </p>
    </div>
    <TaskComponent v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <ModalComponent :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">Descrição</label>
          <input type="text" class="input" v-model="tarefaSelecionada.description" id="descricaoDaTarefa" />
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
        <button @click="deleteTarefa" class="button" style="background-color: lightcoral;">Delete</button>
      </template>
    </ModalComponent>
  </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import BoxComponent from '../components/BoxComponent.vue';
import ModalComponent from '../components/ModalComponent.vue';
import FormularioComponent from '../components/FormularioComponent.vue';
import TaskComponent from '../components/TaskComponent.vue';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_TAREFA } from '@/store/tipo-acoes';
import ITarefa from '@/Interfaces/ITarefa';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/Interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
  name: 'App',
  components: {
    FormularioComponent,
    TaskComponent,
    BoxComponent,
    ModalComponent
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    emptyList(): boolean {
      return this.tarefas.length == 0
    }
  },
  methods: {
    createTask(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        .then(() => this.lidarComSucesso())
    },
    lidarComSucesso() {
      this.notificar(TipoNotificacao.SUCESSO, 'Nova tarefa foi salva', 'Prontinho ;) sua tarefa já está disponível.')
      this.$router.push('/')
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    },
    deleteTarefa() {
      this.store.dispatch(REMOVER_TAREFA, this.tarefaSelecionada?.id)
        .then(() => this.fecharModal())
    }
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref('')

    // const tarefas = computed(() => store
    //                                     .state
    //                                     .tarefa
    //                                     .tarefas
    //                                     .filter((t) => !filtro.value || t.description.toLowerCase().includes(filtro.value.toLowerCase())))

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    // watch(filtro, (valorAtual, valorAntigo) => {
    //   if (valorAtual != valorAntigo) {
    //     console.log('Iguais')
    //   }
    // })

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      notificar,
      filtro
    }
  }
});

</script>
