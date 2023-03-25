<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, DefineComponent } from 'vue';

export default defineComponent({
    name: 'BoxComponent',
    data (){
        return{
            estilos: {
                background: '#FAF0CA'    
                //'background-color': '#FAF0CA'    
                //backgroundColor: '#FAF0CA'    
            }
        }
    }
})
</script>