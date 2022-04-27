import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment'
import { Observable } from 'rxjs';
import { IComment, ITopic, ITopicData } from '../interfaces';
import { category, query } from '../shared/util';
import { UserService } from '../user/user.service';

const url = env['API_URL'] + '/topics';

const urlQuery = (query: query) => { return `?sortBy=${query.sortby}&order=${query.order}` }
const defaultQuery: query = { sortby: 'date', order: 'asc' };


@Injectable({
  providedIn: 'root'
})
export class TopicService {
  constructor(private http: HttpClient, private userService: UserService) { }

  get authHeaderOptions() {
    return {
      headers: { 'x-authorization': this.userService.user!.accessToken }
    }
  }
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
    return this.http.get<ITopic[]>(`${url}/c/following${urlQuery(query)}`, this.authHeaderOptions);
  }

  getTopicsByCategory(category: category, query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}/c/${category}${urlQuery(query)}`);
  }

  getTopicsByUser(userId: string, query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}/u/${userId}${urlQuery(query)}`);
  }

  getSavedTopics(query = defaultQuery): Observable<ITopic[]> {
    return this.http.get<ITopic[]>(`${url}/c/saved${urlQuery(query)}`, this.authHeaderOptions);
  }

  getTopicById(id: string): Observable<ITopic> {
    return this.http.get<ITopic>(`${url}/${id}`);
  }

  createTopic(body: ITopicData): Observable<ITopic> {
    return this.http.post<ITopic>(url, body, this.authHeaderOptions)
  }

  editTopic(topicId: string, body: ITopicData): Observable<ITopic> {
    return this.http.put<ITopic>(`${url}/${topicId}`, body, this.authHeaderOptions)
  }

  likeTopic(topicId: string): Observable<string[]> {
    return this.http.post<string[]>(`${url}/${topicId}/like`, {}, this.authHeaderOptions);
  }

  dislikeTopic(topicId: string): Observable<string[]> {
    return this.http.post<string[]>(`${url}/${topicId}/dislike`, {}, this.authHeaderOptions);
  }

  getComments(topicId: string): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${url}/${topicId}/comments`);
  }

  postComment(topicId: string, content: string): Observable<IComment> {
    return this.http.post<IComment>(`${url}/${topicId}/comments`, { content }, this.authHeaderOptions);
  }
}