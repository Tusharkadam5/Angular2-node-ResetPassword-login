import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MsgService } from '../services/msg.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'login-page',
	styleUrls: ['./app/login/login.component.css'],
    templateUrl: './app/login/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthService,
		private userService: UserService,
        private alertService: MsgService) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
    }



    login() {
        this.loading = true;
        //this.authenticationService.login(this.model.email, this.model.password)
		this.userService.login(this.model)
            .subscribe(
                data => {

				if (data.success) {
				this.loading = false;
				this.alertService.success(data.message, true);
				} else {
					this.loading = false;
				this.alertService.error(data.message);
				}
				let user = data;

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userToken', JSON.stringify(user.token));
					localStorage.setItem('currentUser', JSON.stringify(user.user));
					this.loading = false;
					this.authenticationService.setLogedIn(true);
					this.router.navigate(['/']);

                }

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
