import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-translate-button',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './translate-button.component.html',
  styleUrl: './translate-button.component.css'
})
export class TranslateButtonComponent {
  currentLang = 'en';
  languages = ['en', 'es'];

  constructor(private readonly translate: TranslateService) {
    this.currentLang = translate.currentLang;
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
