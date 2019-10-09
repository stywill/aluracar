import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AgendamentoDaoProvider } from '../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';

@IonicPage()
@Component({
  selector: 'page-lista-agendamentos',
  templateUrl: 'lista-agendamentos.html',
})
export class ListaAgendamentosPage {
  public agendamentos:Agendamento[]
  private _alerta:Alert;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _agendamentosDao:AgendamentoDaoProvider,
    private _alertCtrl:AlertController,
    private _agendamentosService: AgendamentosServiceProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaAgendamentosPage');

    this._agendamentosDao.listaTodos()
    .subscribe(
      (agendamentos:Agendamento[])=>{
        this.agendamentos = agendamentos;
        console.log(this.agendamentos);
      }
    );
   
  }

  reenvia(agendamento:Agendamento){    
    this._alerta = this._alertCtrl.create({
      title:"Aviso",
      buttons: [
        {text: 'OK'
        }
      ]
    });
    let mensagem='';
    this._agendamentosService.agenda(agendamento)  
      /*para usar o subscribe no metodo salva */
      .mergeMap((valor)=>{
          let observable = this._agendamentosDao.salva(agendamento);
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
        ()=>mensagem = "Seu agendamento foi reenviado com sucesso!",
        (err:Error)=> mensagem = err.message
      ); 
  }
}
