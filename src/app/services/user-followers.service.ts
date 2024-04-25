import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFollowersInterface } from '../interfaces/user-followers-interface';
import { environment } from '../../environments/environment';

const BASE_URL = environment.apiUrl;
const token = environment.token;
@Injectable({
  providedIn: 'root',
})
export class UserFollowersService {
  private http = inject(HttpClient);
  constructor() {}

  getFollowers(username: String): Observable<UserFollowersInterface[]> {
        const headers = new HttpHeaders().set(
          'Authorization',
          `token ${token}`
        );

        const requestOptions = {
          headers: headers,
        };
    return this.http.get<UserFollowersInterface[]>(
      `${BASE_URL}/${username}/followers?per_page=100?token=${token}`,
      requestOptions
    );
  }

}
