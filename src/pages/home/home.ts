import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AnnoucePage } from '../annouce/annouce';
import { ActivityPage } from '../activity/activity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';

  userDetails : any;
  responseData: any;
  userPostData = {"user_id":"","token":""};
  constructor(public navCtrl: NavController , private auth: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    //console.log(this.userDetails.token);
    //this.userPostData.user_id = this.userDetails.user_id;
    //this.userPostData.token = this.userDetails.token;
    
    //let info = this.auth.getUserInfo();
    //this.username = info['name'];
    //this.email = info['email'];
  }
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }
  cellOne(){
    console.log("Cell 1");
    alert("Cell 1");
  }
  goAnnouce(from) {
    this.navCtrl.push(AnnoucePage, from);
  }
  goActivity(){
    this.navCtrl.push(ActivityPage);
  }
}
