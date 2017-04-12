import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { LocalData } from './local-data';
import { GwsrpCli } from './gwsrpcli';
import { Cauth } from './local-auth';

export enum TimingGamelPageType {
  main = 0,
  open,
  close,
  finish,
  my,
}

export class TimingGamelPageData {
  public title: string;
  public type: TimingGamelPageType;
  public list: timinggame.ListRetRecv;
  public eventNameGetSuccess: string;
  public eventNameGetFail: string;

}

export class TimingGamelContentPageData {
  public page: timinggame.TimingGameRetRecv;
  public type: TimingGamelPageType;
  public buttonName: string;
  public ContentID: string;
  public eventNameGetSuccess: string;
  public eventNameGetFail: string;
}



@Injectable()
export class Ctiminggame {

  private gwsrpc: GwsrpCli;
  private localData: LocalData;
  private auth: Cauth;

  public mainpage: TimingGamelPageData;
  public openpage: TimingGamelPageData;
  public closepage: TimingGamelPageData;
  public finishpage: TimingGamelPageData;
  public mypage: TimingGamelPageData;

  constructor(
    public events: Events,
  ) {

  }



  async Join(ContentID, Pcode: string) {
    console.log("Join", ContentID, Pcode);

    try {


      let voidsend = new this.gwsrpc.Buildertiminggame.VoidSend()
      let req = await this.gwsrpc.JoinTimingGameReq(voidsend, 3000)
      if (req.Salt === "") {
        console.log("Join get Salt fail");
        return
      }

      let passcodesend = new this.gwsrpc.Builderauth.GetPassCodeSend();
      passcodesend.SessionID = this.auth.SessionID;
      passcodesend.Salt = req.Salt;
      let auth = await this.gwsrpc.JoinTimingGameAuth(passcodesend, 3000)
      if (auth.PassCode === "") {
        console.log("Join get PassCode fail");
        return
      }

      let opersend = new this.gwsrpc.Buildertiminggame.JoinTimingGameSend();
      opersend.Salt = req.Salt;
      opersend.UserID = this.auth.UserID;
      opersend.PassCode = auth.PassCode;
      opersend.ContentID = ContentID;
      opersend.Pcode = Pcode;

      let result = await this.gwsrpc.JoinTimingGame(opersend, 3000)
      if (result.Reason === "") {
        console.log("Join success");
        this.events.publish("timinggame:join:success");
        return
      } else {
        console.log("Join fail:", result.Reason);
        if (result.Reason === "JoinTimingGame fail. you are join in") {
          this.events.publish("timinggame:join:fail", "你已经加入过活动");
        } else if (result.Reason === "JoinTimingGame pcode err") {
          this.events.publish("timinggame:join:fail", "邀请码错误");
        } else if (result.Reason === "JoinTimingGame fail. join full") {
          this.events.publish("timinggame:join:fail", "活动已经满人");
        } else {
          this.events.publish("timinggame:join:fail", "其他错误");
        }


        return
      }




    } catch (err) {
      console.log("Join", err);
      this.events.publish("timinggame:join:fail", "其他系统错误");
    }

  }


  newTimingGamelContentPageData(ContentID: string, type: TimingGamelPageType): TimingGamelContentPageData {
    let v = new TimingGamelContentPageData();
    v.ContentID = ContentID;
    v.type = type;
    v.eventNameGetSuccess = "getTimingGamelContentPageData:success:" + type.toString();
    v.eventNameGetFail = "getTimingGamelContentPageData:fail:" + type.toString();
    return v;
  }

  async getTimingGamelContentPageData(contentpage: TimingGamelContentPageData, getstate: timinggame.TimingState) {



    try {
      let send = new this.gwsrpc.Buildertiminggame.GetTimingGameSend();

      contentpage.page = new this.gwsrpc.Buildertiminggame.TimingGameRetRecv();

      contentpage.page.Details.push("assets/img/loading.gif");

      switch (contentpage.type) {
        case TimingGamelPageType.main: {
          contentpage.buttonName = "参加活动";
        } break;
        case TimingGamelPageType.open: {
          contentpage.buttonName = "更多功能";
        } break;
        case TimingGamelPageType.close: {
          contentpage.buttonName = "更多功能";
        } break;
        case TimingGamelPageType.finish: {
          contentpage.buttonName = "更多功能";
        } break;
        case TimingGamelPageType.my: {
          contentpage.buttonName = "点赞";
        } break;

      }

      send.Type = getstate;

      send.ID = contentpage.ContentID;
      contentpage.page = await this.gwsrpc.GetTimingGame(send, 3000);
      this.events.publish(contentpage.eventNameGetSuccess);
    } catch (err) {
      console.log("getTimingGamelContentPageData err:", err);
      this.events.publish(contentpage.eventNameGetFail);
    }

  }

  async changeState(ContentID: string, Form, To: timinggame.TimingState) {

    try {


      let voidsend = new this.gwsrpc.Buildertiminggame.VoidSend()
      let req = await this.gwsrpc.OperateTimingGameReq(voidsend, 3000)
      if (req.Salt === "") {
        console.log("changeState get Salt fail");
        return
      }

      let passcodesend = new this.gwsrpc.Builderauth.GetPassCodeSend();
      passcodesend.SessionID = this.auth.SessionID;
      passcodesend.Salt = req.Salt;
      let auth = await this.gwsrpc.OperateTimingGameAuth(passcodesend, 3000)
      if (auth.PassCode === "") {
        console.log("changeState get PassCode fail");
        return
      }

      let opersend = new this.gwsrpc.Buildertiminggame.OperateTimingGameSend();
      opersend.Salt = req.Salt;
      opersend.UserID = this.auth.UserID;
      opersend.PassCode = auth.PassCode;
      opersend.ContentID = ContentID;
      opersend.From = Form;
      opersend.To = To;
      let result = await this.gwsrpc.OperateTimingGame(opersend, 3000)
      if (result.Reason === "") {
        console.log("changeState success");
        return
      } else {
        console.log("changeState fail:", result.Reason);
        return
      }




    } catch (err) {
      console.log("changeState", err);
    }





  }

  setData(localData: LocalData, gwsrpc: GwsrpCli, auth: Cauth) {
    this.localData = localData;
    this.gwsrpc = gwsrpc;
    this.auth = auth;

    let mainlist = new this.gwsrpc.Buildertiminggame.ListRetRecv();
    this.mainpage = new TimingGamelPageData();
    this.mainpage.title = "即时活动";
    this.mainpage.type = TimingGamelPageType.main;
    this.mainpage.list = mainlist;
    this.mainpage.eventNameGetSuccess = "timinggame:list:get:success:main";
    this.mainpage.eventNameGetFail = "timinggame:list:get:fail:main";


    let readylist = new this.gwsrpc.Buildertiminggame.ListRetRecv();
    this.openpage = new TimingGamelPageData();
    this.openpage.title = "即时活动-开放";
    this.openpage.type = TimingGamelPageType.open;
    this.openpage.list = readylist;
    this.openpage.eventNameGetSuccess = "timinggame:list:get:success:ready";
    this.openpage.eventNameGetFail = "timinggame:list:get:fail:ready";

    let startlist = new this.gwsrpc.Buildertiminggame.ListRetRecv();
    this.closepage = new TimingGamelPageData();
    this.closepage.title = "即时活动-关闭";
    this.closepage.type = TimingGamelPageType.close;
    this.closepage.list = startlist;
    this.closepage.eventNameGetSuccess = "timinggame:list:get:success:start";
    this.closepage.eventNameGetFail = "timinggame:list:get:fail:start";

    let finishlist = new this.gwsrpc.Buildertiminggame.ListRetRecv();
    this.finishpage = new TimingGamelPageData();
    this.finishpage.title = "即时活动-完结";
    this.finishpage.type = TimingGamelPageType.finish;
    this.finishpage.list = finishlist;
    this.finishpage.eventNameGetSuccess = "timinggame:list:get:success:finish";
    this.finishpage.eventNameGetFail = "timinggame:list:get:fail:finish";


    let mylist = new this.gwsrpc.Buildertiminggame.ListRetRecv();
    this.mypage = new TimingGamelPageData();
    this.mypage.title = "我的即时活动";
    this.mypage.type = TimingGamelPageType.my;
    this.mypage.list = mylist;
    this.mypage.eventNameGetSuccess = "timinggame:list:get:success:my";
    this.mypage.eventNameGetFail = "timinggame:list:get:fail:my";




  }

  OnServiceRestart() {
    console.log('timinggame OnServiceRestart');
  }

  refreshList(page: TimingGamelPageData) {
    if (page.type == TimingGamelPageType.main) {
      this.getAllList(page);
    } else if (page.type == TimingGamelPageType.open) {
      this.getListByID(page);
    } else if (page.type == TimingGamelPageType.close) {
      this.getListByID(page);
    } else if (page.type == TimingGamelPageType.finish) {
      this.getListByID(page);
    } else if (page.type == TimingGamelPageType.my) {
      this.getUserList(page);//TODO
    }
  }

  private async getUserList(page: TimingGamelPageData) {

    try {

      let send = new this.gwsrpc.Buildertiminggame.GetUserTimingGameListSend()
      send.UserID = this.auth.UserID;
      page.list = await this.gwsrpc.GetUserTimingGameList(send, 3000);
      this.events.publish(page.eventNameGetSuccess);
    } catch (err) {
      this.events.publish(page.eventNameGetFail);
    }

  }

  private async getAllList(page: TimingGamelPageData) {

    try {

      let send = new this.gwsrpc.Buildertiminggame.GetTimingGameListSend();
      switch (page.type) {
        case TimingGamelPageType.main:
          send.State = timinggame.TimingState.OPEN;
          break;

        default:
          this.events.publish(page.eventNameGetFail);
          return;
      }




      page.list = await this.gwsrpc.GetTimingGameList(send, 3000);

      this.events.publish(page.eventNameGetSuccess);
    } catch (err) {
      this.events.publish(page.eventNameGetFail);
    }

  }

  private async getListByID(page: TimingGamelPageData) {

    try {


      let send = new this.gwsrpc.Buildertiminggame.GetTimingGameListByIDSend();
      send.ID = this.auth.UserID;
      switch (page.type) {
        case TimingGamelPageType.open:
          send.Type = timinggame.TimingState.OPEN;
          break;
        case TimingGamelPageType.close:
          send.Type = timinggame.TimingState.CLOSE;
          break;
        case TimingGamelPageType.finish:
          send.Type = timinggame.TimingState.FINISHT;
          break;

        default:
          this.events.publish(page.eventNameGetFail);
          return;
      }

      page.list = await this.gwsrpc.GetTimingGameListByID(send, 3000);
      this.events.publish(page.eventNameGetSuccess);
    } catch (err) {
      this.events.publish(page.eventNameGetFail);
    }

  }



  createPreviewData(title, addr, phone,  price, pcode, titlepic,
    place: string, lng, lat, zoom: number,
    details_x_1, details_x_2, details_x_3, details_x_4, details_x_5: string,
    activitytype,
    subactivitytype,
  ) {




    let x = new this.gwsrpc.Buildertiminggame.TimingGameRetRecv();
    x.UserID = "";
    x.Img = "http://7xrse0.com1.z0.glb.clouddn.com/publish/" + titlepic + ".jpg";;
    x.Title = title;
    x.Address = addr;
    x.Pcode = pcode;

    // let st = new Date(starttime);
    // x.Starttime = st.getTime() / 1000;
    //
    // let et = new Date(endtime);
    // x.Endtime = et.getTime() / 1000;

    x.Phone = phone;
    // x.Maxnum = Number(maxnum);
    // x.Minnum = Number(minnum);
    // x.Nownum = 0;
    x.Price = Number((Number(price) * 100).toFixed(0));
    x.Place = place;
    x.Lng = lng;
    x.Lat = lat;
    x.Zoom = zoom;

    if (details_x_1 !== '') {
      x.Details.push("http://7xrse0.com1.z0.glb.clouddn.com/publish/" + details_x_1 + ".jpg");
    }

    if (details_x_2 !== '') {
      x.Details.push("http://7xrse0.com1.z0.glb.clouddn.com/publish/" + details_x_2 + ".jpg");
    }

    if (details_x_3 !== '') {
      x.Details.push("http://7xrse0.com1.z0.glb.clouddn.com/publish/" + details_x_3 + ".jpg");
    }

    if (details_x_4 !== '') {
      x.Details.push("http://7xrse0.com1.z0.glb.clouddn.com/publish/" + details_x_4 + ".jpg");
    }

    if (details_x_5 !== '') {
      x.Details.push("http://7xrse0.com1.z0.glb.clouddn.com/publish/" + details_x_5 + ".jpg");
    }
    (<any>x).Maintype=activitytype;
    (<any>x).Subtype=subactivitytype;
    return x;
  }



  async publishTiming(previewData: timinggame.TimingGameRetRecv) {

    try {

      let send = new this.gwsrpc.Buildertiminggame.VoidSend();
      let v = await this.gwsrpc.PublishTimingGameReq(send, 3000);

      if ('' === v.Salt) {
        console.log("PublishTimingGameReq fail");
        this.events.publish('timinggame:publish:fail');
        return;
      }

      let sendauth = new this.gwsrpc.Builderauth.GetPassCodeSend();
      sendauth.SessionID = this.auth.SessionID;
      sendauth.Salt = v.Salt;
      let authv = await this.gwsrpc.PublishTimingGameAuth(sendauth, 3000);

      if ('' === authv.PassCode) {
        console.log("PublishTimingGameAuth fail");
        this.events.publish('timinggame:publish:fail');
        return;
      }

      let sendpublish = new this.gwsrpc.Buildertiminggame.PublishTimingGameSend()
      sendpublish.Salt = v.Salt;
      sendpublish.UserID = this.auth.UserID;
      sendpublish.PassCode = authv.PassCode;
      sendpublish.Img = previewData.Img;
      sendpublish.Title = previewData.Title;
      sendpublish.Address = previewData.Address;
      sendpublish.Place = previewData.Place;
      sendpublish.Lng = previewData.Lng;
      sendpublish.Lat = previewData.Lat;
      sendpublish.Zoom = previewData.Zoom;
      sendpublish.Pcode = previewData.Pcode;
      // sendpublish.Starttime = previewData.Starttime;
      // sendpublish.Endtime = previewData.Endtime;
      sendpublish.Phone = previewData.Phone;
      // sendpublish.Maxnum = previewData.Maxnum;
      // sendpublish.Minnum = previewData.Minnum;
      sendpublish.Price = previewData.Price;
      sendpublish.MainType = (<any>previewData).Maintype;
      switch((<any>previewData).Subtype)
        {
          case 1:
          sendpublish.CateType=(<any>previewData).Subtype;
          break;
          case 2:
          sendpublish.FarmhouseType=(<any>previewData).Subtype;
          break;
          case 3:
          sendpublish.EntertainmentType=(<any>previewData).Subtype;
          break;
          case 4:
          sendpublish.TourType=(<any>previewData).Subtype;
          break;
          case 5:
          sendpublish.OutdoorType=(<any>previewData).Subtype;
          break;
          default:
        }
      for (let d of previewData.Details) {
        sendpublish.Details.push(d);
      }
      let publishv = await this.gwsrpc.PublishTimingGame(sendpublish, 3000);

      if ('' === publishv.ID) {
        console.log("PublishTimingGame fail");
        this.events.publish('timinggame:publish:fail');
      } else {
        console.log("PublishTimingGame success. ID:", publishv.ID);
        this.events.publish('timinggame:publish:success');
      }



    } catch (err) {
      console.log("publishTiming err:", err);
      this.events.publish('timinggame:publish:fail');
    }

  }

}
