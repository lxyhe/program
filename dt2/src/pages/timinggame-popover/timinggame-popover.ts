import { Component } from '@angular/core';
import { ViewController, NavParams, Events} from 'ionic-angular';

@Component({
  selector: 'timinggame-popver',
  templateUrl: 'timinggame-popover.html'
})



export class TimingPopoverPage {
  public pagedata;
  public toggle: boolean = true;
  public num: number = 2;

  constructor(
    public viewCtrl: ViewController,
    public navrame: NavParams,
    public events: Events
  ) {
    this.pagedata = this.navrame.data;

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
