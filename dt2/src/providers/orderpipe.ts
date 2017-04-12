import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderbyLngLat' })
export class OrderbyLngLat implements PipeTransform {
  transform(value: any, args: any): any {
    if (typeof (value) !== 'object') {
      throw 'keysPipe value must be object';
    }
    if (args.subdatatype == 1) {

      value = value.filter(data => {
        return data.MainType === 1||data.MainType==0;
      });
    }
    else if (args.subdatatype == 2 ) {

      value = value.filter(data => {
        return data.MainType == 2||data.MainType==0;
      });
    }
    else if (args.subdatatype == 3 ) {

      value = value.filter(
        (data) => {
          return data.MainType == 3||data.MainType==0;
        }
      );
    }
    else if (args.subdatatype == 4 ) {

      value = value.filter(
        (data) => {
          return data.MainType == 4||data.MainType==0;
        }
      );
    }
    else if (args.subdatatype == 5 ) {

      value = value.filter(
        (data) => {
          return data.MainType == 5||data.MainType==0;
        }
      );
    }
    if (args.subpagedataclass == 1) {

      value = value.filter(data => {
        return data.CateType === 1||data.FarmhouseType=== 1||data.EntertainmentType=== 1||data.TourType === 1||data.OutdoorType === 1;

      });
    }
    else if (args.subpagedataclass == 2) {

      value = value.filter(data => {
      return data.CateType === 2||data.FarmhouseType=== 2||data.EntertainmentType=== 2||data.TourType === 2||data.OutdoorType === 2;
      });
    }
    else if (args.subpagedataclass == 3) {

      value = value.filter(data => {
        return data.CateType === 3||data.FarmhouseType=== 3||data.EntertainmentType=== 3||data.TourType === 3||data.OutdoorType === 3;
      });
    }
    else if (args.subpagedataclass == 4) {

      value = value.filter(data => {
        return data.CateType === 4||data.FarmhouseType=== 4||data.EntertainmentType=== 4||data.TourType === 4||data.OutdoorType === 4;

      });
    }
    else if (args.subpagedataclass == 5) {

      value = value.filter(data => {
        return data.CateType === 5||data.FarmhouseType=== 5||data.EntertainmentType=== 5||data.TourType === 5||data.OutdoorType === 5;
      });
    }
    for (let i of value) {
      i.tempStraightDistance = this.getPosition(args.Lat, args.Lng, i.Lat, i.Lng);
    }
    //TODO 按照时间长短进行排序
    if (args.type === 1) {
      if (args.tog == true) {
        value.sort(function(a, b) {
          return a.Time - b.Time;
        });

      }
      else {
        value.sort(function(a, b) {
          return b.Time - a.Time;
        });

      }
    }

    //TODO 按照距离远近进行排序
    if (args.type === 2) {
      if (args.tog == true) {
        value.sort(function(a, b) {
          return a.tempStraightDistance - b.tempStraightDistance;
        });

      }

      else {
        value.sort(function(a, b) {
          return b.tempStraightDistance - a.tempStraightDistance;
        });

      }
    }
    //TODO 按照按照价格大小进行排序
    if (args.type === 3) {
      if (args.tog == true) {
        value.sort(function(a, b) {
          return a.Price - b.Price;
        });

      } else {
        value.sort(function(a, b) {
          return b.Price - a.Price;
        });

      }

    }

    //console.log(value, args.Lng, args.Lat);

    return value;
  }

  getPosition(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0;
    var PI = Math.PI;
    var radLat1 = lat1 * PI / 180;
    var radLat2 = lat2 * PI / 180;
    var radLng1 = lng1 * PI / 180;
    var radLng2 = lng2 * PI / 180;
    var a = radLat1 - radLat2;
    var b = radLng1 - radLng2;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    return s;
  }

}
