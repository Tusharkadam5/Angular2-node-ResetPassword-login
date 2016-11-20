import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	 private subjectIsLogin: Subject<Boolean> = new Subject<Boolean>();
	 private _isLogedIn = false;

    constructor(private http: Http, private router: Router) { }

    /* login(email, password) {

        return this.http.post('/api/login', JSON.stringify({ email: email, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
				// console.log(user);
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.token));
                }
            });
    }*/

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
		localStorage.removeItem('userToken');
		this.setLogedIn(false);
		this.router.navigate(['/login']);
    }

	setLogedIn(isLogedIn: boolean): void {
		this._isLogedIn = isLogedIn;
		this.subjectIsLogin.next(isLogedIn);
	}

	getLogedIn(): Observable<Boolean> {
		return this.subjectIsLogin.asObservable();
	}
}