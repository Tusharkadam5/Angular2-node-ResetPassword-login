import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'home-page',
  styleUrls: ['./app/home/home.component.css'],
  templateUrl: './app/home/home.component.html'
  //providers: [UserService]
})

export class HomeComponent implements OnInit {
  title = 'Home Page';

  currentUser: User;
  users: User[] = [];

    constructor(private userService: UserService) {
         this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


	ngOnInit() {
		// console.log(this.currentUser);
		this.loadAllUsers();
	}

	private loadAllUsers() {
		 //this.userService.getAll().subscribe(users => {this.users = users});
		this.userService.getAll().subscribe(users => { this.users = users; });
	}
	
	deleteUser(id) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
}
