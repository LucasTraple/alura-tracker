import IProjeto from "@/Interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./tipo-mutacoes"
import { INotificacao } from "@/Interfaces/INotificacao"
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETOS } from "./tipo-acoes";
import http from "@/http"

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProejto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProejto,
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETO](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    actions: {
        [OBTER_PROJETOS]({ commit}){
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETO, resposta.data))
        },
        [CADASTRAR_PROJETOS](context, nomeDoProejto: string){
            return http.post('/projetos', {
                nome: nomeDoProejto
            })
        },
        [ALTERAR_PROJETOS](context, projeto: IProjeto){
            return http.put(`/projetos/${projeto.id}`, projeto) 
        },
        [REMOVER_PROJETOS]({commit}, id: string){
            return http.delete(`/projetos/${id}`)
            .then(() => commit(EXCLUIR_PROJETO, id)) 
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}