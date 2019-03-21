import { Component, ViewChild, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  categorias = ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  constructor(private noticiasService: NoticiasService) {

  }

  segmentChanged(e) {
    this.noticiasService.getTopHeadLinesCategoria(e.detail.value).subscribe(resp => {
      console.log(resp);
    });
  }

  ngOnInit(){}
}
