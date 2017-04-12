import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from 'ionic-native';
import { BarcodeScanner } from 'ionic-native';
import * as URI from 'urijs';
import { Events } from 'ionic-angular';

export class myCoordinates {
  /**
   * a double representing the position's latitude in decimal degrees.
   */
  latitude: number;

  /**
   * A double representing the position's longitude in decimal degrees.
   */
  longitude: number;

  /**
   * A double representing the accuracy of the latitude and longitude properties,
   * expressed in meters.
   */
  accuracy: number;

  /**
   * A double representing the position's altitude in metres, relative to sea
   * level. This value can be null if the implementation cannot provide the data.
   */
  altitude: number;

  /**
   * A double representing the accuracy of the altitude expressed in meters.
   * This value can be null.
   */
  altitudeAccuracy: number;

  /**
   * A double representing the direction in which the device is traveling. This
   * value, specified in degrees, indicates how far off from heading true north
   * the device is. 0 degrees represents true north, and the direction is
   * determined clockwise (which means that east is 90 degrees and west is 270
   * degrees). If speed is 0, heading is NaN. If the device is unable to provide
   * heading information, this value is null.
   */
  heading: number;

  /**
   * A double representing the velocity of the device in meters per second.
   * This value can be null.
   */
  speed: number;
}

class myGeoposition {
  coords: myCoordinates;
  timestamp: number;

  constructor() {
    this.coords = new myCoordinates();
  }

}


@Injectable()
export class MyGeoLocation {

  public currPos: Geoposition;


  constructor() {
    this.currPos = new myGeoposition();
    this.currPos.coords.latitude = 39.913814;
    this.currPos.coords.longitude = 116.279827;

  }

  getCurr() {
    try {

      Geolocation.getCurrentPosition().then(pos => {

        //console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);

        //todo change gps wgs84 => baidu bd09ll
        //http://lbsyun.baidu.com/index.php?title=webapi/guide/changeposition
        //key word:百度地图 坐标转换API

        this.currPos = pos;

      }).catch((err) => {
        console.log("catch func:", err);
      });
    } catch (err) {
      console.log("try catch:", err);
    }
  }



}



@Injectable()
export class MyBarcodeScanner {

  constructor(
    public events: Events,
  ) {
  }

  async scan(scanEventName: string) {
    try {

      let v = await BarcodeScanner.scan();
      console.log("MyBarcodeScanner", v);
      //text: "", format: "", cancelled=true
      if (!v.cancelled) {
        let uri = new URI(v.text);
        let protocol = uri.protocol();
        if (protocol === "lexianyiqr") {
          let path = uri.path(true);
          if (scanEventName !== "") {
            path = "/"+scanEventName;
          }

          this.events.publish("lexianyiqr:" + path, uri.search());
          console.log("publish", "lexianyiqr:" + path, uri.search())

        }
      }
    } catch (err) {
      console.log("MyBarcodeScanner err", err);
    }
  }



}
