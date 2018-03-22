import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';

/**
 * Generated class for the AnnoucePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-annouce',
  templateUrl: 'annouce.html',
})
export class AnnoucePage {
  public fromto: any;
  public places = {
    nearby: [{
      id: 1,
      name: "Current Location"
    }, {
      id: 2,
      name: "Rio de Janeiro, Brazil"
    }, {
      id: 3,
      name: "São Paulo, Brazil"
    }, {
      id: 4,
      name: "New York, United States"
    }, {
      id: 5,
      name: "London, United Kingdom"
    }, {
      id: 6,
      name: "Same as pickup"
    }],
    recent: [{
      id: 1,
      name: "Rio de Janeiro"
    }]
  };
  constructor(private storage: Storage, public nav: NavController, public navParams: NavParams) {
    this.fromto = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnoucePage');
  }
  searchBy(item) {
    if (this.fromto === 'from') {
      this.storage.set('pickup', item.name);
    }

    if (this.fromto === 'to') {
      this.storage.set('dropOff', item.name);
    }
    // this.nav.push(SearchCarsPage);
    this.nav.pop();
  }

}
