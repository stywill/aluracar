import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL } from 'ionic-angular';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { CameraOriginal } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private usuarioLogadoPage:UsuariosServiceProvider,
    private _camera:CameraOriginal) {
  }
  tiraFoto(){
    this._camera.getPicture({
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum:true,
      correctOrientation:true
    })
    .then(fotoUri => {
      fotoUri = normalizeURL(fotoUri);
      this.usuarioLogadoPage.salvaAvatar(fotoUri);
    })
    .catch(err=>console.log(err));
  }
  get avatar(){
    return this.usuarioLogadoPage.obtemAvatar();
  }
  get usuarioLogado(){
    return this.usuarioLogadoPage.obtemUsuarioLogado();
  }
}
