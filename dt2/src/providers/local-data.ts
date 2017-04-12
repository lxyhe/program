import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Cauth } from './local-auth';
import { GwsrpCli } from './gwsrpcli';
import { Cordergame } from './local-ordergame';
import { Ctiminggame } from './local-timinggame';
import { LoginRegister } from './local-loginregister';
@Injectable()
export class LocalData {

  private gwsrpc: GwsrpCli;

  private open() {
    console.log('ws open');
  }

  private close() {
    console.log('ws close');
  }

  constructor(
    public events: Events,
    public auth: Cauth,
    public ordergame: Cordergame,
    public timinggame: Ctiminggame,
    public loginregister: LoginRegister,
  ) {


  }

  init() {
    this.gwsrpc = new GwsrpCli;

    this.auth.setData(this, this.gwsrpc);
    this.ordergame.setData(this, this.gwsrpc, this.auth);
    this.timinggame.setData(this, this.gwsrpc, this.auth);
    this.loginregister.setData(this.gwsrpc);
    this.gwsrpc.connect('wss://dt.lexianyi.com:9999/', 1, this.auth, this.ordergame, this.timinggame, this.open, this.close);
  }


}
