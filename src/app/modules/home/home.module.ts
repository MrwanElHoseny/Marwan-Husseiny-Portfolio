import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChevUpComponent } from './pages/landing/animation/chev-up/chev-up.component';
import { NodeClusterComponent } from './pages/landing/animation/node-cluster/node-cluster.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: LandingComponent },

      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    LandingComponent,
    ChevUpComponent,
    NodeClusterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
