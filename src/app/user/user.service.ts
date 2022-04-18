import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { environment as env } from '../../environments/environment'
import { LocalStorage } from '../core/injection-tokens';
import { category } from '../shared/util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | undefined;
  accessToken: string | null;
  followingCategories: category[] = [];
  savedTopics: string[] = [];

  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage'],
    private http: HttpClient) {
    this.accessToken = this.localStorage.getItem('accessToken');
  }

  private handleUserAuth(user: IUser, isNewUser = false) {
    this.localStorage.setItem('accessToken', user.accessToken);
    this.accessToken = user.accessToken;
    this.user = user;

    if (isNewUser) return;

    this.getFollowingCategories();
    this.getSavedTopics();
  }
  persistedLogin() { //check for token in local storage, api validates it and returns IUser data with new token
    if (this.accessToken) {
      this.http.post<IUser>(`${env.API_URL}/login/token`, { accessToken: this.accessToken }).subscribe({
        next: (user: IUser) => {
          this.handleUserAuth(user);
        },
        error: (err) => { console.error(err); }
      });
    }
  }

  login(body: { email: string, password: string }): void {
    this.http.post<IUser>(`${env.API_URL}/login`, body).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
        console.log(user)
      },
      error: (err) => { throw err }
    });
  }

  register(body: { email: string, password: string }): void {
    this.http.post<IUser>(`${env.API_URL}/register`, body).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user, true);
      },
      error: (err) => { throw err }
    });
  }

  logout(): void {
    this.localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.user = undefined;
  }

  getFollowingCategories(): void {
    this.http.get<category[]>(`${env.API_URL}/u/me/following-categories`, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (categories) => this.followingCategories = categories,
      error: (err) => console.error(err)
    })
  }

  getSavedTopics(): void {
    this.http.get<category[]>(`${env.API_URL}/u/me/saved-topics`, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => console.error(err)
    })
  }
}
