import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth';
import { User } from './models';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    btnActionLogout:string = 'logout';
    btnActionLogin:string;
    userRegister: boolean = false;
    user: User;
    path:string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.authService.user.subscribe(res => this.user = res);
     }

    ngOnInit() {
        //TODO: Needs to be refactored
        this.btnActionLogin = (window.location.pathname !== '/account/register') ? 'sign up' : 'login';
    }

    register(){
        this.router.navigate(['/account/register']);
        this.userRegister = true;
        this.btnActionLogin = 'login';
    }

    login(){
        this.router.navigate(['/account/login']);
        this.userRegister = false;
        this.btnActionLogin = 'sign up';
    }

    logout() {
        this.authService.logout()
    }
}
