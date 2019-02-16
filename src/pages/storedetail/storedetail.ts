import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {Reservation} from './../../models/reservation';
import { JoinedPage } from '../joined/joined';
import { Store } from '../../models/store';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the StoredetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var naver: any;
 
@Component({
  selector: 'page-storedetail',
  templateUrl: 'storedetail.html',
})
export class StoredetailPage {
  reservationfinal=[];
  map:any;
  lat:any;
  allreservation=[];
  disabledreservation=[];
  selectDayOfWeek:any;
  month:any;
  lng:any;
  storeId:any;
  disabledTime:any;
  first:boolean=true;
  second:boolean=false;
  third:boolean=false;
  fourth:boolean=false;
  fifth:boolean=false;
  sixth:boolean=false;
  seventh:boolean=false;
  eighth:boolean=false;

  joinn:boolean=false;
  dayofweek1:any;
  dayofweek2:any;
  dayofweek3:any;
  dayofweek4:any;
  dayofweek5:any;
  dayofweek6:any;
  dayofweek7:any;
  flag=0;
  nowtime:any;
  selectDay:any;
  dayofweek:any;
  mainImage:any;
  firstImage:any;
  secondImage:any;
  thirdImage:any;
  fourthImage:any;
  descriptionImage:any;
  today:any;
  name:any;
  store={} as Store;
  address:any;
  tel:any;
  description:any;
  reserve={} as Reservation;
  reservation=[];
  slides=[];
  facility:any;
  userId:any;
  endofthismonth:any;
  firedataa = firebase.database();
  firedata = firebase.database().ref('store');
  constructor(public callNumber:CallNumber,public viewer:PhotoViewer,public navCtrl: NavController, public navParams: NavParams) {
     this.userId=this.navParams.get("userId");
     this.store=this.navParams.get("store");
     this.storeId=this.navParams.get("storeId");
     console.log("constructor")
    console.log("user id is : "+this.userId);
     console.log(this.store);
     console.log(this.storeId);


    
     console.log("ngOnInit")
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
     this.dayofweek=this.getTodayLabel(0);
     this.selectDayOfWeek=this.dayofweek;
     this.selectDay=this.getToday(0);
     console.log(month+1);
     console.log(date);
     console.log((hour)+"시");
     console.log(minute);
     console.log(fullyear)
 
     this.month=month+1;
     console.log("this month is : "+this.month);
     this.today=date;

     this.endofthismonth=this.getDaysInMonth(this.month,fullyear)
     this.dayofweek1=this.getTodayLabel(1);
     this.dayofweek2=this.getTodayLabel(2);
     this.dayofweek3=this.getTodayLabel(3);
     this.dayofweek4=this.getTodayLabel(4);
     this.dayofweek5=this.getTodayLabel(5);
     this.dayofweek6=this.getTodayLabel(6);
     this.dayofweek7=this.getTodayLabel(7);
    
 
      this.nowtime = ""+(month+1)+"월"+date+"일"+(hour)+"시"+minute+"분";
      if(this.store.descriptionImage!=undefined){
       this.firedataa.ref("clients").child(this.userId).child("visited").child(this.storeId).update({
         "visiteddate":this.nowtime,
        "name":this.store.name,
        "id":this.storeId,
        "address":this.store.address,
        "mainImage":this.store.mainImage,
        "firstImage":this.store.firstImage,
        "secondImage":this.store.secondImage,
        "thirdImage":this.store.thirdImage,
        "fourthImage":this.store.fourthImage,
        "descriptionImage":this.store.descriptionImage
        
       })
      }else{
       this.firedataa.ref("clients").child(this.userId).child("visited").child(this.storeId).update({
         "visiteddate":this.nowtime,
        "name":this.store.name,
        "id":this.storeId,
        "address":this.store.address,
        "mainImage":this.store.mainImage,
        "firstImage":this.store.firstImage,
        "secondImage":this.store.secondImage,
        "thirdImage":this.store.thirdImage,
        "fourthImage":this.store.fourthImage
        
       })
      }
    
     console.log(this.storeId);
     this.firedata.child(this.storeId).once('value').then((snapshot) =>{
       var value:any;
       console.log(snapshot.val());
       this.mainImage=snapshot.val().mainImage
       this.firstImage=snapshot.val().firstImage;
       this.secondImage=snapshot.val().secondImage;
       this.disabledTime=snapshot.val().disabledTime;
       console.log("1");
       this.thirdImage=snapshot.val().thirdImage;
       this.fourthImage=snapshot.val().fourthImage;
       this.descriptionImage=snapshot.val().descriptionImage;
 
       this.joinn=snapshot.val().join;
       console.log("joned"+this.joinn);
       console.log("1");
       this.slides.push(snapshot.val().firstImage);
       this.slides.push(snapshot.val().secondImage);
       this.slides.push(snapshot.val().thirdImage);
       this.slides.push(snapshot.val().fourthImage);
       console.log("1");
       this.name=snapshot.val().name
       this.tel=snapshot.val().tel
       this.facility=snapshot.val().facility;
       this.description=snapshot.val().description
       console.log("1");
       this.address=snapshot.val().address
       this.lat=snapshot.val().lat
       this.lng=snapshot.val().lng
       console.log("mmmmmmmmmmmmmmmmmmmdes")
       var startHour=9
       var startMinute="00";
       var endHour=20
       var endMinute="00";
       console.log("finished");
       console.log(snapshot.val().reservationStart!=undefined);
       if(snapshot.val().reservationStart!=undefined){
         console.log("not undefined");
         console.log(snapshot.val().reservationStart)
          startHour=snapshot.val().reservationStart.split(":")[0];
          startMinute=snapshot.val().reservationStart.split(":")[1];
          endHour=snapshot.val().reservationEnd.split(":")[0];
          endMinute=snapshot.val().reservationEnd.split(":")[1];
         //07:00
         console.log(snapshot.val().reservationEnd)
         //22:00
         console.log(snapshot.val().timeInterval)
         var timeinterval=snapshot.val().timeInterval;
         //60
        

       }else{
         console.log("undefined!!!");
         timeinterval=60;
       }

       console.log("timeinterval : "+timeinterval);
       if(timeinterval==30){
   
        console.log("minus start");
        console.log(endHour-startHour);
        console.log(startHour);
        console.log(Number(startHour))
        var newHour=Number(startHour);
        var nnewHour=Number(startHour)+":00";
        this.reservation.push({"time":nnewHour});
        this.reservation.push({"time":newHour+":30"});
        for(var i=0; i<endHour-startHour-1; i++){
          newHour=Number(newHour)+1;
          console.log(newHour);
          this.reservation.push({"time":newHour+":00"});
          this.reservation.push({"time":newHour+":30"});
        }
      }
      if(timeinterval==90){

       console.log("minus start");
       console.log(endHour-startHour);
       console.log(startHour);
       console.log(Number(startHour))
       var newHour=Number(startHour);
       var nnewHour=Number(startHour)+":00";
       //7:00 
       //8:30
       //10:00
       startMinute="30";
       if(startMinute=="00"){
         this.reservation.push({"time":newHour+":00"});
         var flag=false;
       }else{
         this.reservation.push({"time":newHour+":30"});
         var flag=true;
       }
       console.log(this.reservation);
      
       for(var i=0; i<endHour-startHour-1; i++){
         if(endHour<newHour){
           console.log("finished")
         }else{
           newHour=Number(newHour)+1;
           console.log(newHour)
           if(!flag){
             flag=true;
             this.reservation.push({"time":(newHour)+":30"});
           }else{
             flag=false;
             newHour=newHour+1;
             this.reservation.push({"time":(newHour)+":00"});
           }
         }
        
       }
       console.log(this.reservation);
     }

      if(timeinterval==60){

        console.log("minus start");
        console.log(endHour-startHour);
        console.log(startHour);
        console.log(Number(startHour))
        var arraydisabled=[];
        if(this.disabledTime!=undefined){
          arraydisabled=this.disabledTime.split(",");
        }else{

        }
        

        console.log('disabled')
        console.log(arraydisabled);
        var nnewHour=Number(startHour)+":00";

        var newHour=Number(startHour);
        var flag=false;
        // for(var i=0; i<arraydisabled.length; i++){
        //   console.log(arraydisabled[i]);
         
        //   if(arraydisabled[i]==nnewHour){
        //    this.reservation.push({"time":nnewHour,"disabled":true,"rtime":newHour});
        //    console.log("return come")
        //    flag=true;
        //   }else{
        //     if(!flag){
        //      // this.reservation.push({"time":nnewHour,"disabled":false});
        //     }
          
        //   }
        // }
        console.log("return exit")
        for(var i=0; i<=endHour-startHour; i++){
          console.log("for loop")
          console.log(endHour);
          console.log(startHour);
         
          var nnewHour=Number(newHour)+":00";
          newHour=Number(newHour)+1;
         
          console.log("adding all reservation");
          this.allreservation.push({"time":nnewHour,"disabled":false,"rtime":newHour})
          //7:00, 8:00, 9:00 ...
          console.log(nnewHour);
          var flag2=false;
          // for(var j=0; j<arraydisabled.length; j++){
          //   //7:00, 8:00


          //   console.log(arraydisabled[j]+"/????//"+nnewHour);
          //   if(arraydisabled[j]==nnewHour){
          //    flag2=true;
          //     console.log("matched!")
          //    this.reservation.push({"time":nnewHour,"disabled":true,"rtime":newHour});
          //    this.disabledreservation.push(nnewHour);
          //   }else{
          //    console.log("not matched!")
          //     if(!flag2){
          //      // this.reservation.push({"time":nnewHour,"disabled":false});
          //     }
          //   }
          // }
          console.log("all reserve");
          console.log(this.allreservation);
          console.log("disabled reserve");
          console.log(this.disabledreservation);
          for(var i=0; i<this.allreservation.length; i++){
            for(var j=0; j<this.disabledreservation.length; j++){
             if(this.allreservation[i].time==this.disabledreservation[j]){
               console.log(this.allreservation[i].time+"가 일치하므로 이걸 삭제한닷")
               this.allreservation.splice(i,1);
               break;
             }
            }
          }
          console.log(this.reservation)
          console.log(this.allreservation);
          var array3 = this.reservation.concat(this.allreservation);
          console.log(array3);
          var sortingField = "rtime";
       array3.sort(function(a, b) { // 오름차순
         console.log(a[sortingField] - b[sortingField]);
         return a[sortingField] - b[sortingField];
       })
         console.log(array3);
         this.reservationfinal=array3;
        }
      }
       console.log("search comeeee"+timeinterval);
       this.map=this.loadMap();
       console.log(this.map);
      
       console.log(this.lat)
       console.log(this.lng);
       var marker = new naver.maps.Marker({
         position: new naver.maps.LatLng(this.lat,this.lng),
         map: this.map
     });
     });
  }

   getDaysInMonth = function(month,year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
   return new Date(year, month, 0).getDate();
  // Here January is 0 based
  // return new Date(year, month+1, 0).getDate();
  };

call(tel){
  console.log(tel);

this.callNumber.callNumber(tel, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
}

  loadMap(){

    var map = new naver.maps.Map('mapp', {
      center: new naver.maps.LatLng(this.lat,this.lng),
    enableWheelZoom: true,
    enableDragPan: true,
    enableDblClickZoom: false,
    mapMode: 0,
    activateTrafficMap: false,
    activateBicycleMap: false,
    minMaxLevel: [1, 14],
      zoom: 10
  });

  return map;
}

enlarge(v){
  console.log(v);
  this.viewer.show(v);
}
 getTodayLabel(v) {
   console.log("v is : "+v);
  var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
  var today = new Date().getDay();
  var todayLabel;
 
    if(v==0){
      todayLabel = week[today];
    }else if(v==1){
      todayLabel = week[today+1];
      if(todayLabel==undefined){
        todayLabel = week[this.flag];
        this.flag+=1;
      }
      if(this.today+1>this.endofthismonth){
        todayLabel="false";
      }
    }else if(v==2){
      console.log("222"+this.flag)
      todayLabel = week[today+2];
      if(todayLabel==undefined){
        console.log(this.flag+"flag"+week[this.flag])
        todayLabel = week[this.flag];
      }
      if(this.today+2>this.endofthismonth){
        todayLabel="false";
      }
    }else if(v==3){
      
      todayLabel = week[today+3];
      if(todayLabel==undefined){
        todayLabel = week[this.flag];
        this.flag+=1;
      }
      if(this.today+3>this.endofthismonth){
        todayLabel="false";
      }
    }else if(v==4){
      todayLabel = week[today+4];
      if(todayLabel==undefined){
       
        todayLabel = week[this.flag];
        this.flag+=1;
      }
      if(this.today+4>this.endofthismonth){
        todayLabel="false";
      }
    }else if(v==5){
      todayLabel = week[today+5];
      if(todayLabel==undefined){
        todayLabel = week[this.flag];
        this.flag+=1;

      }
      if(this.today+5>this.endofthismonth){
        todayLabel="false";
      }
    }else if(v==6){
      todayLabel = week[today+6];
      if(todayLabel==undefined){
        todayLabel = week[this.flag];
        this.flag+=1;
        
      }
      if(this.today+6>this.endofthismonth){
        todayLabel="false";
      }
    }else if(v==7){
      todayLabel = week[today+7];
      if(todayLabel==undefined){
        todayLabel = week[this.flag];
        this.flag+=1;
      }
      if(this.today+7>this.endofthismonth){
        todayLabel="false";
      }
    }
  
  console.log(todayLabel);
 
    
  
  return todayLabel;
}
getToday(v) {
  var today = new Date().getDay();
  console.log("today is "+today);
  var todayLabel;
    if(v==0){
      todayLabel = today
    }else if(v==1){
      todayLabel = today+1;
    }
  
  
 
    
  
  return todayLabel;
}


selectDayy(v){
  console.log(v);
  if(v==0){

    this.first=true;
    this.second=false;
    this.third=false;
    this.fourth=false;
    this.fifth=false;
    this.sixth=false;
    this.seventh=false;
    this.eighth=false;
    //today selected
  }else if(v==1){
    this.first=false;
    this.second=true;
    this.third=false;
    this.fourth=false;
    this.fifth=false;
    this.sixth=false;
    this.seventh=false;
    this.eighth=false;
    //next day selected

  }else if(v==2){
    this.first=false;
    this.second=false;
    this.third=true;
    this.fourth=false;
    this.fifth=false;
    this.sixth=false;
    this.seventh=false;
    this.eighth=false;
  }else if(v==3){
    this.first=false;
    this.second=false;
    this.third=false;
    this.fourth=true;
    this.fifth=false;
    this.sixth=false;
    this.seventh=false;
    this.eighth=false;
  }else if(v==4){
    this.first=false;
    this.second=false;
    this.third=false;
    this.fourth=false;
    this.fifth=true;
    this.sixth=false;
    this.seventh=false;
    this.eighth=false;
  }else if(v==5){
    this.first=false;
    this.second=false;
    this.third=false;
    this.fourth=false;
    this.fifth=false;
    this.sixth=true;
    this.seventh=false;
    this.eighth=false;
  } else if(v==6){
    this.first=false;
  this.second=false;
  this.third=false;
  this.fourth=false;
  this.fifth=false;
  this.sixth=false;
  this.seventh=true;
  this.eighth=false;
  }else if(v==7){
    this.first=false;
    this.second=false;
    this.third=false;
    this.fourth=false;
    this.fifth=false;
    this.sixth=false;
    this.seventh=false;
    this.eighth=true;
  }
  this.selectDayOfWeek=this.getTodayLabel(v);
  this.selectDay=this.today+v;
  console.log(this.today+v);
  console.log(this.selectDay);
  console.log(this.selectDayOfWeek)
}
  ngOnInit(){
         
  
  }
  join(r){
    console.log(this.store);
    console.log(this.selectDayOfWeek);
    console.log(this.selectDay);
    console.log(this.month);
    if(this.selectDay!=undefined){
      console.log("r is :"+r);
      this.navCtrl.push(JoinedPage,{"storeName":this.name,"time":r,"store":this.store,"dayofweek":this.selectDayOfWeek,"day":this.selectDay,"month":this.month})
    }
    // 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoredetailPage');
  }

}
