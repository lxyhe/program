'use strict';
/// <reference path="../../typings/index.d.ts"/>

/// <reference path="./auth/auth.d.ts"/>
/// <reference path="./ordergame/ordergame.d.ts"/>
/// <reference path="./timinggame/timinggame.d.ts"/>

import uws from 'umdwebsocket';
import ProtoBuf from 'protobufjs';

export type OnOpenCallback = () => void;
export type OnCloseCallback = () => void;

export interface IMSGauth {
  OnServiceRestart(): void;
}

export interface IMSGordergame {
  OnServiceRestart(): void;
}

export interface IMSGtiminggame {
  OnServiceRestart(): void;
}


export class GwsrpcStream<T> {

  constructor(private rpccall: RPCCALL) {

  }

  recv(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.rpccall.resolve = resolve;
      this.rpccall.reject = reject;
    });
  }
}

enum RPCSTATUS {
  OK = 0,
  ERR,
  CLOSE,
}

export class RPCCALL {
  resolve: any;
  reject: any;
  to: any;
  rpcid: number;
  stream: any;//GwsrpcStream
}

export class GwsrpCli {

  public Builderauth: auth.ProtoBufBuilder;
	public Builderordergame: ordergame.ProtoBufBuilder;
	public Buildertiminggame: timinggame.ProtoBufBuilder;
  private _authServiceID: string = '';
	private _ordergameServiceID: string = '';
	private _timinggameServiceID: string = '';
	private _MSGauth: IMSGauth;
	private _MSGordergame: IMSGordergame;
	private _MSGtiminggame: IMSGtiminggame;
  private _isConnect: boolean = false;
  private _printable: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&()*+,-./:;<=>?@[]^_`{|}~\'\\';
  private _zeroSizeArrayBuffer: ArrayBuffer;
  private _processid: string;
  private _rpccall: any; // key=string value=RPCCALL

  private _onOpen: OnOpenCallback;
  private _onClose: OnCloseCallback;
  private _ws: uws;
  // private _PopoInterval;

  private _authPROTO: string = `syntax = "proto3";
package auth;

enum Groups {
  NoneGroup = 0;
  AdminGroup = 1;
  PublisherGroup = 2;
}

enum UserSex {
  Unknow = 0;
  Man = 1;
  Woman = 2;
}

message SessionLoginSend {
  string GWSRPCID = 1;
  string SessionID = 2;//UserID对应的SessionID
}

message LoginRetRecv {
  string SessionID = 1;//UserID对应的SessionID
  Groups Group = 3;//用户类型

  string Nickname = 4;
  UserSex Sex = 5;
  string Country = 6;
  string Province = 7;
  string City = 8;
  string Headimgurl = 9;
}

message WechatAuthSend {
  string GWSRPCID = 1;
  string Code = 2;//从本地微信获取到的临时CODE
}

message RegAuthSend {
  string GWSRPCID = 1;
  string Username = 2;
  string Password = 3;

  string Nickname = 4;
  UserSex Sex = 5;
  string Country = 6;
  string Province = 7;
  string City = 8;
}

message LoginAuthSend {
  string GWSRPCID = 1;
  string Username = 2;
  string Password = 3;
}

message AuthRetRecv {
  string UserID = 1;//服务器返回的本服务器唯一UserID
  string SessionID = 2;//服务器返回的本服务器唯一SessionID
  Groups Group = 3;//用户类型

  string Nickname = 4;
  UserSex Sex = 5;
  string Country = 6;
  string Province = 7;
  string City = 8;
  string Headimgurl = 9;
}

message GetPassCodeSend {
  string GWSRPCID = 1;
  string SessionID = 2;
  string Salt = 3;
}

message PassCodeRetRecv {
  string PassCode = 1;
}

message Item {
  string ID = 1;
  string Nickname = 2;
  UserSex Sex = 3;
  string Country = 4;
  string Province = 5;
  string City = 6;
  string Headimgurl = 7;
}

message ListRetRecv {
  string FailReason = 1;
  repeated Item Items= 2;
}

message GetUserInfoSend {
  string GWSRPCID = 1;
  repeated string UserIDs = 2;
}

message SetPublisherSend {
  string GWSRPCID = 1;
  string SessionID = 2;//Admin UserID对应的SessionID
  string UserID = 3;//UserID设置为Publisher
}

message SetPublisherRecv {
  string FailReason = 1;
}

///rr 0 SessionLogin(SessionLoginSend)LoginRetRecv 之前登陆会话登陆
///rr 1 WechatAuth(WechatAuthSend)AuthRetRecv 微信认证
///rr 2 UserAuth(GetPassCodeSend)PassCodeRetRecv 用户验证通行码
///rr 3 PublishOrderGameAuth(GetPassCodeSend)PassCodeRetRecv 请求Order发布权限通行码
///rr 4 GetUserInfo(GetUserInfoSend)ListRetRecv 批量获取用户基本信息
///rr 5 OperateOrderGameAuth(GetPassCodeSend)PassCodeRetRecv 请求Order 删 改 查 权限通行码
///rr 6 JoinOrderGameAuth(GetPassCodeSend)PassCodeRetRecv 请求参加活动权限通行码
///rr 7 SetPublisher(SetPublisherSend)SetPublisherRecv 设置发布者
///rr 8 PublishTimingGameAuth(GetPassCodeSend)PassCodeRetRecv 请求Timing发布权限通行码
///rr 9 OperateTimingGameAuth(GetPassCodeSend)PassCodeRetRecv 请求Timing 删 改 查 权限通行码
///rr 10 JoinTimingGameAuth(GetPassCodeSend)PassCodeRetRecv 请求Timing参加活动权限通行码
///rr 11 RegAuth(RegAuthSend)AuthRetRecv 注册认证
///rr 12 LoginAuth(LoginAuthSend)AuthRetRecv 登录认证
`;
	private _ordergamePROTO: string = `syntax = "proto3";
package ordergame;

enum GameType {
  Other = 0;
  Cate = 1;
  Farmhouse = 2;
  Entertainment = 3;
  Tour = 4;
  Outdoor = 5;
}

enum GameCateType {
  OtherCate = 0;
  HotPot = 1;
  Buffet = 2;
  Bbq = 3;
  Snack = 4;
  HomeCooking = 5;
}

enum GameFarmhouseType {
  OtherFarmhouse = 0;
  PickingGarden = 1;
  FarmTown = 2;
  Village = 3;
  BungeeJumping = 4;
  WaterPark = 5;
}

enum GameEntertainmentType {
  OtherEntertainment = 0;
  TableTopGame = 1;
  Bar = 2;
  Disco = 3;
  Indoor = 4;
  Ktv = 5;
}

enum GameTourType {
  OtherTour = 0;
  Oneday = 1;
  Vacational = 2;
  TravelAround = 3;
  Park = 4;
  ScenicSpots = 5;
}

enum GameOutdoorType {
  OtherOutdoor = 0;
  DiyTour = 1;
  DrivingTour = 2;
  Camping = 3;
  Ski = 4;
  Camp = 5;
}

message VoidSend {
  string GWSRPCID = 1;
}

message SaltRetRecv {
  string Salt= 1;
}

message Item {
  string ID = 1;
  string Img = 2;
  string Title = 3;
  string Address = 4;
  double Lng = 5;
  double Lat = 6;
  OrderState State = 7;
  uint32 Price = 8;
  fixed32 Time = 9;
  GameType MainType = 10;
  GameCateType CateType = 11;
  GameFarmhouseType FarmhouseType = 12;
  GameEntertainmentType EntertainmentType = 13;
  GameTourType TourType = 14;
  GameOutdoorType OutdoorType = 15;

}

message ListRetRecv {
  repeated Item Items= 1;
}



message PublishOrderGameSend {
  string GWSRPCID = 1;

  string Salt= 2;
  string UserID = 3;
  string PassCode = 4;

  string Img = 5;
  string Title = 6;
  string Address = 7;

  string Place = 8;
  double Lng = 9;
  double Lat = 10;
  uint32 Zoom = 11;

  string Pcode = 12;
  fixed32 Starttime = 13; //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  fixed32 Endtime = 14;   //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  string Phone = 15;
  uint32 Maxnum = 16;
  uint32 Minnum = 17;
  uint32 Price = 18;
  repeated string Details = 19;
  GameType MainType = 20;
  GameCateType CateType = 21;
  GameFarmhouseType FarmhouseType = 22;
  GameEntertainmentType EntertainmentType = 23;
  GameTourType TourType = 24;
  GameOutdoorType OutdoorType = 25;
}

message GetOrderGameSend {
  string GWSRPCID = 1;
  string ID = 2;
  OrderState Type = 3;
}

message GetOrderGameListByIDSend {
  string GWSRPCID = 1;
  string ID = 2;
  OrderState Type = 3;
}

message IdRetRecv {
  string ID = 1;
}

message OrderGameRetRecv {
  string UserID = 1;

  string Img = 2;
  string Title = 3;
  string Address = 4;

  string Place = 5;
  double Lng = 6;
  double Lat = 7;
  uint32 Zoom = 8;

  string Pcode = 9;
  fixed32 Starttime = 10; //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  fixed32 Endtime = 11;   //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  string Phone = 12;
  uint32 Maxnum = 13;
  uint32 Minnum = 14;
  uint32 Nownum = 15;
  uint32 Price = 16;
  repeated string Details = 17;
  repeated string JoinID = 18;
}

enum OrderState {
  REVIEW = 0;
  DENY = 1;
  READY = 2;
  START = 3;
  CANCEL = 4;
  FINISH = 5;

}

message OperateOrderGameSend {
  string GWSRPCID = 1;

  string Salt= 2;
  string UserID = 3;
  string PassCode = 4;
  string ContentID = 5;

  OrderState From = 6;
  OrderState To = 7;

}

message FailReason {
  string Reason= 1;
}

message JoinOrderGameSend {
  string GWSRPCID = 1;

  string Salt= 2;
  string UserID = 3;
  string PassCode = 4;
  string ContentID = 5;
  string Pcode = 6;

}

message GetUserOrderGameListSend {
  string GWSRPCID = 1;

  string UserID = 2;
}

message GetOrderGameListSend {
  string GWSRPCID = 1;

  OrderState State = 2;
}

///rr 100 GetOrderGameList(GetOrderGameListSend)ListRetRecv 获取列表
///rr 101 PublishOrderGameReq(VoidSend)SaltRetRecv 请求发布权限
///rr 102 PublishOrderGame(PublishOrderGameSend)IdRetRecv 请求发布
///rr 103 GetOrderGame(GetOrderGameSend)OrderGameRetRecv 获取内容
///rr 104 GetOrderGameListByID(GetOrderGameListByIDSend)ListRetRecv 获取活动列表byCreateID
///rr 105 OperateOrderGameReq(VoidSend)SaltRetRecv 请求活动 删 改 查 权限
///rr 106 OperateOrderGame(OperateOrderGameSend)FailReason 请求活动 删 改 查 权限
///rr 107 JoinOrderGameReq(VoidSend)SaltRetRecv 请求参加活动权限
///rr 108 JoinOrderGame(JoinOrderGameSend)FailReason 参加活动
///rr 109 GetUserOrderGameList(GetUserOrderGameListSend)ListRetRecv 获取用户活动列表
`;
	private _timinggamePROTO: string = `syntax = "proto3";
package timinggame;

enum GameType {
  Other = 0;
  Cate = 1;
  Farmhouse = 2;
  Entertainment = 3;
  Tour = 4;
  Outdoor = 5;
}

enum GameCateType {
  OtherCate = 0;
  HotPot = 1;
  Buffet = 2;
  Bbq = 3;
  Snack = 4;
  HomeCooking = 5;
}

enum GameFarmhouseType {
  OtherFarmhouse = 0;
  PickingGarden = 1;
  FarmTown = 2;
  Village = 3;
  BungeeJumping = 4;
  WaterPark = 5;
}

enum GameEntertainmentType {
  OtherEntertainment = 0;
  TableTopGame = 1;
  Bar = 2;
  Disco = 3;
  Indoor = 4;
  Ktv = 5;
}

enum GameTourType {
  OtherTour = 0;
  Oneday = 1;
  Vacational = 2;
  TravelAround = 3;
  Park = 4;
  ScenicSpots = 5;
}

enum GameOutdoorType {
  OtherOutdoor = 0;
  DiyTour = 1;
  DrivingTour = 2;
  Camping = 3;
  Ski = 4;
  Camp = 5;
}

message VoidSend {
  string GWSRPCID = 1;
}

message SaltRetRecv {
  string Salt= 1;
}

message Item {
  string ID = 1;
  string Img = 2;
  string Title = 3;
  string Address = 4;
  double Lng = 5;
  double Lat = 6;
  TimingState State = 7;
  uint32 Price = 8;
  fixed32 Time = 9;
  GameType MainType = 10;
  GameCateType CateType = 11;
  GameFarmhouseType FarmhouseType = 12;
  GameEntertainmentType EntertainmentType = 13;
  GameTourType TourType = 14;
  GameOutdoorType OutdoorType = 15;
}

message ListRetRecv {
  repeated Item Items= 1;
}



message PublishTimingGameSend {
  string GWSRPCID = 1;

  string Salt= 2;
  string UserID = 3;
  string PassCode = 4;

  string Img = 5;
  string Title = 6;
  string Address = 7;

  string Place = 8;
  double Lng = 9;
  double Lat = 10;
  uint32 Zoom = 11;

  string Pcode = 12;
  // fixed32 Starttime = 13; //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  // fixed32 Endtime = 14;   //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  string Phone = 15;
  // uint32 Maxnum = 16;
  // uint32 Minnum = 17;
  uint32 Price = 18;
  repeated string Details = 19;
  GameType MainType = 20;
  GameCateType CateType = 21;
  GameFarmhouseType FarmhouseType = 22;
  GameEntertainmentType EntertainmentType = 23;
  GameTourType TourType = 24;
  GameOutdoorType OutdoorType = 25;
}

message GetTimingGameSend {
  string GWSRPCID = 1;
  string ID = 2;
  TimingState Type = 3;
}

message GetTimingGameListByIDSend {
  string GWSRPCID = 1;
  string ID = 2;
  TimingState Type = 3;
}

message IdRetRecv {
  string ID = 1;
}

message TimingGameRetRecv {
  string UserID = 1;

  string Img = 2;
  string Title = 3;
  string Address = 4;

  string Place = 5;
  double Lng = 6;
  double Lat = 7;
  uint32 Zoom = 8;

  string Pcode = 9;
  // fixed32 Starttime = 10; //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  // fixed32 Endtime = 11;   //The value returned generally represents the number of seconds since 00:00 hours, Jan 1, 1970 UTC
  string Phone = 12;
  // uint32 Maxnum = 13;
  // uint32 Minnum = 14;
  // uint32 Nownum = 15;
  uint32 Price = 16;
  repeated string Details = 17;
  repeated string JoinID = 18;
}

enum TimingState {
  REVIEWT = 0;
  DENYT = 1;
  OPEN = 2;
  CLOSE = 3;
  FINISHT = 4;

}

message OperateTimingGameSend {
  string GWSRPCID = 1;

  string Salt= 2;
  string UserID = 3;
  string PassCode = 4;
  string ContentID = 5;

  TimingState From = 6;
  TimingState To = 7;

}

message FailReason {
  string Reason= 1;
}

message JoinTimingGameSend {
  string GWSRPCID = 1;

  string Salt= 2;
  string UserID = 3;
  string PassCode = 4;
  string ContentID = 5;
  string Pcode = 6;

}

message GetUserTimingGameListSend {
  string GWSRPCID = 1;

  string UserID = 2;
}

message GetTimingGameListSend {
  string GWSRPCID = 1;

  TimingState State = 2;
}

///rr 200 GetTimingGameList(GetTimingGameListSend)ListRetRecv 获取列表
///rr 201 PublishTimingGameReq(VoidSend)SaltRetRecv 请求发布权限
///rr 202 PublishTimingGame(PublishTimingGameSend)IdRetRecv 请求发布
///rr 203 GetTimingGame(GetTimingGameSend)TimingGameRetRecv 获取内容
///rr 204 GetTimingGameListByID(GetTimingGameListByIDSend)ListRetRecv 获取活动列表byCreateID
///rr 205 OperateTimingGameReq(VoidSend)SaltRetRecv 请求活动 删 改 查 权限
///rr 206 OperateTimingGame(OperateTimingGameSend)FailReason 请求活动 删 改 查 权限
///rr 207 JoinTimingGameReq(VoidSend)SaltRetRecv 请求参加活动权限
///rr 208 JoinTimingGame(JoinTimingGameSend)FailReason 参加活动
///rr 209 GetUserTimingGameList(GetUserTimingGameListSend)ListRetRecv 获取用户活动列表
`;
  constructor() {
	  this.sendRPCStream;
    this._rpccall = {};
    this._zeroSizeArrayBuffer = new ArrayBuffer(0);
    this._processid = this.idgen();
    this.Builderauth = <auth.ProtoBufBuilder><any>ProtoBuf.loadProto(this._authPROTO).build('auth');
		this.Builderordergame = <ordergame.ProtoBufBuilder><any>ProtoBuf.loadProto(this._ordergamePROTO).build('ordergame');
		this.Buildertiminggame = <timinggame.ProtoBufBuilder><any>ProtoBuf.loadProto(this._timinggamePROTO).build('timinggame');
  };

  connect(addr: string, reconnectMaxTimeS: number,
    MSGauth: IMSGauth,
		MSGordergame: IMSGordergame,
		MSGtiminggame: IMSGtiminggame,
    onOpen: OnOpenCallback, onClose: OnCloseCallback) {

    this._onOpen = onOpen;
    this._onClose = onClose;
		this._MSGauth = MSGauth;
		this._MSGordergame = MSGordergame;
		this._MSGtiminggame = MSGtiminggame;
    this._ws = new uws(addr, 'V2', reconnectMaxTimeS,
      (data) => { this.onMessage(<ArrayBuffer>data); },
      () => { this.onOpen(); },
      () => { this.onClose(); },
      () => { this.onError(); }
    );

    // this._PopoInterval = setInterval(() => {
    //   if (this._isConnect === true) {
    //     let ab = this.makeArrayBuffer(65535, this._processid, this._zeroSizeArrayBuffer);
    //     this._ws.send(ab);
    //   }
    // }, 30 * 1000);

  }

  // 之前登陆会话登陆 
  SessionLogin(argrequest: auth.SessionLoginSendMessage, timeoutMs: number): Promise<auth.LoginRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(0, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 微信认证 
  WechatAuth(argrequest: auth.WechatAuthSendMessage, timeoutMs: number): Promise<auth.AuthRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(1, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 用户验证通行码 
  UserAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(2, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求Order发布权限通行码 
  PublishOrderGameAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(3, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 批量获取用户基本信息 
  GetUserInfo(argrequest: auth.GetUserInfoSendMessage, timeoutMs: number): Promise<auth.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(4, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求Order 删 改 查 权限通行码 
  OperateOrderGameAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(5, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求参加活动权限通行码 
  JoinOrderGameAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(6, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 设置发布者 
  SetPublisher(argrequest: auth.SetPublisherSendMessage, timeoutMs: number): Promise<auth.SetPublisherRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(7, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求Timing发布权限通行码 
  PublishTimingGameAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(8, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求Timing 删 改 查 权限通行码 
  OperateTimingGameAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(9, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求Timing参加活动权限通行码 
  JoinTimingGameAuth(argrequest: auth.GetPassCodeSendMessage, timeoutMs: number): Promise<auth.PassCodeRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(10, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 注册认证 
  RegAuth(argrequest: auth.RegAuthSendMessage, timeoutMs: number): Promise<auth.AuthRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(11, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 登录认证 
  LoginAuth(argrequest: auth.LoginAuthSendMessage, timeoutMs: number): Promise<auth.AuthRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(12, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取列表 
  GetOrderGameList(argrequest: ordergame.GetOrderGameListSendMessage, timeoutMs: number): Promise<ordergame.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(100, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求发布权限 
  PublishOrderGameReq(argrequest: ordergame.VoidSendMessage, timeoutMs: number): Promise<ordergame.SaltRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(101, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求发布 
  PublishOrderGame(argrequest: ordergame.PublishOrderGameSendMessage, timeoutMs: number): Promise<ordergame.IdRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(102, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取内容 
  GetOrderGame(argrequest: ordergame.GetOrderGameSendMessage, timeoutMs: number): Promise<ordergame.OrderGameRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(103, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取活动列表byCreateID 
  GetOrderGameListByID(argrequest: ordergame.GetOrderGameListByIDSendMessage, timeoutMs: number): Promise<ordergame.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(104, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求活动 删 改 查 权限 
  OperateOrderGameReq(argrequest: ordergame.VoidSendMessage, timeoutMs: number): Promise<ordergame.SaltRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(105, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求活动 删 改 查 权限 
  OperateOrderGame(argrequest: ordergame.OperateOrderGameSendMessage, timeoutMs: number): Promise<ordergame.FailReason> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(106, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求参加活动权限 
  JoinOrderGameReq(argrequest: ordergame.VoidSendMessage, timeoutMs: number): Promise<ordergame.SaltRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(107, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 参加活动 
  JoinOrderGame(argrequest: ordergame.JoinOrderGameSendMessage, timeoutMs: number): Promise<ordergame.FailReason> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(108, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取用户活动列表 
  GetUserOrderGameList(argrequest: ordergame.GetUserOrderGameListSendMessage, timeoutMs: number): Promise<ordergame.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(109, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取列表 
  GetTimingGameList(argrequest: timinggame.GetTimingGameListSendMessage, timeoutMs: number): Promise<timinggame.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(200, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求发布权限 
  PublishTimingGameReq(argrequest: timinggame.VoidSendMessage, timeoutMs: number): Promise<timinggame.SaltRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(201, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求发布 
  PublishTimingGame(argrequest: timinggame.PublishTimingGameSendMessage, timeoutMs: number): Promise<timinggame.IdRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(202, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取内容 
  GetTimingGame(argrequest: timinggame.GetTimingGameSendMessage, timeoutMs: number): Promise<timinggame.TimingGameRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(203, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取活动列表byCreateID 
  GetTimingGameListByID(argrequest: timinggame.GetTimingGameListByIDSendMessage, timeoutMs: number): Promise<timinggame.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(204, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求活动 删 改 查 权限 
  OperateTimingGameReq(argrequest: timinggame.VoidSendMessage, timeoutMs: number): Promise<timinggame.SaltRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(205, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求活动 删 改 查 权限 
  OperateTimingGame(argrequest: timinggame.OperateTimingGameSendMessage, timeoutMs: number): Promise<timinggame.FailReason> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(206, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 请求参加活动权限 
  JoinTimingGameReq(argrequest: timinggame.VoidSendMessage, timeoutMs: number): Promise<timinggame.SaltRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(207, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 参加活动 
  JoinTimingGame(argrequest: timinggame.JoinTimingGameSendMessage, timeoutMs: number): Promise<timinggame.FailReason> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(208, buf, timeoutMs, resolve, reject);
    });
  }
  

	// 获取用户活动列表 
  GetUserTimingGameList(argrequest: timinggame.GetUserTimingGameListSendMessage, timeoutMs: number): Promise<timinggame.ListRetRecv> {
    return new Promise((resolve, reject) => {
      let buf = argrequest.toArrayBuffer();
      this.sendRPC(209, buf, timeoutMs, resolve, reject);
    });
  }
  



  private sendRPC(rpcid: number, buf: ArrayBuffer, toMs: number, resolve, reject: any) {
    if (this._isConnect === false) {
      reject("ws is disconnect:rpcid:"+rpcid);
      return;
    }
    let id = this.idgen();

    let to: any = null;
    if(0!==toMs){
      to = setTimeout(() => {
        if (id in this._rpccall) {
          this._ws.reset();
        }
      }, toMs);
    }
    let rc = new RPCCALL;
    rc.resolve = resolve;
    rc.reject = reject;
    rc.to = to;
    rc.rpcid = rpcid;
		rc.stream = null;
    this._rpccall[id] = rc;
    let ab = this.makeArrayBuffer(rpcid, id, buf);
    this._ws.send(ab);
  }

	private sendRPCStream(rpcid: number, buf: ArrayBuffer, toMs: number, resolve, reject: any) {
    if (this._isConnect === false) {
      reject("ws is disconnect:rpcid:" + rpcid);
      return;
    }
    let id = this.idgen();
    let to: any = null;
    if(0!==toMs){
      to = setTimeout(() => {
        if (id in this._rpccall) {
          this._ws.reset();
        }
      }, toMs);
    }
    let rc = new RPCCALL;
    rc.resolve = null;
    rc.reject = null;
    rc.to = to;
    rc.rpcid = rpcid;
    rc.stream = new GwsrpcStream(rc);
    this._rpccall[id] = rc;
    let ab = this.makeArrayBuffer(rpcid, id, buf);
    this._ws.send(ab);
    resolve(rc.stream);
  }

  private idgen(): string {
    let text = '';
    for (let i = 0; i < 20; i++) {
      text += this._printable.charAt(Math.floor(Math.random() * this._printable.length));
    }
    return text;
  }

  private ascii2bytearray(str: string, bytearray: Uint8Array) {
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bytearray[i] = str.charCodeAt(i);
    }
  }

  private bytearray2ascii(bytearray: Uint8Array) {
    let str = '';
    for (let i = 0, bufLen = bytearray.length; i < bufLen; i++) {
      str = str.concat(String.fromCharCode(bytearray[i]));
    }
    return str;
  }

  private makeArrayBuffer(cmd: number, seq: string, payload: ArrayBuffer): ArrayBuffer {
    let ab = new ArrayBuffer(22 + payload.byteLength);
    let cmd2ua = new Uint16Array(ab, 0, 1);
    let seq2ua = new Uint8Array(ab, 2, 20);
    cmd2ua[0] = cmd;
    this.ascii2bytearray(seq, seq2ua);
    if (0 !== payload.byteLength) {
      let payload2ua = new Uint8Array(payload);
      let ab2ua2move = new Uint8Array(ab, 22, payload.byteLength);
      ab2ua2move.set(payload2ua);
    }
    return ab;
  }

  private addSpace(str: string, length: number) {
    return new Array(length - str.length + 1).join(' ') + str;
  }

  private onMessage(buf: ArrayBuffer) {
    let cmd = new Uint8Array(buf, 0, 1);
    let seq = new Uint8Array(buf, 1, 20);
    let seqStr = this.bytearray2ascii(seq);

    if (255 === cmd[0]) {
      // cmd=255 ServiceRestart
      let serviceID = new Uint8Array(buf, 21, 20);

      let serviceIDstr = this.bytearray2ascii(serviceID);

      if (seqStr === this.addSpace('auth', 20)) {
        if (this._authServiceID !== serviceIDstr) {
          this._authServiceID = serviceIDstr;
          this._MSGauth.OnServiceRestart();
        }
        return;
      }

			if (seqStr === this.addSpace('ordergame', 20)) {
        if (this._ordergameServiceID !== serviceIDstr) {
          this._ordergameServiceID = serviceIDstr;
          this._MSGordergame.OnServiceRestart();
        }
        return;
      }

			if (seqStr === this.addSpace('timinggame', 20)) {
        if (this._timinggameServiceID !== serviceIDstr) {
          this._timinggameServiceID = serviceIDstr;
          this._MSGtiminggame.OnServiceRestart();
        }
        return;
      }

      return;
    } else {
      if (seqStr in this._rpccall) {
        let rc = <RPCCALL>this._rpccall[seqStr];
        let s;
        switch (rc.rpcid) {
          case 0:
            s = this.Builderauth.LoginRetRecv.decode(buf.slice(21));
            break;

					case 1:
            s = this.Builderauth.AuthRetRecv.decode(buf.slice(21));
            break;

					case 2:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 3:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 4:
            s = this.Builderauth.ListRetRecv.decode(buf.slice(21));
            break;

					case 5:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 6:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 7:
            s = this.Builderauth.SetPublisherRecv.decode(buf.slice(21));
            break;

					case 8:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 9:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 10:
            s = this.Builderauth.PassCodeRetRecv.decode(buf.slice(21));
            break;

					case 11:
            s = this.Builderauth.AuthRetRecv.decode(buf.slice(21));
            break;

					case 12:
            s = this.Builderauth.AuthRetRecv.decode(buf.slice(21));
            break;

					case 100:
            s = this.Builderordergame.ListRetRecv.decode(buf.slice(21));
            break;

					case 101:
            s = this.Builderordergame.SaltRetRecv.decode(buf.slice(21));
            break;

					case 102:
            s = this.Builderordergame.IdRetRecv.decode(buf.slice(21));
            break;

					case 103:
            s = this.Builderordergame.OrderGameRetRecv.decode(buf.slice(21));
            break;

					case 104:
            s = this.Builderordergame.ListRetRecv.decode(buf.slice(21));
            break;

					case 105:
            s = this.Builderordergame.SaltRetRecv.decode(buf.slice(21));
            break;

					case 106:
            s = this.Builderordergame.FailReason.decode(buf.slice(21));
            break;

					case 107:
            s = this.Builderordergame.SaltRetRecv.decode(buf.slice(21));
            break;

					case 108:
            s = this.Builderordergame.FailReason.decode(buf.slice(21));
            break;

					case 109:
            s = this.Builderordergame.ListRetRecv.decode(buf.slice(21));
            break;

					case 200:
            s = this.Buildertiminggame.ListRetRecv.decode(buf.slice(21));
            break;

					case 201:
            s = this.Buildertiminggame.SaltRetRecv.decode(buf.slice(21));
            break;

					case 202:
            s = this.Buildertiminggame.IdRetRecv.decode(buf.slice(21));
            break;

					case 203:
            s = this.Buildertiminggame.TimingGameRetRecv.decode(buf.slice(21));
            break;

					case 204:
            s = this.Buildertiminggame.ListRetRecv.decode(buf.slice(21));
            break;

					case 205:
            s = this.Buildertiminggame.SaltRetRecv.decode(buf.slice(21));
            break;

					case 206:
            s = this.Buildertiminggame.FailReason.decode(buf.slice(21));
            break;

					case 207:
            s = this.Buildertiminggame.SaltRetRecv.decode(buf.slice(21));
            break;

					case 208:
            s = this.Buildertiminggame.FailReason.decode(buf.slice(21));
            break;

					case 209:
            s = this.Buildertiminggame.ListRetRecv.decode(buf.slice(21));
            break;

        }

        if (RPCSTATUS.OK === cmd[0]) {
          if (null === rc.stream) {
            if(null!==rc.to){clearTimeout(rc.to);}
            delete this._rpccall[seqStr];
          }
          if (rc.resolve !== null) {
            rc.resolve(s);
            rc.resolve = null;
            rc.reject = null;
          }
        } else if (RPCSTATUS.CLOSE === cmd[0]) {
          if(null!==rc.to){clearTimeout(rc.to);}
          delete this._rpccall[seqStr];
          if (rc.resolve !== null) {
            rc.resolve(null);
            rc.resolve = null;
            rc.reject = null;
          }
        } else {
          if(null!==rc.to){clearTimeout(rc.to);}
          delete this._rpccall[seqStr];
          if (rc.reject !== null) {
            rc.reject("gwsrpc recv err:rpcid:" + rc.rpcid);
            rc.resolve = null;
            rc.reject = null;
          }
        }

      }
    }

  }

  private onOpen() {
    let ab = this.makeArrayBuffer(65535, this._processid, this._zeroSizeArrayBuffer);
    this._ws.send(ab);
    this._isConnect = true;
    this._onOpen();
  }

  private onError() {
    //
  }

  private onClose() {
    for (let index in this._rpccall) {
      if (this._rpccall[index].to !== null) {
        clearTimeout(this._rpccall[index].to);
      }
      if (this._rpccall[index].reject != null) {
        this._rpccall[index].reject("websocket disconnect!");
      }
    }
		this._rpccall={};
    if (false === this._isConnect) {
      return;
    }
    this._isConnect = false;
    this._onClose();
  }

}

