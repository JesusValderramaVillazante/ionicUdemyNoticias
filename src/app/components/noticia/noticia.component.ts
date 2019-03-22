import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: any = null;
  @Input() indice: number = null;

  constructor(
    private iab: InAppBrowser, 
    public actionSheetController: ActionSheetController, 
    private socialSharing: SocialSharing
  ){};

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.iab.create(this.noticia.url, '_system');
  };

  async lanzarMenu() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
      {
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          this.socialSharing.share( 
            this.noticia.title,
            this.noticia.source.name,
            null,
            this.noticia.url).then(() => {
            console.log("ok");
          }).catch(() => {
            console.log("not");
          });
        }
      }, 
      {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          console.log('Favorito');
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancel');
        }
      }
      ]
    });
    await actionSheet.present();
  }

}
