import { Component ,ViewChild} from '@angular/core';
import { IonicPage,DateTime,AlertController, NavController,Navbar,ViewController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the ManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import firebase from 'firebase';
@Component({
  selector: 'page-management',
  templateUrl: 'management.html',
})
export class ManagementPage {

  @ViewChild(Navbar) navbar: Navbar;
  newkey:any;
  number=0;
  base64Image:any;
  picurl:any;
  picdata:any;

  time:any;
  storeName:any;
  @ViewChild('timePicker') timePicker;
  @ViewChild('timePicker2') timePicker2;
  firedata = firebase.database().ref('store');
  ninety:boolean=false;
  keywords:any;
  flag:boolean=true;
  keyarray=[];
  numberofpeople:any;
  myDateStart:any="13:00";
  store:any;
  myDateEnd:any="22:00";
  description:any;
  tel:any;
  mainImage:any;
  seventhImage:any;
  fifthImage:any;
  sixthImage:any;
  firstImage:any;
  secondImage:any;
  thirdImage:any;
  fourthImage:any;
  descriptionImage:any;
  address:any;
  callback:any;
  thirty:boolean=true;
  sixty:boolean=false;
  id:any;
  mypicref:any;
  constructor(public camera:Camera,public alertCtrl: AlertController,public view:ViewController,public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.thirty);
    console.log(this.sixty);
    console.log(this.timePicker);
    console.log(this.timePicker2);
    this.callback=this.navParams.get("callback");
    this.mypicref=firebase.storage().ref('/');
    /**
     *   "keyword":this.newkey,
      "reservationStart":this.myDateStart,
      "reservationEnd":this.myDateEnd,
      "reservationNumber":this.numberofpeople,
      "timeInterval":timeInterval

     */
    
    
  }
  modify(v){
    var value="";
    const options : CameraOptions={
      quality:50,
      targetHeight:600,
      targetWidth:600,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }

    if(v=="description"){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'keyword',
          placeholder: '수정할 문구를 작성해주세요'
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
            this.firedata.child(this.store.id).update({
              "description":data.keyword
            })
            this.generateagain();
          }
        }
      ]
    });
    alert.present();
    }else if(v=="tel"){

    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'keyword',
          placeholder: '수정할 번호를 작성해주세요'
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
            this.firedata.child(this.store.id).update({
              "tel":data.keyword
            })
            this.generateagain();
          }
        }
      ]
    });
    alert.present();


    }else if(v=="mainImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="mainImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("main",this.picdata);
        }
      });
    }else if(v=="firstImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="firstImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("first",this.picdata);
        }
      });
    }else if(v=="secondImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="secondImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("second",this.picdata);
        }
      });
    }else if(v=="thirdImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="thirdImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("third",this.picdata);
        }
      });
    }else if(v=="fourthImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="fourthImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("fourth",this.picdata);
        }
      });
    }else if(v=="fifthIMage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="fifthImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("fifth",this.picdata);
        }
      });
    }else if(v=="sixthImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="sixthImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("sixth",this.picdata);
        }
      });
    }else if(v=="seventhImage"){
      const result= this.camera.getPicture(options).then(imagedata=>{
        // this.viewCtrl.dismiss({data:imagedata});
        this.base64Image = "data:image/jpeg;base64," + imagedata;
        if(imagedata!=undefined){
            value="seventhImage.png";
            this.picurl=this.base64Image;
            this.picdata=imagedata;
            this.upload("seventh",this.picdata);
        }
      });
    }
  }
  generateagain(){
    this.firedata.child(this.store.id).once('value',(snapshot)=>{
      for(var result in snapshot.val()){
        console.log(result);
        if(result=="description"){
          this.description=snapshot.val()[result]
        }
        if(result=="address"){
          this.address=snapshot.val()[result]
        }
        if(result=="mainImage"){
          this.mainImage=snapshot.val()[result]
        }
        if(result=="firstImage"){
          this.firstImage=snapshot.val()[result]
        }
        if(result=="secondImage"){
          this.secondImage=snapshot.val()[result]
        }
        if(result=="thirdImage"){
          this.thirdImage=snapshot.val()[result]
        }
        if(result=="fourthImage"){
          this.fourthImage=snapshot.val()[result]
        }
        if(result=="name"){
          this.storeName=snapshot.val()[result]
        }
        if(result=="tel"){
          this.tel=snapshot.val()[result]
        }

        console.log(this.description);
        console.log(this.address);
        console.log(this.mainImage);
        console.log(this.secondImage);
        console.log(this.thirdImage);
        console.log(this.fourthImage);
        if(result=="keywords"){
          this.keywords=snapshot.val()[result]
        }
        if(result=="reservationStart"){
          
        this.myDateStart=snapshot.val()[result];
        }
        if(result=="reservationEnd"){
          console.log(snapshot.val()[result])
          this.myDateEnd=snapshot.val()[result]
        }
        if(result=="reservationNumber"){
          this.numberofpeople=snapshot.val()[result]
        }
        if(result=="timeInterval"){
          this.time=snapshot.val()[result]
        }
        
      }

      console.log(this.myDateStart);
      console.log(this.myDateEnd);
      console.log(this.keywords);
      console.log(this.time);
      if(this.time==30){

        this.thirty=true;
        this.checkbox(1);
      }
      if(this.time==60){
        this.sixty=true;
        this.checkbox(2);
      }
      if(this.time==90){
        this.ninety=true;
        this.checkbox(3);
      }
    });
  }
  async upload(flag,picd){
    console.log("uploading..."+flag+"///"+picd);
    //https://firebasestorage.googleapis.com/v0/b/cosmetics-bac3b.appspot.com/o/rF0kQIisJ4MOyDRJwcHLlB1YKou2%2F20180912%2Fpicture.png?alt=media&token=cff7bf0d-eec2-4916-a775-320b5743b26c
    var value="";
    if(flag=="main"){
      value="mainImage.png";
      this.mainImage="";
    }
    if(flag=="first"){
      value="firstImage.png";
      this.firstImage="";
    }
    if(flag=="second"){
      value="secondImage.png";
      this.secondImage="";
    }
    if(flag=="third"){
      value="thirdImage.png";
      this.thirdImage="";
    }
    if(flag=="fourth"){
      value="fourthImage.png";
      this.fourthImage="";
    }
    if(flag=="fifth"){
      value="fifthImage.png";
      this.fifthImage="";
    }
    if(flag=="sixth"){
      value="sixthImage.png";
      this.sixthImage="";
    }
    if(flag=="seventh"){
      value="seventhImage.png";
      this.seventhImage="";
    }
    if(flag=="description"){
      value="descriptionImage.png";
      this.descriptionImage="";
    }
    console.log("pic data is : "+picd);
    this.mypicref.child(this.store.id).child(value)
    .putString(picd,'base64',{contentType:'image/jpeg'})
    .then(savepic=>{
      console.log("saving pic");
      console.log(savepic);
      this.mypicref.child(this.store.id).child(value).getDownloadURL().then((url)=> {
        console.log("new url is : "+url);

       
        this.generateagain();
      })
    }).catch((e)=>{
      console.log("ecome");
      console.log(e);
    })
  }
  ionViewDidEnter(){
    this.store=this.navParams.get("store");
    console.log("store is : "+this.store);
    console.log(this.store);
    console.log(this.store.id);
    this.generateagain();
    console.log(this.timePicker);
    console.log(this.timePicker2);
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
    // if(this.flag){
    //   this.newkey=this.keyword;
    // }else{

    //   if(this.number>0){
        
    //     this.newkey=this.keyword.substring(this.number);

    //     console.log("cuttednew key is : "+this.newkey);
    //   }
    // }
  
   
    // if(this.newkey.indexOf(",")>-1){
    //   console.log("number rerere connect"+this.newkey)
    //   this.flag=false;

    //   console.log(this.newkey.indexOf(","))
    //   console.log(this.newkey.substring(0,this.newkey.indexOf(","))+"를 input");
    
    //   this.number=this.newkey.indexOf(",")+1;
    //   console.log("new nuber is : "+this.number);
    //   if(this.number>0){
    //     this.newkey=this.newkey.substring(this.number);
    //     console.log("222222cuttednew key is : "+this.newkey);
    //   }
    //   // this.newkey=this.newkey.substring((this.newkey.indexOf(",")+1));
    //   // console.log(this.newkey);
    //   // console.log(newkey.substring((newkey.indexOf(",")+1)));
    //   // console.log(this.keyword.indexOf(","))
    // }
  }
  checkbox(v){
    console.log("checkbox come"+v);
    if(v==1){
     
      this.sixty=false;
      this.ninety=false;
    }
    if(v==2){
     
      this.thirty=false;
      this.ninety=false;
    }
    if(v==3){
     
      this.sixty=false;
      this.thirty=false;
    }
  }
  filter(){
    console.log(this.myDateStart);
  }
  filter2(){
    console.log(this.myDateEnd);
  }
  end(){
    setTimeout(() => {
      this.timePicker2.open();
  }, 50)
   
  }
  start(){
    setTimeout(() => {
      this.timePicker.open();
  }, 50)
  }
  ionViewDidLoad() {
    this.navbar.backButtonClick = () => {
      console.log("back pressed")
      this.navCtrl.pop();
      this.callback("sds");
      ///here you can do wathever you want to replace the backbutton event
    };
    console.log('ionViewDidLoad IndexPage');
  }
  confirm(){

    console.log(this.numberofpeople);
    console.log(this.thirty);
    console.log(this.sixty);
    console.log(this.ninety);
    console.log(this.myDateStart);
    console.log(this.myDateEnd);
    var timeInterval=0;
    if(this.thirty){

      timeInterval=30;
    }
    if(this.sixty){
      timeInterval=60;
    }
    if(this.ninety){
      timeInterval=90;
    }
    this.time=timeInterval;
    if(this.newkey==undefined){

      this.firedata.child(this.store.id).update({

        "keywords":this.keywords,
        "reservationStart":this.myDateStart,
        "reservationEnd":this.myDateEnd,
        "reservationNumber":this.numberofpeople,
        "timeInterval":this.time
      })
    }else{

      this.firedata.child(this.store.id).update({

        "keywords":this.newkey,
        "reservationStart":this.myDateStart,
        "reservationEnd":this.myDateEnd,
        "reservationNumber":this.numberofpeople,
        "timeInterval":this.time
      })
    }
    this.view.dismiss()
  }

}
