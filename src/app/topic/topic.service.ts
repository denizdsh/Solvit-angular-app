import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { ITopic } from '../interfaces';
import { category, query } from '../shared/util';
import { UserService } from '../user/user.service';

const url = environment['API_URL'] + '/topics';

type topicType = 'all' | 'followed' | 'category' | 'user' | 'saved';

const urlQuery = (query: query) => { return `?sortBy=${query.sortby}&order=${query.order}` }
const defaultQuery: query = { sortby: 'date', order: 'asc' };

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private http: HttpClient, private userService: UserService) { }

  get getTopics() {
    return {
      'all': (query?: query) => this.getAllTopics(query),
      'followed': (query?: query) => this.getFollowedTopics(query),
      'category': (category: category, query?: query) => this.getTopicsByCategory(category, query),
      'user': (userId: string, query?: query) => this.getTopicsByUser(userId, query),
      'saved': (query?: query) => this.getSavedTopics(query)
    }
  };

  getAllTopics(query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}${urlQuery(query)}`);
  }
  getFollowedTopics(query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}/c/following${urlQuery(query)}`, { headers: { 'x-authorization': this.userService.user!.accessToken } });
  }
  getTopicsByCategory(category: category, query = defaultQuery): Observable<ITopic[]> {
    console.log('category', category);
    return this.http.get<ITopic[]>(`${url}/c/${category}${urlQuery(query)}`);
  }
  getTopicsByUser(userId: string, query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}/u/${userId}${urlQuery(query)}`);
  }
  getSavedTopics(query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}/c/saved${urlQuery(query)}`, { headers: { 'x-authorization': this.userService.user!.accessToken } });
  }

  getTopicById(id: string): Observable<ITopic> {
    return this.http.get<ITopic>(`${url}/${id}`);
  }
}