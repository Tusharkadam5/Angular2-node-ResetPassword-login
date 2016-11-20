import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user) {
        return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

	login(user) {
        return this.http.post('/api/login', user).map((response: Response) => response.json());
    }
	reset(user, tokenid) {
        return this.http.put('/api/reset/' + tokenid, user).map((response: Response) => response.json());
    }
    update(user) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let userToken = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + userToken });
            return new RequestOptions({ headers: headers });
        }
    }
}