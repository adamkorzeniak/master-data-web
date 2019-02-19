import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '', 
    component: MovieListComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
