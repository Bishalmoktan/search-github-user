import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user-interface';
import { environment } from '../../environments/environment';

const BASE_URL = environment.apiUrl;
const token = environment.token;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPost(username: string): Observable<UserInterface> {
    const headers = new HttpHeaders().set('Authorization', `token ${token}`);

    const requestOptions = {
      headers: headers,
    };

    return this.http.get<UserInterface>(
      `${BASE_URL}/${username}`,
      requestOptions
    );
  }
}
