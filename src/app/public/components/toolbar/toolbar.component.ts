import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {TranslateButtonComponent} from '../translate-button/translate-button.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatButton,
    TranslateButtonComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

}
