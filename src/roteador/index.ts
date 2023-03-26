import { createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import ProjetosView from '../views/ProjetosView.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        name: 'ProjetosView',
        component: ProjetosView
    }
] 

const retoeador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default retoeador;
