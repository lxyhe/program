import { Pipe, PipeTransform } from '@angular/core';
import { Events } from 'ionic-angular';
@Pipe({ name: 'loadingpipe' })
export class LoadingPipe implements PipeTransform {
  constructor(public events: Events) { }
  transform(value: any, args: any): any {

    if (typeof (value) !== 'object') {
      throw 'keysPipe value must be object';
    }
    var c = value.slice(0, args.multiple);
    if (c.length == value.length) {
      this.events.publish('nomoredata', true);
    }
    return c;
  }

}
