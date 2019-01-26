<template>
  <div id="app">
    <h1>{{ message }}</h1>
    <div>
      <veld :zetten="zetten" id="a1" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
      <veld :zetten="zetten" id="a2" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
      <veld :zetten="zetten" id="a3" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
    </div>
    <div>
      <veld :zetten="zetten" id="b1" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
      <veld :zetten="zetten" id="b2" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
      <veld :zetten="zetten" id="b3" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
    </div>
    <div>
      <veld :zetten="zetten" id="c1" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
      <veld :zetten="zetten" id="c2" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
      <veld :zetten="zetten" id="c3" :winnende-rij="winnendeRij" @gezet="verwerkZet"></veld>
    </div>
    <button @click="opnieuw">Opnieuw</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Veld from './components/Veld.vue';
import { Zetten, Speler } from './types';


@Component({
  components: {
    Veld
  },
})
export default class App extends Vue {
  speler: Speler = "Kruisje";
  aantal: number = 0;
  zetten: Zetten = {};
  winnendeRij: string[] = [];

  get gewonnen(): boolean {
      return this.winnendeRij.length === 3;
  }

  get klaar(): boolean {
      return this.gewonnen || this.aantal >= 9;
  }

  get message(): string {
    let m;
    if (this.gewonnen) {
      m = `${this.speler} heeft gewonnen!`;
    } else if (this.klaar) {
      m = "Gelijkspel";
    } else {
      m = `${this.speler} is aan de beurt`
    }
    return m;
  }

  bepaalWinnendeRij(id: string, speler: Speler) {
      return [
          ["a1", "a2", "a3"], ["b1", "b2", "b3"], ["c1", "c2", "c3"],
          ["a1", "b1", 'c1'], ["a2", "b2", 'c2'], ["a3", "b3", 'c3'],
          ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
      ].filter(r => r.includes(id))
        .find(r => r.every(e => this.zetten[e] === speler)) || [];
  }

  wissel() {
      this.speler = this.speler == 'Kruisje' ? 'Nulletje' : "Kruisje"
  }

  verwerkZet(id: string) {
      this.aantal++;
      const zz = {...this.zetten};
      zz[id] = this.speler;
      this.zetten = zz;
      this.winnendeRij.push(...this.bepaalWinnendeRij(id, this.speler));
      if (!this.klaar) {
          this.wissel();
      }
  }

  opnieuw() {
    this.wissel();
    this.aantal = 0;
    this.zetten = {};
    this.winnendeRij = [];
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 303px;
  margin: 0 auto;
}
#app > div {
  display: flex;
}
</style>
