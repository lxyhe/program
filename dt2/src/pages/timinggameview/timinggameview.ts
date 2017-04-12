import {NavParams, NavController, Events, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import { Ctiminggame } from '../../providers/local-timinggame';
import { MapGet } from '../mapget/mapget';


@Component({
  selector: 'timinggameview',
  templateUrl: 'timinggameview.html'
})
export class TimingGameView {

  public session: timinggame.TimingGameRetRecv;
  public disabledButton: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public events: Events,
    public navParams: NavParams,
    public nav: NavController,
    public timinggame: Ctiminggame
  ) {

    this.session = this.navParams.data;


  }

  publish() {

    this.timinggame.publishTiming(this.session);
      console.log(this.session);
  }

  getmap() {
    console.log(this.session.Lng, this.session.Lat, this.session.Zoom);

    this.nav.push(MapGet, { lng: this.session.Lng, lat: this.session.Lat, zoom: this.session.Zoom });


  }

  ionViewDidEnter() {

    this.events.subscribe('timinggame:publish:success', () => {
      this.disabledButton = true;
      let prompt = this.alertCtrl.create({
        title: '成功',
        message: "发布活动成功，点击确定返回",
        buttons: [
          {
            text: '确定',
            handler: () => {
              this.nav.popToRoot();
            }
          },
        ]
      });
      prompt.present();
    });

    this.events.subscribe('timinggame:publish:fail', () => {
      this.disabledButton = true;
      let prompt = this.alertCtrl.create({
        title: '失败',
        message: "发布活动失败,必须正确设置时间地址,",
        buttons: [
          {
            text: '确定',
            handler: () => {
              this.nav.pop();
            }
          },
        ]
      });
      prompt.present();
    });



  }


  ionViewWillLeave() {

    this.events.unsubscribe('timinggame:publish:success');

    this.events.unsubscribe('timinggame:publish:fail');

  }


}
