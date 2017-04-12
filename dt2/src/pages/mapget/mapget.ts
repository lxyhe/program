import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';



@Component({
  selector: 'page-map-get',
  templateUrl: 'mapget.html'
})
export class MapGet {

  private map: any;
  private session: any;

  constructor(public navParams: NavParams) {
    this.session = this.navParams.data;

  }

  ionViewWillUnload() {
    if (null !== this.map) {
      this.map = null;
    }
  }

  ionViewDidLoad() {

    setTimeout(() => {

      this.map = new BMap.Map("map"); // 创建Map实例

      let point = new BMap.Point(this.session.lng, this.session.lat); // 创建点坐标
      this.map.centerAndZoom(point, this.session.zoom); // 初始化地图,设置中心点坐标和地图级别。
      this.map.addControl(new BMap.ZoomControl()); //添加地图缩放控件


      let marker1 = new BMap.Marker(new BMap.Point(this.session.lng, this.session.lat));
      this.map.addOverlay(marker1);




    }, 1);

  }

}
