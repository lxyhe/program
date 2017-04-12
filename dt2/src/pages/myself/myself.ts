import { Component } from '@angular/core';
import { Cauth } from '../../providers/local-auth';
import { NavController, AlertController, Platform, ToastController } from 'ionic-angular';
import { OrderGameNew } from '../ordergamenew/ordergamenew';
import { OrderGameMGR } from '../ordergamemgr/ordergamemgr';
import { Cordergame } from '../../providers/local-ordergame';
import { OrderGame } from '../ordergame/ordergame';
import { TimingGame } from '../timinggame/timinggame';
import { Ctiminggame } from '../../providers/local-timinggame';
import { TutorialPage } from '../tutorial/tutorial';
import { StaticQRPage, QRinfo } from '../staticqr/staticqr';
import { MyBarcodeScanner } from '../../providers/dev-ctrl';
import { MyMessage } from  '../mymessage/mymessage';
import { TimingGameNew} from '../timinggamenew/timinggamenew';
import { TimingGameMgr } from '../timinggamemgr/timinggamemgr';

@Component({
  selector: 'myself',
  templateUrl: 'myself.html'
})
export class MySelf {

  private cancelRegButton: Function;
  private canleave: boolean = false;
  private isToast: boolean = false;

  constructor(
    public toastCtrl: ToastController,
    public platform: Platform,
    public myscan: MyBarcodeScanner,
    public alertCtrl: AlertController,
    public ordergame: Cordergame,
    public timinggame:Ctiminggame,
    public nav: NavController,
    public auth: Cauth,
    public mymsgCtrl: NavController

  ) {
  }

  newOrderGame() {
    this.nav.push(OrderGameNew);
  }

  mgrOrderGame() {
    this.nav.push(OrderGameMGR);
  }
  newOrderGameQuick(){
    this.nav.push(TimingGameNew);
  }
  mgrOrderGameQuick(){
    this.nav.push(TimingGameMgr);
  }

  setPublish() {
    this.myscan.scan("setpublish");
  }
  getmyMsg() {
    this.mymsgCtrl.push(MyMessage);
  }
  myQR() {
    if (this.auth.UserID === "") {
      let confirm = this.alertCtrl.create({
        title: '您还未登录',
        message: '请点击[登录]后使用微信登录',
        buttons: [
          {
            text: '登录',
            handler: () => {
              console.log('check clicked');
              this.nav.push(TutorialPage);
            }
          },
        ]
      });
      confirm.present();


      return;
    }



    let qrinfo = new QRinfo();
    qrinfo.title = "我的QR码";
    let kvs = new Map<string, string>();
    kvs["userid"] = this.auth.UserID;

    qrinfo.setLexianyiQR("myqrpage", kvs);

    this.nav.push(StaticQRPage, qrinfo);
  }
  getParty() {
    if (this.auth.UserID === "") {
      let confirm = this.alertCtrl.create({
        title: '您还未登录',
        message: '请点击[登录]后使用微信登录',
        buttons: [
          {
            text: '登录',
            handler: () => {
              console.log('check clicked');
              this.nav.push(TutorialPage);
            }
          },
        ]
      });
      confirm.present();


      return;
    }
    this.nav.push(OrderGame, this.ordergame.mypage);
  }
  getTParty(){
    if (this.auth.UserID === "") {
      let confirm = this.alertCtrl.create({
        title: '您还未登录',
        message: '请点击[登录]后使用微信登录',
        buttons: [
          {
            text: '登录',
            handler: () => {
              console.log('check clicked');
              this.nav.push(TutorialPage);
            }
          },
        ]
      });
      confirm.present();
      return;
    }
    this.nav.push(TimingGame,this.timinggame.mypage);
  }
  ionViewDidEnter() {
    // console.log("ordergame ionViewDidEnter");

    this.cancelRegButton = this.platform.registerBackButtonAction(() => {


      if (this.isToast) {

        this.canleave = true;

      } else {

        let toast = this.toastCtrl.create({
          message: '在按一次退出',
          duration: 3000,
          position:'top'
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

  ionViewWillLeave() {
    // console.log("ionViewWillLeave");
    this.cancelRegButton();
    this.isToast = false;
    this.canleave = false;
  }
}
