import {NavParams, NavController, Events, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';

import { Cordergame } from '../../providers/local-ordergame';

import { MapGet } from '../mapget/mapget';


@Component({
  selector: 'ordergamepreview',
  templateUrl: 'ordergamepreview.html'
})
export class OrderGamePreview {

  public session: ordergame.OrderGameRetRecv;
  public disabledButton: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public events: Events,
    public navParams: NavParams,
    public nav: NavController,
    public ordergame: Cordergame) {

    this.session = this.navParams.data;

  }

  publish() {
    this.ordergame.publishOrder(this.session);
  }

  getmap() {
    console.log(this.session.Lng, this.session.Lat, this.session.Zoom);

    this.nav.push(MapGet, { lng: this.session.Lng, lat: this.session.Lat, zoom: this.session.Zoom });

  }

  ionViewDidEnter() {

    this.events.subscribe('ordergame:publish:success', () => {
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

    this.events.subscribe('ordergame:publish:fail', () => {
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

    this.events.unsubscribe('ordergame:publish:success');

    this.events.unsubscribe('ordergame:publish:fail');

  }


}
