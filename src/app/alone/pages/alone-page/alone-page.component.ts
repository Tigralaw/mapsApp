import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Standalone component básico
@Component({
  standalone: true,
  // se importa CommonModule para poder utilizar las directivas de angular en el html coo *ngIf, *ngFor, etc...
  // imports: [ CommonModule ],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css']
})
export class AlonePageComponent {

}
