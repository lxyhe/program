import { Component, ViewChild } from '@angular/core';

import { NavParams, Tabs, Events, ToastController } from 'ionic-angular';
import { HomePage } from '../homepage/homepage';
import { MySelf } from '../myself/myself';
import { OrderGame } from '../ordergame/ordergame';
import { TimingGame }from '../timinggame/timinggame';
import { Cordergame } from '../../providers/local-ordergame';
import { Ctiminggame } from '../../providers/local-timinggame';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  @ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = HomePage;
  tab2Root: any = OrderGame;
  tab3Root: any = OrderGame;
  tab4Root: any = MySelf;
  tab5Root: any = TimingGame;
  mySelectedIndex: number;

  public canleave: boolean = false;
  public isToast: boolean = false;

  constructor(
    public toastCtrl: ToastController,
    public events: Events,
    public navParams: NavParams,
    public ordergame: Cordergame,
    public timinggame:Ctiminggame

  ) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

  }

  switchTabs(index: number) {
    this.tabRef.select(index);
  }

  ionViewDidEnter() {
    this.events.subscribe("app:componets:switchTabs", (index) => {
      this.switchTabs(index[0]);
    });
  }
  ionViewWillLeave() {
    this.events.unsubscribe("app:componets:switchTabs", null);
  }


  // ionViewCanLeave(): boolean {
  //
  //   if (this.isToast) {
  //
  //     this.canleave = true;
  //
  //   } else {
  //
  //     let toast = this.toastCtrl.create({
  //       message: '在按一次退出',
  //       duration: 3000,
  //     });
  //     toast.present();
  //
  //     this.isToast = true;
  //
  //     setTimeout(() => {
  //       this.isToast = false;
  //     }, 3000);
  //
  //   }
  //
  //
  //
  //   return this.canleave;
  // }

  // ionViewDidLoad(){
  //   console.log("createdPage2");
  // }
  // ionViewWillUnload(){
  //   console.log("destroyedPage2");
  // }
  //
  // ionViewCanEnter(): boolean {
  //   console.log("ionViewCanEnter1");
  //   return true;
  // }
  // ionViewWillEnter() {
  //   console.log("ionViewWillEnter3");
  // }
  // ionViewDidEnter() {
  //   console.log("ionViewDidEnter4");
  // }
  //
  // ionViewCanLeave(): boolean {
  //   console.log("ionViewCanLeave1");
  //   return true;
  // }
  // ionViewWillLeave() {
  //   console.log("ionViewWillLeave3");
  // }
  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave4");
  // }

}
