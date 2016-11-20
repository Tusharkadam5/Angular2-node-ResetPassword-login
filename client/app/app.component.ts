import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';


@Component({
   selector:'my-app',
   styleUrls: ['./app/app.component.css'],
   templateUrl: './app/app.html',
})

export class AppComponent implements OnInit {

	isLogedIn = false;
	title = 'login';

constructor(private authenticationService: AuthService, private router: Router) { }

    ngOnInit() {
		
		 if (localStorage.getItem('userToken')) {
			 this.isLogedIn = true;
		 }else {
			 this.isLogedIn = false;
		 }
		 
        this.authenticationService.getLogedIn().subscribe((isLoged: boolean) => {
			this.isLogedIn = isLoged;
			// alert(isLoged);
		});
    }

	logout() {
		 this.authenticationService.logout();
		 		// this.router.navigate(['/']);
	}

}
