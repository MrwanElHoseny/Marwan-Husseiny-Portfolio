import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ChevUpComponent } from './pages/landing/animation/chev-up/chev-up.component';
import { NgxParticlesModule } from '@tsparticles/angular';
import { TextAnimateComponent } from 'src/app/modules/home/pages/landing/animation/text-animate/text-animate.component';
import { ContentFadeUpComponent } from 'src/app/modules/home/pages/landing/animation/content-fade-up/content-fade-up.component';
import { StartTextComponent } from './pages/landing/animation/start-text/start-text.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutComponent } from './pages/about/about.component';
import { TechStackComponent } from './pages/tech-stack/tech-stack.component';
import { SkillsComponent } from './pages/skills/skills.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    LandingComponent,
    ChevUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxParticlesModule,
    TextAnimateComponent,
    ContentFadeUpComponent,
    StartTextComponent,
    FontAwesomeModule,
    AboutComponent,
    TechStackComponent,
    SkillsComponent,
  ],
})
export class HomeModule {}
