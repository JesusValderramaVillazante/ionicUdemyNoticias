import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=d347ef5ba07b4f0e84004a5101df02b8`);
  }
}