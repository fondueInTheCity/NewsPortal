import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from '../_models';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.serverUrl}users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.serverUrl}users` + '/' + id);
    }

    addUser(user: User) {
        return this.http.post(`${environment.serverUrl}auth/registration`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.serverUrl}users`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.serverUrl}users` + '/' + id);
    }
}
