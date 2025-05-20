import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {BundlesComponent} from './store/pages/bundles/bundles.component';
import {NotFoundComponent} from './public/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path:'store/bundles',
    component: BundlesComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
