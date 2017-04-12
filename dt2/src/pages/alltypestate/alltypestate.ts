import { Component,ViewChild } from '@angular/core';
import {ActionSheetController, NavParams, Refresher, Events, NavController, LoadingController, Platform, ToastController, PopoverController} from 'ionic-angular';
import { Cordergame, OrderGamelPageData, OrderGamelContentPageData} from '../../providers/local-ordergame';
import { OrderGameContent } from '../ordergamecontent/ordergamecontent';
import { MyGeoLocation } from '../../providers/dev-ctrl';
import { TimingPopoverPage } from '../timinggame-popover/timinggame-popover';
@Component({
  selector: 'alltypestate',
  templateUrl: 'alltypestate.html'
})
export class AllTypeStatePage {
  public subpagedata:any;
  public subpagedatatype:number;
  public icon1:string;
  public icon2:string;
  public icon3:string;
  public icon4:string;
  public icon5:string;
  public subpagedatatitle:any={
    titile1:"",
    titile2:"",
    titile3:"",
    titile4:"",
    titile5:"",
  }
  @ViewChild(Refresher) public refresher: Refresher;
  public pagedata: OrderGamelPageData;
  private contentpage: OrderGamelContentPageData = null;
  public pagetype: number;
  public pagetypeother: number = 0;
  public clicktoggle: boolean;
  public subpageclass:number;

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public mygeo: MyGeoLocation,
    public nav: NavController,
    public events: Events,
    public navParams: NavParams,
    public ordergame: Cordergame,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public actionCtrl: ActionSheetController

  ) {
    this.subpagedata=this.navParams.data;
    this.subpagedatatype=this.subpagedata.subtype;
    if(this.subpagedata.subtype==1){
    this.subpagedatatitle.title1='火锅';
    this.subpagedatatitle.title2='自助餐';
    this.subpagedatatitle.title3='烧烤烤肉';
    this.subpagedatatitle.title4='小吃';
    this.subpagedatatitle.title5='家常菜';

    this.icon1="icon-chafing";
    this.icon2="icon-buffetdinner";
    this.icon3="icon-barbecue";
    this.icon4="icon-snack";
    this.icon5="icon-greens";

    }else if(this.subpagedata.subtype==2){
    this.subpagedatatitle.title1='农家采摘';
    this.subpagedatatitle.title2='休闲农庄';
    this.subpagedatatitle.title3='自然生态村';
    this.subpagedatatitle.title4='蹦极';
    this.subpagedatatitle.title5='水上乐园';

    this.icon1="icon-pick";
    this.icon2="icon-leisurefarm";
    this.icon3="icon-ecologicalvillage";
    this.icon4="icon-Bungee";
    this.icon5="icon-waterpark";

    }
    else if(this.subpagedata.subtype==3){
    this.subpagedatatitle.title1='桌游';
    this.subpagedatatitle.title2='酒吧';
    this.subpagedatatitle.title3='迪吧';
    this.subpagedatatitle.title4='室内活动';
    this.subpagedatatitle.title5='KTV';

    this.icon1="icon-deskplay";
    this.icon2="icon-bar";
    this.icon3="icon-Disco";
    this.icon4="icon-indooractivity";
    this.icon5="icon-KTV";

    }
    else if(this.subpagedata.subtype==4){
    this.subpagedatatitle.title1='一日游';
    this.subpagedatatitle.title2='度假村';
    this.subpagedatatitle.title3='周边游';
    this.subpagedatatitle.title4='公园游乐场';
    this.subpagedatatitle.title5='景点';

    this.icon1="icon-onedaytour";
    this.icon2="icon-vacational";
    this.icon3="icon-roundplay";
    this.icon4="icon-fairground";
    this.icon5="icon-scenic";
    }
    else if(this.subpagedata.subtype==5){
    this.subpagedatatitle.title1='自助游';
    this.subpagedatatitle.title2='自驾游';
    this.subpagedatatitle.title3='野营';
    this.subpagedatatitle.title4='滑雪';
    this.subpagedatatitle.title5='露营';

    this.icon1="icon-divtour";
    this.icon2="icon-selfdriving";
    this.icon3="icon-camping";
    this.icon4="icon-ski";
    this.icon5="icon-campout";
    }
  }
  SubCatePage(){

    this.subpageclass=1;
  }
  SubFarmHousePage(){

    this.subpageclass=2;
  }
  SubEntertainmentPage(){

    this.subpageclass=3;
  }
  SubTourPage(){

    this.subpageclass=4;
  }
  SubOutDoorPage(){

    this.subpageclass=5;
  }
  presentPopover(event) {
    let popover = this.popoverCtrl.create(TimingPopoverPage);
    popover.present({ ev: event });
    this.events.subscribe('typemsg', data => {
      if (data[0].sorttype == '1') {
        if (this.pagetypeother % 2 === 0) {

          this.events.unsubscribe('typemsg');
          this.pagetype = 1;
          this.clicktoggle = true;
          this.pagetypeother++;
        }
        else {
          this.events.unsubscribe('typemsg');
          this.pagetype = 1;
          this.clicktoggle = false;
          this.pagetypeother++;
        }
      }
      if (data[0].sorttype == '2') {
        if (this.pagetypeother % 2 === 0) {

          this.events.unsubscribe('typemsg');
          this.pagetype = 2;
          this.clicktoggle = true;
          this.pagetypeother++;
        } else {
          this.events.unsubscribe('typemsg');
          this.pagetype = 2;
          this.clicktoggle = false;
          this.pagetypeother++;
        }
      }
      if (data[0].sorttype == '3') {
        if (this.pagetypeother % 2 === 0) {

          this.events.unsubscribe('typemsg');
          this.pagetype = 3;
          this.clicktoggle = true;
          this.pagetypeother++;
        }
        else {
          this.events.unsubscribe('typemsg');
          this.pagetype = 3;
          this.clicktoggle = false;
          this.pagetypeother++;
        }
      }
    });
    }
    goToSessionDetail(it: ordergame.Item) {
      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: " loading ...",
        dismissOnPageChange: true
      });
      loading.present();
      let v = this.ordergame.newOrderGamelContentPageData(it.ID, this.subpagedata.subpage.type);
      this.contentpage = v;
      this.ordergame.getOrderGamelContentPageData(v, it.State);

      this.events.subscribe(v.eventNameGetSuccess, () => {
        this.events.unsubscribe(this.contentpage.eventNameGetSuccess);
        this.events.unsubscribe(this.contentpage.eventNameGetFail)
        this.contentpage = null;
        this.nav.push(OrderGameContent, v);
        loading.dismiss();
      });

      this.events.subscribe(v.eventNameGetFail, () => {
        this.events.unsubscribe(this.contentpage.eventNameGetSuccess);
        this.events.unsubscribe(this.contentpage.eventNameGetFail)
        this.contentpage = null;
        loading.dismiss();
      });

    }
    doRefresh(refresher) {

      this.mygeo.getCurr();
      this.ordergame.refreshList(this.subpagedata.subpage);
      this.refresher.complete();
    }
    ionViewDidEnter() {
      // console.log("ordergame ionViewDidEnter");
      // this.refresher._beginRefresh();

    }






}
