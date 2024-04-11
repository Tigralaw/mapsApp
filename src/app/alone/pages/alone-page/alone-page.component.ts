// import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

// Standalone component básico
@Component({
  standalone: true,
  // se importa CommonModule para poder utilizar las directivas de angular en el html coo *ngIf, *ngFor, etc...
  // imports: [ CommonModule ],
  imports: [ CounterAloneComponent, SideMenuComponent ],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}
