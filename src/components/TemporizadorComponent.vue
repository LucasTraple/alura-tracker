<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroComponent :timeInSeconds="timeInSeconds" />
        <button class="button" @click="begin" :disabled="stopwatchRunning">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finish" :disabled="!stopwatchRunning">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CronometroComponent from './CronometroComponent.vue'

export default defineComponent({
    name: 'TemporizadorComponent',
    emits: ['onTimerFinished'],
    components: {
        CronometroComponent
    },
    data() {
        return {
            timeInSeconds: 0,
            timerId: 0,
            stopwatchRunning: false
        }
    },
    methods: {
        begin() {
            //Begin the counter
            //1 sec = 1000
            this.timerId = setInterval(() => {
                this.timeInSeconds++
            }, 1000)
            this.stopwatchRunning = true;
        },
        finish() {
            clearInterval(this.timerId);
            this.$emit('onTimerFinished', this.timeInSeconds)
            this.timeInSeconds = 0;
            this.stopwatchRunning = false;
        }
    }
})

</script>