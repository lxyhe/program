import { Component} from '@angular/core';
import { RegisterPage } from '../registerpage/registerpage';
import { NavController, Events, AlertController } from 'ionic-angular';
import { Cauth } from '../../providers/local-auth';
@Component({
  selector: 'loginpage',
  templateUrl: 'loginpage.html'
})
export class LoginPage {
  public username = '';
  public password = '';
  constructor(
    public navCtrl: NavController,
    public event: Events,
    public auth: Cauth,
    public alertCtrl: AlertController,
  ) {


  }
  login() {
    if ("" == this.username || "" == this.password) {
      let prompt = this.alertCtrl.create({
        title: '提示!',
        message: "您还有账号或密码没有填写呢!",
        buttons: ['ok']
      });
      prompt.present();
      return;
    }
    if (null !== this.username || null !== this.password) {
      this.auth.loginprove(this.username, this.password, )
    }
  }
  register() {
    this.navCtrl.push(RegisterPage);
  }
}
