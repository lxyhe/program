import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { LocalData } from './local-data';
import { GwsrpCli } from './gwsrpcli';
import { Cauth } from './local-auth';

export enum OrderGamelPageType {
  main = 0,
  ready,
  start,
  finish,
  cancel,
  my,
  sec,
}

export class OrderGamelPageData {
  public title: string;
  public type: OrderGamelPageType;
  public list: ordergame.ListRetRecv;
  public eventNameGetSuccess: string;
  public eventNameGetFail: string;

}

export class OrderGamelContentPageData {
  public page: ordergame.OrderGameRetRecv;
  public type: OrderGamelPageType;
  public buttonName: string;
  public ContentID: string;
  public eventNameGetSuccess: string;
  public eventNameGetFail: string;
}



@Injectable()
export class Cordergame {

  private gwsrpc: GwsrpCli;
  private localData: LocalData;
  private auth: Cauth;

  public mainpage: OrderGamelPageData;
  public secpage: OrderGamelPageData;
  public readypage: OrderGamelPageData;
  public startpage: OrderGamelPageData;
  public finishpage: OrderGamelPageData;
  public cancelpage: OrderGamelPageData;
  public mypage: OrderGamelPageData;

  constructor(
    public events: Events,
  ) {

  }



  async Join(ContentID, Pcode: string) {
    console.log("Join", ContentID, Pcode);

    try {


      let voidsend = new this.gwsrpc.Builderordergame.VoidSend()
      let req = await this.gwsrpc.JoinOrderGameReq(voidsend, 3000)
      if (req.Salt === "") {
        console.log("Join get Salt fail");
        return
      }

      let passcodesend = new this.gwsrpc.Builderauth.GetPassCodeSend();
      passcodesend.SessionID = this.auth.SessionID;
      passcodesend.Salt = req.Salt;
      let auth = await this.gwsrpc.JoinOrderGameAuth(passcodesend, 3000)
      if (auth.PassCode === "") {
        console.log("Join get PassCode fail");
        return
      }

      let opersend = new this.gwsrpc.Builderordergame.JoinOrderGameSend();
      opersend.Salt = req.Salt;
      opersend.UserID = this.auth.UserID;
      opersend.PassCode = auth.PassCode;
      opersend.ContentID = ContentID;
      opersend.Pcode = Pcode;

      let result = await this.gwsrpc.JoinOrderGame(opersend, 3000)
      if (result.Reason === "") {
        console.log("Join success");
        this.events.publish("ordergame:join:success");
        return
      } else {
        console.log("Join fail:", result.Reason);
        if (result.Reason === "JoinOrderGame fail. you are join in") {
          this.events.publish("ordergame:join:fail", "你已经加入过活动");
        } else if (result.Reason === "JoinOrderGame pcode err") {
          this.events.publish("ordergame:join:fail", "邀请码错误");
        } else if (result.Reason === "JoinOrderGame fail. join full") {
          this.events.publish("ordergame:join:fail", "活动已经满人");
        } else {
          this.events.publish("ordergame:join:fail", "其他错误");
        }


        return
      }




    } catch (err) {
      console.log("Join", err);
      this.events.publish("ordergame:join:fail", "其他系统错误");
    }

  }


  newOrderGamelContentPageData(ContentID: string, type: OrderGamelPageType): OrderGamelContentPageData {
    let v = new OrderGamelContentPageData();
    v.ContentID = ContentID;
    v.type = type;
    v.eventNameGetSuccess = "getOrderGamelContentPageData:success:" + type.toString();
    v.eventNameGetFail = "getOrderGamelContentPageData:fail:" + type.toString();
    return v;
  }

  async getOrderGamelContentPageData(contentpage: OrderGamelContentPageData, getstate: ordergame.OrderState) {



    try {
      let send = new this.gwsrpc.Builderordergame.GetOrderGameSend();

      contentpage.page = new this.gwsrpc.Builderordergame.OrderGameRetRecv();

      contentpage.page.Details.push("assets/img/loading.gif");

      switch (contentpage.type) {
        case OrderGamelPageType.main: {
          contentpage.buttonName = "参加活动";
        } break;
        case OrderGamelPageType.sec: {
          contentpage.buttonName = "点赞";
        } break;
        case OrderGamelPageType.ready: {
          contentpage.buttonName = "更多功能";
        } break;
        case OrderGamelPageType.start: {
          contentpage.buttonName = "更多功能";
        } break;
        case OrderGamelPageType.finish: {
          contentpage.buttonName = "更多功能";
        } break;
        case OrderGamelPageType.cancel: {
          contentpage.buttonName = "更多功能";
        } break;
        case OrderGamelPageType.my: {
          contentpage.buttonName = "点赞";
        } break;

      }

      send.Type = getstate;

      send.ID = contentpage.ContentID;
      contentpage.page = await this.gwsrpc.GetOrderGame(send, 3000);
      this.events.publish(contentpage.eventNameGetSuccess);
    } catch (err) {
      console.log("getOrderGamelContentPageData err:", err);
      this.events.publish(contentpage.eventNameGetFail);
    }

  }

  async changeState(ContentID: string, Form, To: ordergame.OrderState) {

    try {


      let voidsend = new this.gwsrpc.Builderordergame.VoidSend()
      let req = await this.gwsrpc.OperateOrderGameReq(voidsend, 3000)
      if (req.Salt === "") {
        console.log("changeState get Salt fail");
        return
      }

      let passcodesend = new this.gwsrpc.Builderauth.GetPassCodeSend();
      passcodesend.SessionID = this.auth.SessionID;
      passcodesend.Salt = req.Salt;
      let auth = await this.gwsrpc.OperateOrderGameAuth(passcodesend, 3000)
      if (auth.PassCode === "") {
        console.log("changeState get PassCode fail");
        return
      }

      let opersend = new this.gwsrpc.Builderordergame.OperateOrderGameSend();
      opersend.Salt = req.Salt;
      opersend.UserID = this.auth.UserID;
      opersend.PassCode = auth.PassCode;
      opersend.ContentID = ContentID;
      opersend.From = Form;
      opersend.To = To;
      let result = await this.gwsrpc.OperateOrderGame(opersend, 3000)
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

    let mainlist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.mainpage = new OrderGamelPageData();
    this.mainpage.title = "预约活动";
    this.mainpage.type = OrderGamelPageType.main;
    this.mainpage.list = mainlist;
    this.mainpage.eventNameGetSuccess = "ordergame:list:get:success:main";
    this.mainpage.eventNameGetFail = "ordergame:list:get:fail:main";

    let seclist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.secpage = new OrderGamelPageData();
    this.secpage.title = "正在活动";
    this.secpage.type = OrderGamelPageType.sec;
    this.secpage.list = seclist;
    this.secpage.eventNameGetSuccess = "ordergame:list:get:success:sec";
    this.secpage.eventNameGetFail = "ordergame:list:get:fail:sec";

    let readylist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.readypage = new OrderGamelPageData();
    this.readypage.title = "预约活动-准备";
    this.readypage.type = OrderGamelPageType.ready;
    this.readypage.list = readylist;
    this.readypage.eventNameGetSuccess = "ordergame:list:get:success:ready";
    this.readypage.eventNameGetFail = "ordergame:list:get:fail:ready";

    let startlist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.startpage = new OrderGamelPageData();
    this.startpage.title = "预约活动-开始";
    this.startpage.type = OrderGamelPageType.start;
    this.startpage.list = startlist;
    this.startpage.eventNameGetSuccess = "ordergame:list:get:success:start";
    this.startpage.eventNameGetFail = "ordergame:list:get:fail:start";

    let finishlist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.finishpage = new OrderGamelPageData();
    this.finishpage.title = "预约活动-完结";
    this.finishpage.type = OrderGamelPageType.finish;
    this.finishpage.list = finishlist;
    this.finishpage.eventNameGetSuccess = "ordergame:list:get:success:finish";
    this.finishpage.eventNameGetFail = "ordergame:list:get:fail:finish";

    let cancellist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.cancelpage = new OrderGamelPageData();
    this.cancelpage.title = "预约活动-取消";
    this.cancelpage.type = OrderGamelPageType.cancel;
    this.cancelpage.list = cancellist;
    this.cancelpage.eventNameGetSuccess = "ordergame:list:get:success:cancel";
    this.cancelpage.eventNameGetFail = "ordergame:list:get:fail:cancel";


    let mylist = new this.gwsrpc.Builderordergame.ListRetRecv();
    this.mypage = new OrderGamelPageData();
    this.mypage.title = "我的活动";
    this.mypage.type = OrderGamelPageType.my;
    this.mypage.list = mylist;
    this.mypage.eventNameGetSuccess = "ordergame:list:get:success:my";
    this.mypage.eventNameGetFail = "ordergame:list:get:fail:my";




  }

  OnServiceRestart() {
    console.log('ordergame OnServiceRestart');
  }

  refreshList(page: OrderGamelPageData) {
    if (page.type == OrderGamelPageType.main) {
      this.getAllList(page);
    } else if (page.type == OrderGamelPageType.sec) {
      this.getAllList(page);
    } else if (page.type == OrderGamelPageType.ready) {
      this.getListByID(page);
    } else if (page.type == OrderGamelPageType.start) {
      this.getListByID(page);
    } else if (page.type == OrderGamelPageType.finish) {
      this.getListByID(page);
    } else if (page.type == OrderGamelPageType.cancel) {
      this.getListByID(page);
    } else if (page.type == OrderGamelPageType.my) {
      this.getUserList(page);//TODO
    }
  }

  private async getUserList(page: OrderGamelPageData) {

    try {

      let send = new this.gwsrpc.Builderordergame.GetUserOrderGameListSend()
      send.UserID = this.auth.UserID;
      page.list = await this.gwsrpc.GetUserOrderGameList(send, 3000);
      this.events.publish(page.eventNameGetSuccess);
    } catch (err) {
      this.events.publish(page.eventNameGetFail);
    }

  }

  private async getAllList(page: OrderGamelPageData) {

    try {

      let send = new this.gwsrpc.Builderordergame.GetOrderGameListSend();
      switch (page.type) {
        case OrderGamelPageType.main:
          send.State = ordergame.OrderState.READY;
          break;
        case OrderGamelPageType.sec:
          send.State = ordergame.OrderState.START;
          break;


        default:
          this.events.publish(page.eventNameGetFail);
          return;
      }




      page.list = await this.gwsrpc.GetOrderGameList(send, 3000);
      this.events.publish(page.eventNameGetSuccess);
    } catch (err) {
      this.events.publish(page.eventNameGetFail);
    }

  }

  private async getListByID(page: OrderGamelPageData) {

    try {


      let send = new this.gwsrpc.Builderordergame.GetOrderGameListByIDSend();
      send.ID = this.auth.UserID;
      switch (page.type) {
        case OrderGamelPageType.ready:
          send.Type = ordergame.OrderState.READY;
          break;
        case OrderGamelPageType.start:
          send.Type = ordergame.OrderState.START;
          break;
        case OrderGamelPageType.finish:
          send.Type = ordergame.OrderState.FINISH;
          break;
        case OrderGamelPageType.cancel:
          send.Type = ordergame.OrderState.CANCEL;
          break;

        default:
          this.events.publish(page.eventNameGetFail);
          return;
      }

      page.list = await this.gwsrpc.GetOrderGameListByID(send, 3000);
      this.events.publish(page.eventNameGetSuccess);
    } catch (err) {
      this.events.publish(page.eventNameGetFail);
    }

  }



  createPreviewData(title, addr, phone, starttime, endtime, maxnum, minnum, price, pcode, titlepic,
    place: string, lng, lat, zoom: number,
    details_x_1, details_x_2, details_x_3, details_x_4, details_x_5: string,
    activitytype,
    subactivitytype,
  ) {




    let x = new this.gwsrpc.Builderordergame.OrderGameRetRecv();
    x.UserID = "";
    x.Img = "http://7xrse0.com1.z0.glb.clouddn.com/publish/" + titlepic + ".jpg";;
    x.Title = title;
    x.Address = addr;
    x.Pcode = pcode;

    let st = new Date(starttime);
    x.Starttime = st.getTime() / 1000;

    let et = new Date(endtime);
    x.Endtime = et.getTime() / 1000;

    x.Phone = phone;
    x.Maxnum = Number(maxnum);
    x.Minnum = Number(minnum);
    x.Nownum = 0;
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



  async publishOrder(previewData: ordergame.OrderGameRetRecv) {

    try {

      let send = new this.gwsrpc.Builderordergame.VoidSend();
      let v = await this.gwsrpc.PublishOrderGameReq(send, 3000);

      if ('' === v.Salt) {
        console.log("PublishOrderGameReq fail");
        this.events.publish('ordergame:publish:fail');
        return;
      }

      let sendauth = new this.gwsrpc.Builderauth.GetPassCodeSend();
      sendauth.SessionID = this.auth.SessionID;
      sendauth.Salt = v.Salt;
      let authv = await this.gwsrpc.PublishOrderGameAuth(sendauth, 3000);

      if ('' === authv.PassCode) {
        console.log("PublishOrderGameAuth fail");
        this.events.publish('ordergame:publish:fail');
        return;
      }

      let sendpublish = new this.gwsrpc.Builderordergame.PublishOrderGameSend()
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
      sendpublish.Starttime = previewData.Starttime;
      sendpublish.Endtime = previewData.Endtime;
      sendpublish.Phone = previewData.Phone;
      sendpublish.Maxnum = previewData.Maxnum;
      sendpublish.Minnum = previewData.Minnum;
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
      let publishv = await this.gwsrpc.PublishOrderGame(sendpublish, 3000);

      if ('' === publishv.ID) {
        console.log("PublishOrderGame fail");
        this.events.publish('ordergame:publish:fail');
      } else {
        console.log("PublishOrderGame success. ID:", publishv.ID);
        this.events.publish('ordergame:publish:success');
      }



    } catch (err) {
      console.log("publishOrder err:", err);
      this.events.publish('ordergame:publish:fail');
    }

  }

}
