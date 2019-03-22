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
  headLinesPage: number = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    this.headLinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&pageSize=20&page=${this.headLinesPage}`);
  }

  getTopHeadLinesCategoria( categoria: string) {
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=de&category=${categoria}&pageSize=20&page=${this.categoriaPage}`);
  }

  private ejecutarQuery<T>( query: string){
    query = apiUrl+query;
    return this.http.get<T>( query, { headers: headers});
  };
}
