import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { map, first, filter, find } from 'rxjs/operators';

import {Link, User} from '../models';
import { linkApi } from '../../API/api';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private subject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(private http:HttpClient, private router: Router){
        this.subject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.subject.asObservable();
    }

    public get userVal():User {
        return this.subject.value
    }

    login(email:string, password:string): Observable<User>{
        return this.http.get<User[]>(`${linkApi.apiURL}/user`)
            .pipe(
                map(item => item.find(user => {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.subject.next(user);
                    return user.password === password && user.email === email
                }))
            )
    }

    logout(){
        localStorage.removeItem('user'),
        this.subject.next(null);
        this.router.navigate(['/account/login'])
    }

    register(user:User){
        return this.http.post(`${linkApi.apiURL}/user`, user);
    }

    getUserByToken(id: string){
        console.log('userId',id)
        return this.http.get<User>(`${linkApi.apiURL}/user/${id}`);
    }

    getLinks(){
        return  this.http.get(`${linkApi.apiURL}/links`);
    }

    createLink(urlLink: string, linkName: string){
        return this.http.post<Link>(`${linkApi.apiURL}/links`, {
            urlLink, linkName
        });
    }

    deleteLink(id:string){
        return this.http.delete(`${linkApi.apiURL}/links/${id}`);
    }
}
