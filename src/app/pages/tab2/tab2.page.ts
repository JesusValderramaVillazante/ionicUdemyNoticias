import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  categorias = ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  ngOnInit(){
  }

  segmentChanged(e) {
    console.log(e.detail);
  }
}
