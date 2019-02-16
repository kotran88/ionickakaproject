import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { StoredetailPage } from '../storedetail/storedetail';
/**
 * Generated class for the MypagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mypage',
  templateUrl: 'mypage.html',
})
export class MypagePage {
  storearray=[];
  userId:any;
  
  firedata = firebase.database();
  constructor(public navCtrl: NavController, public navParams: NavParams) {


    this.userId=navParams.get("userid");
    console.log("user id issss : "+this.userId);
    this.firedata.ref("clients").child(this.userId).once('value',(snapshot)=>{
      this.storearray=[];
      for(var result in snapshot.val()){
        for(var finalresult in snapshot.val()[result]){
          console.log(finalresult);
          console.log(snapshot.val()[result][finalresult])
          this.storearray.push(snapshot.val()[result][finalresult]);
        }
      }
      console.log(this.storearray);
    });
  }
  detail(store){
    this.navCtrl.push(StoredetailPage,{"storeId":store.id,"userId":this.userId,"store":store}).then(()=>{
      this.navCtrl.getActive().onDidDismiss(data => {
       
        console.log("dismiss");
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypagePage');
  }

}
