import { Component } from '@angular/core';
import { Cordergame } from '../../providers/local-ordergame';
import { OrderGamePreview } from '../ordergamepreview/ordergamepreview';
import { NavController } from 'ionic-angular';
import { MapSet } from '../mapset/mapset';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'ordergamenew',
  templateUrl: 'ordergamenew.html'
})
export class OrderGameNew {
  public subshowbutton:boolean=true;//TODO 选择其他的隐藏掉这个项
  public typelist;//TODO 子活动列表
  public activitytype;//TODO 活动父类型码
  public subactivitytype:number;//TODO  活动子类型码
  public subtype1 = [
    { index: 1, title: '火锅' },
    { index: 2, title: '自助餐' },
    { index: 3, title: '烧烤烤肉' },
    { index: 4, title: '小吃' },
    { index: 5, title: '家常菜' }
  ];
  public subtype2 = [
    { index: 1, title: '农家采摘' },
    { index: 2, title: '休闲农庄' },
    { index: 3, title: '自然生态村' },
    { index: 4, title: '蹦极' },
    { index: 5, title: '水上乐园' }
  ];
   public subtype3 =  [
     { index: 1, title: '桌游' },
     { index: 2, title: '酒吧' },
     { index: 3, title: '迪吧' },
     { index: 4, title: '室内活动' },
     { index: 5, title: 'KTV' }
   ];
   public subtype4 = [
     { index: 1, title: '一日游' },
     { index: 2, title: '度假村' },
     { index: 3, title: '周边游' },
     { index: 4, title: '公园游乐园' },
     { index: 5, title: '景色' }
   ];
   public subtype5 =  [
     { index: 1, title: '自助游' },
     { index: 2, title: '自驾游' },
     { index: 3, title: '野营' },
     { index: 4, title: '滑雪' },
     { index: 5, title: '露营' }
   ];

  public title: string;
  public addr: string;
  public phone: string;
  public starttime: string;
  public endtime: string;
  public maxnum: string;
  public minnum: string;
  public price: string;
  public pcode: string;
  public titlepic: string;
  public details_x_1: string;
  public details_x_2: string;
  public details_x_3: string;
  public details_x_4: string;
  public details_x_5: string;

  public foundbtn = false;//TODO 创建按钮
  public place: string;
  public lng: number;
  public lat: number;
  public zoom: number;

  private addZero(str, length) {
  return new Array(length - str.length + 1).join("0") + str;
}

constructor(
  public alertCtrl: AlertController,
  public nav: NavController,
  public ordergame: Cordergame,
  public alertCtrl1:AlertController

) {



  this.title = "XXXXXX标题";
  this.addr = "八角";
  this.phone = "13912345678";
  this.place = "未知路段请设置"
  this.lng = 116.404;
  this.lat = 39.915;


  let nowtime = new Date();
  let nextdaytime = new Date(nowtime.getTime() + 24 * 60 * 60 * 1000);
  let nextdaytime3Hour = new Date(nowtime.getTime() + 27 * 60 * 60 * 1000);

  this.starttime = nextdaytime.getFullYear().toString() + '-' +
    this.addZero((nextdaytime.getMonth() + 1).toString(), 2) + '-' +
    this.addZero(nextdaytime.getDate().toString(), 2) + 'T' +
    this.addZero(nextdaytime.getHours().toString(), 2) + ':' +
    "00:00";


  //this.addZero(nextdaytime.getMinutes().toString(), 2) + ":00";


  this.endtime = nextdaytime3Hour.getFullYear().toString() + '-' +
    this.addZero((nextdaytime3Hour.getMonth() + 1).toString(), 2) + '-' +
    this.addZero(nextdaytime3Hour.getDate().toString(), 2) + 'T' +
    this.addZero(nextdaytime3Hour.getHours().toString(), 2) + ':' +
    "00:00";

  this.maxnum = "20";
  this.minnum = "10";
  this.price = "19.9";

  this.titlepic = "titlepic";

  this.pcode = "233";

  this.details_x_1 = "details1";
  this.details_x_2 = "details2";
  this.details_x_3 = "details3";
  this.details_x_4 = "details4";
  this.details_x_5 = "details5";

}
selector(){
this.activitytype=parseInt(this.activitytype,10);
  if (this.activitytype == 1) {
    this.typelist = this.subtype1;
      this.subshowbutton=true;
  } else if (this.activitytype == 2) {
    this.typelist = this.subtype2;
      this.subshowbutton=true;
  } else if (this.activitytype == 3) {
    this.typelist = this.subtype3;
      this.subshowbutton=true;
  } else if (this.activitytype == 4) {
    this.typelist = this.subtype4;
      this.subshowbutton=true;
  } else if(this.activitytype == 5){
    this.typelist = this.subtype5;
      this.subshowbutton=true;
  }else{
    this.typelist=[
      {index:0,title:'其他'}
    ];
    this.subshowbutton=false;
  }

}
subselector(){
if(this.activitytype===undefined){
  let alert = this.alertCtrl.create({
    title: '错误',
    message: '您还没有选择主活动类型呢?',
    buttons: [
      {
        text: '返回',
        role: 'cancel',
        handler: () => {
          console.log('返回');
        }
      },
      {
        text: '确定',
        handler: () => {
          console.log('确定');
        }
      }
    ]
  });
  alert.present();
}

}
setmap() {
  this.nav.push(MapSet, this);
}

create() {
  //this.foundbtn = true;//TODO 点击后按钮为不可用
  let max = parseInt(this.maxnum, 10);
  let min = parseInt(this.minnum, 10);
  if (min > max) {

    let prompt = this.alertCtrl.create({
      title: '错误',
      message: "最小人数不能大于最大人数",
      buttons: [
        {
          text: '确定',
          handler: () => {
          }
        },
      ]
    });
    prompt.present();

    return;
  }

  if (null === this.starttime || null === this.endtime || "" === this.starttime || "" === this.endtime) {

    let prompt = this.alertCtrl.create({
      title: '错误',
      message: "请设置正确的时间",
      buttons: [
        {
          text: '确定',
          handler: () => {
          }
        },
      ]
    });
    prompt.present();

    return;
  }
  if (!(/^1[34578]\d{9}$/.test(this.phone))) {
    let prompt = this.alertCtrl1.create({
      title: '电话格式错误',
      message: "请输入正确的电话号码",
      buttons: [
        {
          text: '确定',
          handler: () => {
          }
        },
      ]
    });
    prompt.present();

    return;
  }
  let x = this.ordergame.createPreviewData(this.title, this.addr, this.phone, this.starttime, this.endtime,
    this.maxnum, this.minnum, this.price, this.pcode,this.titlepic, this.place, this.lng, this.lat, this.zoom,
    this.details_x_1,
    this.details_x_2,
    this.details_x_3,
    this.details_x_4,
    this.details_x_5,
    this.activitytype,
    this.subactivitytype
  );


  this.nav.push(OrderGamePreview, x);





}

}
