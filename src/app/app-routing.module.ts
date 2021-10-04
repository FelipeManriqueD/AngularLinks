import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/account/login/login.component';

const AccountModule = () => import('./components/account/account.module').then(res => res.AccountModule);

import { HomeComponent } from './components/home';


const routes: Routes = [
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: 'account', loadChildren: AccountModule},
    {path: '', component: LoginComponent},
    //  Redirect home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
