import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuariosServiceProvider } from '../../providers/usuarios-service/usuarios-service';
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email:string = 'joao@alura.com.br';
  public senha:string = 'alura123';
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuariosService:UsuariosServiceProvider,
    private _alertCtrl:AlertController) {
  }

  efetuaLogin(){
    this._usuariosService
        .efetuaLogin(this.email,this.senha)
        .subscribe(
          (usuario:Usuario)=>{
            console.log(usuario);
            this.navCtrl.setRoot(HomePage);
          },
          ()=>{
            this._alertCtrl.create({
              title:"Falha no Login",
              subTitle:"E-mail ou Senha incorretos! Verifique!",
              buttons:[
                {text:"OK"}
              ]
            }).present();
          }
        );
    
  }

}
