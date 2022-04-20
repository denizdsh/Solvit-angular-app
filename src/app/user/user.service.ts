import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { environment as env } from '../../environments/environment'
import { LocalStorage } from '../core/injection-tokens';
import { category } from '../shared/util';

const thisUserUrl = `${env.API_URL}/u/me`;
const userActionUrl = `${env.API_URL}/user-action`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | undefined;
  accessToken: string | null = this.localStorage.getItem('accessToken') || null;
  followingCategories: category[] = [];
  savedTopics: string[] = [];
  isAuthProcessFinished: boolean = false;

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
        error: (err) => { console.error(err); },
        complete: () => { this.isAuthProcessFinished = true; }
      });
    } else {
      this.isAuthProcessFinished = true;
    }
  }

  login(body: { email: string, password: string }): void {
    this.isAuthProcessFinished = false;

    this.http.post<IUser>(`${env.API_URL}/login`, body).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user);
      },
      error: (err) => { throw err },
      complete: () => { this.isAuthProcessFinished = true; }
    });
  }

  register(body: { email: string, password: string }): void {
    this.isAuthProcessFinished = false;

    this.http.post<IUser>(`${env.API_URL}/register`, body).subscribe({
      next: (user: IUser) => {
        this.handleUserAuth(user, true);
      },
      error: (err) => { throw err },
      complete: () => { this.isAuthProcessFinished = true; }
    });
  }

  logout(): void {
    this.localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.user = undefined;
    this.followingCategories = [];
    this.savedTopics = [];
  }


  getFollowingCategories(): void {
    this.http.get<category[]>(`${thisUserUrl}/following-categories`, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (categories) => this.followingCategories = categories,
      error: (err) => console.error(err)
    })
  }

  getSavedTopics(): void {
    this.http.get<category[]>(`${thisUserUrl}/saved-topics`, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => console.error(err)
    })
  }


  followCategory(category: category): void {
    this.http.post<category[]>(`${userActionUrl}/follow/${category}`, {}, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (categories) => this.followingCategories = categories,
      error: (err) => console.error(err)
    })
  }

  unfollowCategory(category: category): void {
    this.http.post<category[]>(`${userActionUrl}/unfollow/${category}`, {}, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (categories) => this.followingCategories = categories,
      error: (err) => console.error(err)
    })
  }

  saveTopic(topicId: string): void {
    this.http.post<string[]>(`${userActionUrl}/save/${topicId}`, {}, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => console.error(err)
    })
  }

  unsaveTopic(topicId: string): void {
    this.http.post<string[]>(`${userActionUrl}/unsave/${topicId}`, {}, { headers: { 'x-authorization': this.user!.accessToken } }).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => console.error(err)
    })
  }
}