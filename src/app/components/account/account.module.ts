import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './account-routing.module';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoComponent } from '../shared/logo/logo.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        AccountComponent,
        LoginComponent,
        RegisterComponent,
        LogoComponent
    ],
    exports: [
        LogoComponent
    ]
})

export class AccountModule {}