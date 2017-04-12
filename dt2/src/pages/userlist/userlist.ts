import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { UserListPageData } from '../../providers/local-auth';

@Component({
  selector: 'userlist',
  templateUrl: 'userlist.html'
})
export class UserList {

  public pagedata: UserListPageData;

  constructor(
    public navParams: NavParams,) {

    this.pagedata = this.navParams.data;

    console.log("userlist constructor");

  }

}
