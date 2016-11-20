import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MsgService } from '../services/msg.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'register-page',
	styleUrls: ['./app/register/register.component.css'],
    templateUrl: './app/register/register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: MsgService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {

                    this.alertService.success(data.message, true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}