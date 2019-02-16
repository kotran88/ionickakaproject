import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { Store } from '../../models/store';

import firebase from 'firebase';
/**
 * Generated class for the StoremanagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-storemanagement',
  templateUrl: 'storemanagement.html',
})
export class StoremanagementPage {
  arraydisabledTime=[];
  matchedreservearray=[];
  newarrayy=[];
  reservearray=[];
  firedata = firebase.database().ref('store');
  store={} as Store;
  disabledTime:any;
  constructor(public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.store=this.navParams.get("store");
    console.log(this.store);

    this.firedata.child(this.store.id).once('value',(snapshot)=>{
    
      var value:any;
      
       
      for(var result in snapshot.val()){
        if(result=="disabledTime"){
          this.disabledTime=snapshot.val()[result];
          console.log("disabledTime:"+this.disabledTime);
         this.arraydisabledTime=this.disabledTime.split(",");

    this.firedata.child(this.store.id).child("reservationList").once('value',(snapshot)=>{
    
      var value:any;
      /**
       * 예약자명 : {{reserve.name}}<br>
                   연락처 :     {{reserve.phone}}<br>
                   총인원수 :     {{reserve.numberofpeople}}<br>
                   예약일 :     {{reserve.month}}월 {{reserve.day}}일 {{reserve.time}}시<br>
                   예약신청시간 :     {{reserve.requestDate}}<br>
       */
       
      for(var result in snapshot.val()){
        console.log(result);
        console.log(snapshot.val()[result])
        this.reservearray.push({"phone":snapshot.val()[result].phone,"matched":false,"name":snapshot.val()[result].name,"numberofpeople":snapshot.val()[result].numberofpeople,"month":snapshot.val()[result].month,"day":snapshot.val()[result].day,"time":snapshot.val()[result].time,"requestDate":snapshot.val()[result].requestDate})
      
        for(var i=0; i<this.arraydisabledTime.length; i++){
          if(this.arraydisabledTime[i]==snapshot.val()[result].time){
            console.log("matched!!!");
            console.log(this.arraydisabledTime[i])
            this.matchedreservearray.push({"phone":snapshot.val()[result].phone,"matched":true,"name":snapshot.val()[result].name,"numberofpeople":snapshot.val()[result].numberofpeople,"month":snapshot.val()[result].month,"day":snapshot.val()[result].day,"time":snapshot.val()[result].time,"requestDate":snapshot.val()[result].requestDate})
       
          }else{
            
          }
          
        }
        
        
      }
      console.log(this.reservearray);
      for(var i=0; i<this.reservearray.length; i++){

        for(var j=0; j<this.matchedreservearray.length; j++){
          if(this.reservearray[i].name==this.matchedreservearray[j].name){
            this.reservearray.splice(i,1);
          }
        }
        
      }

      console.log(this.matchedreservearray);
      this.newarrayy=this.reservearray.concat(this.matchedreservearray);
      console.log(this.newarrayy);
    });
        }
        
      }
    });
    



  }
  disabledd(v,value){
    console.log(v);
    console.log(value);
    if(value=="toable"){

    }else if(value=="todisable"){

    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoremanagementPage');
  }

}
