import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

import { AuthService } from './auth';
import { User } from './models';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [GoogleTagManagerService]
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
        private route: ActivatedRoute,
        private gtmService: GoogleTagManagerService,
    ) {
        this.authService.user.subscribe(res => this.user = res);
     }

    ngOnInit() {
        //TODO: Needs to be refactored
        this.btnActionLogin = (window.location.pathname !== '/account/register') ? 'sign up' : 'login';
        this.gtmService.addGtmToDom();

        this.router.events.forEach(item => {
            if (item instanceof NavigationEnd) {
                const gtmTag = {
                    event: 'page',
                    pageName: item.url
                };

                this.gtmService.pushTag(gtmTag);
            }
        });
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
