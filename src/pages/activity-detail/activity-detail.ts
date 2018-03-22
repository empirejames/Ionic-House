import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TripService} from "../../services/trip-service";
/**
 * Generated class for the ActivityDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity-detail.html',
})
export class ActivityDetailPage {
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public tripService: TripService) {
    this.trip = tripService.getItem(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityDetailPage');
  }
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    //this.nav.push(CheckoutTripPage);
  }

}
