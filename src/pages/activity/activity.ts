import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripService} from "../../services/trip-service";

/**
 * Generated class for the ActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  public trips: any;
  constructor(public navCtrl: NavController, public navParams: NavParams , public tripService: TripService) {
    this.trips = tripService.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }
  viewDetail(id) {
   // this.navCtrl.push(TripDetailPage, {id: id});
  }

}
