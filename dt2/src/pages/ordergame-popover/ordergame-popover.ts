import { Component } from '@angular/core';
import { ViewController, NavParams, Events} from 'ionic-angular';
@Component({
  selector: 'ordergame-popver',
  templateUrl: 'ordergame-popover.html'
})

export class OrderGamePopoverPage {
  public pagedata;
  public num: number = 2;
  constructor(
    public viewCtrl: ViewController,
    public navrame: NavParams,
    public events: Events
  ) {

  }
  PressTime() {
    this.pagedata.sorttype = 1;//TODO 按照时间排序按钮
    this.events.publish("typemsg", this.pagedata);

    this.viewCtrl.dismiss();
  }
  PressDistance() {
    this.pagedata.sorttype = 2;//TODO 按照距离排序按钮
    this.events.publish("typemsg", this.pagedata);

    this.viewCtrl.dismiss();

  }
  PressPrice() {
    this.pagedata.sorttype = 3;//TODO 按照价格排序按钮
    this.events.publish("typemsg", this.pagedata);

    this.viewCtrl.dismiss();
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
