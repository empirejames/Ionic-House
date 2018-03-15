import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import {HomePage} from '../home/home'
import {RegisterPage} from '../register/register'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  responseData : any;
  statusLogin : any;
  registerCredentials = {"username":"", "password":""};
  loading: Loading;
  //registerCredentials = { email: '', password: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  }
  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login(){
    this.showLoading();
    this.authService.postData(this.registerCredentials, 'login').then((result)=>{
      this.responseData = result;
      this.statusLogin = JSON.stringify(this.responseData);
      const data = JSON.parse(this.statusLogin);
      if(!data.userData){
        this.showError(data.error.text);
      }else{
        localStorage.setItem('userData',JSON.stringify(this.responseData));
        this.navCtrl.push(HomePage);
      }
    },(err)=>{
      alert("ERR");
      //Connect fail
    });
  }
 
  // public login() {
  //   this.showLoading()
  //   this.auth.login(this.registerCredentials).subscribe(allowed => {
  //     alert("allowed is :"+ allowed);
  //     if (allowed) {     
          
  //       this.navCtrl.push(HomePage);
  //     } else {
  //       this.showError("Access Denied");
  //     }
  //   },
  //     error => {
  //       this.showError(error);
  //     });
  // }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
