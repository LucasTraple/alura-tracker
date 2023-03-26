<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <div>
            <button class="button" @click="alterTheme">{{ buttonText }}</button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/projetos" class="link">
                        <i class="fas fa-project-diagram"></i>
                        projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraLateralComponent',
    emits: ['onAlterTheme'],
    data() {
        return {
            darkModeOn: false
        }
    },
    computed: {
        buttonText() {
            if (this.darkModeOn) {
                return 'Active dark mode'
            }
            return 'Deactive dark mode'
        }
    },
    methods: {
        alterTheme() {
            this.darkModeOn = !this.darkModeOn
            this.$emit('onAlterTheme', this.darkModeOn)
        }
    }
});

</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>