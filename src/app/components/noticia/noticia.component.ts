import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: any = null;
  @Input() indice: number = null;
  @Input() enFavoritos;


  constructor(
    private iab: InAppBrowser,
    public actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private datalocalService: DataLocalService,
    public toastController: ToastController,
    public platform: Platform
  ) { };

  ngOnInit() { }

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
  };

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'top',
    });
    toast.present();
  }

  async lanzarMenu() {
    let guardarBorrarBtn = null;
    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'star',
        handler: () => {
          this.datalocalService.borrarNoticia(this.noticia);
          this.presentToast("Delete favorite");
        }
      }
    } else {
      guardarBorrarBtn = {
        text: 'Favorito',
        icon: 'star',
        handler: () => {
          this.datalocalService.guardarNoticia(this.noticia);
          this.presentToast("Add favorite");
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Compartir',
          icon: 'share',
          handler: () => {
            this.compartirNoticia();
          }
        },
        guardarBorrarBtn,
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

  compartirNoticia(){
    if(this.platform.is('cordova')){
      this.socialSharing.share(
        this.noticia.title,
        this.noticia.source.name,
        null,
        this.noticia.url
      );
    }else{
      if (navigator['share']) {
        navigator['share']({
            title: this.noticia.title,
            text: this.noticia.source.description,
            url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      }else{
        console.info("No compartir")
      }
      
    }
  }
}
