import { Component } from '@angular/core';
import { Cauth } from '../../providers/local-auth';
import { NavController } from 'ionic-angular';
import { TimingGame } from '../timinggame/timinggame';
import { Ctiminggame } from '../../providers/local-timinggame';
@Component({
  selector: 'timinggamemgr',
  templateUrl: 'timinggamemgr.html'
})
export class TimingGameMgr {
  constructor(
    public timinggame: Ctiminggame,
    public nav: NavController,
    public auth: Cauth
  ) {

  }

  getOpen() {
    this.nav.push(TimingGame, this.timinggame.openpage);
  }
  getClose() {
    this.nav.push(TimingGame, this.timinggame.closepage);
  }
  getFinish() {
    this.nav.push(TimingGame, this.timinggame.finishpage);
  }

}
