import { Component } from '@angular/core';
import { IonicPage, NavController,ViewController,ModalController, LoadingController,NavParams } from 'ionic-angular';
import {Store} from './../../models/store';
import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { CameraselectPage } from '../cameraselect/cameraselect';
/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var naver: any;
 
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  storeKey:any;
  keyarray=[];
  firedata = firebase.database().ref('store');
  store={} as Store
  public picdata:any;
  public mypicref:any;
  type:any;
  regnumber:any;
  emergencytel:any;
  representitive:any;
  newkey:any;
  number=0;
  name:string;
  id:string;
  newRef:any;
  address:string;
  description:string;
  descriptionurl:string;
  keywords:string;
  picurl:any;
  lat:string;
  lng:string;
  mainImage:string
  tel:string;
  nowtime:string;
  userUid:string;
  base64Image:string;
  firsturl:string;
  counting=0;
  secondurl:string;
  thirdurl:string;
  fourthurl:string;
  descriptionphoto:string;

  facility:string;
  firstdata:any;
  seconddata:any;
  thirddata:any;

  fourthdata:any;

  fifthurl:string;
  fifthdata:any;
  sixthurl:string;
  sixthdata:any;
  seventhurl:string;
  seventhdata:any;

  descriptiondata:any;
  constructor(public modal:ModalController,public view:ViewController,public camera:Camera,public loading:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    var today = new Date();
    today.setHours(today.getHours()+9);
    this.mypicref=firebase.storage().ref('/');
    
    this.newRef = this.firedata.push();
    // this.storeKey=this.firedata.push(this.store).key;
 
    this.userUid=localStorage.getItem("id");
    if(this.userUid==null){
      this.userUid="929292";
    }
    console.log("user uid is : "+this.userUid);
    var d = new Date();
    var days = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"];
    var day =  days[d.getDay()];

  
    var thisday = new Date();
    thisday.toLocaleString('ko-KR', { hour: 'numeric', minute: 'numeric', hour12: true })
    var month = thisday.getMonth();
    var date = thisday.getDate();
    var hour = thisday.getHours();
    var minute = thisday.getMinutes();
    var fullyear = thisday.getFullYear();
    var second=thisday.getSeconds();
    console.log("this is the day")
    // new Date().toString("hh:mm tt")
    console.log(thisday)
    console.log(today)
    console.log(month+1);
    console.log(date);
    console.log((hour)+"시");
    console.log(minute);
    console.log(fullyear)


     this.nowtime = ""+(month+1)+date+(hour)+minute+second;
  }

  requesting(){
   
    // console.log(this.firstdata);
    // console.log(this.picdata);
   

    console.log("gogogo");
/**var newRef = this.firedata.child(this.firstvalue).child(this.value.title).push();
      var newItem = 
        {"question":this.question,"answer":this.answer,"key":newRef.key,"favorite":"no","questionPic":this.questionPic,"answerPic":this.answerPic,"no":count-1};
    newRef.set(newItem); */
    this.store.approval=false;
    this.store.name=this.name;
    this.store.address=this.address;
    this.store.tel=this.tel;
   
    this.store.description=this.description;
    this.store.requestedDate=this.nowtime
   
    this.store.requestedby=this.userUid;
    console.log(this.store);
    naver.maps.Service.geocode({
      address: '불정로 6'
  }, (status,response)=> {
      if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!');
      }
      var result = response.result, // 검색 결과의 컨테이너
          items = result.items; // 검색 결과의 배열
          console.log(result);
          console.log(items[0]);
          console.log(items[0].point.x);
          console.log(items[0].point.y);
          console.log("65sss");
          this.store.lat=items[0].point.y;
          console.log("this isssssss 57")
          this.store.lng=items[0].point.x;
          // this.storeKey=this.firedata.push(this.store).key;
         
          // console.log(this.firedata.push(this.store).key)
         
          if(this.name==undefined){
            alert("가게명을 입력해주세요");
            return;
          }
          if(this.description==undefined){
            alert("설명을 입력해주세요");
            return;
          }
          if(this.address==undefined){
            alert("주소를 입력해주세요");
            return;
          }
          
          if(this.tel==undefined){
            alert("연락처 입력해주세요");
            return;
          }
          if(this.emergencytel==undefined){
            alert("비상 연락처 입력해주세요");
            return;
          }
          if(this.regnumber==undefined){
            alert("사업자 번호를 입력해주세요");
            return;
          }
          alert(this.representitive);
          if(this.representitive==undefined){
            alert("대표자명을 입력해주세요");
            return;
          }
          if(this.picdata==undefined){
            this.picurl="null";
            alert("메인 이미지를 입력해주세요")
            return;
          }
         
          this.store.regnumber=this.regnumber;
          this.store.representitive=this.representitive;
          this.store.emergencytel=this.emergencytel;
          this.storeKey=this.newRef.key;
          this.store.id=this.newRef.key;


        
       

        if(this.firsturl==undefined){
          this.firsturl="none";
        }
        if(this.secondurl==undefined){
          this.secondurl="none";
        }
        if(this.thirdurl==undefined){
          this.thirdurl="none";
        }
        if(this.fourthurl==undefined){
          this.fourthurl="none";
        }
        if(this.fifthurl==undefined){
          this.fifthurl="none";
        }
        if(this.sixthurl==undefined){
          this.sixthurl="none";
        }
        if(this.seventhurl==undefined){
          this.seventhurl="none";
        }

       if(this.picurl!=undefined){
           
   
          console.log("aaaaaaaaaaaaaaaaaaaaaaa")
         this.store.mainImage=this.picurl;
         this.store.firstImage=this.firsturl;
         this.store.secondImage=this.secondurl;
         this.store.thirdImage=this.thirdurl;
         this.store.fourthImage=this.fourthurl;
         this.store.fifthImage=this.fifthurl;
         this.store.sixthImage=this.sixthurl;
         this.store.seventhImage=this.seventhurl;
         this.store.keywords=this.newkey;
         this.store.facility=this.facility;
         console.log("done")
         console.log(this.store);
        //  this.newRef.set(this.store);
 
 
        //  setTimeout(()=>{
        //    alert('신청이 완료되었습니다.')
        //    this.view.dismiss();
        //  },500)
       }
        console.log("photo upload end");






          // if(this.picdata!=undefined){
          //   console.log("main upload start");
          //     // this.upload("main",this.picdata);
             
          // }
          // if(this.firstdata!=undefined){
          //   console.log("first upload start");
          //   // this.upload("first",this.firstdata);

          //   this.mypicref.child(this.storeKey).child("firstImage")
          //   .putString(this.firstdata,'base64',{contentType:'image/jpeg'})
          //   .then((savepic)=>{
          //     console.log("saving pic for first");
          //     console.log(savepic);
          //     this.mypicref.child(this.store.id).child("firstImage").getDownloadURL().then((url)=> {
          //       console.log("first new url is : "+url);

              
          //       // this.generateagain();
          //     })
          //   }).catch((e)=>{
          //     console.log("ecome");
          //     console.log(e);
          //   })

          // }
          // if(this.seconddata!=undefined){
          //   console.log("second upload start");
          //   // this.upload("second",this.seconddata);
          // }
          // if(this.thirddata!=undefined){
          //   console.log("4444");
          //   // this.upload("third",this.thirddata);
          // }
          // if(this.fourthdata!=undefined){
          //   console.log("5555");
          //   // this.upload("fourth",this.fourthdata);
          // }
          // if(this.fifthdata!=undefined){
          //   console.log("5555");
          //   // this.upload("fifth",this.fifthdata);
          // }
          // if(this.sixthdata!=undefined){
          //   console.log("5555");
          //   // this.upload("sixth",this.sixthdata);
          // }
          // if(this.seventhdata!=undefined){
          //   console.log("5555");
          //   // this.upload("seventh",this.seventhdata);
          // }
          // if(this.descriptiondata!=undefined){
          //   console.log("66666");
          //   // this.upload("description",this.descriptiondata);
          // }

          console.log("upload finished done");
          
       
    //     

 });
  
   
  }
  keywordchanged(){
    // console.log(this.keyword);
    // console.log(this.newkey);
    this.newkey="";
    console.log(this.number);
    console.log(this.keywords.split(","))
    this.keyarray=this.keywords.split(",");
    for(var i=0;i<this.keyarray.length; i++){

      if(i==this.keyarray.length-1){
        this.newkey+=this.keyarray[i];
      }else{
        this.newkey+=this.keyarray[i]+","
      }
    }
    console.log(this.newkey);
   
  }
  takePhoto(flag){

            
    var value="";
    let modal = this.modal.create(CameraselectPage);
    modal.onDidDismiss(imagedata => {
      if(imagedata!=undefined){
        this.picdata=imagedata.data;
        this.base64Image = "data:image/jpeg;base64," + imagedata.data;
        console.log("get pic");
        if(imagedata.data!=undefined){
          if(flag=="main"){
            value="mainImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata.data;
            console.log("key is : "+this.newRef.key);
    
            this.mypicref.child(this.newRef.key).child("mainImage")
            .putString(this.picdata,'base64',{contentType:'image/jpeg'})
            .then((savepic)=>{
              console.log("saving pic for main");
              console.log(savepic);
              this.mypicref.child(this.newRef.key).child("mainImage").getDownloadURL().then((url)=> {
                console.log("main new url is : "+url);
              })
            }).catch((e)=>{
              console.log("ecome");
              console.log(e);
            })

          }
          if(flag=="first"){
            value="firstImage.png";
            this.firsturl=this.base64Image;
            this.firstdata=imagedata.data;

            this.mypicref.child(this.newRef.key).child("firstImage")
            .putString(this.firstdata,'base64',{contentType:'image/jpeg'})
            .then((savepic)=>{
              console.log("saving pic for first");
              console.log(savepic);
              this.mypicref.child(this.newRef.key).child("firstImage").getDownloadURL().then((url)=> {
                console.log("first new url is : "+url);

              
                // this.generateagain();
              })
            }).catch((e)=>{
              console.log("ecome");
              console.log(e);
            })
          }
          if(flag=="second"){
            value="secondImage.png";
            this.secondurl=this.base64Image;
            this.seconddata=imagedata;
          }
          if(flag=="third"){
            value="thirdImage.png";
            this.thirdurl=this.base64Image;
            this.thirddata=imagedata;
          }
          if(flag=="fourth"){
            this.fourthurl=this.base64Image;
            value="fourthImage.png";
            this.fourthdata=imagedata;
          }

          if(flag=="fifth"){
            this.fifthurl=this.base64Image;
            value="fifthImage.png";
            this.fifthdata=imagedata;
          }
          if(flag=="sixth"){
            this.sixthurl=this.base64Image;
            value="sixthImage.png";
            this.sixthdata=imagedata;
          }
          if(flag=="seventh"){
            this.seventhurl=this.base64Image;
            value="seventhImage.png";
            this.seventhdata=imagedata;
          }
          if(flag=="description"){
            value="description";
            this.descriptionurl=this.base64Image;
            this.descriptiondata=imagedata;
          }
          
          // this.upload(flag);
        }

        
      }
    });
    modal.present();

    // var value="";
    
    // try{
    //   const options : CameraOptions={
    //     quality:50,
    //     targetHeight:600,
    //     targetWidth:600,
    //     destinationType:this.camera.DestinationType.DATA_URL,
    //     encodingType:this.camera.EncodingType.JPEG,
    //     mediaType:this.camera.MediaType.PICTURE
    //   }
    //   console.log("come to take photo");
    //   const result= this.camera.getPicture(options).then(imagedata=>{
    //     // this.viewCtrl.dismiss({data:imagedata});
    //     this.base64Image = "data:image/jpeg;base64," + imagedata;
    //     console.log("get pic");
    //     console.log(this.base64Image);
    //     console.log(imagedata);
    //     if(imagedata!=undefined){
    //       if(flag=="main"){
    //         value="mainImage.png";
    //         this.picurl=this.base64Image;
    //         this.picdata=imagedata;
    //       }
    //       if(flag=="first"){
    //         value="firstImage.png";
    //         this.firsturl=this.base64Image;
    //         this.firstdata=imagedata;
    //       }
    //       if(flag=="second"){
    //         value="secondImage.png";
    //         this.secondurl=this.base64Image;
    //         this.seconddata=imagedata;
    //       }
    //       if(flag=="third"){
    //         value="thirdImage.png";
    //         this.thirdurl=this.base64Image;
    //         this.thirddata=imagedata;
    //       }
    //       if(flag=="fourth"){
    //         this.fourthurl=this.base64Image;
    //         value="fourthImage.png";
    //         this.fourthdata=imagedata;
    //       }

    //       if(flag=="fifth"){
    //         this.fifthurl=this.base64Image;
    //         value="fifthImage.png";
    //         this.fifthdata=imagedata;
    //       }
    //       if(flag=="sixth"){
    //         this.sixthurl=this.base64Image;
    //         value="sixthImage.png";
    //         this.sixthdata=imagedata;
    //       }
    //       if(flag=="seventh"){
    //         this.seventhurl=this.base64Image;
    //         value="seventhImage.png";
    //         this.seventhdata=imagedata;
    //       }
    //       if(flag=="description"){
    //         value="description";
    //         this.descriptionurl=this.base64Image;
    //         this.descriptiondata=imagedata;
    //       }
          
    //       // this.upload(flag);
    //     }
        
    //   }).catch(e=>{
    //     console.log("this is error:"+e);
    //     console.log(e);
    //   })


  }
   upload(flag,picd){
    console.log("uploading..."+this.storeKey);
    //https://firebasestorage.googleapis.com/v0/b/cosmetics-bac3b.appspot.com/o/rF0kQIisJ4MOyDRJwcHLlB1YKou2%2F20180912%2Fpicture.png?alt=media&token=cff7bf0d-eec2-4916-a775-320b5743b26c
    var value="";
    if(flag=="main"){
      value="mainImage.png";
    }
    if(flag=="first"){
      value="firstImage.png";
    }
    if(flag=="second"){
      value="secondImage.png";
    }
    if(flag=="third"){
      value="thirdImage.png";
    }
    if(flag=="fourth"){
      value="fourthImage.png";
    }
    if(flag=="fifth"){
      value="fifthImage.png";
    }
    if(flag=="sixth"){
      value="sixthImage.png";
    }
    if(flag=="seventh"){
      value="seventhImage.png";
    }
   
    console.log("pic data is : "+flag);
    console.log(this.storeKey+"????"+value);
    this.mypicref.child(this.storeKey).child(value)
    .putString(picd,'base64',{contentType:'image/jpeg'})
    .then((savepic)=>{
      console.log("saving pic");
      console.log(savepic);
      this.mypicref.child(this.store.id).child(value).getDownloadURL().then((url)=> {
        console.log("new url is : "+url);

       
        // this.generateagain();
      })
    }).catch((e)=>{
      console.log("ecome");
      console.log(e);
    })
    console.log("????");

    // this.mypicref.child(this.storeKey).child(value)
    // .putString(picd,'base64',{contentType:'image/jpeg'})
    // .then((savepic)=>{
    //   console.log("saving pic");
    //   console.log(savepic);
    //   this.mypicref.child(this.storeKey).child(value).getDownloadURL().then((url)=> {
    //     console.log("url : "+url);
      //   if(flag=="main"){
      //     this.picurl=url;
      //   }
      //   if(flag=="first"){
      //     this.firsturl=url;
      //   }
      //   if(flag=="second"){
      //     this.secondurl=url;
      //   }
      //   if(flag=="third"){
      //     this.thirdurl=url;
      //   }
      //   if(flag=="fourth"){
      //     this.fourthurl=url;
      //   }
      //   if(flag=="sixth"){
      //     this.sixthurl=url;
      //   }
      //   if(flag=="fifth"){
      //     this.fifthurl=url;
      //   }
      //   if(flag=="seventh"){
      //     this.seventhurl=url;
      //   }
      //   if(flag=="description"){
      //     this.descriptionphoto=url;
      //   }
       

      //   if(this.firsturl==undefined){
      //     this.firsturl="none";
      //   }
      //   if(this.secondurl==undefined){
      //     this.secondurl="none";
      //   }
      //   if(this.thirdurl==undefined){
      //     this.thirdurl="none";
      //   }
      //   if(this.fourthurl==undefined){
      //     this.fourthurl="none";
      //   }
      //   if(this.fifthurl==undefined){
      //     this.fifthurl="none";
      //   }
      //   if(this.sixthurl==undefined){
      //     this.sixthurl="none";
      //   }
      //   if(this.seventhurl==undefined){
      //     this.seventhurl="none";
      //   }

      //  if(this.picurl!=undefined){
           
   
      //     console.log("aaaaaaaaaaaaaaaaaaaaaaa")
      //    this.store.mainImage=this.picurl;
      //    this.store.firstImage=this.firsturl;
      //    this.store.secondImage=this.secondurl;
      //    this.store.thirdImage=this.thirdurl;
      //    this.store.fourthImage=this.fourthurl;
      //    this.store.fifthImage=this.fifthurl;
      //    this.store.sixthImage=this.sixthurl;
      //    this.store.seventhImage=this.seventhurl;
      //    this.store.keywords=this.newkey;
      //    this.store.facility=this.facility;
      //    console.log("done")
      //    console.log(this.store);
      //    this.newRef.set(this.store);
 
 
      //    setTimeout(()=>{
      //      alert('신청이 완료되었습니다.')
      //      this.view.dismiss();
      //    },500)
      //  }
      //   console.log("photo upload end");

      

    //   }).catch((err)=>{
    //     console.log("error come");
    //     console.log(err);
    //   })
      

    // }).catch((err)=>{

    //   console.log("error come");
    //   console.log(err);
    // });


    console.log("upload finishedd");
  }
  
  /**
   * 
   * address: 
"서울시 영등포구 여의도동 122"
description: 
"\"놀러와jjj는 어쩌고 저쩌고 이러쿵 저러쿵 하는 뭐하는 곳입니다. 야부리 야부리 요..."
id: 
91232
keywords: 
"종로/맛집/좋음"
lat: 
"32.3232"
lng:
"127.2321"
mainImage: 
"http://i3.ruliweb.com/img/18/09/29/1662304d8103..."
name: 
"nuri"
reservation
tel: 
"02-3117-3232"

   */

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

}
