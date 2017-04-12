import { Component } from '@angular/core';
import { NavParams, NavController,LoadingController,Events,AlertController} from 'ionic-angular';
import { MapGet } from '../mapget/mapget';
import { Ctiminggame, TimingGamelContentPageData,TimingGamelPageType } from '../../providers/local-timinggame';
import { Cauth, UserListPageData} from '../../providers/local-auth';
import { UserList } from '../userlist/userlist';
@Component({
  selector: 'timinggamedetails',
  templateUrl: 'timinggamedetails.html'
})
export class TimingGameDetails {

  public session: TimingGamelContentPageData;
   public contentpage: UserListPageData = null;
  constructor(
    public loadingCtrl: LoadingController,
   public auth: Cauth,
    public timinggame: Ctiminggame,
    public alertCtrl: AlertController,
     public events: Events,
    public navParams: NavParams,
    public nav: NavController
  ) {
    this.session = this.navParams.data;
    console.log(this.session);
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
  publish() {
    switch (this.session.type) {
      case TimingGamelPageType.main: {
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
                console.log('取消');
              }
            },
            {
              text: '确定',
              handler: data => {
                this.timinggame.Join(this.session.ContentID, data.pcode);
              }
            }
          ]
        });
        prompt.present();
      } break;

      case TimingGamelPageType.close: {

        let confirm = this.alertCtrl.create({
          title: '切换状态?',
          message: '当前活动为关闭状态，你希望做什么?',
          buttons: [
            {
              text: '查看参与人员',
              handler: () => {
                console.log('check clicked');
                this.JoinPeople();
              }
            },
            {
              text: '切换成开放',
              handler: () => {
                console.log('change ready to start clicked');
                this.timinggame.changeState(this.session.ContentID, timinggame.TimingState.CLOSE,timinggame.TimingState.OPEN);
                this.nav.pop();
              }
            },
            {
              text: '切换成完成',
              handler: () => {
                console.log('change ready to cancel clicked');
                this.timinggame.changeState(this.session.ContentID, timinggame.TimingState.CLOSE,timinggame.TimingState.FINISHT);
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

      case TimingGamelPageType.open: {

        let confirm = this.alertCtrl.create({
          title: '切换状态?',
          message: '当前活动为开放状态，你希望做什么?',
          buttons: [
            {
              text: '查看参与人员',
              handler: () => {
                console.log('check clicked');
                this.JoinPeople();
              }
            },
            {
              text: '切换成关闭',
              handler: () => {
                console.log('change start to finish clicked');
                this.timinggame.changeState(this.session.ContentID, timinggame.TimingState.OPEN,timinggame.TimingState.CLOSE);
                this.nav.pop();
              }
            },
            {
              text: '切换成完成',
              handler: () => {
                console.log('change start to cancel clicked');
                this.timinggame.changeState(this.session.ContentID, timinggame.TimingState.OPEN,timinggame.TimingState.FINISHT);
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

      case TimingGamelPageType.finish: {

        let confirm = this.alertCtrl.create({
          title: '活动已经完成',
          message: '你希望做什么？',
          buttons: [
            {
              text: '点赞',
              handler: () => {
                let alert = this.alertCtrl.create({
                  title: '点赞成功',
                  buttons: ['OK']
                });
                alert.present();

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
    this.nav.push(MapGet, { lng: this.session.page.Lng, lat: this.session.page.Lat, zoom: this.session.page.Zoom });
  }

}
