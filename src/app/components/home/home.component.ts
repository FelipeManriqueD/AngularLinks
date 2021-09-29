import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import { User, Link } from '../../models';
import { AuthService } from '../../auth';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
    user: User;
    urlToSaveLabel: string = 'url to save';
    urlNameLabel: string = 'name of url';
    urlForm: FormGroup;
    id: string;
    userInfo: User = {
        id: '',
        name: '',
        email: '',
        password: ''
    };
    links: Link[] = [];

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.user = this.authService.userVal;
    }

    ngOnInit() {
        this.urlForm = this.formBuilder.group({
            urlToSave: [''],
            urlName: ['']
        })

        this.getUserByToken();

        this.getLinks();

    }

    public getUserByToken(): void{
        this.authService.getUserByToken(this.user.id)
            .pipe(first())
            .subscribe(user => this.userInfo = user);
    }

    public getLinks(){
        this.authService.getLinks()
            .pipe(first())
            .subscribe((links:Link[]) => this.links = links)
    }

    get form() {
        return this.urlForm.controls
    }

    onSubmit() {
        this.authService.createLink(this.form.urlToSave.value, this.form.urlName.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.getLinks();
                    this.router.navigate([this.route.url]);
                },
                error => {
                    console.log(error)
                }
            )
    }

    onDeleteLink(id: string) {
        //const link = this.links.find(link => link.id === id);
        this.authService.deleteLink(id)
            .pipe(first())
            .subscribe(() => {
                this.links = this.links.filter(link => link.id !== id)
            })
    }
}