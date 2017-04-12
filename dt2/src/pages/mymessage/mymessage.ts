import { Component } from '@angular/core';
import { Cauth} from '../../providers/local-auth';
@Component({
  selector: 'mymessage',
  templateUrl: 'mymessage.html'
})
export class MyMessage{
  public name:string;// TODO 微信名字
  public sex:any;// TODO 性别
  public Country:string="中国";//TODO 国家
  public Province:string; //TODO  省份
  public City:string; //TODO 城市
  public headerurl:any;//TODO 头像

  constructor(
    public cauth:Cauth,
  ){
    setTimeout(()=>{
    console.log("开始读取数据");
    if(this.cauth.Nickname!==""){
      this.name=this.cauth.Nickname;
    }else{
      this.name="未知";
    }
    if(this.cauth.Province!==""){
      this.Province=this.cauth.Province;
    }else{
      this.Province="未知";
    }
    if(this.cauth.City!==""){
      this.City=this.cauth.City;
    }else{
      this.City="未知";
    }
    if(this.cauth.Headimgurl!==""){
    this.headerurl=this.cauth.Headimgurl;
    }else{
      this.headerurl="assets/img/beiyong.jpg";
    }
    //TODO 判断男女
    if(this.cauth.Sex===0){
      this.sex="未知";
    }else if(this.cauth.Sex===1){
      this.sex="男";
    }else{
      this.sex="女";
    }
  },10);
  }
}
