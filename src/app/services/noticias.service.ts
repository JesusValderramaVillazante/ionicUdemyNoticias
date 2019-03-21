import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    return this.ejecutarQuery<RespuestaTopHeadLines>('/top-headlines?country=us');
  }

  getTopHeadLinesCategoria( categoria: string) {
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=de&category=${categoria}`);
  }

  private ejecutarQuery<T>( query: string){
    query = apiUrl+query;
    return this.http.get<T>( query, { headers: headers});
  };
}
