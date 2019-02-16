import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the ReserveFinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reserve-finish',
  templateUrl: 'reserve-finish.html',
})
export class ReserveFinishPage {

  time:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
    this.time=this.navParams.get("time");
 
  }

  returning(){
    this.navCtrl.setRoot(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReserveFinishPage');
  }

}
