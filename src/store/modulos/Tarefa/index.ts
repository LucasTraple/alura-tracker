import ITarefa from "@/Interfaces/ITarefa";
import http from "@/http";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA, EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(proj => proj.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
        [EXCLUIR_TAREFA](state, id: string) {
            state.tarefas = state.tarefas.filter(proj => proj.id != id)
        }       
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'

            if(filtro){
                url += `?description=${filtro}`
            }

            http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        async [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            const resposta = await http.post('/tarefas', tarefa);
            return commit(ADICIONA_TAREFA, resposta.data);
        },
        async [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            await http.put(`/tarefas/${tarefa.id}`, tarefa);
            return commit(ALTERAR_TAREFA, tarefa);
        },
        async [REMOVER_TAREFA]({ commit }, id: string) {
            await http.delete(`/tarefas/${id}`);
            return commit(EXCLUIR_TAREFA, id);
        }
    }
}

