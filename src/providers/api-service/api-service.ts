import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiServiceProvider {

  private _url:string="http://192.168.10.243:8080/api";
  
  get url(){
    return this._url;
  }
}
