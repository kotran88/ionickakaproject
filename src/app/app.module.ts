import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { SearchPage } from '../pages/search/search';
import {JoinedPage} from '../pages/joined/joined';
import {LoginPage} from '../pages/login/login';
import { StoredetailPage } from '../pages/storedetail/storedetail';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KakaoCordovaSDK } from 'kakao-sdk';
import { RequestPage } from '../pages/request/request';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MetroProvider } from '../providers/metro/metro';
import { MypagePage } from '../pages/mypage/mypage';
import { ManagementPage } from '../pages/management/management';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';

import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {KakaoTalk} from 'ionic-plugin-kakaotalk';
import { StoremanagementPage } from '../pages/storemanagement/storemanagement';
import { ReserveFinishPage } from '../pages/reserve-finish/reserve-finish';
import { CameraselectPage } from '../pages/cameraselect/cameraselect';
var firebaseConfig = {

  apiKey: "AIzaSyC-QvsU4MkUpPwRlMTjjdWbUrCN7TKSZFM",
    authDomain: "hamm-93bfc.firebaseapp.com",
    databaseURL: "https://hamm-93bfc.firebaseio.com",
    projectId: "hamm-93bfc",
    storageBucket: "hamm-93bfc.appspot.com",
    messagingSenderId: "294884813349"
    

};
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    RequestPage,
    StoremanagementPage,
    MypagePage,
    MyApp,
    JoinedPage,
    LoginPage,
    ManagementPage,
    HomePage,
    SearchPage,
    CameraselectPage,
    StoredetailPage,
    ReserveFinishPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    RequestPage,
    CameraselectPage,
    StoremanagementPage,
    MyApp,
    MypagePage,
    ManagementPage,
    JoinedPage,
    LoginPage,
    StoredetailPage,
    SearchPage,
    HomePage,
    ReserveFinishPage
  ],
  providers: [
    StatusBar,
    UniqueDeviceID,
    ScreenOrientation,
    Device,
    KakaoTalk,
    PhotoViewer,
    IonicStorageModule,
    CallNumber,
    Geolocation,
    KakaoCordovaSDK,
    Camera,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MetroProvider
  ]
})
export class AppModule {}
