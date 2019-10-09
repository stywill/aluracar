import { Injectable } from '@angular/core';
import { Agendamento } from '../../modelos/agendamento';
import {Storage} from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage:Storage) {
  }

  private _geraChave(agendamento:Agendamento){
    return agendamento.emailCliente+agendamento.data.substr(0,10);
  }

  salva(agendamento:Agendamento){
    let chave = this._geraChave(agendamento);
    let promise = this._storage.set(chave,agendamento);
    return Observable.fromPromise(promise);
  } 

  ehDuplicado(agendamento:Agendamento){
    let chave = this._geraChave(agendamento);
    let promise = this._storage.get(chave).then(dado => dado?true:false);
    return Observable.fromPromise(promise);
  }

  listaTodos(){//função para listar todos os itens agendados da tabela agendamentos
    let agendamentos:Agendamento[] = [];
    let promise = this._storage.forEach((agendamento:Agendamento)=>{
      agendamentos.push(agendamento);
    })
    .then(()=>agendamentos);
    return Observable.fromPromise(promise);
  }
}
