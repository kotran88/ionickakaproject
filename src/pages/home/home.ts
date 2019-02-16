import { Component } from '@angular/core';
import { NavController,AlertController,MenuController,Platform,LoadingController,NavParams } from 'ionic-angular';
import { KakaoCordovaSDK, AuthTypes } from 'kakao-sdk';
import firebase from 'firebase';
import {SearchPage}from './../search/search';
import { StoredetailPage } from './../storedetail/storedetail';
import { Geolocation } from '@ionic-native/geolocation';
import { Store } from './../../models/store';
import {LoginPage} from './../../pages/login/login';
import { RequestPage } from '../request/request';
import { Storage } from '@ionic/storage';
import { MypagePage } from '../mypage/mypage';
import { ManagementPage } from '../management/management';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {KakaoTalk} from 'ionic-plugin-kakaotalk';
import { StoremanagementPage } from '../storemanagement/storemanagement';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Device } from '@ionic-native/device';

declare var naver: any;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  superdistance:any;
  userUid:any;
  storeSelected:any;
  logined="";
  rootdata=firebase.database();
  firedata = firebase.database().ref('store');
  location:any;
  flagtostart:any=true;
  store={} as Store
  lat:any;
  id:any;
  storemention:any;
  denyreason:any;
  lng:any;
  storearray=[];
  imageUrl:any;
  myStoreId:any;
  name:any;
  flag:any;

  loading:any;
  requestFlag:any="입점신청";
  matchedKeyword="t";
  matchedStation="";
  requesttoconfig(){
    if(this.logined=="true"){
      if(this.requestFlag=="입점신청"){
        this.navCtrl.push(RequestPage)
      }else{
        this.navCtrl.push(StoremanagementPage,{"store":this.myStoreId})
      }
    
    }else{
      alert("로그인을 해주세요")
    }
  
  }

  getData2 = data =>
  {
    console.log(data);
    console.log("callbackcome") 
    this.menuCtrl.toggle();

  };
  requesttoopen(){
    console.log("flagㅎㅎ info is : "+this.flag);
    console.log(this.logined);
    if(this.logined=="false"){
      alert("로그인을 해주세요!")
    }else{
      
      if(this.flag!=undefined){
        console.log(this.flag);
        if(this.flag.trim()=="승인대기중"){
          alert("현재 입점 심청 승인작업중입니다");
        }else if(this.flag.trim()=="승인됨"){
          alert("관리화면으로 이동합니다.");
          this.navCtrl.push(ManagementPage,{"store":this.myStoreId,"callback":this.getData2})
        }else if(this.flag=="거절됨"){
          if(this.logined=="false"){
            alert("로그인 된 사용자만 입점 신청 가능합니다.");
          }else{
            alert("입점 신청화면으로 이동합니다");
            this.navCtrl.push(RequestPage)
          }
        }else{
          if(this.logined=="false"){
            alert("로그인 된 사용자만 입점 신청 가능합니다.");
          }else{
            alert("입점 신청화면으로 이동합니다");
            this.navCtrl.push(RequestPage)
          }
        }
      }else{
        alert("입점 신청화면으로 이동합니다");
        this.navCtrl.push(RequestPage,{"id":"92"})
      }
    }
    
    
    
  }
  category(value){
    console.log(value);

}
  mypage(){

    this.navCtrl.push(MypagePage,{"userid":this.userUid});
  }
  kakaoLogin(){
    let loginOptions = {};
    loginOptions['authTypes'] = [
                                  AuthTypes.AuthTypeTalk, 
                                  AuthTypes.AuthTypeStory,
                                  AuthTypes.AuthTypeAccount
                                ];
    
    this._kakaoCordovaSDK.login(loginOptions).then((res) => {
        console.log(res);
        localStorage.setItem("photo",res.properties.thumbnail_image)
            localStorage.setItem("name",res.properties.nickname);
            localStorage.setItem("id",res.id);
           
            this.userUid=res.id;
            this.name=localStorage.getItem("name");
            this.imageUrl=localStorage.getItem("photo");
            this.logined="true";
            console.log(this.userUid);
            console.log(this.name);
            console.log(this.imageUrl);
            console.log(this.logined);

      }
    ).catch((e)=>{
      alert( JSON.stringify(e, Object.getOwnPropertyNames(e)));
    })
    // this.kakao.login(
     

    //   ).then((result)=>{
    
    //     alert("success!!")
    //     alert(result.nickname);
    //     console.log("success");
    //     console.log(result);
    //   }).catch((e)=>{
    
    //     alert("falied")
    //     alert(e);
    //     alert( JSON.stringify(e, Object.getOwnPropertyNames(e)));
    //     console.log("failed");
    //     console.log(e);
    //   })
    // let loginOptions = {};
    // loginOptions['authTypes'] = [
    //                               AuthTypes.AuthTypeTalk, 
    //                               AuthTypes.AuthTypeStory,
    //                               AuthTypes.AuthTypeAccount
    //                             ];
    
    // this._kakaoCordovaSDK.login(loginOptions).then((res) => {
    //   console.log("done");
    //     console.log(res.properties);
    //     console.log(res.id);
    //     // this.navCtrl.setRoot(HomePage,{"id":res.id,"name":res.properties.nickname,"photo":res.properties.thumbnail_image})
    //     //res.id 를 키 값으로 사용해서 유저 구분 가능할듯? 
    //     //대체 왜 이메일은 못받지??? ㅜㅠㅜㅠㅜㅜㅜ
    //   
    //   }
    // ).catch((e)=>{
     
    //   
    // })
  }
  ngOnInit(){
    console.log("ngOnInit");
  }
  ionViewWillEnter(){
    console.log("view did enterrrrrrrr"+this.userUid);
    
  }
  ionViewDidLoad(){
  }
  
  ionViewDidEnter(){
this.userUid=this.device.uuid;
console.log("ionic view didloaded"+this.flagtostart);

this.rootdata.ref().child("distance").on('value',(snap)=>{

  console.log("newdistance")
  console.log(snap.val());
  this.superdistance=snap.val().value;
})
var photo="";
var name="";
var id="";

photo =localStorage.getItem("photo");
name =localStorage.getItem("name");
id =localStorage.getItem("id");

console.log("this is basic")
console.log(photo);
console.log(name);
console.log(id);



    /*
    
    925391539
main.js:176 정긍정
main.js:177 https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg
main.js:178 true
*/
if(photo!=null){
if(photo.length==9){
// this.logined="true";
// this.id="925391539";
// this.userUid="925391539"

// this.name="마스터이름";
// this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
// localStorage.setItem("photo",this.imageUrl);
//     localStorage.setItem("name",this.name);
//     localStorage.setItem("id",this.userUid);
}else{

console.log("showing kakao");
this.imageUrl=photo;
this.id=id;
this.name=name;
this.logined="true";

this.userUid=this.id;
}
}else{
this.logined="true";
this.id="92539153999";
this.userUid="92539153999"

this.name="마스터이름";
this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
// localStorage.setItem("photo",this.imageUrl);
// localStorage.setItem("name",this.name);
// localStorage.setItem("id",this.userUid);
}

if(this.userUid!=undefined){
  this.firedata.once('value',(snapshot)=>{
    
    var value:any;
    
     
    for(var result in snapshot.val()){
      var requestor=snapshot.val()[result].requestedby
      var flag=snapshot.val()[result].approval;
      var mystore=snapshot.val()[result].id;
      console.log("requestorㄲㄲ : "+requestor);
      console.log(this.userUid);
      console.log(flag);
      if(requestor==this.userUid){
        console.log("matched");
        console.log(snapshot.val()[result]);

        console.log(result);
        console.log("matched haha");
        
        if(flag=="denied"){
          this.flag="거절됨";
          this.requestFlag="거절됨\n"+this.denyreason;
         
          this.denyreason=snapshot.val()[result].reason;
        }else if(flag=="true"||flag==true){
          this.myStoreId=snapshot.val()[result];
          this.flag="승인됨";
          this.requestFlag="승인됨 (클릭시 관리화면으로)";
        }else if(flag==false||flag=="false"){
          this.flag="승인대기중";
          this.requestFlag="입점 승인 대기중"
         
        }
        this.storeSelected=result;
        
      }

    }

    console.log("flag conditionnnnnnn"+this.flag);
  });
  console.log("?????")
}else{
}
console.log("flagtostart");
console.log(this.flagtostart);
if(this.flagtostart){

 
// if(this.platform.is("ios")){
//   console.log("ios view did entered")

// }
  console.log("starting to positioning");
  
    this.starttotrack();
  

  this.flagtostart=false;
}

  }
  gotoback(){
    this.matchedKeyword="t";
    this.generateStore();
  }
  starttotrack(){
    console.log("starttotracking come")
    this.location="위치정보를 받아오는중...";
    let options = {
      timeout: 15000,
      enableHighAccuracy: false
      }
    let GPSoptions = {timeout: 15000, enableHighAccuracy: false, maximumAge: 3600};
  this.geo.getCurrentPosition(options).then(resp=>{

    this.location="위치...";
   
    if(this.loading!=null){
      this.loading.dismiss();
    }
    // this.lat=35.803093;
    // this.lng=127.115098;
    this.lat=resp.coords.latitude;
    this.lng=resp.coords.longitude;
    console.log("currentlocatipn"+this.lat+"///"+this.lng);

  
    this.generateStore()
    naver.maps.Service.reverseGeocode({
      location: new naver.maps.LatLng(this.lat, this.lng),
  }, (status,response)=> {
      if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!');
      }

      var result = response.result, // 검색 결과의 컨테이너
          items = result.items; // 검색 결과의 배열
          console.log(result);
          console.log(items[0].address);
          var res=items[0].address.split(" ");
          console.log(res.length);
          for (var i=0; i<res.length; i++){
            console.log(res[i]);
          }
          console.log(res[0]+"/"+res[1]+"//"+res[2]);
          this.location=res[0]+" "+res[1]+" "+res[2];

      // do Something
  });
  }).catch((e)=>{
    this.location="position error"+e;
    if(this.loading!=null){
      this.loading.dismiss();
    }
      // this.loading.dismiss();
     this.lat=35.803093;
    this.lng=127.115098;
    this.generateStore()
    console.log("geo loading error:");
    console.log(e);
    // this.starttotrack();
    return;
    //37.488079, 127.045135
   
  });
  }
  
   calcCrow(lat1, lon1, lat2, lon2) 
    {
      var lat1:any;
      var lat2:any;
      var R = 6371; // km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
       lat1 = this.toRad(lat1);
       lat2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
     toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
    generateStore(){

      console.log("come to generating store...");
      this.firedata.once('value').then((snapshot) =>{
        this.storearray=[];
        var value:any;
        for(var result in snapshot.val()){
          console.log(this.lat+"????"+this.lng);
          var distance=this.calcCrow(snapshot.val()[result].lat,snapshot.val()[result].lng,this.lat,this.lng).toFixed(2);
          if(snapshot.val()[result].approval==true||snapshot.val()[result].approval=="true"){
            console.log("distance store is :")
            console.log(Number(distance)*1000);
            if(this.superdistance>Number(distance)*1000){
              console.log("show!!!");
              console.log("promotion");
              console.log(snapshot.val()[result])
              console.log(snapshot.val()[result].promotion);
              if(snapshot.val()[result].reservationStart!=undefined){
                this.storearray.push({"tel":snapshot.val()[result].tel,"reservationStart":snapshot.val()[result].reservationStart,"reservationEnd":snapshot.val()[result].reservationEnd,"reservationNumber":snapshot.val()[result].reservationNumber,"timeInterval":snapshot.val()[result].timeInterval,"promotion":snapshot.val()[result].promotion,"dis":Number(distance)*100,"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage,"firstImage":snapshot.val()[result].firstImage,"secondImage":snapshot.val()[result].secondImage,"thirdImage":snapshot.val()[result].thirdImage,"fourthImage":snapshot.val()[result].fourthImage,"descriptionImage":snapshot.val()[result].descriptionImage,"approval":snapshot.val()[result].approval})
              }else{
                this.storearray.push({"tel":snapshot.val()[result].tel,"promotion":snapshot.val()[result].promotion,"dis":Number(distance)*1000,"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage,"firstImage":snapshot.val()[result].firstImage,"secondImage":snapshot.val()[result].secondImage,"thirdImage":snapshot.val()[result].thirdImage,"fourthImage":snapshot.val()[result].fourthImage,"descriptionImage":snapshot.val()[result].descriptionImage,"approval":snapshot.val()[result].approval})
              }
             
            }
            }
          }
          if(this.storearray.length==0){
            this.storemention=this.superdistance+"M 이내에 가게가 없습니다";
          }

          
    var sortingField = "promotion";

    this.storearray.sort(function(a, b) { // 오름차순
      return (a[sortingField] === b[sortingField])? 0 : a[sortingField]? -1 : 1;
  });
  
  
        
      });
    }
  constructor(private device: Device,private uniqueDeviceID: UniqueDeviceID,private screenOrientation: ScreenOrientation,public menuCtrl: MenuController,public kakao:KakaoTalk,public platform:Platform,public alertCtrl: AlertController,public navParams: NavParams,public load:LoadingController,public geo:Geolocation,public _kakaoCordovaSDK: KakaoCordovaSDK,public navCtrl: NavController) {
  
    this.loading = this.load.create({
    content: `Loading..`,
    });
    this.loading.present();
    if(this.platform.is("android")||this.platform.is("ios")){
    
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

    }
  

    console.log("constructor");

    this.rootdata.ref().child("distance").on('value',(snap)=>{

      console.log("newdistance")
      console.log(snap.val());
      this.superdistance=snap.val().value;
    })
    var photo="";
    var name="";
    var id="";
    
    photo =localStorage.getItem("photo");
    name =localStorage.getItem("name");
    id =localStorage.getItem("id");

    console.log("this is basic")
    console.log(photo);
    console.log(name);
    console.log(id);



        /*
        
        925391539
main.js:176 정긍정
main.js:177 https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg
main.js:178 true
*/
if(photo!=null){
  if(photo.length==9){
    // this.logined="true";
    // this.id="925391539";
    // this.userUid="925391539"

    // this.name="마스터이름";
    // this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
    // localStorage.setItem("photo",this.imageUrl);
    //     localStorage.setItem("name",this.name);
    //     localStorage.setItem("id",this.userUid);
  }else{

    console.log("showing kakao");
    this.imageUrl=photo;
    this.id=id;
    this.name=name;
    this.logined="true";
  }
}else{
  this.logined="false";
  // this.id="925391539";
  // this.userUid="925391539"

  // this.name="마스터이름";
  // this.imageUrl="https://k.kakaocdn.net/dn/yBGEM/btqo9Jhcla5/nxAiHGASvr8gI8Mx0muCHK/profile_110x110c.jpg"
  // localStorage.setItem("photo",this.imageUrl);
  // localStorage.setItem("name",this.name);
  // localStorage.setItem("id",this.userUid);

}
    
    console.log("userid issss:"+this.userUid);
    this.userUid=this.id;

    
    
    if(this.userUid!=undefined){
      this.firedata.once('value',(snapshot)=>{
        this.storearray=[];
        var value:any;
        
         
        for(var result in snapshot.val()){
          var requestor=snapshot.val()[result].requestedby
          var flag=snapshot.val()[result].approval;
          console.log("requestorㄲㄲ : "+requestor);
          console.log(this.userUid);
          console.log(flag);
          if(requestor==this.userUid){
            console.log("matched");
  
            if(flag=="denied"){
              this.flag="거절됨";
              this.requestFlag="거절됨\n"+this.denyreason;
             
              this.denyreason=snapshot.val()[result].reason;
            }else if(flag=="true"||flag==true){
              this.flag="승인됨";
              this.requestFlag="승인됨 (클릭시 관리화면으로)";
            }else if(flag==false||flag=="false"){
              this.flag="승인대기중";
              this.requestFlag="입점 승인 대기중"
             
            }
            this.storeSelected=result;
            
          }
  
        }
  
        console.log("flag condition"+this.flag);
        this.generateStore();
      });
    }else{


console.log('Device UUID is: ' + this.device.uuid);

// this.uniqueDeviceID.get()
// .then((uuid: any) => {
  
//   this.userUid=uuid
// } )
// .catch((error: any) => alert(error));
     
    }
    
    
  }
  logout(){
    localStorage.setItem("photo",undefined);
      localStorage.setItem("name",undefined);
      localStorage.setItem("id",undefined);
      this.logined="false";
    // this.kakao.logout().then(()=>{
    //   console.log("success logout");
      
    //   alert("로그아웃완료");
    // })
  }
  search(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'keyword',
          placeholder: '키워드입력'
        }
      ],
      buttons: [
        {
          text: '취소',
          handler: data => {
            
          }
        },
        {
          text: '검색',
          handler: data => {

            console.log(data.keyword);


            this.matchedKeyword=data.keyword;
            this.firedata.once('value').then((snapshot) =>{
              this.storearray=[];
              var value:any;
              var flag=false;
              for(var result in snapshot.val()){
                console.log(result);
                console.log(snapshot.val()[result])
                var keywords=snapshot.val()[result].keywords;
                console.log(keywords);
                if(keywords!=undefined){
                  var array = [];
                 
                  array=snapshot.val()[result].keywords.split(',');
                  for(var i=0; i<array.length; i++){
                    console.log(array[i]);
                    if(array[i]==data.keyword){
                      console.log(array[i]+"가 일치");
                      flag=true;
                    }
                  }
                  if(flag){
                    this.storearray.push({"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage})
                  }
                }
              }

              if(!flag){
                this.matchedKeyword="false";
              }
            });
          }
        }
        
      ]
    });
    alert.present();
    // 
  }
  locate(){
    this.navCtrl.push(SearchPage,{"lat":this.lat,"lng":this.lng}).then(() => {
      this.navCtrl.getActive().onDidDismiss(data => {
        //on dismiss from menu add page
        console.log("SearchPage add on dismiss");
        console.log(data);
        if(data!=undefined){
          console.log("distance is :");
          var flag=data.flag;
          console.log(flag);
  
          this.firedata.once('value').then((snapshot) =>{
            this.storearray=[];
            var value:any;
            for(var result in snapshot.val()){
              console.log(result);
             
             
                var arrayX = [];
                var arrayY= [];
                var arrayApproval= [];
               if(flag=="address"){
  
               }else if(flag=="station"){
  
               }
                arrayX.push(snapshot.val()[result].lat)
                arrayY.push(snapshot.val()[result].lng);
                arrayApproval.push(snapshot.val()[result].approval);
                for(var i=0; i<arrayX.length; i++){
                  console.log(arrayX[i]);
                  console.log("distance is :");
                  console.log(this.calcCrow(arrayX[i],arrayY[i],data.x,data.y).toFixed(2));
                  var distance=this.calcCrow(arrayX[i],arrayY[i],data.x,data.y).toFixed(2);
                  console.log("final distance : "+Number(distance)*1000);
                  if(Number(distance)*1000<5000){
                    console.log("20km 이내는 : ")
                    console.log(snapshot.val()[result])
                    if(arrayApproval[i]==true||arrayApproval[i]=="true"){
                      if(snapshot.val()[result].reservationStart!=undefined){
                        this.storearray.push({"reservationStart":snapshot.val()[result].reservationStart,"reservationEnd":snapshot.val()[result].reservationEnd,"reservationNumber":snapshot.val()[result].reservationNumber,"timeInterval":snapshot.val()[result].timeInterval,"promotion":snapshot.val()[result].promotion,"dis":Number(distance)*1000,"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage,"firstImage":snapshot.val()[result].firstImage,"secondImage":snapshot.val()[result].secondImage,"thirdImage":snapshot.val()[result].thirdImage,"fourthImage":snapshot.val()[result].fourthImage,"descriptionImage":snapshot.val()[result].descriptionImage,"approval":snapshot.val()[result].approval})
                      }else{
                        this.storearray.push({"promotion":snapshot.val()[result].promotion,"dis":Number(distance)*1000,"name":snapshot.val()[result].name,"id":snapshot.val()[result].id,"address":snapshot.val()[result].address,"mainImage":snapshot.val()[result].mainImage,"firstImage":snapshot.val()[result].firstImage,"secondImage":snapshot.val()[result].secondImage,"thirdImage":snapshot.val()[result].thirdImage,"fourthImage":snapshot.val()[result].fourthImage,"descriptionImage":snapshot.val()[result].descriptionImage,"approval":snapshot.val()[result].approval})
                      }
               
                    }
                      }
               
                }
            }
            this.matchedStation=data.stname;
          });
  
          console.log(this.calcCrow(this.lat,this.lng,data.x,data.y).toFixed(2))
  
        }
        
      });
    });
  }
  detail(store){
    console.log("thissssssss user id is :"+this.userUid);
    console.log(store);
    this.navCtrl.push(StoredetailPage,{"storeId":store.id,"userId":this.userUid,"store":store}).then(()=>{
      this.navCtrl.getActive().onDidDismiss(data => {
       
        console.log("dismiss");
      });
    })
    
  }
  getSession(){

    this._kakaoCordovaSDK.getAccessToken().then((res) => {
      console.log(res);
    }
  );
  }
  
  share(){


    let feedLink: KLLinkObject = {
      webURL: 'url that registered in the domain section in kakao developer console',
    };


    let feedButtons1: KLButtonObject = {
      title: 'button1',
      link: {
        mobileWebURL: 'url that registered in the domain section in kakao developer console',
      },
    };


    let feedContent: KLContentObject = {
      title: 'title',
      link: feedLink,
      imageURL: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png'
    };


    let feedTemplate: KLFeedTemplate = {
      content: feedContent,
      buttons: [feedButtons1]
    };


    this._kakaoCordovaSDK
      .sendLinkFeed(feedTemplate)
      .then(
        res => {
         
          console.log(res);
          
        },
        err => {
          alert(err);
          console.log(err);
        }
      )
      .catch(err => {
        console.log(err);
      });
  }
  // kakaoLogin(){
  //   let loginOptions = {};
  //   loginOptions['authTypes'] = [
  //                                 AuthTypes.AuthTypeTalk, 
  //                                 AuthTypes.AuthTypeStory,
  //                                 AuthTypes.AuthTypeAccount
  //                               ];
    
  //   this._kakaoCordovaSDK.login(loginOptions).then((res) => {
  //     console.log("done");
  //       console.log(res);
  //       console.log(res.id);
  //       alert(res.id);
  //       //res.id 를 키 값으로 사용해서 유저 구분 가능할듯? 
  //       //대체 왜 이메일은 못받지??? ㅜㅠㅜㅠㅜㅜㅜ

  //       this._kakaoCordovaSDK
  //     .requestMe()
  //     .then(
  //       res => {
  //         console.log(res);
  //       },
  //       err => {
  //       }
  //     )
  //     .catch(err => {
  //     });
  //     }
  //   ).catch((e)=>{
  //     alert(e);
  //     console.log("error");
  //     console.log(e);
  //   })
  // }

}
export interface KLButtonObject {
  title: string;
  link: KLLinkObject;
}
export interface KLContentObject {
  title: string;
  link: KLLinkObject;
  imageURL: string;
  desc?: string;
  imageWidth?: string;
  imageHeight?: string;
}
export interface KLLinkObject {
  webURL?: string;
  mobileWebURL?: string;
  androidExecutionParams?: string;
  iosExecutionParams?: string;
}
export interface KLFeedTemplate {
  content: KLContentObject;
  buttonTitle?: string;
  buttons?: KLButtonObject[];
}
