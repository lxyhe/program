import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { MenuController, NavController, Events, AlertController } from 'ionic-angular';

import { Cauth } from '../../providers/local-auth';

import { LoginPage } from '../loginpage/loginpage';
export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  public iswechathidden: boolean = false;
  public wechatDisabled = false;
  public gologin;
  constructor(
    public alertCtrl: AlertController,
    public storage: Storage,
    public events: Events,
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: Cauth) {
    this.gologin = LoginPage;
    this.slides = [
      {
        title: '<b>周末干嘛？</b>',
        description: '追剧？打游戏？不如看看周边的线下活动！',
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: '<b>朋友聚会？</b>',
        description: '吃饭？唱K？不如拉到户外，沐浴一米阳光！',
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: '<b>公司团建？</b>',
        description: '死板？没创意？ 赶快加入，为你私人订制！',
        image: 'assets/img/ica-slidebox-img-3.png',
      }
    ];
  }

  startApp() {

    try {
      Wechat.isInstalled((installed) => {
        if (!installed) {
          let alert = this.alertCtrl.create({
            title: '错误!',
            subTitle: '您还没有安装微信,请安装谢谢!',
            buttons: ['OK']
          });
          alert.present();

          return;

        }
      }, function(reason) {

        let alert = this.alertCtrl.create({
          title: '错误!',
          subTitle: '检测到微信程序错误!请重新安装微信',
          buttons: ['OK']
        });
        alert.present();

        return;

      });
    } catch (err) {

      console.log("wechat plug-in err:", err);
      return;

    }


    //todo show waiting wechat auth
    let scope = "snsapi_userinfo";
    let state = "_" + (+new Date());
    
    this.wechatDisabled = true;
    Wechat.auth(scope, state, (response) => {

      this.auth.wechatAuth(response.code);
      this.wechatDisabled = false;

    }, (reason) => {
      this.wechatDisabled = false;
    });

  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    // this.menu.enable(false);
    this.listenEvents();

    this.events.publish("login:try:autologin");

  }
  ionViewWillEnter() {


    try {
      Wechat.isInstalled((installed) => {
        if (!installed) {
          this.iswechathidden = true;
          console.log("wechat not installed");

        }
        else {
          this.iswechathidden = false;
          console.log("wechat installed");
        }
      }, function(reason) {

        console.log("wechat plug-in err:", reason);
        this.iswechathidden = true;

        return;

      });
    } catch (err) {

      this.iswechathidden = true;
      console.log("not wechat plug-in:", err);
      return;

    }



  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    // this.menu.enable(true);
    this.unlistenEvents();

  }

  unlistenEvents() {

    this.events.unsubscribe('auth:login:start');

    this.events.unsubscribe('auth:login:stop');

    this.events.unsubscribe('auth:login:success');

    this.events.unsubscribe('auth:login:success:session');

  }

  listenEvents() {

    this.events.subscribe('auth:login:start:session', () => {
      //todo start login...
    });

    this.events.subscribe('auth:login:stop:session', () => {
      //todo stop login...
    });

    this.events.subscribe('auth:login:success', () => {
      this.navCtrl.pop();
    });

    this.events.subscribe('auth:login:success:session', () => {
      setTimeout(() => {
        this.navCtrl.pop();
      }, 300);

    });


  }

}
