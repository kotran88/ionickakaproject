import { Component ,ViewChild,ElementRef} from '@angular/core';
import { IonicPage,ViewController,AlertController, NavController, NavParams } from 'ionic-angular';
import { MetroProvider } from '../../providers/metro/metro';
declare var naver: any;
 
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  map:any;

  selectedStation:any;
  lat:any;
  lng:any;
  result_metro=[];

  constructor(public view : ViewController,public metro:MetroProvider, public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {

 
    this.metro.getMetro().subscribe(data=>{
      this.result_metro=data;
      
     
    })
  }
  findbyaddress(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'keyword',
          placeholder: '검색 원하는 주소를 입력해주세요(Ex: 삼성동)'
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
            this.selectedStation=data.keyword;
            naver.maps.Service.geocode({
              address: data.keyword
          }, (status,response)=> {

            console.log(status);
            console.log(response);
            if(status==500){

              window.alert("잘못된 주소를 입력하셨습니다")
            }else{
              var result = response.result, // 검색 결과의 컨테이너
              items = result.items; // 검색 결과의 배열
              console.log(result);
              console.log(items[0]);
              console.log(items[0].point.x);
              console.log(items[0].point.y);
              var name=items[0];
              var x=items[0].point.x
              var y=items[0].point.y;
              console.log("65sss");
              this.view.dismiss({"flag":"address","x":y,"y":x,"stname":data.keyword})
            }
              if (status !== naver.maps.Service.Status.OK) {
                console.log("not ok")
              }
             
                 
        
          });
          }
        }
      ]
    });
    alert.present();
  }
  nowlocation(){
    
  }
  subway(){
    let alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'keyword',
          placeholder: '지하철역을 입력해주세요(ex: 양재)'
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

            var n = data.keyword.split("");
            var lastword=n[n.length - 1];
            console.log("last word is : "+lastword);
            var newword=data.keyword;
            if(lastword=="역"){

              newword=newword.split("역")[0];
              
            }
            console.log("newword : "+newword);
            this.selectedStation=newword
            
            console.log(this.selectedStation);
              var flag=false;
              for(var i=0; i<this.result_metro.length; i++){
                var stname=this.result_metro[i].STATION_NM;
                var x=0;
                var y=0;
               
                  if(stname==this.selectedStation){

                    console.log(this.selectedStation+"?????"+stname);
                     x=this.result_metro[i].XPOINT_WGS;
                      y=this.result_metro[i].YPOINT_WGS;
                    flag=true;
                  }
                  console.log(stname+"compared to :"+this.selectedStation);
                
                
              }
              if(flag){
                  console.log("stname is :"+this.selectedStation);
                  console.log("x coordinate : "+x)
                  console.log("y coordinate : "+y)
                  this.view.dismiss({"flag":"station","x":x,"y":y,"stname":this.selectedStation})
              }else{
                console.log("no found!  ")
                window.alert("찾으시는 역이 존재하지 않습니다")
              }
            // 
            //   if(stname==this.selectedStation){

           
            //   }   
            // }else{
              
            //     if(stname+"역"==this.selectedStation){

            //       console.log("stname is :"+stname);
            //       console.log("x coordinate : "+x)
            //       console.log("y coordinate : "+y)
            //       this.view.dismiss({"flag":"station","x":x,"y":y,"stname":stname})
            //     }
            //   }
           
            
            
          }
        }
      ]
    });
    alert.present();
  }
  ngOnInit(){ 
    console.log("search comeeee");
    console.log(this.map);
    this.lat=this.navParams.get("lat");
    this.lng=this.navParams.get("lng");
    console.log(this.lat)
    console.log(this.lng);

    this.map=this.loadMap();
    var marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(this.lat,this.lng),
      map: this.map
  });
  }
  loadMap(){

    var map = new naver.maps.Map('map', {
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
  ionViewDidLoad() {
  }

}
