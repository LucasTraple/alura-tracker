import { createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import ProjetosView from '../views/ProjetosView.vue'
import FormularioView from '../views/Projetos/FormularioView.vue'
import ListaView from '../views/Projetos/ListaView.vue'

const rotas: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: ProjetosView,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListaView
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: FormularioView
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: FormularioView,
                props: true
            }
        ]
    }
] 

const retoeador = createRouter({
    history: createWebHashHistory(),
    routes: rotas
})

export default retoeador;
