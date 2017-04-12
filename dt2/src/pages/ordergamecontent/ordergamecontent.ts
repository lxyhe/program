import {NavParams, NavController, Events, AlertController, LoadingController } from 'ionic-angular';
import {Component} from '@angular/core';

import { MapGet } from '../mapget/mapget';
import { Cordergame, OrderGamelContentPageData, OrderGamelPageType } from '../../providers/local-ordergame';
import { Cauth, UserListPageData} from '../../providers/local-auth';
import { UserList } from '../userlist/userlist';

@Component({
  selector: 'ordergamecontent',
  templateUrl: 'ordergamecontent.html'
})
export class OrderGameContent {

  public session: OrderGamelContentPageData;
  public contentpage: UserListPageData = null;

  constructor(
    public loadingCtrl: LoadingController,
    public auth: Cauth,
    public ordergame: Cordergame,
    public alertCtrl: AlertController,
    public events: Events,
    public navParams: NavParams,
    public nav: NavController) {

    this.session = this.navParams.data;

  }

  ionViewWillLeave() {
    if (this.contentpage !== null) {
      this.events.unsubscribe(this.contentpage.eventNameGetSuccess);
      this.events.unsubscribe(this.contentpage.eventNameGetFail)
    }
  }

  JoinPeople() {
    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: " loading ...",
      dismissOnPageChange: true,
    });
    loading.present();

    let v = this.auth.newUserListPageData();
    this.auth.getUserListPageData(v, this.session.page.JoinID);
    this.nav.push(UserList, v);

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

  publish() {
    switch (this.session.type) {
      case OrderGamelPageType.main: {
        let prompt = this.alertCtrl.create({
          title: '确认参加活动',
          message: "请向组织者索取邀请码后方可报名参加",
          inputs: [
            {
              name: 'pcode',
              placeholder: '邀请码填在这里'
            },
          ],
          buttons: [
            {
              text: '取消',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: '确定',
              handler: data => {
                this.ordergame.Join(this.session.ContentID, data.pcode);
              }
            }
          ]
        });
        prompt.present();
      } break;

      case OrderGamelPageType.ready: {

        let confirm = this.alertCtrl.create({
          title: '切换状态?',
          message: '当前活动为准备状态，你希望做什么?',
          buttons: [
            {
              text: '查看参与人员',
              handler: () => {
                console.log('check clicked');
                this.JoinPeople();
              }
            },
            {
              text: '切换成开始',
              handler: () => {
                console.log('change ready to start clicked');
                this.ordergame.changeState(this.session.ContentID, ordergame.OrderState.READY, ordergame.OrderState.START);
                this.nav.pop();
              }
            },
            {
              text: '切换成取消',
              handler: () => {
                console.log('change ready to cancel clicked');
                this.ordergame.changeState(this.session.ContentID, ordergame.OrderState.READY, ordergame.OrderState.CANCEL);
                this.nav.pop();
              }
            },
            {
              text: '取消',
              handler: () => {
                console.log('cancel clicked');
              }
            }
          ]
        });
        confirm.present();
      } break;

      case OrderGamelPageType.start: {

        let confirm = this.alertCtrl.create({
          title: '切换状态?',
          message: '当前活动为开始状态，你希望做什么?',
          buttons: [
            {
              text: '查看参与人员',
              handler: () => {
                console.log('check clicked');
                this.JoinPeople();
              }
            },
            {
              text: '切换成完成',
              handler: () => {
                console.log('change start to finish clicked');
                this.ordergame.changeState(this.session.ContentID, ordergame.OrderState.START, ordergame.OrderState.FINISH);
                this.nav.pop();
              }
            },
            {
              text: '切换成取消',
              handler: () => {
                console.log('change start to cancel clicked');
                this.ordergame.changeState(this.session.ContentID, ordergame.OrderState.START, ordergame.OrderState.CANCEL);
                this.nav.pop();
              }
            },
            {
              text: '取消',
              handler: () => {
                console.log('cancel clicked');
              }
            }
          ]
        });
        confirm.present();
      } break;

      case OrderGamelPageType.finish: {

        let confirm = this.alertCtrl.create({
          title: '活动已经完成',
          message: '你希望做什么？',
          buttons: [
            {
              text: '查看参与人员',
              handler: () => {
                console.log('check clicked');
                this.JoinPeople();
              }
            },
            {
              text: '取消',
              handler: () => {
                console.log('cancel clicked');
              }
            }
          ]
        });
        confirm.present();
      } break;

      case OrderGamelPageType.cancel: {

        let confirm = this.alertCtrl.create({
          title: '活动已经完成',
          message: '你希望做什么？',
          buttons: [
            {
              text: '查看参与人员',
              handler: () => {
                console.log('check clicked');
                this.JoinPeople();
              }
            },
            {
              text: '取消',
              handler: () => {
                console.log('cancel clicked');
              }
            }
          ]
        });
        confirm.present();
      } break;

    }
  }

  getmap() {

    // console.log(this.session.page.Lng, this.session.page.Lat, this.session.page.Zoom);

    this.nav.push(MapGet, { lng: this.session.page.Lng, lat: this.session.page.Lat, zoom: this.session.page.Zoom });

  }




}
