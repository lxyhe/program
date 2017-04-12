import { Component, ViewChild } from '@angular/core';
import { NavParams, Refresher, Events, NavController, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Ctiminggame, TimingGamelPageData, TimingGamelPageType, TimingGamelContentPageData } from '../../providers/local-timinggame';
import {  TimingGameDetails } from '../timinggamedetails/timinggamedetails';
import { PopoverController } from 'ionic-angular';
import { MyGeoLocation } from '../../providers/dev-ctrl';
import { TimingPopoverPage } from '../timinggame-popover/timinggame-popover';


@Component({
  selector: 'timinggame',
  templateUrl: 'timinggame.html'
})
export class TimingGame {
  public expression: boolean = false;
  public expression1: boolean = true;
  public loadnum: number = 20;
  //@ViewChild(Content) public content: Content;
  @ViewChild(Refresher) public refresher: Refresher;
  // public list: ordergame.ListRetRecv;
  public pagedata: TimingGamelPageData;
  private cancelRegButton: Function;
  private canleave: boolean = false;
  private isToast: boolean = false;
  private contentpage: TimingGamelContentPageData = null;
  public pagetype: number;
  public pagetypeother: number = 0;
  public clicktoggle: boolean;
  public pageHeight;
  constructor(
    public navParams: NavParams,
    public timinggame: Ctiminggame,
    public toastCtrl: ToastController,
    public platform: Platform,
    public mygeo: MyGeoLocation,
    public nav: NavController,
    public events: Events,
    public loading: LoadingController,
    public popoverCtrl: PopoverController
  ) {
    //this.list = <ordergame.ListRetRecv>this.navParams.data;
    this.pagedata = this.navParams.data;
    console.log(this.pagedata);
    console.log("timinggame constructor");
    this.pageHeight = document.body.clientHeight;
    console.log(this.pageHeight)
  }


  goToSessionDetail(it: timinggame.Item) {
    let loading = this.loading.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true,
    });
    loading.present();
    let v = this.timinggame.newTimingGamelContentPageData(it.ID, this.pagedata.type);
    this.contentpage = v;
    this.timinggame.getTimingGamelContentPageData(v, it.State);
    this.events.subscribe(v.eventNameGetSuccess, () => {
      this.events.unsubscribe(this.contentpage.eventNameGetSuccess);
      this.events.unsubscribe(this.contentpage.eventNameGetFail)
      this.contentpage = null;

      this.nav.push(TimingGameDetails, v);

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
    this.timinggame.refreshList(this.pagedata);
    this.sum();

  }
  sum() {
    this.loadnum = this.loadnum - (this.loadnum - 20);
    this.expression = false;
    this.expression1 = true;
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.loadnum += 20;

      infiniteScroll.complete();
    }, 1000);
    this.events.subscribe('nomoredata', (data) => {
      if (data == 'true') {
        this.expression = true;
        this.expression1 = false;
      }
    })

  }
  ionViewDidLoad() {
    console.log("timinggame ionViewDidLoad");
    this.events.subscribe(this.pagedata.eventNameGetSuccess, () => {
      this.refresher.complete();
    });

    this.events.subscribe(this.pagedata.eventNameGetFail, () => {
      //todo show fail
      this.refresher.complete();
    });
  }
  ionViewWillUnload() {
    console.log("ordergame ionViewWillUnload");
    this.events.unsubscribe(this.pagedata.eventNameGetSuccess);
    this.events.unsubscribe(this.pagedata.eventNameGetFail)
  }
  ionViewDidEnter() {
    // console.log("ordergame ionViewDidEnter");

    this.refresher._beginRefresh();

    if (this.pagedata.type === TimingGamelPageType.main || this.pagedata.type === TimingGamelPageType.my) {
      this.cancelRegButton = this.platform.registerBackButtonAction(() => {


        if (this.isToast) {

          this.canleave = true;

        } else {

          let toast = this.toastCtrl.create({
            message: '在按一次退出',
            duration: 3000,
            position: 'top'
          });
          toast.present();

          this.isToast = true;

          setTimeout(() => {
            this.isToast = false;
          }, 3000);

        }

        if (this.canleave) {
          this.platform.exitApp();
        }


      }, 0);
    }

  }


  ionViewWillLeave() {
    if (this.contentpage !== null) {
      this.events.unsubscribe(this.contentpage.eventNameGetSuccess);
      this.events.unsubscribe(this.contentpage.eventNameGetFail)
    }

    // console.log("ionViewWillLeave");
    if (this.pagedata.type === TimingGamelPageType.main || this.pagedata.type === TimingGamelPageType.my) {
      this.cancelRegButton();
      this.isToast = false;
      this.canleave = false;
    }
  }
  //TODO 弹出排序
  presentPopover(event) {
    let x = {};
    let popover = this.popoverCtrl.create(TimingPopoverPage, x);
    popover.present({ ev: event });
    this.events.subscribe('typemsg', data => {
      //TODO 按照时间进行排序
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
      //TODO 按照距离进行排序
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
      //TODO 按照价格进行排序
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

}
