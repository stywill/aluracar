import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carros } from '../../modelos/carro';
import { HttpErrorResponse} from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros:Carros[]
  
  constructor(public navCtrl: NavController, 
    private _loadinCtrl:LoadingController,
    private _alertCtrl:AlertController,
    private _carrosService:CarrosServiceProvider) {}

  ionViewDidLoad(){
    let loading = this._loadinCtrl.create({
      content:'Aguarde o carregamento dos carros...'
    })  

    loading.present();

    this._carrosService.lista().subscribe(
      (carros)=>{
        this.carros = carros;
        loading.dismiss();
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
        loading.dismiss();
        this._alertCtrl.create({
          title:'Falha na conexão',
          subTitle:'Não foi possível carregar a lista de carros tente novamente mais tarde',
          buttons:[
            {text:'OK'}
          ]
        }).present();
      }
    )
  }  

  selecionarCarro(carro: Carros){
    this.navCtrl.push(EscolhaPage.name,{
      carroSelecionado:carro
    });
  }
}
