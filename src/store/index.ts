import IProjeto from "@/Interfaces/IProjeto";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { InjectionKey } from "vue";

interface Estado {
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: []
    },
    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProejto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProejto,
            }as IProjeto
            state.projetos.push(projeto)
        }
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}