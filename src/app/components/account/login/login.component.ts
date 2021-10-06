import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth';
//import { first } from 'rxjs/operators';


@Component({
	templateUrl: 'login.component.html',
	styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
	emailText = 'Your Email';
	PasswordText = 'Password';
	loginForm: FormGroup;
	submitted = false;
	returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {
		//Go home if user logged
		if (this.authService.userVal) {
			this.router.navigate(['/'])
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	get form() {
		return this.loginForm.controls
	}

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return
		}

		const { email, password } = this.form;
		const emailVal = email.value;
		const passwordvalue = password.value;

		this.authService.login(emailVal, passwordvalue)
			.subscribe(data => {
				if (typeof data !== 'undefined') {
					localStorage.setItem('user', JSON.stringify(data))
					this.router.navigate([this.returnUrl])
				}
			})
	}
}
