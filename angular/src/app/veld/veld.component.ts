import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Zetten } from '../types'; 

@Component({
  selector: 'app-veld',
  templateUrl: './veld.component.html',
  styleUrls: ['./veld.component.css']
})
export class VeldComponent implements OnInit {
  @Input() zetten: Zetten;
  @Input() id: string;
  @Input('winnende-rij') winnendeRij: string[];
  @Output() gezet = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  get cssClass() {
    const classes = ['veld'];
    if (this.winnendeRij.includes[this.id]) {
      classes.push('winnaar');
    }
    return classes.join(' ');
  }

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

  zet() {
    if (this.winnendeRij.length === 0) {
      this.gezet.emit(this.id);
    }
  }
}
