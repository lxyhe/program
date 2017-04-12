import { Component } from '@angular/core';
import { Cauth } from '../../providers/local-auth';
import { NavController } from 'ionic-angular';
import { OrderGame } from '../ordergame/ordergame';
import { Cordergame } from '../../providers/local-ordergame';

@Component({
  selector: 'ordergamemgr',
  templateUrl: 'ordergamemgr.html'
})
export class OrderGameMGR {

  constructor(
    public ordergame: Cordergame,
    public nav: NavController,
    public auth: Cauth) {
  }

  getCancel() {
    this.nav.push(OrderGame, this.ordergame.cancelpage);
  }

  getReady() {
    this.nav.push(OrderGame, this.ordergame.readypage);
  }

  getStart() {
    this.nav.push(OrderGame, this.ordergame.startpage);
  }

  getFinish() {
    this.nav.push(OrderGame, this.ordergame.finishpage);
  }



}
