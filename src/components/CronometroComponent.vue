<template>
    <section>
        <strong class="display">
            {{ runnedTime }}
        </strong>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CronometroComponent',
    props: {
        timeInSeconds: {
            type: Number,
            default: 0 
        }
    },
    computed: {
        runnedTime () : string {
            return new Date(this.timeInSeconds * 1000).toISOString().substring(11,19)
        }
    },
})
</script>
<style>
.display{
    color: var(--texto-primario);
}
</style>