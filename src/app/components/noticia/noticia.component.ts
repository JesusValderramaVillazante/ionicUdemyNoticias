import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: any = null;
  @Input() indice: number = null;

  constructor() { }

  ngOnInit() {}

}
