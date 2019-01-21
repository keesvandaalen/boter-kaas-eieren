import { Component } from '@angular/core';
import { Speler, Zetten } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    let m: string;
    if (this.gewonnen) {
      m = `${this.speler} heeft gewonnen!`;
    } else if (this.klaar) {
      m = "Gelijkspel";
    } else {
      m = `${this.speler} is aan de beurt`
    }
    return m;
  }

  bepaalWinnendeRij(id: string, speler: Speler): string[] {
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
