import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carros } from '../../modelos/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Vibration } from '@ionic-native/vibration';
import { DatePicker } from '@ionic-native/date-picker';
@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  
  public carro:Carros;
  public precoTotal:number;
  public nome:string = '';
  public endereco:string = '';
  public email:string = '';
  public data:string = new Date().toISOString();
  public _alerta:Alert;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _agendamentosService: AgendamentosServiceProvider,
    private _alertCtrl: AlertController,
    private _agendamentoDao: AgendamentoDaoProvider,
    private _vibration: Vibration,
    private _datePicker:DatePicker) {

    this.carro = navParams.get('carroSelecionado');
    this.precoTotal = navParams.get('precoTotal');
    
  }
  selecionaData(){
    this._datePicker.show({
        date: new Date(),
        mode:'date'
    })
    .then(data=>this.data=data.toISOString());
  }
  agenda(){
    //mantem os campos obrigatórios
    if(!this.nome || !this.endereco || !this.email){
      this._vibration.vibrate(500);
      this._alertCtrl.create({
        title:"Preenchimento obrigatório",
        subTitle:"Preencha todos os campos",
        buttons:[
          {text:"OK"}
        ]
      }).present();
      return;
    }
    /*Cria o agendamento */
    let agendamento:Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    }

    this._alerta = this._alertCtrl.create({
      title:"Aviso",
      buttons: [
        {text: 'ok', 
          handler: () => {this.navCtrl.setRoot(HomePage);}
        }
      ]
    });
    let mensagem='';
    this._agendamentoDao.ehDuplicado(agendamento)
    .mergeMap(ehDuplicado=>{
      if(ehDuplicado){
        throw new Error('Agendamento existente!');
      }
      return this._agendamentosService.agenda(agendamento)
    })   
      /*para usar o subscribe no metodo salva */
      .mergeMap((valor)=>{
          let observable = this._agendamentoDao.salva(agendamento);
          if(valor instanceof Error){
            throw valor;
          } 
          return observable;        
        })
      .finally(
        ()=>{
          this._alerta.setSubTitle(mensagem);
          this._alerta.present();
        }
      )
      .subscribe(
        ()=>mensagem = "Seu agendamento foi realizado com sucesso!",
        (err:Error)=> mensagem = err.message
      );     
  }
}