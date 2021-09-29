import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/auth';

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['../account.component.scss']
})

export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    fullName: string = 'Full name';
    emailText: string = 'Your Email';
    PasswordText: string = 'Password';
    signup: string = 'sign up';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmitRegister() {
        if (this.registerForm.invalid) {
            return
        }

        this.authService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    this.router.navigate(['/'])
                },
                error =>{
                    console.log(`register error ${error}`)
                }
            )
    }
}