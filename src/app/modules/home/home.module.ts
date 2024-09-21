import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: LandingComponent },
      { path: 'about', component: AboutComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'contact', component: ContactComponent },
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
    AboutComponent,
    BlogComponent,
    ContactComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HomeModule {}
