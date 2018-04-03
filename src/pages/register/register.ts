import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {HomePage} from '../home/home'
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  responseData : any;
  createSuccess = false;
  //registerCredentials = { email: '', password: '' };
  registerCredentials = {"username":"", "password":"","email":"","name":""};
  //registerCredentials =  {"username":"", "password":"","email":"","name":""};
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthServiceProvider,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public signup(){
    console.log(this.registerCredentials);
    this.authService.post(this.registerCredentials, 'signup').then((result)=>{
      this.responseData = result;
      localStorage.setItem('userData',JSON.stringify(this.responseData));
      console.log(this.responseData);
      this.navCtrl.push(HomePage);
    },(err)=>{
      alert("ERR");
      //Connect fail
    });
}

  public register() {
    this.authService.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
