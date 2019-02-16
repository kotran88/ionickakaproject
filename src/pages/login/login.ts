import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage}from './../home/home';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public _kakaoCordovaSDK: KakaoCordovaSDK,public navCtrl: NavController, public navParams: NavParams) {
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  getSession(){

    this._kakaoCordovaSDK.getAccessToken().then((res) => {
      console.log(res);
      return res;
    });
  }
  
  kakaoLogin(){
    let loginOptions = {};
    loginOptions['authTypes'] = [
                                  AuthTypes.AuthTypeTalk, 
                                  AuthTypes.AuthTypeStory,
                                  AuthTypes.AuthTypeAccount
                                ];
    
    this._kakaoCordovaSDK.login(loginOptions).then((res) => {
      console.log("done");
        console.log(res.properties);
        console.log(res.id);
        this.navCtrl.setRoot(HomePage,{"id":res.id,"name":res.properties.nickname,"photo":res.properties.thumbnail_image})
        //res.id 를 키 값으로 사용해서 유저 구분 가능할듯? 
        //대체 왜 이메일은 못받지??? ㅜㅠㅜㅠㅜㅜㅜ

        this._kakaoCordovaSDK
      .requestMe()
      .then(
        res => {
          console.log(res);
        },
        err => {
        }
      )
      .catch(err => {
      });
      }
    ).catch((e)=>{
      alert(JSON.stringify(e));
      console.log("error");
      console.log(e);
    })
  }

}
