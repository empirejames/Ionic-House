import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { LocalNotifications } from '@ionic-native/local-notifications';
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
  responseData: any;
  statusLogin: any;
  registerCredentials = { "username": "", "password": "" };
  loginData: String;
  loading: Loading;
  constructor(public navCtrl: NavController, public localNotifications: LocalNotifications, public platform: Platform, public navParams: NavParams, private authService: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      this.localNotifications.on('click', (notification, status) => {
        let json = JSON.parse(notification.data);
        let alart = this.alertCtrl.create({
          title: notification.title,
          subTitle: notification.message
        })
      })
    })
  }
  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login() {
    this.showLoading();
    this.loginData = JSON.stringify(this.registerCredentials);
    this.authService.post(this.loginData, 'login').then((result) => {
      this.responseData = result;
      this.statusLogin = JSON.stringify(this.responseData);
      const data = JSON.parse(this.statusLogin);
      if (!data) {
        this.showError("帳戶錯誤");
        console.log(data);
        //this.showError(data);
      } else {
        localStorage.setItem('userData', JSON.stringify(this.responseData));
        this.navCtrl.setRoot(HomePage);
      }
    }, (err) => {
      this.showError(err);
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
