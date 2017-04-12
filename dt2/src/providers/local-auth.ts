import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LocalData } from './local-data';
import { GwsrpCli } from './gwsrpcli';
import * as URI from 'urijs';


export type LoginCallback = (type: number) => void;
export type LoadALDCallback = (isAutoLogin: boolean, userid, sessionid: string, group: auth.Groups) => void;


export class UserListPageData {
  public page: auth.ListRetRecv;
  public eventNameGetSuccess: string;
  public eventNameGetFail: string;
}



@Injectable()
export class Cauth {

  private gwsrpc: GwsrpCli;
  private localData: LocalData;

  public UserID: string;
  public SessionID: string;
  public Group: auth.Groups;

  public Nickname: string = "";
  public Country: string = "";
  public Province: string = "";
  public City: string = "";
  public Headimgurl: string = "";
  public Sex: auth.UserSex = auth.UserSex.Unknow;

  constructor(
    public events: Events,
    public storage: Storage,
  ) {


    this.events.subscribe("lexianyiqr:/setpublish", (search: string[]) => {
      console.log("subscribe qr", search[0]);

      let uri = new URI(search[0]);

      let kvs = uri.search(true);
      //kvs["userid"]

      this.setPublish(kvs["userid"]);


    })


    this.storage.get('ALD').then((data) => {
      if (null === data) {
        setTimeout(() => {

          try {
            Wechat.isInstalled((installed) => {
              console.log('wechat installed.');
            }, function(reason) {
              console.log('wechat isInstalled fail.', reason);
            });
          } catch (err) {

            console.log("auto create ALD recode!");
            let uid = "";
            let sid = "";

            //TODO这段代码一定要在release的时候删除,避Session码泄露
            uid = "Cdm6Dzsy4rCbKgvsydiHp6";
            sid = "k1nsoPIQztyrL9b6uYWTsc";

            this.storage.set('ALD', '{"sessionid":"' + sid + '","userid":"' + uid + '","group":0}');
          }

        }, 0);

      } else {
        console.log('have ALD');


      }
    })
      .catch((err) => {
        console.log('load ALD fail:', err);
      });
  }


  setData(localData: LocalData, gwsrpc: GwsrpCli) {
    this.localData = localData;
    this.gwsrpc = gwsrpc;


    this.events.subscribe("login:try:autologin", () => {
      this.dbLoadALD((isALD: boolean, userid, sessionid: string, group: auth.Groups) => {

        if (isALD) {
          this.events.publish('auth:login:start:session');
          this.sessionLogin(sessionid, (type: number) => {
            this.events.publish('auth:login:stop:session');
            if (type === 1) {
              this.events.publish('auth:login:success:session');
            } else if (type === 0) {
              this.events.publish('auth:login:fail:session');
            }
          });
        } else {

        }
      });
    });
  }

  OnServiceRestart() {
    console.log('auth OnServiceRestart');

    this.UserID = "";
    this.SessionID = "";
    this.Group = auth.Groups.NoneGroup;

    this.Nickname = "";
    this.Province = "";
    this.City = "";
    this.Headimgurl = "";
    this.Sex = auth.UserSex.Unknow;

    setTimeout(() => {
      this.events.publish("app:component:need:login");
    }, 1);



  }



  //ALD is Auto Login Data
  private dbSaveALD(userid, sessionid: string, group: auth.Groups) {

    let x: any = {};
    x.sessionid = sessionid;
    x.userid = userid;
    x.group = group;

    //console.log('save', userid, sessionid, group);
    this.UserID = userid;
    this.SessionID = sessionid;
    this.Group = group;

    this.storage.set('ALD', JSON.stringify(x));

  }

  //ALD is Auto Login Data
  private dbSaveALDsession(newsessionid: string, newgroup: auth.Groups) {
    this.dbLoadALD((isAutoLogin: boolean, userid, sessionid: string, group: auth.Groups) => {
      this.dbSaveALD(userid, newsessionid, newgroup);
    });

  }

  //ALD is Auto Login Data
  private dbLoadALD(cb: LoadALDCallback) {
    this.storage.get('ALD').then((data) => {
      if (null !== data) {

        let obj = JSON.parse(data);

        if (null !== obj) {
          if (null !== obj.sessionid && null !== obj.userid && null !== obj.group && '' !== obj.sessionid && '' !== obj.userid) {
            //console.log('load', obj.userid, obj.sessionid, obj.group);
            cb(true, obj.userid, obj.sessionid, obj.group);
          } else {
            cb(false, '', '', auth.Groups.NoneGroup);
          }
        } else {
          cb(false, '', '', auth.Groups.NoneGroup);
        }
      } else {
        cb(false, '', '', auth.Groups.NoneGroup);
      }

    }).catch((err) => {
      console.log('load ALD fail:', err);
    });
  }

  private async sessionLogin(sessionid: string, cb: LoginCallback) {

    console.log('sessionid login...', sessionid);

    try {


      let send = new this.gwsrpc.Builderauth.SessionLoginSend();
      send.SessionID = sessionid;


      let v = await this.gwsrpc.SessionLogin(send, 3000);
      if ('' !== v.SessionID) {

        this.Nickname = v.Nickname;
        this.Province = v.Province;
        this.City = v.City;
        this.Headimgurl = v.Headimgurl;
        this.Sex = v.Sex;
        console.log(this.Nickname);
        console.log('sessionid login success. new sessionID/Group:', v.SessionID, v.Group);
        this.dbSaveALDsession(v.SessionID, v.Group)
        cb(1);
      } else {

        this.Nickname = "";
        this.Province = "";
        this.City = "";
        this.Headimgurl = "";
        this.Sex = auth.UserSex.Unknow;

        console.log('sessionid login fail.');
        this.dbSaveALD('', '', auth.Groups.NoneGroup);
        cb(0);
      }
    } catch (err) {
      console.log('sessionLogin err', err);
      cb(-1);
    }



  }

  Logout() {
    this.dbSaveALD('', '', auth.Groups.NoneGroup);
    console.log('logouted');
  }
  /*登录*/
  async loginprove(username, password) {
    let a = new this.gwsrpc.Builderauth.LoginAuthSend();
    a.Username = username;
    a.Password = password;

    try {
      let v = await this.gwsrpc.LoginAuth(a, 3000);
      this.dbSaveALD(v.UserID, v.SessionID, v.Group);
      if (v.UserID !== "") {
        this.events.publish("loginmessage_succ", 'succeed');
        this.Nickname = v.Nickname;
        this.Province = v.Province;
        this.City = v.City;
        this.Headimgurl = v.Headimgurl;
        this.Sex = v.Sex;
      } else {
        this.events.publish("loginmessage_fail", 'fail');
        this.Nickname = "";
        this.Province = "";
        this.City = "";
        this.Headimgurl = "";
        this.Sex = auth.UserSex.Unknow;
      }
    } catch (err) {
      console.log("login出现错误:" + err);
    }
  }
  async wechatAuth(code: string) {

    try {


      let send = new this.gwsrpc.Builderauth.WechatAuthSend();
      send.Code = code;
      let v = await this.gwsrpc.WechatAuth(send, 3000);
      this.dbSaveALD(v.UserID, v.SessionID, v.Group);
      if ('' === v.UserID) {

        this.Nickname = "";
        this.Province = "";
        this.City = "";
        this.Headimgurl = "";
        this.Sex = auth.UserSex.Unknow;

        console.log('wechatAuth fail:');
        this.events.publish('auth:login:fail');

      } else {

        this.Nickname = v.Nickname;
        this.Province = v.Province;
        this.City = v.City;
        this.Headimgurl = v.Headimgurl;
        this.Sex = v.Sex;


        console.log('wechatAuth success:');
        this.events.publish('auth:login:success');
      }

    } catch (err) {
      console.log('wechatAuth err:', err);
      this.events.publish('auth:login:fail');
    }


  }



  newUserListPageData(): UserListPageData {
    let v = new UserListPageData();
    v.eventNameGetSuccess = "getUserListPageData:success";
    v.eventNameGetFail = "getUserListPageData:fail";
    return v;
  }

  async getUserListPageData(contentpage: UserListPageData, userids: string[]) {



    try {
      let send = new this.gwsrpc.Builderauth.GetUserInfoSend();
      for (let i of userids) {
        send.UserIDs.push(i);
      }

      contentpage.page = new this.gwsrpc.Builderauth.ListRetRecv();
      contentpage.page = await this.gwsrpc.GetUserInfo(send, 3000);
      this.events.publish(contentpage.eventNameGetSuccess);
    } catch (err) {
      console.log("getUserListPageData err:", err);
      this.events.publish(contentpage.eventNameGetFail);
    }

  }


  async setPublish(userid: string) {

    try {
      let send = new this.gwsrpc.Builderauth.SetPublisherSend();
      send.SessionID = this.SessionID;
      send.UserID = userid;


      let recv = await this.gwsrpc.SetPublisher(send, 3000);
      if (recv.FailReason === "") {
        this.events.publish("auth:setPublish:success");
      } else if (recv.FailReason === "SetPublisher can not found session") {
        this.events.publish("auth:setPublish:fail", "需要重新登录");
      } else if (recv.FailReason === "SetPublisher you are not admin") {
        this.events.publish("auth:setPublish:fail", "你不是管理员");
      } else if (recv.FailReason === "SetPublisher can not found userid") {
        this.events.publish("auth:setPublish:fail", "没找到被设置用户");
      } else if (recv.FailReason === "SetPublisher set publish fail") {
        this.events.publish("auth:setPublish:fail", "修改成发布者失败");
      } else {
        this.events.publish("auth:setPublish:fail", "其他错误");
      }
    } catch (err) {
      console.log("setPublish err:", err);
      this.events.publish("auth:setPublish:fail", "其他系统错误");
    }
  }



}
