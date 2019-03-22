import { Component, ViewChild, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  categorias = ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  noticia: string = '';
  constructor(private ns: NoticiasService) {

  }

  segmentChanged(d) {
    this.noticias = [];
    this.noticia = d.detail.value;
    this.cargarNoticias(this.noticia);  
  }

  ngOnInit(){}

  loadData(e){
    this.cargarNoticias(this.noticia, event);
  }

  cargarNoticias(categoria: string, event?) {
    console.log(categoria);
    this.ns.getTopHeadLinesCategoria(categoria)
    .subscribe(resp => {
      this.noticias.push(... resp.articles);
      /*
      if(resp.articles.length === 0){
        e.target.disabled = true;
        e.target.complete();
        return;
      }
      */
      if(event){
        event.target.complete();
      }
    });
  }
}
