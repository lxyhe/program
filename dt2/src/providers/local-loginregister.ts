import { GwsrpCli } from './gwsrpcli';
import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
@Injectable()
export class LoginRegister {
  public gwsrpc: GwsrpCli;
  constructor(
    public event: Events,
    public alertCtrl:AlertController,
  ) {

  }
  setData(gwsrpc: GwsrpCli) {
    this.gwsrpc = gwsrpc;
  }

  async registerprove(username, password, nickname, sex, country, province, city, ) {


    let a = new this.gwsrpc.Builderauth.RegAuthSend();

    a.Username = username;
    a.Password = password;
    a.Nickname = nickname;
    a.Sex = sex;
    a.Country = country;
    a.Province = province;
    a.City = city;

    try {
      let v = await this.gwsrpc.RegAuth(a, 3000);

      if (v.UserID !== "") {

        this.event.publish("registermessage_succ", 'succeed');
      } else {
        this.event.publish("registermessage_fail", 'fail');
      }

    } catch (err) {
      console.log("register出现错误:" + err);
    }
  }
}
