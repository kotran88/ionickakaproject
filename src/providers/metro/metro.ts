import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the MetroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MetroProvider {

  constructor(public http: Http) {

    console.log('Hello MetroServiceProvider Provider');
  }

  getMetro():Observable<any> {
    console.log(this.http.get('assets/metroLocation.json'))
     return this.http.get('assets/metroLocation.json').map(data=>{
       console.log("mock data");
       
        console.log(data.json().DATA);
        return data.json().DATA
     })
     
  
       
  }

}
