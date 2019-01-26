<template>
    <div @click="zet($event, id)" class="veld" :class="{winnaar: winnendeRij.includes(id)}">
        <div>{{ inhoud }}</div>
    </div>
</template>


<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Zetten, Speler } from '../types';

@Component
export default class Veld extends Vue {
    @Prop({type: Object, required:true}) zetten!: Zetten;

    @Prop({type: String, required: true}) id!: string;

    @Prop({type: Array, required: true}) winnendeRij!: string[];
    
    get inhoud(): string | undefined {
        const waarde: string = this.zetten[this.id];
        if (waarde === 'Kruisje') {
            return 'X';
        } else if (waarde === 'Nulletje') {
            return 'O';
        } else {
            return undefined;
        }
    }

    @Emit('gezet')
    zet($event: Event, id: string): string | undefined {
        return (this.winnendeRij.length === 0) ? id : undefined;
    }
}
</script>


<style scoped>
    .veld {
        width: 100px;
        height: 100px;
        border: 1px solid grey;
        padding: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: sans-serif;
        font-size: 80px;
    }
    .winnaar {
        background-color: lightgrey;
    }
</style>
