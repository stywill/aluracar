import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Carros } from '../../modelos/carro';
import { ApiServiceProvider } from '../api-service/api-service';

@Injectable()
export class CarrosServiceProvider {
  _url:string;
  constructor(private _http: HttpClient, private api:ApiServiceProvider) {
    this._url = this.api.url;
  }

  lista(){
    return this._http.get<Carros[]>(this._url+'/carro/listaTodos');
  }  
}
