/// <reference path="../../typings/index.d.ts"/>
/// <reference path="../../typings/3th.d.ts"/>

import { Component, ViewChild } from '@angular/core';

import { Events, MenuController, Nav, Platform, AlertController, LoadingController} from 'ionic-angular';
// import { Splashscreen, StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { LocalData } from '../providers/local-data';
import { Cauth } from '../providers/local-auth';

export interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  selector: 'apptemplate',
  templateUrl: 'app.template.html'
})
export class DtApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: '首页', component: TabsPage, index: 0, icon: 'home' },
    { title: '预约活动', component: TabsPage, index: 1, icon: 'calendar' },
    { title: '正在活动', component: TabsPage, index: 2, icon: 'contacts' },
    { title: '即时活动', component: TabsPage, index: 3, icon: 'compass' },
    { title: '我的功能', component: TabsPage, index: 4, icon: 'map' },
    { title: '退出登陆', component: TutorialPage, index: -1, icon: 'exit' },

  ];
  rootPage: any = TabsPage;

  constructor(
    public alertCtrl: AlertController,
    public events: Events,
    public menu: MenuController,
    public platform: Platform,
    public localdata: LocalData,
    public auth: Cauth,
    public loadingCtrl: LoadingController,
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {

      console.log('platform ready!');

      // StatusBar.styleDefault();
      // StatusBar.hide();
      // Splashscreen.hide();

      setTimeout(() => {

      }, 0);


    });

    //不用cordova的初始化代码可以卸载这里
    this.localdata.init();

    this.events.subscribe("app:component:need:login", () => {
      this.nav.push(TutorialPage);
    });


    this.events.subscribe('auth:login:fail', () => {
      //todo show fail
      this.events.publish("app:component:need:login");
    });



    this.events.subscribe('auth:login:fail:session', () => {
      //todo show fail
      this.events.publish("app:component:need:login");
    });


    this.events.subscribe('ordergame:join:success', () => {
      let alert = this.alertCtrl.create({
        title: '成功',
        subTitle: '参加活动成功！',
        buttons: ['OK']
      });
      alert.present();

    });
    this.events.subscribe("loginmessage_succ", data => {
      if (data[0] = "succeed") {
        let prompt = this.alertCtrl.create({
          title: '登陆成功',
          message: "点击确定后,稍等进入主界面",
          buttons: [{
            text: 'ok',
            handler: () => {
              this.nav.pop();
            }

          }]
        });
        prompt.present();
        return;
      }
    })

    this.events.subscribe("registermessage_succ", data => {
      if (data[0] = "succeed") {
        this.events.unsubscribe("registermessage_succ");
        let alert = this.alertCtrl.create({
          title: '提示!',
          subTitle: '注册成功！',
          buttons: [{
            text: 'ok',
            handler:()=>{
              this.nav.pop();
              let loading = this.loadingCtrl.create({
                spinner: 'bubbles',
                content: " 自动登录中.......",
              });
              loading.present();
              this.events.subscribe("autologin_succ",data=>{
                loading.dismiss();

              });
            }
          }]
        });
        alert.present();
        return;
      }

    })
    this.events.subscribe("registermessage_fail", data => {
      if (data[0] = "fail") {
        this.events.unsubscribe("registermessage_fail");
        console.log(data[0]);
        let alert = this.alertCtrl.create({
          title: '提示!',
          subTitle: '用户名已经有了,请选择其他的',
          buttons: [{
            text: 'ok',
          }]
        });
        alert.present();
      }
    })
    this.events.subscribe("loginmessage_fail", data => {
      if (data[0] = "fail") {

        let prompt = this.alertCtrl.create({
          title: '提示!',
          message: "您账号或密码有误,请重新输入!",
          buttons: ['ok']
        });
        prompt.present();
      }
    })

    this.events.subscribe('ordergame:join:fail', (v) => {
      let alert = this.alertCtrl.create({
        title: '参加活动失败',
        subTitle: v[0],
        buttons: ['OK']
      });
      alert.present();
    });

    this.events.subscribe('timinggame:join:success', () => {
      let alert = this.alertCtrl.create({
        title: '成功',
        subTitle: '参加活动成功！',
        buttons: ['OK']
      });
      alert.present();
    })
    this.events.subscribe('timinggame:join:fail', (v) => {
      let alert = this.alertCtrl.create({
        title: '参加活动失败',
        subTitle: v[0],
        buttons: ['OK']
      });
      alert.present();
    })
    this.events.subscribe('auth:setPublish:success', () => {
      let alert = this.alertCtrl.create({
        title: '成功',
        subTitle: '设置发布者成功',
        buttons: ['OK']
      });
      alert.present();

    });

    this.events.subscribe('auth:setPublish:fail', (v) => {
      let alert = this.alertCtrl.create({
        title: '设置发布者失败',
        subTitle: v[0],
        buttons: ['OK']
      });
      alert.present();
    });


    //不用cordova的初始化代码可以卸载这里
    // todo

  }


  enableMenu(able: boolean) {
    this.menu.enable(able, 'main');
    this.menu.enable(!able, 'secondMenu');
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario


    if (-1 == page.index) {
      this.auth.Logout();
      this.events.publish("app:component:need:login");

    } else {
      let x = this.nav.getActive();
      if (x.component == page.component) {
        this.events.publish("app:componets:switchTabs", page.index);
      } else {
        this.nav.setRoot(page.component, { tabIndex: page.index });
      }

    }



  }

}
