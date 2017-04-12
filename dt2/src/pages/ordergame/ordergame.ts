import { Component, ViewChild } from '@angular/core';
import {ActionSheetController, NavParams, Refresher, Events, NavController, LoadingController, Platform, ToastController, PopoverController} from 'ionic-angular';
import { Cordergame, OrderGamelPageData, OrderGamelPageType, OrderGamelContentPageData} from '../../providers/local-ordergame';
import { OrderGameContent } from '../ordergamecontent/ordergamecontent';
import { MyGeoLocation } from '../../providers/dev-ctrl';
import { TimingPopoverPage } from '../timinggame-popover/timinggame-popover';


@Component({
  selector: 'ordergame',
  templateUrl: 'ordergame.html'
})
export class OrderGame {
  public expression: boolean = false;
  public expression1: boolean = true;
  public loadnum: number = 20;
  // public distance: number = 500;
  //@ViewChild(Content) public content: Content;
  @ViewChild(Refresher) public refresher: Refresher;
  // @ViewChild(Content) content: Content;
  public pagedata: OrderGamelPageData;
  // public pageinit: boolean = false;
  // public showbutton: boolean = false;
  // public showtitle: boolean = true;
  // public pageHeight;
  private cancelRegButton: Function;
  private canleave: boolean = false;
  private isToast: boolean = false;
  private contentpage: OrderGamelContentPageData = null;
  public pagetype: number;
  public pagetypeother: number = 0;
  public clicktoggle: boolean;
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

    this.pagedata = this.navParams.data;
    console.log(this.pagedata);
    console.log("ordergame constructor");
    // this.pageHeight = document.body.clientHeight;
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
    let v = this.ordergame.newOrderGamelContentPageData(it.ID, this.pagedata.type);
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


  // ngAfterViewInit() {
  //   this.content.addScrollListener((event) => {
  //     console.log(event.target.scrollTop);
  //     if (event.target.scrollTop >= this.pageHeight) {
  //       this.showbutton = true;
  //       this.showtitle = false;
  //     } else {
  //       this.showbutton = false;
  //       this.showtitle = true;
  //     }
  //   });
  // }


  doRefresh(refresher) {

    this.mygeo.getCurr();
    this.ordergame.refreshList(this.pagedata);
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
    console.log("ordergame ionViewDidLoad");
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

  // ionViewCanEnter(): boolean {
  //   console.log("ionViewCanEnter");
  //   return true;
  // }
  // ionViewWillEnter() {
  //   console.log("ionViewWillEnter");
  // }
  ionViewDidEnter() {
    // console.log("ordergame ionViewDidEnter");

    this.refresher._beginRefresh();

    if (this.pagedata.type === OrderGamelPageType.main || this.pagedata.type === OrderGamelPageType.sec) {
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

  // ionViewCanLeave(): boolean {
  //   console.log("ionViewCanLeave");
  //   return true;
  // }

  ionViewWillLeave() {
    if (this.contentpage !== null) {
      this.events.unsubscribe(this.contentpage.eventNameGetSuccess);
      this.events.unsubscribe(this.contentpage.eventNameGetFail)
    }

    // console.log("ionViewWillLeave");
    if (this.pagedata.type === OrderGamelPageType.main || this.pagedata.type === OrderGamelPageType.sec) {
      this.cancelRegButton();
      this.isToast = false;
      this.canleave = false;
    }
  }

  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave");
  // }



}
