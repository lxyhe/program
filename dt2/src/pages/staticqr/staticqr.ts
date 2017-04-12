import {NavParams} from 'ionic-angular';

import {Component} from '@angular/core';

import * as qr from 'qr-image';
import * as URI from 'urijs';


import { Sanitizer } from '../../providers/system';

export class QRinfo {
  public pic: any;
  public title: string;
  public avatarpic: string;
  public avatarname: string;
  public avatarinfo: string;
  public txt: string;

  public encodethis: string;

  constructor() {
    this.pic = null;
    this.title = "";
    this.avatarpic = "";
    this.avatarname = "";
    this.avatarinfo = "";
    this.txt = "";
    this.encodethis = "";

  }

  public setLexianyiQR(scanEventName: string, kvs: Map<string, string>) {
    let uri = new URI({
      protocol: "lexianyiqr",
      path: scanEventName,
    });

    if (kvs != null) {
      for (let key in kvs) {
        uri.addSearch(key, kvs[key]);
      }
    }


    this.encodethis = uri.href().toString();

  }

}

@Component({
  selector: 'staticqr',
  templateUrl: 'staticqr.html'
})
export class StaticQRPage {

  public qrinfo: QRinfo;

  constructor(
    public pagesanitizer: Sanitizer,
    public navParams: NavParams) {
    this.qrinfo = this.navParams.data;

    var qr_svg = qr.imageSync(this.qrinfo.encodethis, { type: 'svg' });
    this.qrinfo.pic = this.pagesanitizer.appsanitizer.bypassSecurityTrustUrl("data:image/svg+xml;utf8," + qr_svg);
    if (this.qrinfo.title === "") {
      this.qrinfo.title = "QR码";
    }

    console.log(this.qrinfo);
  }



}
