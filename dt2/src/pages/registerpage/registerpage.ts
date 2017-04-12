import { Component} from '@angular/core';
import { Events, AlertController, NavController, LoadingController} from 'ionic-angular';
import { LoginRegister } from '../../providers/local-loginregister';
import { Cauth } from '../../providers/local-auth';
@Component({
  selector: 'registerpage',
  templateUrl: 'registerpage.html'
})
export class RegisterPage {

  public username: string;
  public password: string;
  public affirmpassword: string;//确认密码
  public nickname: string;
  // public sex: string;
  // public sexsubmit: number;
  public country: string = "中国";
  public province: string = "未知";
  public city: string = "未知";
  constructor(
    public event: Events,
    public navCtrl: NavController,
    public loginregistermsg: LoginRegister,
    public alertCtrl: AlertController,
    public auth: Cauth,
    public loadingCtrl: LoadingController
  ) {

  }
  // selector() {
  //   if (this.sex == "1") {
  //     this.sexsubmit = 1;
  //   } else if (this.sex == "2") {
  //     this.sexsubmit = 2;
  //   } else {
  //     this.sexsubmit = 0;
  //   }
  // }
  goregister() {
    if (!(/^\w{6,15}$/.test(this.username))) {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: '请输入长度为6-15个字符,只能包括字母数字和下划线',
        buttons: [{
          text: 'ok',
        }]
      });
      alert.present();
      return;
    }

    if (!(/^[0-9A-Za-z]{6,10}/.test(this.password))) {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: '密码必须是6-10位由字母或数字组成',
        buttons: [{
          text: 'ok',
        }]
      });
      alert.present();
      return;
    }

    if (this.password !== this.affirmpassword) {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: '两次输入的密码不一致',
        buttons: [{
          text: 'ok',
        }]
      });
      alert.present();
      return;
    }
    if (null == this.username || null == this.password || null == this.affirmpassword || null == this.nickname) {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: '亲,您还有未填写的!',
        buttons: [{
          text: 'ok',
        }]
      });
      alert.present();
      return;
    }
    this.loginregistermsg.registerprove(this.username, this.password, this.nickname, 0, this.country, this.province, this.city, )
    setTimeout(() => {

      this.auth.loginprove(this.username, this.password)
      this.event.publish("autologin_succ");
    }, 3000)
  }

}
