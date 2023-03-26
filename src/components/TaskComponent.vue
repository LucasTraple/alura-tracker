
import CronometroComponent from './CronometroComponent.vue';

<template>
    <BoxComponent>
        <div class="columns">
            <div class="column is-5">
               {{ task.description || 'Task without description'}}
            </div>
            <div class="column">
                <CronometroComponent :timeInSeconds="task.time" />
            </div>
            <div class="column">
                {{ task.data }}
            </div>
        </div>
    </BoxComponent>
</template>

<script lang="ts">
//import ITask from '@/Interfaces/ITask';
import ITask from '../Interfaces/ITask';
import { defineComponent, PropType } from 'vue';
import CronometroComponent from './CronometroComponent.vue';
import BoxComponent from './BoxComponent.vue';

export default defineComponent({
    name: 'TaskComponent',
    components: {
        CronometroComponent,
        BoxComponent
    },
    props:{
        task:{
            type: Object as PropType<ITask>,
            required: true
        }
    }
})
</script>