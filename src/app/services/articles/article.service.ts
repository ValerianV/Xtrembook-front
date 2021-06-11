import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articles } from 'src/app/interfaces/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url = 'http://localhost:3000/article/';
  private urlD = 'http://localhost:3000/livre/';

  constructor(private http: HttpClient) { }
  getAllArticles() {
    return this.http.get<Array<Articles>>(this.url);
  }
  getOneById(referenceArticle) {
    return this.http.get<Articles>(this.urlD+referenceArticle);
  }
}
