import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { OrderGameNew } from '../ordergamenew/ordergamenew';

@Component({
  selector: 'page-map',
  templateUrl: 'mapset.html'
})
export class MapSet {

  private session: OrderGameNew;
  onInputTime(value) {
    if (null !== value && "" !== value) {
      this.setMyPoint(value)
    }
  }

  private map: any;

  constructor(public navParams: NavParams) {
    this.session = this.navParams.data;

  }

  setMyPoint(name: string) {
    let myGeo = new BMap.Geocoder();
    myGeo.getPoint(name, (point) => {
      if (point) {
        this.map.centerAndZoom(point, 16);

        let cp = this.map.getCenter();
        let z = this.map.getZoom();
        console.log(cp.lng + "," + cp.lat, z);

        this.session.lng = cp.lng;
        this.session.lat = cp.lat;
        this.session.zoom = z;


        let gc = new BMap.Geocoder();
        gc.getLocation(cp, (rs) => {
          let addComp = rs.addressComponents;
          console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          this.session.place = addComp.district + addComp.street + addComp.streetNumber;
        });


      }
    }, "北京市");
  }


  ionViewDidLoad() {

    setTimeout(() => {

      this.map = new BMap.Map("map"); // 创建Map实例

      let point = new BMap.Point(116.404, 39.915); // 创建点坐标
      this.map.centerAndZoom(point, 15); // 初始化地图,设置中心点坐标和地图级别。
      this.map.addControl(new BMap.ZoomControl()); //添加地图缩放控件

      this.setMyPoint(this.session.addr);

      this.map.addEventListener("dragend", () => {
        let cp = this.map.getCenter();
        let z = this.map.getZoom();
        console.log(cp.lng + "," + cp.lat, z);

        this.session.lng = cp.lng;
        this.session.lat = cp.lat;
        this.session.zoom = z;


        let gc = new BMap.Geocoder();
        gc.getLocation(cp, (rs) => {
          let addComp = rs.addressComponents;
          console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          this.session.place = addComp.district + addComp.street + addComp.streetNumber;
        });

      });
    }, 1);

  }

  ionViewWillUnload() {
    if (null !== this.map) {
      this.map.removeEventListener("dragend");
      this.map = null;
    }
  }

  ionViewWillLeave() {


  }

  ionViewDidEnter() {

  }

}
