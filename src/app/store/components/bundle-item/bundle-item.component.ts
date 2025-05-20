import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Bundle} from '../../model/bundle.model';
import {CurrencyPipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-bundle-item',
  imports: [
    MatCardModule,
    MatButton,
    DecimalPipe,
    CurrencyPipe,
  ],
  templateUrl: './bundle-item.component.html',
  styleUrl: './bundle-item.component.css'
})
export class BundleItemComponent {
  @Input() bundle!: Bundle;


}
