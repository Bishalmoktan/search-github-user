import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserRepos } from '../interfaces/user-repos';

const BASE_URL = environment.apiUrl;
const token = environment.token;
@Injectable({
  providedIn: 'root',
})
export class UserReposService {
  private http = inject(HttpClient);
  constructor() {}

  getRepos(username: String): Observable<UserRepos[]> {
        const headers = new HttpHeaders().set(
          'Authorization',
          `token ${token}`
        );

        const requestOptions = {
          headers: headers,
        };
    return this.http.get<UserRepos[]>(
      `${BASE_URL}/${username}/repos?per_page=100?token=${token}`,
      requestOptions
    );
  }
}
