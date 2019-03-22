import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  noticias: Article[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private ns: NoticiasService){}
  ngOnInit(){
    this.cargarNoticias();
  }

  loadData(e){
    this.cargarNoticias(e);
  }

  cargarNoticias(e?){
    this.ns.getTopHeadLines().subscribe(resp => {
      this.noticias.push(... resp.articles);
      
      if(resp.articles.length === 0){
        e.target.disabled = true;
        e.target.complete();
        return;
      }

      if(e){
        e.target.complete();
      }
    });
  }
}
