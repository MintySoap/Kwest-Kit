import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './user';
  
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = 'http://localhost:5200'; //note: change this when hosting on aws I think
  private users$: Subject<User[]> = new Subject();
  
  constructor(private httpClient: HttpClient) { }
  
  private refreshUsers() {
    this.httpClient.get<User[]>(`${this.url}/User`)
      .subscribe(users => {
        this.users$.next(users);
      });
  }
  
  getUsers(): Subject<User[]> {
    this.refreshUsers();
    console.log('This is getUsers, all not individual');
    return this.users$;
  }
  
  getUserID(id: string): Observable<User> {
    var result = this.httpClient.get<User>(`${this.url}/User/${id}`);
    return result;
  }

  verifyUser(username: string, password: string): Observable<User> {
    var result = this.httpClient.get<User>(`${this.url}/User/verify/${username}/${password}`);
    return result;
  }
  
  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/User`, user, { responseType: 'text' });
  }
  
  updateUser(id: string, user: User): Observable<string> {
    return this.httpClient.put(`${this.url}/User/${id}`, user, { responseType: 'text' });
  }
  
  deleteUser(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/User/${id}`, { responseType: 'text' });
  }
}