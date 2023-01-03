import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces';
import { environment as env } from '../../environments/environment'
import { LocalStorage } from '../injection-tokens';
import { category } from '../shared/util';
import { finalize, Observable, tap } from 'rxjs';
import { NotificationComponent } from '../shared/notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const thisUserUrl = `${env.API_URL}/u/me`;
const userActionUrl = `${env.API_URL}/user-action`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: IUser | undefined;
  accessToken: string | null = this.localStorage.getItem('accessToken') || null;
  followedCategories: category[] = [];
  savedTopics: string[] = [];
  isAuthProcessFinished: boolean = false;


  constructor(
    @Inject(LocalStorage) private localStorage: Window['localStorage'],
    private http: HttpClient,
    private _snackbar: MatSnackBar
  ) {
    this.accessToken = this.localStorage.getItem('accessToken');
  }

  get isAuth(): boolean { return !!this.accessToken; };
  get authHeaderOptions() {
    return {
      headers: { 'x-authorization': this.user!.accessToken }
    }
  }

  private handleUserAuth(user: IUser, isNewUser = false) {
    this.localStorage.setItem('accessToken', user.accessToken);
    this.accessToken = user.accessToken;
    this.user = user;

    if (isNewUser) return;

    this.getFollowedCategories();
    this.getSavedTopics();
  }

  persistedLogin() { //check for token in local storage, api validates it and returns IUser data with new token
    if (this.accessToken) {
      this.http.post<IUser>(`${env.API_URL}/login/token`, { accessToken: this.accessToken }).subscribe({
        next: (user: IUser) => {
          this.handleUserAuth(user);
        },
        error: (err) => {
          this.logout();

          this._snackbar.openFromComponent(NotificationComponent, {
            data: {
              type: 'error',
              message: err.error.message || 'Session expired. Please log in'
            }
          })
        },
        complete: () => {
          this.isAuthProcessFinished = true;

          this._snackbar.openFromComponent(NotificationComponent, {
            data: {
              type: 'success',
              message: `Welcome, ${this.user!.username}`
            }
          })
        }
      })
    } else {
      this.isAuthProcessFinished = true;
    }
  }

  login(body: { email: string, password: string }): Observable<IUser> {
    this.isAuthProcessFinished = false;

    return this.http.post<IUser>(`${env.API_URL}/login`, body)
      .pipe(
        tap(user => this.handleUserAuth(user)),
        finalize(() => this.isAuthProcessFinished = true)
      );
  }

  register(body: { email: string, username: string, password: string, repassword: string, imageUrl: string | undefined }): Observable<IUser> {
    this.isAuthProcessFinished = false;

    return this.http.post<IUser>(`${env.API_URL}/register`, body)
      .pipe(
        tap(user => this.handleUserAuth(user)),
        finalize(() => this.isAuthProcessFinished = true)
      );
  }

  logout(): void {
    this.localStorage.removeItem('accessToken');
    this.accessToken = null;
    this.user = undefined;
    this.followedCategories = [];
    this.savedTopics = [];
  }

  editProfile(body: { username: string, imageUrl: string | undefined, password: string }): Observable<IUser> {
    this.isAuthProcessFinished = false;

    return this.http.post<IUser>(`${env.API_URL}/edit-profile`, body, this.authHeaderOptions)
      .pipe(
        tap(user => this.handleUserAuth(user)),
        finalize(() => this.isAuthProcessFinished = true)
      );
  }

  getFollowedCategories(): void {
    this.http.get<category[]>(`${thisUserUrl}/following-categories`, this.authHeaderOptions).subscribe({
      next: (categories) => this.followedCategories = categories,
      error: (err) => console.error(err)
    })
  }

  getSavedTopics(): void {
    this.http.get<category[]>(`${thisUserUrl}/saved-topics`, this.authHeaderOptions).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => console.error(err)
    })
  }

  followCategory(category: category): void {
    this.http.post<category[]>(`${userActionUrl}/follow/${category}`, {}, this.authHeaderOptions).subscribe({
      next: (categories) => this.followedCategories = categories,
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.error.message || `Couldn't follow category/${category}`
        }
      }),
      complete: () => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'info',
          message: `Followed category/${category}`
        }
      })
    })
  }

  unfollowCategory(category: category): void {
    this.http.post<category[]>(`${userActionUrl}/unfollow/${category}`, {}, this.authHeaderOptions).subscribe({
      next: (categories) => this.followedCategories = categories,
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.error.message || `Couldn't unfollow category/${category}.`
        }
      }),
      complete: () => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'info',
          message: `Unfollowed category/${category}.`
        }
      })
    })
  }

  saveTopic(topicId: string): void {
    this.http.post<string[]>(`${userActionUrl}/save/${topicId}`, {}, this.authHeaderOptions).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.error.message || 'Couldn\'t save topic'
        }
      }),
      complete: () => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'info',
          message: 'Saved topic'
        }
      })
    })
  }

  unsaveTopic(topicId: string): void {
    this.http.post<string[]>(`${userActionUrl}/unsave/${topicId}`, {}, this.authHeaderOptions).subscribe({
      next: (topics) => this.savedTopics = topics,
      error: (err) => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'error',
          message: err.error.message || 'Couldn\'t unsave topic'
        }
      }),
      complete: () => this._snackbar.openFromComponent(NotificationComponent, {
        data: {
          type: 'info',
          message: 'Unsaved topic'
        }
      })
    })
  }

  getUserImage(username: string): Observable<URL> {
    return this.http.get<URL>(`${env.API_URL}/u/${username}/image`);
  }
}
