import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
import { ApiServiceProvider } from '../api-service/api-service';

const CHAVE = 'avatar-usuario';

@Injectable()
export class UsuariosServiceProvider {

  private _usuarioLogado:Usuario;
  _url:string;
  
  constructor(public http: HttpClient,
    private api: ApiServiceProvider) {
    this._url = this.api.url;
  }
  efetuaLogin(email,senha){
    return this.http.post<Usuario>(this._url+"/login",{email,senha})
             .do((usuario:Usuario)=>this._usuarioLogado=usuario);
  }
  obtemUsuarioLogado(){
    return this._usuarioLogado;
  }
  salvaAvatar(avatar){
    localStorage.setItem(CHAVE,avatar);
  }

  obtemAvatar(){
    return localStorage.getItem(CHAVE)
          ? localStorage.getItem(CHAVE)
          :"assets/img/avatar-padrao.jpg";
  }
}
