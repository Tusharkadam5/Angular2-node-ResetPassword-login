import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription } from 'rxjs';
import { MsgService } from '../services/msg.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'reset-page',
	styleUrls: ['./app/reset/reset.component.css'],
    templateUrl: './app/reset/reset.component.html'
})

export class ResetComponent implements OnInit, OnDestroy {
    model: any = {};
    loading = false;
	tokenid = '';
	private subscription: Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthService,
		private userService: UserService,
        private alertService: MsgService,
		private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
	  this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.tokenid = param['token'];

        //console.log(this.tokenid);
		//alert(this.tokenid)
		if (!this.tokenid) {
		 this.router.navigate(['/register']);
		}
      });
    }

 ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

    reset() {
        this.loading = true;
        //this.authenticationService.login(this.model.email, this.model.password)
		this.userService.reset(this.model, this.tokenid)
            .subscribe(
                data => {
				console.log(data);
				if (data.success) {

				this.alertService.success(data.message, true);
				} else {
				this.alertService.error(data.message);
				}
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
