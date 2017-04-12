import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import {ActionSheetController, NavParams, Refresher, Events, NavController, LoadingController, Platform, ToastController, PopoverController} from 'ionic-angular';
import { Cordergame, OrderGamelPageData, OrderGamelPageType, OrderGamelContentPageData} from '../../providers/local-ordergame';
import { Ctiminggame, TimingGamelPageData, TimingGamelContentPageData} from '../../providers/local-timinggame';
import { OrderGameContent } from '../ordergamecontent/ordergamecontent';
import { TimingGameDetails } from '../timinggamedetails/timinggamedetails';
import { MyGeoLocation } from '../../providers/dev-ctrl';
import { TimingPopoverPage } from '../timinggame-popover/timinggame-popover';
import { AllTypeStatePage } from '../alltypestate/alltypestate';
@Component({
  selector: 'homepage',
  templateUrl: 'homepage.html'
})
export class HomePage {
  public expression: boolean = false;
  public expression1: boolean = true;
  public loadnum: number = 20;
  @ViewChild('mySlider') slider: Slides;
  private sliderInterval: number;
  mySlideOptions = {
    autoplay: 2000,
    initialSlide: 0,
    pager: true,
    loop: true,
    speed: 300
  };
  // public distance: number = 500;
  //@ViewChild(Content) public content: Content;
  @ViewChild(Refresher) public refresher: Refresher;
  // @ViewChild(Content) content: Content;
  public pagedata: OrderGamelPageData;
  public pagedata1: TimingGamelPageData;
  // public pageinit: boolean = false;
  // public showbutton: boolean = false;
  // public showtitle: boolean = true;
  // public pageHeight;
  private cancelRegButton: Function;
  private canleave: boolean = false;
  private isToast: boolean = false;
  private contentpage: OrderGamelContentPageData = null;
  private contentpage1: TimingGamelContentPageData = null;
  public pagetype: number;
  public pagetypeother: number = 0;
  public clicktoggle: boolean;
  public sumpagedata;
  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public mygeo: MyGeoLocation,
    public nav: NavController,
    public events: Events,
    public navParams: NavParams,
    public ordergame: Cordergame,
    public timinggame: Ctiminggame,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    public actionCtrl: ActionSheetController

  ) {
    this.pagedata = this.navParams.data;
    console.log("ordergame constructor");
    console.log(this.pagedata);
    // this.pageHeight = document.body.clientHeight;
    this.pagedata1 = this.timinggame.mainpage;
    console.log(this.pagedata1);

  }

  // ngOnInit(){
  // setInterval(()=>{
  //  this.slider.slideNext(300,true);
  // },2000);
  // }
  CatePage() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true
    });
    loading.present();
    this.nav.push(AllTypeStatePage, { subpage: this.pagedata, subtype: 1 });
  }
  FarmHousePage() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true
    });
    loading.present();
    this.nav.push(AllTypeStatePage, { subpage: this.pagedata, subtype: 2 });
  }
  EntertainmentPage() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true
    });
    loading.present();
    this.nav.push(AllTypeStatePage, { subpage: this.pagedata, subtype: 3 });
  }
  TourPage() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true
    });
    loading.present();
    this.nav.push(AllTypeStatePage, { subpage: this.pagedata, subtype: 4 });
  }
  OutDoorPage() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true
    });
    loading.present();
    this.nav.push(AllTypeStatePage, { subpage: this.pagedata, subtype: 5 });
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
  goToSessionDetail(it) {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true
    });
    loading.present();
    if (it.hasOwnProperty('timing')) {
      let v1 = this.timinggame.newTimingGamelContentPageData(it.ID, this.pagedata1.type);
      this.contentpage1 = v1;
      this.timinggame.getTimingGamelContentPageData(v1, it.State);
      this.events.subscribe(v1.eventNameGetSuccess, () => {
        this.events.unsubscribe(this.contentpage1.eventNameGetSuccess);
        this.events.unsubscribe(this.contentpage1.eventNameGetFail)
        this.contentpage1 = null;

        this.nav.push(TimingGameDetails, v1);
        loading.dismiss();
      });
      this.events.subscribe(v1.eventNameGetFail, () => {
        this.events.unsubscribe(this.contentpage1.eventNameGetSuccess);
        this.events.unsubscribe(this.contentpage1.eventNameGetFail)
        this.contentpage1 = null;
        loading.dismiss();
      });
    } else {
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
        this.events.unsubscribe(this.contentpage1.eventNameGetSuccess);
        this.events.unsubscribe(this.contentpage1.eventNameGetFail)
        this.contentpage1 = null;
        loading.dismiss();
      });
    }
  }

  doRefresh(refresher) {


    this.mygeo.getCurr();
    this.ordergame.refreshList(this.pagedata);
    this.timinggame.refreshList(this.pagedata1);
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
      for (var i of this.pagedata1.list.Items) {
        i["timing"] = 1;
      }
      this.pagedata.list.Items = this.pagedata.list.Items.concat(this.pagedata1.list.Items);

    });


    this.events.subscribe(this.pagedata.eventNameGetFail, () => {
      this.refresher.complete();

    });

    this.events.subscribe(this.pagedata1.eventNameGetSuccess, () => {
      this.refresher.complete();

    });


    this.events.subscribe(this.pagedata1.eventNameGetFail, () => {
      this.refresher.complete();

    });




  }
  ionViewWillUnload() {
    console.log("ordergame ionViewWillUnload");
    this.events.unsubscribe(this.pagedata.eventNameGetSuccess);
    this.events.unsubscribe(this.pagedata.eventNameGetFail)
    this.events.unsubscribe(this.pagedata1.eventNameGetSuccess);
    this.events.unsubscribe(this.pagedata1.eventNameGetFail)
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



    this.sliderInterval = setInterval(() => {
      if (typeof this.slider !== "undefined" && null !== this.slider) {
        this.slider.slideNext(300, true);
      }
    }, 2000);



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
    clearInterval(this.sliderInterval);
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
