import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { UsersViewComponent } from './pages/users-view/users-view.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: 'users',
    component: UsersViewComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
