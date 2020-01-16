import { Injectable } from '@angular/core';
import { NewsModel } from '../models/news-model';
import { HttpClient } from '@angular/common/http';
import { API } from '../config';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  getNews() {
    return this.http.get<NewsModel[]>(API + '/api/News/GET-NEWS');
  }
}
