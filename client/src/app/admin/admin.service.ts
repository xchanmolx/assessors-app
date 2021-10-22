import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod'; // Production
// import { environment } from 'src/environments/environment'; // Development
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(this.baseUrl + 'admin/usersWithRoles', {headers});
  }

  updateUserRoles(user: IUser, roles: {}) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.post<IUser>(this.baseUrl + 'admin/editRoles/' + user.userName, roles, {headers});
  }
}
